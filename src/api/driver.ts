import instance from "./axios";
type Status = "AVAILABLE" | "BUSY" | "OFFLINE";
export const updateStatus = async (status: Status) => {
  const path = "driver/drivers/status";
  const res = await instance.patch(path, { status });
  return res.data;
};
