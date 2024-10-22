import Link from "next/link";
import ClubForm from "@/components/Form/ClubForm";
import OrganizationForm from "@/components/Form/OrganizationForm";
import ProgrammeForm from "@/components/Form/ProgrammeForm";
import GiftedForm from "@/components/Form/GiftedForm";
import apiFunction from "@/components/api";

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
      {params.editingformId === "clubs" && <ClubForm key={key} />}
      {params.editingformId === "organization" && <OrganizationForm key={key} />}
      {params.editingformId === "programme" && <ProgrammeForm key={key} />}
      {params.editingformId === "gifted" && <GiftedForm key={key} />}
    </div>
  );
}
