import axios from "axios";
import defaultBuildUrl from "../utils/searchParam";

const GOOGLE_MAPS_BASE_URL = "https://maps.googleapis.com/maps/api";
export let API_KEY = process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY!;
export const getApiKey = () => API_KEY;
export const updateApiKey = (key: string) => {
  API_KEY = key;
};
const instance = axios.create({
  baseURL: GOOGLE_MAPS_BASE_URL,
});

const buildUrl = (path: string, params: Record<string, unknown>) => {
  params["key"] = API_KEY;
  params["region"] = "vn";
  params["language"] = "vi";
  return defaultBuildUrl(path, params);
};
export type AutoCompleteResultType = {
  predictions: {
    description: string;
    structured_formatting: { main_text: string };
  }[];
  status: string;
};
export type GeoCodeResultType = {
  results: {
    formatted_address: string;
    geometry: { location: { lat: number; lng: number } };
  }[];
};

export const autoComplete = async <T extends string | string[]>(
  input: T,
): Promise<
  T extends string ? AutoCompleteResultType : AutoCompleteResultType[]
> => {
  const inputs = typeof input === "string" ? [input] : (input as string[]);
  const results = await Promise.all(
    inputs.map(async (input) => {
      const path = "/place/autocomplete/json";
      const url = buildUrl(path, { input });
      const res = await instance.get<AutoCompleteResultType>(url);
      return res.data;
    }),
  );
  return (typeof input === "string" ? results[0] : results) as T extends string
    ? AutoCompleteResultType
    : AutoCompleteResultType[];
};

export const geoCode = async (address: string) => {
  const path = "/geocode/json";
  const url = buildUrl(path, { address });
  const res = await instance.get<GeoCodeResultType>(url);
  const data = res.data;
  const { lat, lng } = data.results?.[0].geometry.location;
  return { latitude: lat, longitude: lng, address };
};

export const geoReverse = async (lat: number, lng: number) => {
  const path = "/geocode/json";
  const url = buildUrl(path, { latlng: `${lat},${lng}` });
  const res = await instance.get<GeoCodeResultType>(url);
  const data = res.data;
  const results = data.results;
  return results?.[0].formatted_address;
};
