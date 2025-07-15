import {
  View,
  Text,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { useSignUp } from "@clerk/clerk-expo";
import { authStyles } from "@/assets/styles/auth.styles";
import { Image } from "expo-image";
import { COLORS } from "@/constants/colors";

interface VerifyEmailScreenProps {
  email?: string;
  onBack: () => void;
}

const VerifyEmailScreen = ({ email, onBack }: VerifyEmailScreenProps) => {
  const { isLoaded, signUp, setActive } = useSignUp();
  const [code, setCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleVerifyEmail = async () => {
    if (!isLoaded) return;

    setIsLoading(true);

    try {
      const signUpAttempt = await signUp.attemptEmailAddressVerification({
        code,
      });

      if (signUpAttempt.status === "complete") {
        // Email verification successful, set the user as active
        await setActive({ session: signUpAttempt.createdSessionId });
      } else {
        // if the status is not complete, handle accordingly
        Alert.alert(
          "Verification Failed",
          "Please check your code and try again."
        );
        console.error("Verification attempt was not complete:", signUpAttempt);
      }
    } catch (err: any) {
      Alert.alert(
        "Error when verifying",
        err.errors?.[0]?.longMessage || "Verification failed"
      );
      console.error(JSON.stringify(err, null, 2));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={authStyles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={authStyles.keyboardView}
        keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
      >
        <ScrollView
          contentContainerStyle={authStyles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Image Container */}
          <View style={authStyles.imageContainer}>
            <Image
              source={require("../../assets/images/food.png")}
              style={authStyles.image}
              contentFit="contain"
            />
          </View>

          {/* Information */}
          <View>
            <Text style={authStyles.title}>Verify your email</Text>
            <Text style={authStyles.subtitle}>
              We&apos;ve sent a verification code to your email:{" "}
              <Text
                style={{
                  fontWeight: "bold",
                  fontSize: 18,
                }}
              >
                {email}
              </Text>
            </Text>
          </View>

          {/* Verification Code Input */}
          <View style={authStyles.inputContainer}>
            <TextInput
              style={authStyles.textInput}
              placeholder="Enter verification code"
              placeholderTextColor={COLORS.textLight}
              value={code}
              onChangeText={setCode}
              keyboardType="number-pad"
              autoCapitalize="none"
            />
          </View>

          {/* Verify Button */}
          <TouchableOpacity
            style={[
              authStyles.authButton,
              isLoading && authStyles.buttonDisabled,
            ]}
            onPress={handleVerifyEmail}
            disabled={isLoading}
            activeOpacity={0.7}
          >
            <Text style={authStyles.buttonText}>
              {isLoading ? "Verifying..." : "Verify"}
            </Text>
          </TouchableOpacity>
          
          {/* onBack function will set the pending verify status to false -> back to the sign up screen */}
          <TouchableOpacity
            style={authStyles.linkContainer}
            onPress={onBack}
          >
            <Text style={authStyles.linkText}>
              <Text style={authStyles.link}>Back to sign up</Text>
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default VerifyEmailScreen;
