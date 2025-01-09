import { View, Text, Image } from "react-native";
import React from "react";
import { GoogleInputProps } from "@/types/type";

const GoogleTextInput = ({
  icon,
  containerStyle,
  textInputBackgroundColor,
  handlePress,
}: GoogleInputProps) => {
  return (
    <View
      className={`flex flex-row items-center justify-center relative z-50 rouded-lg ${containerStyle}`}
    >
      <Text>Explore..</Text>
      <Image source={icon} className="w-6 h-6" resizeMode="contain" />
    </View>
  );
};
export default GoogleTextInput;
