import react, { useCallback, useState } from "react";
import { sample } from "lodash";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Record as RTRecord, String, Static, Array as RTArray } from "runtypes";
import { savePlayerData, usePlayerContext } from "../context/PlayerContext";
import React from "react";
import Tags from "../components/Tags";
import FurtherRead from "../components/FurtherRead";
import PointsAccumulation from "../components/Points";

const Row = RTRecord({
  name: String,
  description: String,
  importance: String,
  topics: RTArray(String),
  article_link: String,
});

type Row = Static<typeof Row>;

interface TemplateScreenProps {
  rows: Row[];
  subject: string;
}

const TemplateScreen = ({ rows, subject }: TemplateScreenProps) => {
  const player = usePlayerContext();
  const unknownRows = rows.filter(
    (row) => !player.getSubject(subject).includes(row.name)
  );

  const [currentRow, setCurrentRow] = useState<Row>(unknownRows[0]);
  const [userClicked, setUserClicked] = useState(false);

  const correctCallback = useCallback(() => {
    player.addKnownSubjectRow(subject, currentRow.name);
    savePlayerData(player);
    setUserClicked(true);
  }, [currentRow.name, subject, unknownRows]);

  const wrongCallback = useCallback(() => {
    setUserClicked(true);
  }, []);

  const nextCallback = useCallback(() => {
    setCurrentRow(getSample(unknownRows));
    setUserClicked(false);
  }, [unknownRows]);

  const points = `${player.getSubject(subject).length}/${rows.length}`;

  return (
    <View style={styles.container}>
      <PointsAccumulation
        points={points}
        text={`KNOWN ${subject.toUpperCase()}`}
      />
      <View style={styles.gameContainer}>
        <Tags importance={currentRow.importance} topics={currentRow.topics} />
        <Text style={styles.text}>{currentRow.name}</Text>
        {userClicked && (
          <FurtherRead
            description={currentRow.description}
            articleLink={currentRow.article_link}
          />
        )}
        {!userClicked && (
          <View style={buttonsStyles.container}>
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

const getSample = (rows: Row[]): Row => {
  return sample(rows) ?? rows[0];
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
  text: {
    fontSize: 20,
    fontWeight: "bold",
  },
});

const buttonsStyles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    paddingHorizontal: 100,
    gap: 20,
  },
  knowButton: {
    backgroundColor: "#4CAF50",
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: 8,
  },
  dontKnowButton: {
    backgroundColor: "#F44336",
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: 8,
  },
  nextButton: {
    backgroundColor: "#3498db",
    paddingVertical: 12,
    borderRadius: 25,
    width: "85%",
    position: "absolute",
    bottom: 20,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
  },
});

export default TemplateScreen;
