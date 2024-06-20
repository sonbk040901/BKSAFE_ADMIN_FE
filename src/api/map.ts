import instance from "./axios";
import { updateApiKey } from "./ggmap";

export const getApiKey = async () => {
  const path = "map/api-key";
  const res = await instance.get<string>(path);
  updateApiKey(res.data);
  return res.data;
};
