import { Link } from "expo-router";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function Index() {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={{ marginTop: 10 }}
        onPress={() => alert("Button Pressed!")}
      >
        <Text>Click me</Text>
      </TouchableOpacity>

      <Link href="/about">Go to About</Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ddd",
  },

  text: {
    color: "blue",
  },
});
