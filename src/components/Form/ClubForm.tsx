import apiFunction from '@/components/api'
import GeneralForm from './GeneralForm'
import { count } from 'console'

const FormikControl: React.FC = async () => {
  const response = await apiFunction('GET', '/user', {})
  const userData = response.data
  const userForm = await apiFunction('GET', `/${userData.tag}/${userData.key}/`, {})
  const userReview = await apiFunction('GET', `/${userData.tag}/${userData.key}/review`, {})

  const data = userForm.data

  const editFormData = {
    thainame: data.thainame,
    tag: data.tag,
    tagThai: 'ชมรม',
    logo: data.logo,
    sendForm: data.sendForm,
    members: data.members,
    ig: data.ig,
    fb: data.fb,
    others: data.others,
    text1: data.activities,
    text2: data.position,
    text3: data.working,
    status: data.status,
    captureimg1: data.captureimg1,
    descimg1: data.descimg1,
    captureimg2: data.captureimg2,
    descimg2: data.descimg2,
    captureimg3: data.captureimg3,
    descimg3: data.descimg3,
  }
  console.log(editFormData.logo)
  // let reviews = userReview.data.data.map((review: any, index: number) => ({
  //   count: review.count,

  //   profile: review.profile,
  //   nick: review.nick,
  //   gen: review.gen,
  //   contact: review.contact,
  //   content: review.content,
  // }));

  // let review1 = reviews[0];
  // let review2 = reviews[1];
  // let review3 = reviews[2];

  const reviews = userReview.data.data.map((review: any, index: number) => ({
count: review.count,
profile: review.profile,
nick: review.nick,
gen: review.gen,
contact: review.contact,
content: review.content,
  })).slice(0,3)

  // let review1 = {
  //   count: userReview.data.data[0].count,
  //   profile: userReview.data.data[0].profile,
  //   nick: userReview.data.data[0].nick,
  //   gen: userReview.data.data[0].gen,
  //   contact: userReview.data.data[0].contact,
  //   content: userReview.data.data[0].content,
  // }

  // let review2 = {
  //   count: userReview.data.data[1]?.count,
  //   profile: userReview.data.data[1]?.profile,
  //   nick: userReview.data.data[1]?.nick,
  //   gen: userReview.data.data[1]?.gen,
  //   contact: userReview.data.data[1]?.contact,
  //   content: userReview.data.data[1]?.content,
  // }

  // let review3 = {
  //   count: userReview.data.data[2]?.count,
  //   profile: userReview.data.data[2]?.profile,
  //   nick: userReview.data.data[2]?.nick,
  //   gen: userReview.data.data[2]?.gen,
  //   contact: userReview.data.data[2]?.contact,
  //   content: userReview.data.data[2]?.content,
  // }

  return (
    <GeneralForm
      userData={userData}
      editFormData={editFormData}
      reviews={userReview.data.data.length}
      review1={reviews[0]}
      review2={reviews[1]}
      review3={reviews[2]}
    />
  )
}

export default FormikControl
