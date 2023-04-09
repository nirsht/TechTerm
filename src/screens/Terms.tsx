import react, { useCallback, useEffect, useMemo, useState } from "react";
import { sample } from "lodash";
import {
  View,
  Text,
  StyleSheet,
  Button,
  ScrollView,
  TouchableOpacity,
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

  const correctCallback = useCallback(() => {
    player.knownTerms.push(currentTerm.Name);
    setCurrentTerm(getSample(unknownTerms));
  }, [currentTerm, player.knownTerms, unknownTerms]);

  const wrongCallback = useCallback(() => {
    player.knownTerms.push(currentTerm.Name);
    setCurrentTerm(getSample(unknownTerms));
  }, [currentTerm, player.knownTerms, unknownTerms]);

  return (
    <View style={styles.container}>
      <Text style={styles.term}>{currentTerm.Name}</Text>
      <View style={styles.buttons}>
        <TouchableOpacity style={styles.wrongButton} onPress={wrongCallback} />

        <TouchableOpacity
          style={styles.correctButton}
          onPress={correctCallback}
        />
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
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    gap: 40,
  },
  buttons: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 20,
  },
  correctButton: {
    backgroundColor: "green",
    alignItems: "center",
    justifyContent: "center",
    padding: 30,
    borderRadius: 100,
  },
  wrongButton: {
    backgroundColor: "red",
    alignItems: "center",
    justifyContent: "center",
    padding: 30,
    borderRadius: 100,
  },
  term: {
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default TermsScreen;
