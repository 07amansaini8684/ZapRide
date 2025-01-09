import React from "react";
import { View, Text, Animated, Easing } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

const LoadingState: React.FC<{ message?: string }> = ({
  message = "Finding the perfect ride for you...",
}) => {
  const pulseAnim = React.useRef(new Animated.Value(1)).current;
  const spinAnim = React.useRef(new Animated.Value(0)).current;
  const bounceAnim = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    // Pulse animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.2,
          duration: 1000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ]),
    ).start();

    // Spin animation
    Animated.loop(
      Animated.timing(spinAnim, {
        toValue: 1,
        duration: 2000,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ).start();

    // Bounce animation for dots
    Animated.loop(
      Animated.sequence([
        Animated.timing(bounceAnim, {
          toValue: 1,
          duration: 1500,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(bounceAnim, {
          toValue: 0,
          duration: 1500,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, []);

  const spin = spinAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  const LoadingDot: React.FC<{ delay: number }> = ({ delay }) => {
    const translateY = bounceAnim.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [0, -10, 0],
    });

    return (
      <Animated.View
        className="w-2 h-2 rounded-full bg-black mx-1"
        style={{
          transform: [{ translateY: Animated.multiply(translateY, delay) }],
        }}
      />
    );
  };

  return (
    <View className="flex-1 justify-center items-center bg-white p-5">
      <Animated.View
        className="w-24 h-24 bg-gray-100 rounded-full justify-center items-center mb-5"
        style={{
          transform: [{ scale: pulseAnim }, { rotate: spin }],
        }}
      >
        <MaterialIcons name="local-taxi" size={50} color="black" />
      </Animated.View>

      <Text className="text-lg font-semibold text-gray-800 text-center mb-5">
        {message}
      </Text>

      <View className="flex-row items-center justify-center">
        {[0.8, 1, 1.2].map((delay, index) => (
          <LoadingDot key={index} delay={delay} />
        ))}
      </View>
    </View>
  );
};

export default LoadingState;
