// "use client";

// import { Formik, Form, Field, ErrorMessage } from "Formik";
// import * as Yup from "yup";
// import { getUser } from '@/server/middlewares/derive'
// import { redirect } from 'next/navigation'

// const FormikControl = async () => {
//   const user = await getUser()
//   if(!user.success){
//     redirect('/')
//   }

//   const radioOptions = [
//     { key: "สายการเรียน", value: "rOption1" },
//     { key: "ชมรม", value: "rOption2" },
//     { key: "โครงการพัฒนาความสามารถ", value: "rOption3" },
//     { key: "องค์กรนักเรียน", value: "rOption4" },
//   ];

//   const getSelectOptions = (radioOption: string) => {
//     switch (radioOption) {
//       case "rOption1":
//         return [
//           { key: "กรุณาเลือก", value: "" },
//           { key: "วิทยาศาสตร์-คณิตศาสตร์", value: "Option1sP" },
//           { key: "ภาษา-คณิตศาสตร์", value: "Option2sP" },
//           { key: "ภาษา-ภาษาฝรั่งเศส", value: "Option3sP" },
//           { key: "ภาษา-ภาษาเยอรมัน", value: "Option4sP" },
//           { key: "ภาษา-ภาษาญี่ปุ่น", value: "Option5sP" },
//           { key: "ภาษา-ภาษาจีน", value: "Option6sP" },
//           { key: "ภาษา-ภาษาสเปน", value: "Option7sP" },
//           { key: "ภาษา-ภาษาเกาหลี", value: "Option8sP" },
//         ];
//       case "rOption2":
//         return [
//           { key: "กรุณาเลือก", value: "" },
//           { key: "ชมรม", value: "Option1sC" },
//         ];
//       case "rOption3":
//         return [
//           { key: "กรุณาเลือก", value: "" },
//           { key: "โครงการพัฒนาความสามารถพิเศษด้านคณิตศาสตร์", value: "Option1sG" },
//           { key: "โครงการพัฒนาความสามารถพิเศษด้านวิทยาศาสตร์", value: "Option2sG" },
//           { key: "โครงการพัฒนาความสามารถพิเศษด้านภาษาอังกฤษ", value: "Option3sG" },
//           { key: "โครงการพัฒนาความสามารถพิเศษด้านภาษาไทย", value: "Option4sG" },
//         ];
//       case "rOption4":
//         return [
//           { key: "กรุณาเลือก", value: "" },
//           { key: "คณะกรรมการนักเรียน", value: "Option1sO" },
//           { key: "นักเรียนผู้ช่วยงานประชาสัมพันธ์ (ปชส.)", value: "cOption2sO" },
//           { key: "กลุ่มนักเรียน AIC (กอ.)", value: "cOption3sO" },
//         ];
//       default:
//         return [{ key: "กรุณาเลือก", value: "" }];
//     }
//   };

//   const validationSchema = Yup.object({
//     radioOptions: Yup.string().required("Please select an option"),
//     clubOptions: Yup.string().required("Please select an option"),
//   });

//   const onSubmit = (values: { radioOptions: string; clubOptions: string }) => {
//     console.log(values)
//   };

//   return (
//     <Formik
//       initialValues={{ radioOptions: "", clubOptions: "" }}
//       validationSchema={validationSchema}
//       onSubmit={onSubmit}
//     >
//       {({ values, setFieldValue }) => (
//         <Form className="flex flex-col bg-blue-100 justify-center items-center py-8 space-y-4">
//           <p>Hello username</p>

//           {radioOptions.map((option) => (
//             <div key={option.value}>
//               <Field
//                 type="radio"
//                 id={option.value}
//                 name="radioOptions"
//                 value={option.value}
//                 onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
//                   setFieldValue("radioOptions", e.target.value);
//                   setFieldValue("clubOptions", ""); // Reset select when radio changes
//                 }}
//               />
//               <label htmlFor={option.value}>{option.key}</label>
//             </div>
//           ))}

//           <Field as="select" name="clubOptions" className="form-select">
//             {getSelectOptions(values.radioOptions).map((option) => (
//               <option key={option.value} value={option.value}>
//                 {option.key}
//               </option>
//             ))}
//           </Field>

//           <ErrorMessage name="radioOptions" component="div" className="text-red-500" />
//           <ErrorMessage name="clubOptions" component="div" className="text-red-500" />

//           <button
//             className="bg-orange-400 rounded-lg py-2 px-4 transition-all hover:bg-purple-400 hover:text-white hover:-translate-y-2"
//             type="submit"
//           >
//             Submit
//           </button>
//         </Form>
//       )}
//     </Formik>
//   );
// };

// export default FormikControl;