import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";

import { icons } from "@/constants";

const EmptyState = () => {
  return (
    <View className="flex-1 items-center justify-center min-h-[400px] bg-white px-4">
      <View className="bg-gray-50 rounded-full p-6 mb-6">
        <Image source={icons.pin} className="w-8 h-8" resizeMode="contain" />
      </View>

      <Text className="text-2xl font-bold text-gray-900 mb-2 text-center">
        No rides available
      </Text>

      <Text className="text-gray-500 text-center text-base mb-8 max-w-xs">
        We couldn't find any rides at the moment. Try searching in a different
        area or try again later.
      </Text>

      <TouchableOpacity className="w-full max-w-xs bg-black rounded-full py-3 px-6 hover:bg-gray-800 transition-colors">
        <Text className="text-white text-center font-semibold">Try Again</Text>
      </TouchableOpacity>

      <View className="mt-4 flex-row items-center">
        <View className="h-1 w-1 rounded-full bg-gray-300 mx-2" />
        <Text className="text-gray-400">or</Text>
        <View className="h-1 w-1 rounded-full bg-gray-300 mx-2" />
      </View>

      <TouchableOpacity>
        <Text className="mt-4 text-black font-medium hover:text-gray-700 transition-colors">
          Schedule a ride for later
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default EmptyState;
