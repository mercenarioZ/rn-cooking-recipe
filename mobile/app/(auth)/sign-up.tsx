import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { authStyles } from "@/assets/styles/auth.styles";
import { useRouter } from "expo-router";

const SignUpScreen = () => {
  const router = useRouter();
  return (
    <View style={authStyles.container}>
      {/* redirect to sign in */}
      <TouchableOpacity onPress={() => router.push("/(auth)/sign-in")}>
        <Text style={authStyles.linkText}>
          Already have an account?{" "}
          <Text style={authStyles.link}>Sign in now!</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignUpScreen;
