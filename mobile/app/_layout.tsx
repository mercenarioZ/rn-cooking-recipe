import SafeView from "@/components/SafeView";
import { ClerkProvider } from "@clerk/clerk-expo";
import { tokenCache } from "@clerk/clerk-expo/token-cache";
import { Slot } from "expo-router";

export default function RootLayout() {
  return (
    <ClerkProvider tokenCache={tokenCache}>
      <SafeView>
        <Slot />
      </SafeView>
    </ClerkProvider>
  );
}
