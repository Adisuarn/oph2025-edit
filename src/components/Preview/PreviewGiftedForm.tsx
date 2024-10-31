import PreviewGeneralForm from "./PreviewGeneralForm";
import apiFunction from "@/components/api";
import { Status } from "@utils/type";

const PreviewGiftedForm: React.FC = async () => {
  const response = await apiFunction("GET", "/user", {});
  const userData = response.data;
  const userForm = await apiFunction(
    "GET",
    `/${userData.tag}/${userData.key}/`,
    {},
  );
  console.log(userData);
  const userReview = await apiFunction(
    "GET",
    `/${userData.tag}/${userData.key}/review`,
     {}
  )
  // console.log(userForm)
  // console.log(userReview.data)
  // console.log(userReview.data.data[0])


  let editFormData = {
    thainame: userForm.data.data.thainame,
    tag: userForm.data.data.tag,
    tagThai: 'โครงการพัฒนาความสามารถพิเศษ',
    submittedForm: userForm.data?.data.sendForm,
    members: userForm.data.data.members,
    ig: userForm.data.data.ig,
    fb: userForm.data.data.fb,
    others: userForm.data.data.others,
    text1: userForm.data.data.admissions,
    text2: userForm.data.data.courses,
    text3: userForm.data.data.interests,
    status: userForm.data.data.status,
    captureimg1: userForm.data.data.captureimg1,
    descimg1: userForm.data.data.descimg1,
    captureimg2: userForm.data.data.captureimg2,
    descimg2: userForm.data.data.descimg2,
    captureimg3: userForm.data.data.captureimg3,
    descimg3: userForm.data.data.descimg3,
  };

  
  let review1 = {
    count: userReview.data.data[0].count,
    profile: userReview.data.data[0].profile,
    nick: userReview.data.data[0].nick,
    gen: userReview.data.data[0].gen,
    contact: userReview.data.data[0].contact,
    content: userReview.data.data[0].content,
  };
  
  let review2 = {
    count: userReview.data.data[1].count,
    profile: userReview.data.data[1].profile,
    nick: userReview.data.data[1].nick,
    gen: userReview.data.data[1].gen,
    contact: userReview.data.data[1].contact,
    content: userReview.data.data[1].content,
  };
  
  let review3 = {
    count: userReview.data.data[2].count,
    profile: userReview.data.data[2].profile,
    nick: userReview.data.data[2].nick,
    gen: userReview.data.data[2].gen,
    contact: userReview.data.data[2].contact,
    content: userReview.data.data[2].content,
  };
  
  return (
    <PreviewGeneralForm
      editFormData={editFormData}
      review1={review1}
      review2={review2}
      review3={review3}
    />
  );
};

export default PreviewGiftedForm;
