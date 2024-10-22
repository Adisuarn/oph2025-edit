import GeneralForm from "./GeneralForm";
import apiFunction from "@/components/api";

const FormikControl: React.FC = async () => {

  const response = await apiFunction("GET", "/user", {});
  const userData = response.data;
  const userForm = await apiFunction("GET", `/${userData.tag}/${userData.key}/`, {});
  console.log(userForm.data.data.ig)

  const name = userForm.data.data.thainame
  const status = userForm.data.data.status
  const members = userForm.data.data.members
  const ig = userForm.data.data.ig
  const fb = userForm.data.data.fb
  const others = userForm.data.data.others

  return (
    <GeneralForm name={name} status={status} members={members} ig={ig} fb={fb} others={others} />
    );
}

export default FormikControl