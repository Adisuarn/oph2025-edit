import GeneralForm from "./GeneralForm";
import apiFunction from "@/components/api";
import { Status } from "@utils/type";

const FormikControl: React.FC = async () => {
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
  console.log(userForm)
  console.log(userReview.data)

  let editFormData = {
    thainame: userForm.data.data.thainame,
    tag: 'โครงการพัฒนาความสามารถพิเศษ',
    submittedForm: userForm.data?.data.sendForm,
    members: userForm.data.data.members,
    ig: userForm.data.data.ig,
    fb: userForm.data.data.fb,
    others: userForm.data.data.others,
    admissions: userForm.data.data.admissions,
    courses: userForm.data.data.courses,
    interests: userForm.data.data.interests,
    status: userForm.data.data.status,
    captureimg1: userForm.data.data.captureimg1,
    descimg1: '',
    captureimg2: userForm.data.data.captureimg2,
    descimg2: '',
    captureimg3: userForm.data.data.captureimg3,
    descimg3: '',
  };

  let review1 = {};
  if (userReview.data.count === 1) {
  review1 = {
    count1: userReview.data.count,
    profile1: userReview.data.profile,  
    nick1: userReview.data.nick,      
    gen1: userReview.data.gen,
    contact1: userReview.data.contact,
    content1: userReview.data.content,
  };
}
console.log(review1)
  

  return (
    <GeneralForm
      editFormData={editFormData}
      review1={review1}
    />
  );
};

export default FormikControl;
