import { View, Text, Image } from "react-native";
import React from "react";
import CustomButton from "@/components/CustomButton";
import { icons } from "@/constants";

const OAuth = () => {
  const handleGoogleSignIn = () => {
    console.log("Google Sign In");
  };
  return (
    <View>
      <View className="flex flow-row justify-center items-center mt-4 gap-x-3">
        <View className="flex-1 h-[2px] bg-general-100 " />
        <Text className="text-black text-lg font-JakartaSemiBold">Or</Text>
        <View className="flex-1 h-[2px] bg-general-100 " />
      </View>
      <CustomButton
        title="Log In with Google"
        className="mt-5 w-full shadow-none"
        IconLeft={() => (
          <Image
            source={icons.google}
            className="w-6 h-6 mx-3"
            resizeMode="contain"
          />
        )}
        bgVariant="outline"
        textVariant="primary"
        onPress={handleGoogleSignIn}
      />
    </View>
  );
};
export default OAuth;
