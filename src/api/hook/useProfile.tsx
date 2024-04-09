import { authApi } from "..";
import useFetch from "./useFetch";

function useProfile() {
  return useFetch({ fetchFn: authApi.getProfile, });
}

export default useProfile;
