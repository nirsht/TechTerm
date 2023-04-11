import react from "react";
import { Linking, StyleSheet, Text } from "react-native";

interface LinkProps {
  url: string;
  text: string;
}

const Link = ({ url, text }: LinkProps) => {
  return (
    <Text style={styles.link} onPress={() => Linking.openURL(url)}>
      {text}
    </Text>
  );
};

const styles = StyleSheet.create({
  link: {
    color: "#007AFF",
    fontWeight: "600",
    fontSize: 16,
    letterSpacing: 0.5,
    textDecorationLine: "underline",
  },
});

export default Link;
