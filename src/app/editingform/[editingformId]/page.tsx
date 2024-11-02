import ClubForm from "@/components/Form/ClubForm";
import OrganizationsForm from "@/components/Form/OrganizationsForm";
import ProgramForm from "@/components/Form/ProgramForm";
import GiftedForm from "@/components/Form/GiftedForm";
import apiFunction from "@/components/api";
import { Tag } from "@/server/utils/type";
import { redirect } from "next/navigation"

export default async function Form({
  params,
}: {
  params: { editingformId: string };
}) {

  const response = await apiFunction("GET", "/user", {});
  if(params.editingformId !== response.data.tag){
    redirect(`/editingform/${response.data.tag}`)
  }

  return (
    <div>
      {params.editingformId === Tag.CLUB && <ClubForm />}
      {params.editingformId === Tag.ORGANIZATION && <OrganizationsForm />}
      {params.editingformId === Tag.PROGRAM && <ProgramForm />}
      {params.editingformId === Tag.GIFTED && <GiftedForm />}
    </div>
  );
}
