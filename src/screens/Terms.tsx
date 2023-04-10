import react, { useCallback, useEffect, useMemo, useState } from "react";
import { sample } from "lodash";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Linking,
} from "react-native";
import termsJson from "./../../data/terms.json";
import { Record as RTRecord, String, Array as RTArray, Static } from "runtypes";
import { usePlayerContext } from "../context/PlayerContext";

const Term = RTRecord({
  Name: String,
  Description: String,
  Importance: String,
  Topics: String,
  Article: String,
});

type Term = Static<typeof Term>;

const TermsScreen = () => {
  const player = usePlayerContext();
  const unknownTerms = useMemo(
    () => termsJson.filter((term) => !player.knownTerms.includes(term.Name)),
    [player.knownTerms]
  );

  const [currentTerm, setCurrentTerm] = useState<Term>(unknownTerms[0]);
  const [userClicked, setUserClicked] = useState(false);

  const correctCallback = useCallback(() => {
    player.knownTerms.push(currentTerm.Name);
    setUserClicked(true);
  }, [currentTerm, player.knownTerms, unknownTerms]);

  const wrongCallback = useCallback(() => {
    setUserClicked(true);
  }, [currentTerm, player.knownTerms, unknownTerms]);

  const nextCallback = useCallback(() => {
    setCurrentTerm(getSample(unknownTerms));
    setUserClicked(false);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.tagsContainer}>
        <View style={styles.levelContainer}>
          <Text style={styles.levelText}>
            Importance: {currentTerm.Importance}
          </Text>
        </View>
        {currentTerm.Topics.split(",").map((topic) => (
          <View style={styles.levelContainer}>
            <Text style={styles.levelText}>{topic}</Text>
          </View>
        ))}
      </View>
      <Text style={styles.term}>{currentTerm.Name}</Text>
      {userClicked && (
        <View style={styles.furtherInformationContainer}>
          <View style={styles.descriptionContainer}>
            <Text style={styles.description}>{currentTerm.Description}</Text>
          </View>
          {currentTerm.Article && (
            <Text
              style={styles.link}
              onPress={() => Linking.openURL(currentTerm.Article)}
            >
              Interesting article
            </Text>
          )}
        </View>
      )}
      {!userClicked && (
        <View style={styles.buttons}>
          <TouchableOpacity
            onPress={wrongCallback}
            style={buttonsStyles.dontKnowButton}
          >
            <Text style={buttonsStyles.buttonText}>I don't know it</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={correctCallback}
            style={buttonsStyles.knowButton}
          >
            <Text style={buttonsStyles.buttonText}>I know it</Text>
          </TouchableOpacity>
        </View>
      )}
      <TouchableOpacity style={buttonsStyles.nextButton} onPress={nextCallback}>
        <Text style={buttonsStyles.buttonText}>Next</Text>
      </TouchableOpacity>
    </View>
  );
};

const getSample = (terms: Term[]): Term => {
  return sample(terms) ?? terms[0];
};

const gap = 8;

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
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: 40,
    paddingTop: "60%",
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
  furtherInformationContainer: {
    gap: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  buttons: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 20,
  },
  term: {
    fontSize: 20,
    fontWeight: "bold",
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: "#666",
  },
  link: {
    color: "#007AFF",
    fontWeight: "600",
    fontSize: 16,
    letterSpacing: 0.5,
    textDecorationLine: "underline",
  },
});

const buttonsStyles = StyleSheet.create({
  knowButton: {
    backgroundColor: "#4CAF50",
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 8,
    marginTop: 16,
    flexWrap: "nowrap",
  },
  dontKnowButton: {
    backgroundColor: "#F44336",
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 8,
    marginTop: 16,
  },
  nextButton: {
    backgroundColor: "#3498db",
    paddingVertical: 12,
    borderRadius: 25,
    width: "90%",
    position: "absolute",
    bottom: 80,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
  },
});

export default TermsScreen;
