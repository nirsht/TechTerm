import React, { useContext, useEffect, useState } from "react";
import { createContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

class Player {
  knownTerms: string[];

  constructor() {
    this.knownTerms = [];
  }

  addTerm(term: string): void {
    this.knownTerms.push(term);
  }
}

const loadUserData = async (): Promise<Player | null> => {
  try {
    const serializedUserData = await AsyncStorage.getItem("player");
    if (serializedUserData !== null) {
      const userData: Player = JSON.parse(serializedUserData);
      return userData;
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
  const [player, setPlater] = useState<Player | null>(null);

  useEffect(() => {
    (async () => {
      setPlater(await loadUserData());
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
