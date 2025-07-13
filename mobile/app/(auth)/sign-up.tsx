import { View, Text, TouchableOpacity, Alert } from "react-native";
import React, { useState } from "react";
import { authStyles } from "@/assets/styles/auth.styles";
import { useRouter } from "expo-router";
import { useSignUp } from "@clerk/clerk-expo";
import VerifyEmailScreen from "./verify-email";

const SignUpScreen = () => {
  const router = useRouter();
  const { isLoaded, signUp } = useSignUp();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [hidePassword, setHidePassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [pendingVerification, setPendingVerification] = useState(false);

  const handleSignUp = async () => {
    if (!email || !password) {
      return Alert.alert("Error", "Please fill in all fields.");
    }

    if (password.length < 6) {
      return Alert.alert(
        "Error",
        "Password must be at least 6 characters long."
      );
    }

    if (!isLoaded) return;

    setIsLoading(true);

    try {
      await signUp.create({
        emailAddress: email,
        password,
      });

      await signUp.prepareEmailAddressVerification({
        strategy: "email_code",
      });

      setPendingVerification(true);
    } catch (error: any) {
      Alert.alert(
        "Error",
        error.errors?.[0]?.message || "An error occurred during sign up."
      );
      console.error(JSON.stringify(error, null, 2));
    } finally {
      setIsLoading(false);
    }
  };

  if (pendingVerification) {
    return <VerifyEmailScreen />;
  }

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
