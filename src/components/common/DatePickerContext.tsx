import { Dayjs } from "dayjs";
import React, { ReactNode, createContext, useContext, useState } from "react";

interface DatePickerContextType {
  isVisible: boolean;
  showDatePicker: () => void;
  getDate: (cb: (date: Dayjs) => void) => void;
  hideDatePicker: () => void;
  setSelectedDate: (date: Dayjs) => void;
}

const DatePickerContext = createContext<DatePickerContextType | undefined>(
  undefined,
);

export const useDatePicker = () => {
  const context = useContext(DatePickerContext);
  if (!context) {
    throw new Error("useDatePicker must be used within a DatePickerProvider");
  }
  return context;
};

export const DatePickerProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [onConfirm, setOnConfirm] = useState<((date: Dayjs) => void) | null>(
    null,
  );

  const showDatePicker = () => {
    setIsVisible(true);
  };

  const hideDatePicker = () => {
    setIsVisible(false);
  };
  const getDate = (cb: (date: Dayjs) => void) => {
    showDatePicker();
    setOnConfirm(() => (date: Dayjs) => {
      cb(date);
    });
  };
  const setSelectedDate = (date: Dayjs) => {
    onConfirm?.(date);
  };
  return (
    <DatePickerContext.Provider
      value={{
        isVisible,
        showDatePicker,
        hideDatePicker,
        setSelectedDate,
        getDate,
      }}
    >
      {children}
    </DatePickerContext.Provider>
  );
};
