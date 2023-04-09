import React, { useContext } from "react";
import { createContext } from "react";

class Player {
  knownTerms: string[];

  constructor() {
    this.knownTerms = [];
  }

  addTerm(term: string): void {
    this.knownTerms.push(term);
  }
}

export const playerStateContext = createContext(new Player());

export const PlayerProvider: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) => {
  return (
    <playerStateContext.Provider value={new Player()}>
      {children}
    </playerStateContext.Provider>
  );
};

export const usePlayerContext = (): Player => useContext(playerStateContext);
