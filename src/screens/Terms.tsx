import react from "react";
import termsJson from "./../../data/terms.json";
import React from "react";
import TemplateScreen from "./Template";

const TermsScreen = () => {
  return <TemplateScreen rows={termsJson} subject="terms" />;
};

export default TermsScreen;
