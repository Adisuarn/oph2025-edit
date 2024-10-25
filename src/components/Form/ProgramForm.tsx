// import GeneralForm from "./GeneralForm";
// import apiFunction from "@/components/api";
// import { Status } from "@utils/type";

// const FormikControl: React.FC = async () => {
//   const response = await apiFunction("GET", "/user", {});
//   const userData = response.data;
//   const userForm = await apiFunction(
//     "GET",
//     `/${userData.tag}/${userData.key}/`,
//     {},
//   );
//   console.log(userData);
//   const userReview = await apiFunction(
//     "GET",
//     `/${userData.tag}/${userData.key}/review`,
//      {}
//   )
//   console.log(userForm)
//   console.log(userReview.data)

//   let editFormData = {
//     thainame: userForm.data.data.thainame,
//     tag: 'สายการเรียน',
//     submittedForm: userForm.data?.data.sendForm,
//     members: userForm.data.data.members,
//     ig: userForm.data.data.ig,
//     fb: userForm.data.data.fb,
//     others: userForm.data.data.others,
//     admission: userForm.data.data.admission,
//     courses: userForm.data.data.courses,
//     interests: userForm.data.data,
//     status: userForm.data.data.status,
//     captureimg1: '',
//     descimg1: '',
//     captureimg2: '',
//     descimg2: '',
//     captureimg3: '',
//     descimg3: '',
//   };

//   let review1 = null;

//   if (userReview?.data?.count === 1) {
//     const { count, profile, nick, gen, contact, content } = userReview.data;
  
//     review1 = {
//       count,
//       profile,
//       nick,
//       gen,
//       contact,
//       content
//     };
//   }
//   console.log(review1)
  

//   return (
//     <GeneralForm
//       editFormData={editFormData}
//       review1={review1}
//     />
//   );
// };

// export default FormikControl;
