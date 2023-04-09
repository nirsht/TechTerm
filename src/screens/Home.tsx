import { useNavigation } from "@react-navigation/native";
import react from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../RootStackParam";

type homeScreenProp = StackNavigationProp<RootStackParamList, "Home">;

const HomeScreen = () => {
  const navigation = useNavigation<homeScreenProp>();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>TechTerm</Text>
      <View style={styles.buttons}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Terms")}
        >
          <Text style={styles.text}>Terms</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => Alert.alert("Coming soon!")}
        >
          <Text style={styles.text}>Technologies</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => Alert.alert("Coming soon!")}
        >
          <Text style={styles.text}>Technologies</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => Alert.alert("Coming soon!")}
        >
          <Text style={styles.text}>1 VS 2</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  buttons: {
    alignItems: "center",
    flexBasis: "80%",
    justifyContent: "center",
  },
  title: {
    fontSize: 40,
    top: "5%",
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 18,
    paddingHorizontal: 32,
    borderRadius: 4,
    backgroundColor: "white",
  },
  text: {
    fontSize: 20,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.35,
    color: "royalblue",
  },
});

export default HomeScreen;
