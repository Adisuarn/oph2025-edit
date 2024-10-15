import { AllData } from "@libs/data"

export type Organization = {
  email: string,
  tag: 'organization',
  key: "TUCMC" | "TUSC" | "AIC" | "TUPRO"
}

export type Club = {
  email: string,
  tag: 'club',
  key: keyof typeof AllData.Clubs
}
