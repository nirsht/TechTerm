import react from "react";
import { View, StyleSheet, Text } from "react-native";

interface TagsProps {
  importance: string;
  topics: string[];
}
const Tags = ({ importance, topics }: TagsProps) => {
  return (
    <View style={styles.tagsContainer}>
      <View style={styles.levelContainer}>
        <Text style={styles.levelText}>Importance: {importance}</Text>
      </View>
      {topics.map((topic, index) => (
        <View style={styles.levelContainer} key={index}>
          <Text style={styles.levelText}>{topic}</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  tagsContainer: {
    flexDirection: "row",
    position: "absolute",
    gap: 10,
    top: 20,
    left: 20,
    right: 20,
    flexWrap: "wrap",
  },
  levelContainer: {
    paddingHorizontal: 14,
    backgroundColor: "#007AFF",
    paddingVertical: 6,
    borderRadius: 8,
  },
  levelText: {
    color: "#FFFFFF",
    fontWeight: "600",
    fontSize: 16,
    letterSpacing: 0.5,
  },
});

export default Tags;
