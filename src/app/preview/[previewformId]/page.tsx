import Link from "next/link";
import PreviewClubForm from "@/components/Preview/PreviewClubForm";
import PreviewOrganizationForm from "@/components/Preview/PreviewOrganizationForm";
import PreviewProgrammeForm from "@/components/Preview/PreviewProgrammeForm";
import PreviewGiftedForm from "@/components/Preview/PreviewGiftedForm";

export default function Form({
  params,
}: {
  params: { previewformId: string };
}) {
  return (
    <div>
        <Link href='/account'>back to account page</Link>
      {params.previewformId === "clubs" && <PreviewClubForm />}
      {params.previewformId === "organization" && <PreviewOrganizationForm />}
      {params.previewformId === "programme" && <PreviewProgrammeForm />}
      {params.previewformId === "gifted" && <PreviewGiftedForm />}
    </div>
  );
}
