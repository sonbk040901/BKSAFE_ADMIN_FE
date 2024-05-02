import { useNavigation } from "@react-navigation/native";
import { AxiosError } from "axios";
import { DependencyList, useCallback, useEffect, useReducer } from "react";
import { RootNavigationProp } from "../../types/navigation";
import { showAlert } from "../../utils/alert";
import { ErrorResponse } from "../types";

type FetchStatus = "idle" | "loading" | "success" | "error";
type UseFetchOptions<D, RD> = {
  fetchFn: () => Promise<D>;
  initialData?: RD;
  autoFetch?: boolean;
};
type UseFetchReturn<D, RD> = {
  /**
   * true nếu đang fetch dữ liệu (cả lần đầu và refetch)
   */
  isLoading: boolean;
  /**
   * true nếu đang fetch dữ liệu lần đầu
   */
  isFetching: boolean;
  data: RD extends undefined ? D | null : D;
  status: FetchStatus;
  error: ErrorResponse | null;
  refetch: (isFirstTime?: boolean) => void;
};
const reducer = (
  state: object,
  action: { type: FetchStatus | "fetching"; data?: unknown; error?: unknown },
) => {
  switch (action.type) {
    case "fetching":
      return { ...state, status: "loading", isFetching: true, isLoading: true };
    case "loading":
      return {
        ...state,
        status: "loading",
        isLoading: true,
      };
    case "success":
      return {
        ...state,
        status: "success",
        data: action.data,
        isLoading: false,
        isFetching: false,
      };
    case "error":
      return {
        ...state,
        status: "error",
        error: action.error,
        isLoading: false,
        isFetching: false,
      };
    default:
      return state;
  }
};
function useFetch<D, RD extends D | undefined>(
  opts: UseFetchOptions<D, RD>,
  deps: DependencyList = [],
) {
  const { fetchFn, initialData, autoFetch = true } = opts;
  const navigation = useNavigation<RootNavigationProp>();
  const [state, dispatch] = useReducer(reducer, {
    status: "idle",
    data: initialData || null,
    error: null,
    isLoading: true,
    isFetching: true,
  });
  const refetch = useCallback(
    (isFirstTime = false) => {
      if (isFirstTime) dispatch({ type: "fetching" });
      else dispatch({ type: "loading" });
      fetchFn()
        .then((data) => dispatch({ type: "success", data }))
        .catch((error) => {
          const err = error as AxiosError<ErrorResponse, ErrorResponse>;
          const res = err.response!.data;
          if (res.statusCode === 401 && !res.error) {
            showAlert("Phiên đăng nhập hết hạn", "Vui lòng đăng nhập lại");
            navigation.navigate("Auth");
          } else {
            dispatch({ type: "error", error: res });
          }
        });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [navigation, ...deps],
  );
  useEffect(() => {
    if (autoFetch) refetch(true);
  }, [autoFetch, refetch]);
  return { ...state, refetch } as UseFetchReturn<D, RD>;
}

export default useFetch;
// React Hook useEffect đã được chuyển qua một danh sách phụ thuộc không phải là một mảng bằng chữ. Điều này có nghĩa là chúng tôi không thể xác minh tĩnh xem bạn có chuyển đúng phần phụ thuộc hay không
