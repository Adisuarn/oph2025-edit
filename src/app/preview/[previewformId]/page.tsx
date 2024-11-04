import Link from 'next/link'

import PreviewClubForm from '@/components/Preview/PreviewClubForm'
import PreviewGiftedForm from '@/components/Preview/PreviewGiftedForm'
import PreviewOrganizationForm from '@/components/Preview/PreviewOrganizationForm'
import PreviewProgramForm from '@/components/Preview/PreviewProgramForm'
import { Status, Tag } from '@/server/utils/type'

export default function Form({ params }: { params: { previewformId: string } }) {
  return (
    <div>
      {params.previewformId === Tag.CLUB && <PreviewClubForm />}
      {params.previewformId === Tag.ORGANIZATION && <PreviewOrganizationForm />}
      {params.previewformId === Tag.PROGRAM && <PreviewProgramForm />}
      {params.previewformId === Tag.GIFTED && <PreviewGiftedForm />}
    </div>
  )
}
