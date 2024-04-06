import { setItemAsync, getItemAsync, deleteItemAsync } from "expo-secure-store";
export const storeData = async (key: string, value: unknown) => {
  try {
    await setItemAsync(key, JSON.stringify(value));
  } catch (error) {
    throw "Error while storing data";
  }
};

export const getData = async (key: string) => {
  try {
    const value = await getItemAsync(key);
    return value ? JSON.parse(value) : null;
  } catch (error) {
    throw "Error while getting data";
  }
};
export const removeData = async (key: string) => {
  try {
    await deleteItemAsync(key);
  } catch (error) {
    throw "Error while removing data";
  }
};

export const clearData = async () => {
  try {
  } catch (error) {
    throw "Error while clearing data";
  }
};
export const getDistance = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number,
) => {
  const R = 6371; // km (change this constant to get miles)
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    0.5 -
    Math.cos(dLat) / 2 +
    (Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      (1 - Math.cos(dLon))) /
      2;
  return R * 2 * Math.asin(Math.sqrt(a));
};
