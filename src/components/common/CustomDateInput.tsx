import { Dayjs } from "dayjs";
import React, { FC, ReactNode, useEffect, useState } from "react";
import { TextInputProps, TouchableOpacity } from "react-native";
import CustomInput from "./CustomInput";
import { useDatePicker } from "./DatePickerContext";

interface CustomInputProps extends Omit<TextInputProps, "onChangeText"> {
  width?: `${number}%` | number;
  label?: string;
  errorText?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  onChangeDate?: (date: string) => void;
  date?: Dayjs;
}

const CustomDateInput: FC<CustomInputProps> = (props) => {
  const { onChangeDate, date: inputDate } = props;
  const [date, setDate] = useState(inputDate);
  const { getDate } = useDatePicker();
  useEffect(() => {
    setDate(inputDate);
  }, [inputDate]);
  return (
    <TouchableOpacity
      onPress={() => {
        getDate((date) => {
          onChangeDate?.(date.toISOString());
          setDate(date);
        });
      }}
    >
      <CustomInput
        {...props}
        value={date ? date.format("DD/MM/YYYY") : undefined}
        readOnly
      />
    </TouchableOpacity>
  );
};

export default CustomDateInput;
