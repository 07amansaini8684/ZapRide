import { Link, Stack } from "expo-router";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";

export default function NotFoundScreen() {
  return (
    <SafeAreaView>
      <Stack.Screen options={{ title: "Oops!" }} />
      <View>
        <Link href="/">
          <Text>Go back home</Text>
        </Link>
      </View>
    </SafeAreaView>
  );
}
