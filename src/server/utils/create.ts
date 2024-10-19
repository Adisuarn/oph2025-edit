import { createOrganization } from "@modules/organizations/organizations.controller";
import { createGifted } from "@modules/gifted/gifted.controller";
import { createProgram } from "@modules/programs/programs.controller";
import { createClub } from "@modules/clubs/clubs.controller";
import { AllData } from "@libs/data";

export const createEverything = async () => {
  const createdOrganizations = await Promise.all(
    Object.keys(AllData.Organizations).map(async (key) => {
      const organization = await createOrganization({
        email: "",
        key: key as keyof typeof AllData.Organizations,
        tag: "organization",
      });
      return organization.data.thainame;
    })
  )
  const createdClubs = await Promise.all(
    Object.keys(AllData.Clubs).map(async (key) => {
      const club = await createClub({
        email: "",
        key: key as keyof typeof AllData.Clubs,
        tag: "club",
      });
      return club.data.thainame;
    })
  )
  const createdPrograms = await Promise.all(
    Object.keys(AllData.Programs).map(async (key) => {
      const program = await createProgram({
        email: "",
        key: key as keyof typeof AllData.Programs,
        tag: "program",
      });
      return program.data.thainame;
    })
  )
  const createdGifteds = await Promise.all(
    Object.keys(AllData.Gifted).map(async (key) => {
      const gifted = await createGifted({
        email: "",
        key: key as keyof typeof AllData.Gifted,
        tag: "gifted",
      });
      return gifted.data.thainame;
    })
  )
  return {
    Organization: createdOrganizations,
    Club: createdClubs,
    Program: createdPrograms,
    Gifted: createdGifteds,
  }
}
