import apiFunction from "@/components/api";
import GeneralForm from "./GeneralForm";

const FormikControl: React.FC = async () => {
  const response = await apiFunction("GET", "/user", {});
  const userData = response.data;
  const userForm = await apiFunction(
    "GET",
    `/${userData.tag}/${userData.key}/`,
    {},
  );
  const userReview = await apiFunction(
    "GET",
    `/${userData.tag}/${userData.key}/review`,
    {},
  );

  const data = userForm.data.data;
  let editFormData = {
    thainame: data.thainame,
    tag: data.tag,
    tagThai: "โครงการพัฒนาความสามารถพิเศษ",
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
  };
  const reviews = userReview.data.data
    .map((review: any, index: number) => ({
      count: review.count,
      profile: review.profile,
      nick: review.nick,
      gen: review.gen,
      contact: review.contact,
      content: review.content,
    }))
    .slice(0, 3);
  return (
    <GeneralForm
      userData={userData}
      editFormData={editFormData}
      reviews={userReview.data.data.length}
      review1={reviews[0]}
      review2={reviews[1]}
      review3={reviews[2]}
    />
  );
};

export default FormikControl;
