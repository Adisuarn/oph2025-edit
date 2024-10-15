import { AllData } from "@libs/data"

export type Organization = {
  email: string,
  tag: 'organization',
  key: keyof typeof AllData.Organizations
}

export type Club = {
  email: string,
  tag: 'club',
  key: keyof typeof AllData.Clubs
}

export type Program = {
  email: string,
  tag: 'program',
  key: keyof typeof AllData.Programs
}
