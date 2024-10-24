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
  // const userReview = await apiFunction(
  //   "GET",
  //   `/${userData.tag}/${userData.key}/${userData.}`,
  //    {}
  // )

  const submittedForm = userForm.data?.data.sendForm;
  const checked = (userForm.data.data.status = Status.PENDING) ? false : true;
  const approved = (userForm.data.data.status = Status.APPROVED) ? true : false;

  const name = userForm.data.data.thainame;
  const status = userForm.data.data.status;
  const members = userForm.data.data.members;
  const tag = 'โครงการพัฒนาความสามารถพิเศษ';
  const ig = userForm.data.data.ig;
  const fb = userForm.data.data.fb;
  const others = userForm.data.data.others;

  let editFormData = {
    members: '',
    ig: '',
    fb: '',
    others: '',
    admission: '',
    courses: '',
    interests: '',
    captureimg1: '',
    descimg1: '',
    captureimg2: '',
    descimg2: '',
    captureimg3: '',
    descimg3: '',
  };

  let review = {

  }

  return (
    <GeneralForm
      name={name}
      status={status}
      members={members}
      tag={tag}
      ig={ig}
      fb={fb}
      others={others}
      submittedForm={submittedForm}
      checked={checked}
      approved={approved}
      editFormData={editFormData}
    />
  );
};

export default FormikControl;
