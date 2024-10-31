
import apiFunction from "@/components/api";
import Forms from "@/components/Forms"

const FormikControl: React.FC = async () => {

  const response = await apiFunction("GET", "/user", {});
  let dataRecord = {
    email: response.data.email,
    tag: '',
    key: ''
  }

  return (
    <Forms dataRecord={dataRecord} />
    );
}

export default FormikControl
