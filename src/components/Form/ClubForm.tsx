import apiFunction from '@/components/api'
import GeneralForm from './GeneralForm'

const FormikControl: React.FC = async () => {
  const response = await apiFunction('GET', '/user', {})
  const userData = response.data
  const userForm = await apiFunction('GET', `/${userData.tag}/${userData.key}/`, {})
  const userReview = await apiFunction('GET', `/${userData.tag}/${userData.key}/review`, {})

  console.log(userForm)

  let editFormData = {
    thainame: userForm.data.data.thainame,
    tag: userForm.data.data.tag,
    tagThai: 'ชมรม',
    logo: userForm.data.data.logo,
    sendForm: userForm.data?.data.sendForm,
    members: userForm.data.data.members,
    ig: userForm.data.data.ig,
    fb: userForm.data.data.fb,
    others: userForm.data.data.others,
    text1: userForm.data.data.activities,
    text2: userForm.data.data.benefits,
    text3: userForm.data.data.working,
    status: userForm.data.data.status,
    captureimg1: userForm.data.data.captureimg1,
    descimg1: userForm.data.data.descimg1,
    captureimg2: userForm.data.data.captureimg2,
    descimg2: userForm.data.data.descimg2,
    captureimg3: userForm.data.data.captureimg3,
    descimg3: userForm.data.data.descimg3,
  }

  console.log(editFormData)

  let reviews = userReview.data.data.length
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

  let review1 = {
    count: userReview.data.data[0].count,
    profile: userReview.data.data[0].profile,
    nick: userReview.data.data[0].nick,
    gen: userReview.data.data[0].gen,
    contact: userReview.data.data[0].contact,
    content: userReview.data.data[0].content,
  }

  let review2 = {
    count: userReview.data.data[1]?.count,
    profile: userReview.data.data[1]?.profile,
    nick: userReview.data.data[1]?.nick,
    gen: userReview.data.data[1]?.gen,
    contact: userReview.data.data[1]?.contact,
    content: userReview.data.data[1]?.content,
  }

  let review3 = {
    count: userReview.data.data[2]?.count,
    profile: userReview.data.data[2]?.profile,
    nick: userReview.data.data[2]?.nick,
    gen: userReview.data.data[2]?.gen,
    contact: userReview.data.data[2]?.contact,
    content: userReview.data.data[2]?.content,
  }

  return (
    <GeneralForm
      userData={userData}
      editFormData={editFormData}
      reviews={reviews}
      review1={review1}
      review2={review2}
      review3={review3}
    />
  )
}

export default FormikControl
