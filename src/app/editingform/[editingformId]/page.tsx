import Link from "next/link";
import ClubForm from "@/components/Form/ClubForm";
import OrganizationForm from "@/components/Form/OrganizationForm";
import ProgramForm from "@/components/Form/ProgramForm";
import GiftedForm from "@/components/Form/GiftedForm";
import apiFunction from "@/components/api";
import { Status, Tag } from "@/server/utils/type";

export default async function Form({
  params,
}: {
  params: { editingformId: string };
}) {
  const response = await apiFunction("GET", "/user", {});
  // const clubResponse = await apiFunction("GET", "/clubs/ก30927", {})

  const key = response.key 

  return (
    <div>
      {params.editingformId === Tag.CLUB && <ClubForm key={key} />}
      {params.editingformId === Tag.ORGANIZATION && <OrganizationForm key={key} />}
      {params.editingformId === Tag.PROGRAM && <ProgramForm key={key} />}
      {params.editingformId === Tag.GIFTED && <GiftedForm key={key} />}
    </div>
  );
}
