import {
  View,
  Text,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Image,
  TextInput,
  Platform,
  Keyboard,
} from "react-native";
import React from "react";
import { InputFieldProps } from "@/types/type";

// interface InputProps {
//   label: string;
//   labelStyle?: string; // Tailwind className or style object
//   placeholder?: string;
//   icon?: any; // Image source type
//   secureTextEntry?: boolean;
//   containerStyle?: string; // Tailwind className or style object
//   inputStyle?: string; // Tailwind className or style object
//   iconStyle?: string; // Tailwind className or style object
//   className?: string; // Tailwind className or style object
// }

const InputField = ({
  label,
  labelStyle = "",
  placeholder = "",
  icon,
  secureTextEntry = false,
  containerStyle = "",
  inputStyle = "",
  iconStyle = "",
  className = "",
  ...props
}: InputFieldProps) => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className={`my-2 w-full ${className}`}>
          {/* Label */}
          <Text
            className={`text-black text-lg font-JakartaSemiBold mb-3 ${labelStyle}`}
          >
            {label}
          </Text>

          {/* Input Container */}
          <View
            className={`flex flex-row justify-start items-center relative bg-netural-100 rounded-full border border-netural-100 ${containerStyle}`}
          >
            {/* Icon */}
            {icon && (
              <Image source={icon} className={`w-6 h-6 ml-3 ${iconStyle}`} />
            )}

            {/* Text Input */}
            <TextInput
              className={`rounded-full p-4 font-JakartaSemiBold text-[15px] flex-1 text-left ${inputStyle}`}
              placeholder={placeholder}
              secureTextEntry={secureTextEntry}
              {...props}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default InputField;
