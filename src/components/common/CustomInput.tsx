import React, {
  ForwardRefRenderFunction,
  ReactNode,
  forwardRef,
  useState,
} from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
} from "react-native";
import { COLOR } from "../../constants/color";

interface CustomInputProps extends TextInputProps {
  width?: `${number}%` | number;
  label?: string;
  errorText?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

const CustomInput: ForwardRefRenderFunction<TextInput, CustomInputProps> = (
  props,
  ref,
) => {
  const { label, errorText, leftIcon, rightIcon, width, ...rest } = props;
  const [focussed, setFocussed] = useState(false);
  return (
    <View style={[styles.container, { width }]}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View
        style={[
          styles.inputContainer,
          focussed ? { borderColor: COLOR.primary } : null,
        ]}
      >
        {leftIcon && <View style={styles.leftIconContainer}>{leftIcon}</View>}
        <TextInput
          ref={ref}
          style={[
            styles.input,
            leftIcon ? { paddingLeft: 35 } : null,
            rightIcon ? { paddingRight: 35 } : null,
          ]}
          placeholderTextColor={"#999"}
          {...rest}
          onFocus={(e) => {
            rest.onFocus?.(e);
            setFocussed(true);
          }}
          onBlur={(e) => {
            rest.onBlur?.(e);
            setFocussed(false);
          }}
        />
        {rightIcon && (
          <View style={styles.rightIconContainer}>{rightIcon}</View>
        )}
      </View>
      {errorText && <Text style={styles.errorText}>{errorText}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  label: {
    marginBottom: 5,
    color: "#333",
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 0.5,
    borderColor: COLOR.secondary,
    borderRadius: 7,
    paddingHorizontal: 10,
    paddingVertical: 1,
  },
  input: {
    flex: 1,
    height: 45,
    fontSize: 18,
    color: "#333",
  },
  leftIconContainer: {
    position: "absolute",
    left: 10,
  },
  rightIconContainer: {
    position: "absolute",
    right: 10,
  },
  errorText: {
    color: COLOR.error,
    fontSize: 11,
    position: "absolute",
    bottom: -15,
  },
});

export default forwardRef(CustomInput);
