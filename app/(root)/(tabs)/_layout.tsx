import { Tabs } from "expo-router";
import { Image, Text, View } from "react-native";
import { icons, images } from "@/constants";

interface TabIconProps {
  icon: any;
  focused: boolean;
}

export default function Layout() {
  const TabIcon = ({ icon, focused }: TabIconProps) => {
    return (
      <View className="items-center justify-center">
        <View
          className={`p-3 ${
            focused
              ? "bg-gray-800 rounded-full border-2 border-white shadow-lg transform -translate-y-3"
              : ""
          }`}
        >
          <Image
            source={icon}
            className={`w-6 h-6 ${focused ? "tint-white" : "tint-gray-400"}`}
            resizeMode="contain"
          />
        </View>
        {focused && (
          <View className="absolute -bottom-1 w-1 h-1 rounded-full bg-white" />
        )}
      </View>
    );
  };

  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          backgroundColor: "#000000",
          borderTopWidth: 0,
          elevation: 8,
          height: 65,
          paddingBottom: 8,
          paddingTop: 8,
          borderRadius: 20,
          position: "absolute",
          marginBottom: 20,
          marginHorizontal: 20,
          bottom: 0,
          left: 0,
          right: 0,
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: -4,
          },
          shadowOpacity: 0.25,
          shadowRadius: 4,
        },
        tabBarActiveTintColor: "#FFFFFF",
        tabBarInactiveTintColor: "#6B7280",
        tabBarLabelStyle: {
          fontSize: 12,
          fontFamily: "Inter-Medium",
          marginTop: -4,
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon icon={icons.home} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="rides"
        options={{
          title: "Rides",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon icon={icons.list} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="chat"
        options={{
          title: "Chat",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon icon={icons.chat} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon icon={icons.profile} focused={focused} />
          ),
        }}
      />
    </Tabs>
  );
}
