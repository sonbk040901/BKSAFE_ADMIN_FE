import {
  LocationAccuracy,
  enableNetworkProviderAsync,
  startLocationUpdatesAsync,
  stopLocationUpdatesAsync,
} from "expo-location";
import { defineTask } from "expo-task-manager";
import { useCallback, useEffect, useState } from "react";
interface Location {
  latitude: number;
  longitude: number;
}

const LOCATION_TASK_NAME = "background-location-task";
function useLocation() {
  const [location, setLocation] = useState<Location>();
  const stopLocation = useCallback(async () => {
    await stopLocationUpdatesAsync(LOCATION_TASK_NAME);
  }, []);
  const startLocation = useCallback(async () => {
    await enableNetworkProviderAsync();
    await new Promise((r) => setTimeout(r, 1000));
    await startLocationUpdatesAsync(LOCATION_TASK_NAME, {
      accuracy: LocationAccuracy.Highest,
      timeInterval: 1000,
      distanceInterval: 1,
      showsBackgroundLocationIndicator: true,
      foregroundService: {
        notificationTitle: "Using your location",
        notificationBody:
          "To turn off, go back to the app and switch something off.",
      },
    });
  }, []);
  useEffect(() => {
    defineTask(LOCATION_TASK_NAME, ({ data, error }) => {
      const { locations } = data as {
        locations: { coords: { latitude: number; longitude: number } }[];
      };
      if (error) {
        return;
      }
      setLocation(locations[0].coords);
    });
    enableNetworkProviderAsync();
  }, []);
  return { location, startLocation, stopLocation, setLocation };
}

export default useLocation;
