import {View, Text, TouchableOpacity,} from "react-native";
import React from "react";
import {ButtonProps} from "@/types/type";


const getBgVariantStyle = (variant : ButtonProps["bgVariant"]) : ButtonProps =>{
  switch (variant) {
    case "secondary":
      return "bg-gray-200";
    case "danger":
      return "bg-red-500";
    case "success":
      return "bg-green-500";
    case "outline":
      return "bg-transparent border-[0.5px] border-natural-500";
    default:
      return "bg-blue-500";
  }
};const getTextVariantStyle = (variant : ButtonProps["textVariant"]) : ButtonProps =>{
  switch (variant) {
    case "primary":
      return "text-black";
    case "secondary":
      return "text-gray-100";
    case "danger":
      return "text-red-500";
    case "success":
      return "text-green-100";
    default:
      return "text-white";
  }
};
const CustomButton = ({
  onPress,
  title,
  bgVariant = "primary",
  textVariant = "default",
  IconLeft,
  IconRight,
  ClassName,
  ...props
}: ButtonProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className={`w-full rounded-full flex flex-row justify-center items-center shadow-md shadow-netural-400/70 bg-${bgVariant} p-3 ${ClassName}`}
    >
      {iconLeft && <IconLeft />}
      <Text className={`text-lg font-bold text-${textVariant}`}>{title}</Text>
      {iconLeft && <IconRight />}
    </TouchableOpacity>
  );
};
export default CustomButton;
