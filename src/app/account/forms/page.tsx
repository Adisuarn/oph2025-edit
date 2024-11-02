
import apiFunction from "@/components/api";
import Forms from "@/components/Forms"
import { redirect } from "next/navigation";

const FormikControl: React.FC = async () => {
  const response = await apiFunction("GET", "/user", {});
  switch(response.status) {
    case 401:
      redirect('/')
    case 500:
      redirect('/error/500')
  }

  const { tag, key } = response.data;
  if(tag !== '' || key !== '') redirect('/')

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
