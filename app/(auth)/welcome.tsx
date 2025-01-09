import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useRef, useState } from "react";
import { router } from "expo-router";
import Swipper from "react-native-swiper";
import { onboarding } from "@/constants";
import CustomButton from "@/components/CustomButton";

const Onboarding = () => {
  // console.log(onboarding);

  const swipperRef = useRef<Swipper>(null);
  const [active, setActive] = useState(0);
  const isLastSlide = active === onboarding.length - 1;

  return (
    <SafeAreaView className="flex h-full items-center justify-between p-4 bg-black">
      <TouchableOpacity
        onPress={() => router.replace("/(auth)/sign-up")}
        className="w-full flex justify-end items-end p-5"
      >
        <Text className="text-white text-md font-JakartaBold">Skip</Text>
      </TouchableOpacity>
      <Swipper
        ref={swipperRef}
        loop={false}
        dot={
          <View className=" w-[32px] h-[4px] rounded-full mx-1 bg-[#E2E8F0] " />
        }
        activeDot={
          <View className=" w-[32px] h-[4px] rounded-full mx-1 bg-[#0286FF] " />
        }
        onIndexChanged={(index) => setActive(index)}
      >
        {/* Add your slides here */}
        {onboarding.map((slide, index) => (
          <View key={slide.id} className="flex  justify-center items-center">
            <Image
              source={slide.image}
              className="w-full h-[300px]"
              resizeMode="contain"
            />
            <View className="flex flex-row items-center justify-center w-full mt-10 ">
              <Text className="text-white text-3xl font-JakartaBold mx-10 text-center">
                {slide.title}
              </Text>
            </View>
            <Text className=" text-lg font-JakartaSemiBold text-center text-[#8B8B8B] mx-10 mt-3">
              {slide.description}
            </Text>
          </View>
        ))}
      </Swipper>
      <CustomButton
        title={isLastSlide ? "Get Started" : "Next"}
        onPress={() => {
          isLastSlide
            ? router.replace("/(auth)/sign-in")
            : swipperRef.current?.scrollBy(1);
        }}
        className="w-11/12 mt-5"
      />
    </SafeAreaView>
  );
};

export default Onboarding;
