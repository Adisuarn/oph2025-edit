import { AllData } from '@libs/data'

export type Club = {
  email: string
  tag: 'clubs'
  key: keyof typeof AllData.Clubs
}

export type Organization = {
  email: string
  tag: 'organizations'
  key: keyof typeof AllData.Organizations
}

export type Gifted = {
  email: string
  tag: 'gifted'
  key: keyof typeof AllData.Gifted
}

export type Program = {
  email: string
  tag: 'programs'
  key: keyof typeof AllData.Programs
}

export enum Tag {
  CLUB = 'clubs',
  ORGANIZATION = 'organizations',
  GIFTED = 'gifted',
  PROGRAM = 'programs',
}

export enum Status {
  APPROVED = 'approved',
  PENDING = 'pending',
  REJECTED = 'rejected',
}

export interface ReviewData {
  profile: File | undefined
  name: string
  nick: string
  gen: string
  contact: string
  content: string
}
