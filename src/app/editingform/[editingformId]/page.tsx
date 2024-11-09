import { redirect } from 'next/navigation'

import apiFunction from '@/components/api'
import ClubForm from '@/components/Form/ClubForm'
import GiftedForm from '@/components/Form/GiftedForm'
import OrganizationsForm from '@/components/Form/OrganizationsForm'
import ProgramForm from '@/components/Form/ProgramForm'
import { Tag, Status } from '@/server/utils/type'

export default async function Form({ params }: { params: { editingformId: string } }) {
  const response = await apiFunction('GET', '/user', {})
  if (response.status === 401) redirect('/')
  const { tag, key } = response.data
  const userForm = await apiFunction('GET', `/${tag}/${key}/`, {})
  const { status } = userForm.data.data
  if (status === Status.APPROVED) redirect('/')
  if (params.editingformId !== tag) {
    redirect(`/editingform/${tag}`)
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
