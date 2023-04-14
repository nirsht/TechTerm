import react from "react";
import technologiesJson from "./../../data/technologies.json";
import React from "react";
import TemplateScreen from "./Template";

const TechnologiesScreen = () => {
  return <TemplateScreen rows={technologiesJson} subject="technologies" />;
};

export default TechnologiesScreen;
