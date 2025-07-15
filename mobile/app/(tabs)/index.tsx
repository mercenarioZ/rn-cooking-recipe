import { View, ScrollView, RefreshControl } from "react-native";
import React, { useState } from "react";
import { homeStyles } from "@/assets/styles/home.styles";
import { COLORS } from "@/constants/colors";
import { Image } from "expo-image";

const HomeScreen = () => {
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);

    // Simulate a network request
    setTimeout(() => {
      setRefreshing(false);
    }, 3000);
  };

  return (
    <View style={homeStyles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={homeStyles.scrollContent}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={COLORS.primary}
          />
        }
      >
        <View style={homeStyles.welcomeSection}>
          <Image
            source={require("@/assets/images/ice-cream.png")}
            style={{
              width: 100,
              height: 100,
            }}
          />
          <Image
            source={require("@/assets/images/food2.png")}
            style={{
              width: 100,
              height: 100,
            }}
          />
          <Image
            source={require("@/assets/images/baker.png")}
            style={{
              width: 100,
              height: 100,
            }}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default HomeScreen;
