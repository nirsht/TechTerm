import react, { useCallback, useMemo, useState } from "react";
import { sample } from "lodash";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import termsJson from "./../../data/terms.json";
import { Record as RTRecord, String, Static, Array as RTArray } from "runtypes";
import { savePlayerData, usePlayerContext } from "../context/PlayerContext";
import React from "react";
import Tags from "../components/Tags";
import FurtherRead from "../components/FurtherRead";
import PointsAccumulation from "../components/Points";

const Term = RTRecord({
  name: String,
  description: String,
  importance: String,
  topics: RTArray(String),
  article_link: String,
});

type Term = Static<typeof Term>;

const TermsScreen = () => {
  const player = usePlayerContext();
  const unknownTerms = termsJson.filter(
    (term) => !player.knownTerms.includes(term.name)
  );

  const [currentTerm, setCurrentTerm] = useState<Term>(unknownTerms[0]);
  const [userClicked, setUserClicked] = useState(false);

  const correctCallback = useCallback(() => {
    player.knownTerms.push(currentTerm.name);
    savePlayerData(player);
    setUserClicked(true);
  }, [currentTerm, player.knownTerms, unknownTerms]);

  const wrongCallback = useCallback(() => {
    setUserClicked(true);
  }, [currentTerm, player.knownTerms, unknownTerms]);

  const nextCallback = useCallback(() => {
    setCurrentTerm(getSample(unknownTerms));
    setUserClicked(false);
  }, []);

  const points = `${player.knownTerms.length}/${termsJson.length}`;

  return (
    <View style={styles.container}>
      <PointsAccumulation points={points} />
      <View style={styles.gameContainer}>
        <Tags importance={currentTerm.importance} topics={currentTerm.topics} />
        <Text style={styles.term}>{currentTerm.name}</Text>
        {userClicked && (
          <FurtherRead
            description={currentTerm.description}
            articleLink={currentTerm.article_link}
          />
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
        <TouchableOpacity
          style={buttonsStyles.nextButton}
          onPress={nextCallback}
        >
          <Text style={buttonsStyles.buttonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const getSample = (terms: Term[]): Term => {
  return sample(terms) ?? terms[0];
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gameContainer: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: 40,
    paddingTop: "60%",
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
    bottom: 25,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
  },
});

export default TermsScreen;
