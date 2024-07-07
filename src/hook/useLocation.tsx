import {
  LocationAccuracy,
  enableNetworkProviderAsync,
  startLocationUpdatesAsync,
  stopLocationUpdatesAsync,
} from "expo-location";
import { defineTask, unregisterTaskAsync } from "expo-task-manager";
import { useCallback, useEffect, useState } from "react";
interface Location {
  latitude: number;
  longitude: number;
}

const LOCATION_TASK_NAME = "background-location-task";
function useLocation(key?: string) {
  const taskName = key ? `${LOCATION_TASK_NAME}-${key}` : LOCATION_TASK_NAME;
  const [location, setLocation] = useState<Location>();
  const stopLocation = useCallback(async () => {
    await stopLocationUpdatesAsync(taskName).catch(() => {});
  }, [taskName]);
  const startLocation = useCallback(async () => {
    await enableNetworkProviderAsync();
    await new Promise((r) => setTimeout(r, 1000));
    await startLocationUpdatesAsync(taskName, {
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
  }, [taskName]);
  useEffect(() => {
    defineTask(taskName, ({ data, error }) => {
      const { locations } = data as {
        locations: { coords: { latitude: number; longitude: number } }[];
      };
      if (error) {
        return;
      }
      setLocation(locations[0].coords);
    });
    enableNetworkProviderAsync().catch(() => {});
    return () => {
      unregisterTaskAsync(taskName).catch(() => {});
    };
  }, [taskName]);
  return { location, startLocation, stopLocation, setLocation };
}

export default useLocation;
