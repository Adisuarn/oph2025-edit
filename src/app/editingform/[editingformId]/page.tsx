import { redirect } from 'next/navigation'

import apiFunction from '@/components/api'
import ClubForm from '@/components/Form/ClubForm'
import GiftedForm from '@/components/Form/GiftedForm'
import OrganizationsForm from '@/components/Form/OrganizationsForm'
import ProgramForm from '@/components/Form/ProgramForm'
import { Tag } from '@/server/utils/type'

export default async function Form({ params }: { params: { editingformId: string } }) {
  const response = await apiFunction('GET', '/user', {})
  if (response.status === 401) redirect('/')

  if (params.editingformId !== response.data.tag) {
    redirect(`/editingform/${response.data.tag}`)
  }

  return (
    <div>
      {params.editingformId === Tag.CLUB && <ClubForm />}
      {params.editingformId === Tag.ORGANIZATION && <OrganizationsForm />}
      {params.editingformId === Tag.PROGRAM && <ProgramForm />}
      {params.editingformId === Tag.GIFTED && <GiftedForm />}
    </div>
  )
}
