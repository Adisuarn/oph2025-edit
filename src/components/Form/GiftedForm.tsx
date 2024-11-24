import apiFunction from '@/components/api'
import GeneralForm from './GeneralForm'

const FormikControl: React.FC = async () => {
  const { data: userData } = await apiFunction('GET', '/user', {})
  const { data: userFormData } = await apiFunction('GET', `/${userData.tag}/${userData.key}/`, {})
  const { data: userReviewData } = await apiFunction('GET', `/${userData.tag}/${userData.key}/review`, {})

  const data = userFormData.data

  const editFormData = {
    error: data.error,
    thainame: data.thainame,
    tag: data.tag,
    tagThai: 'โครงการพัฒนาความสามารถพิเศษ',
    members: data.members,
    ig: data.ig,
    fb: data.fb,
    others: data.others,
    text1: data.admissions,
    text2: data.courses,
    text3: data.interests,
    status: data.status,
    captureimg1: data.captureimg1,
    descimg1: data.descimg1,
    captureimg2: data.captureimg2,
    descimg2: data.descimg2,
    captureimg3: data.captureimg3,
    descimg3: data.descimg3,
  }
  
  const reviews = userReviewData.data.map((review: any) => ({
    count: review.count,
    profile: review.profile,
    nick: review.nick,
    gen: review.gen,
    contact: review.contact,
    content: review.content,
  }))

  const reviewAmount = reviews.length
  
  return (
    <GeneralForm
      userData={userData}
      editFormData={editFormData}
      reviews={reviewAmount}
      review1={reviews[0]}
      review2={reviews[1]}
      review3={reviews[2]}
    />
  )
}

export default FormikControl
