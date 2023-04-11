import { capitalize } from "lodash";
import react from "react";
import { View, StyleSheet, Text } from "react-native";
import Link from "./Link";

interface FurtherReadProps {
  description: string;
  articleLink: string;
}

const FurtherRead = ({ description, articleLink }: FurtherReadProps) => {
  return (
    <View style={styles.furtherInformationContainer}>
      <View style={styles.descriptionContainer}>
        <Text style={styles.description}>{capitalize(description)}</Text>
      </View>
      {articleLink && <Link url={articleLink} text="Read More" />}
    </View>
  );
};

const styles = StyleSheet.create({
  furtherInformationContainer: {
    gap: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  descriptionContainer: {
    padding: 16,
    backgroundColor: "#fff",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: "80%",
    alignSelf: "center",
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: "#666",
  },
});

export default FurtherRead;
