import { AllData } from "@libs/data"

export type Club = {
  email: string;
  tag: "club";
  key: keyof typeof AllData.Clubs;
};

export type Organization = {
  email: string,
  tag: 'organization',
  key: "TUCMC" | "TUSC" | "AIC" | "TUPRO"
}

export type Gifted = {
  email: string,
  tag: 'gifted',
  key: "gifted-math" | "gifted-science" | "gifted-english" | "gifted-thai"
}
