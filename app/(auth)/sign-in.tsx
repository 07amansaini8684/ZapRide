import { View, Text, SafeAreaView, ScrollView, Image } from "react-native";
import React from "react";
import InputField from "@/components/InputField";
import { images, icons } from "@/constants";
import CustomButton from "@/components/CustomButton";
import { Link } from "expo-router";
import OAuth from "@/components/OAuth";

const SignIn = () => {
  const [form, setForm] = React.useState({
    email: "",
    password: "",
  });

  const onSignInPress = async () => {};

  return (
    <ScrollView className="flex bg-white">
      <View className="flex-1 bg-white">
        {/* Header Image and Title */}
        <View className="relative">
          <Image
            source={images.signUpCar}
            style={{ width: "100%", height: 250 }}
          />
          <Text className="absolute bottom-5 left-5 text-2xl text-black font-JakartaSemiBold">
            Welcome👋
          </Text>
        </View>

        {/* Input Fields */}
        <View className="p-5">
          <InputField
            label="Email"
            placeholder="Enter your email"
            icon={icons.email}
            value={form.email}
            onChangeText={(text) => setForm({ ...form, email: text })}
          />
          <InputField
            label="Password"
            placeholder="Enter your password"
            icon={icons.lock}
            secureTextEntry
            value={form.password}
            onChangeText={(text) => setForm({ ...form, password: text })}
          />
          <CustomButton
            title="Sign In"
            className="mt-5"
            onPress={onSignInPress}
          />
          {/*  ;Button for OAuth */}
          <OAuth />
          {/*  ;Button for OAuth */}
          <Link
            href="/sign-up"
            className="text-center text-xl text-general-200 mt-10"
          >
            <Text className="text-black text-base font-JakartaRegular">
              Don't have an account?{" "}
            </Text>
            <Text className="text-primary-500 text-base font-JakartaRegular text-">
              Sign Up
            </Text>
          </Link>
        </View>
        {/*  verification module */}
      </View>
    </ScrollView>
  );
};

export default SignIn;
