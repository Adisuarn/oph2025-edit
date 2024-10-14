import Link from "next/link";
import ClubForm from "@/components/Form/ClubForm";
import OrganizationForm from "@/components/Form/OrganizationForm";
import ProgrammeForm from "@/components/Form/ProgrammeForm";
import GiftedForm from "@/components/Form/GiftedForm";

export default function Form({
  params,
}: {
  params: { editingformId: string };
}) {
  return (
    <div>
      {params.editingformId === "clubs" && <ClubForm />}
      {params.editingformId === "organization" && <OrganizationForm />}
      {params.editingformId === "programme" && <ProgrammeForm />}
      {params.editingformId === "gifted" && <GiftedForm />}

      <Link href={"/editingform"}>Go back to editing form page</Link>
    </div>
  );
}
