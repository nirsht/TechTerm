import React from "react";
import { View, Text, StyleSheet } from "react-native";

const PointsAccumulation = ({ points }: { points: string }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.points}>{points}</Text>
      <Text style={styles.label}>KNOWN TERMS</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#E0E0E0",
    borderRadius: 8,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  points: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#aaa",
    textTransform: "uppercase",
  },
});

export default PointsAccumulation;
