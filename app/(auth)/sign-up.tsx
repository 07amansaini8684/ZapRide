import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Image,
  Alert,
} from "react-native";
import React, { useState } from "react";
import InputField from "@/components/InputField";
import { images, icons } from "@/constants";
import CustomButton from "@/components/CustomButton";
import { Link, router } from "expo-router";
import OAuth from "@/components/OAuth";
import { useSignUp } from "@clerk/clerk-expo";
import ReactNativeModal from "react-native-modal";
import { setSplashImageDrawablesForThemeAsync } from "@expo/prebuild-config/build/plugins/unversioned/expo-splash-screen/withAndroidSplashImages";
import { fetchAPI } from "@/lib/fetch";

const SignUp = () => {
  const { isLoaded, signUp, setActive } = useSignUp();
  const [showSuccessModel, setShowSuccessModel] = useState(false);

  const [form, setForm] = React.useState({
    name: "",
    email: "",
    password: "",
  });

  const [verification, setVerification] = useState({
    state: "default",
    error: "",
    code: "",
  });

  const onSignUpPress = async () => {
    if (!isLoaded) return;

    // Start sign-up process using email and password provided
    try {
      await signUp.create({
        emailAddress: form.email,
        password: form.password,
      });

      // Send user an email with verification code
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      // Set 'pendingVerification' to true to display second form
      // and capture OTP code
      setVerification({
        ...verification,
        state: "pending",
      });
    } catch (err: any) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2));
      Alert.alert("Error", err.errors[0].longMessage);
    }
  };

  // Handle submission of verification form
  const onVerifyPress = async () => {
    if (!isLoaded) return;

    try {
      // Use the code the user provided to attempt verification
      const signUpAttempt = await signUp.attemptEmailAddressVerification({
        code: verification.code,
      });

      // If verification was completed, set the session to active
      // and redirect the user
      if (signUpAttempt.status === "complete") {
        // TODO: create a database user!!
        await fetchAPI("/(api)/user", {
          method: "POST",
          body: JSON.stringify({
            name: form.name,
            email: form.email,
            clerkId: signUpAttempt.createdUserId,
          }),
        });
        await setActive({ session: signUpAttempt.createdSessionId });
        setVerification({
          ...verification,
          state: "success",
        });
        // router.replace("/");
      } else {
        // If the status is not complete, check why. User may need to
        // complete further steps.
        console.error(JSON.stringify(signUpAttempt, null, 2));
        setVerification({
          ...verification,
          error: "Verification failed || need help ...",
          state: "failed",
        });
      }
    } catch (err: any) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2));
      setVerification({
        ...verification,
        error: err.errors[0].longMessage,
        state: "failed",
      });
    }
  };

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
            Create your Account
          </Text>
        </View>

        {/* Input Fields */}
        <View className="p-5">
          <InputField
            label="Name"
            placeholder="Enter your name"
            icon={icons.person}
            value={form.name}
            onChangeText={(text) => setForm({ ...form, name: text })}
          />
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
            title="Sign Up"
            className="mt-5"
            onPress={onSignUpPress}
          />
          {/*  ;Button for OAuth */}
          <OAuth />
          {/*  ;Button for OAuth */}
          <Link
            href="/sign-in"
            className="text-center text-xl text-general-200 mt-10"
          >
            <Text className="text-black text-lg font-JakartaRegular">
              Already have an account?{" "}
            </Text>
            <Text className="text-primary-500 text-base font-JakartaRegular">
              Sign In
            </Text>
          </Link>
        </View>
        {/*  verification modules */}
        {/*  verification pending */}
        <ReactNativeModal
          isVisible={verification.state === "pending"}
          onModalHide={() => {
            if (verification.state === "success") setShowSuccessModel(true);
          }}
        >
          <View className="bg-white px-7 py-9 rounded-2xl min-h-[300px]">
            <Text className="text-2xl font-JakartaSemiBold mb-2">
              Verification
            </Text>
            <Text className="font-Jakarta mb-5">
              We've send a verification code to {form.email}
            </Text>
            <InputField
              label="Code"
              icon={icons.lock}
              placeholder="1255"
              value={verification.code}
              keyboardType="numeric"
              onChangeText={(code) =>
                setVerification({ ...verification, code })
              }
            />
            {verification?.error && (
              <Text className="text-red-500 text-sm m-1">
                {verification.error}
              </Text>
            )}
            <CustomButton
              title="verify Email"
              onPress={onVerifyPress}
              className="mt-5 bg-success-500"
            />
          </View>
        </ReactNativeModal>
        {/*  verification success */}
        <ReactNativeModal isVisible={showSuccessModel}>
          <View className="bg-white px-7 py-9 rounded-2xl min-h-[300px]">
            <Image
              source={images.check}
              className="w-[100px] h-[100px] mx-auto my-5"
            />
            <Text className="text-3xl font-JakartaBold text-center">
              Verified
            </Text>
            <Text className="text-base text-gray-400 font-Jakarta text-center ">
              You have successFully verified your account
            </Text>
            <CustomButton
              title="Browse Home"
              onPress={() => {
                setShowSuccessModel(false);
                router.push("/(root)/(tabs)/home");
              }}
              className="mt-5 "
            />
          </View>
        </ReactNativeModal>
      </View>
    </ScrollView>
  );
};

export default SignUp;
