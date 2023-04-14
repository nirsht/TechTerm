import React, { useContext, useEffect, useState } from "react";
import { createContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

class Player {
  knownTerms: string[] = [];
  knownTechnologies: string[] = [];

  constructor(knownTerms?: string[], knownTechnologies?: string[]) {
    if (knownTerms) this.knownTerms = knownTerms;
    if (knownTechnologies) this.knownTechnologies = knownTechnologies;
  }

  getSubject(subject: string): string[] {
    switch (subject) {
      case "terms":
        return this.knownTerms;
      case "technologies":
        return this.knownTechnologies;
      default:
        return [];
    }
  }

  addKnownSubjectRow(subject: string, row: string): void {
    switch (subject) {
      case "terms":
        this.knownTerms.push(row);
        break;
      case "technologies":
        this.knownTechnologies.push(row);
        break;
      default:
        break;
    }
  }
}

const loadPlayerData = async (): Promise<Player | null> => {
  try {
    const serializedUserData = await AsyncStorage.getItem("player");
    if (serializedUserData !== null) {
      const userData: Player = JSON.parse(serializedUserData);
      return new Player(userData.knownTerms, userData.knownTechnologies);
    }
    return null;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const playerStateContext = createContext<Player | null>(null);

export const PlayerProvider: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) => {
  const [player, setPlater] = useState<Player>(new Player());

  useEffect(() => {
    (async () => {
      const playerData = await loadPlayerData();
      if (playerData) {
        setPlater(playerData);
      }
    })();
  }, []);
  return (
    <playerStateContext.Provider value={player}>
      {children}
    </playerStateContext.Provider>
  );
};

export const savePlayerData = async (player: Player) => {
  try {
    const serializedUserData = JSON.stringify(player);
    await AsyncStorage.setItem("player", serializedUserData);
  } catch (error) {
    console.log(error);
  }
};

export const usePlayerContext = (): Player =>
  useContext(playerStateContext) ?? new Player();
