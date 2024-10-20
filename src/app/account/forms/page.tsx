"use client";

import { Formik, Form, Field, ErrorMessage } from "Formik";
import * as Yup from "yup";
import { getUser } from '@/server/middlewares/derive'
import { redirect } from 'next/navigation'
import { AllData } from "@/libs/data";

//   const user = await getUser()
//   if(!user.success){
//     redirect('/')
//   }

//   const data = user.data
const programes = AllData.Programs;
const clubs = AllData.Clubs;
const gifted = AllData.Gifted;
const organizations = AllData.Organizations;

const FormikControl =  () => {

  const radioOptions = [
    { key: "สายการเรียน", value: "สายการเรียน" },
    { key: "ชมรม", value: "ชมรม" },
    { key: "โครงการพัฒนาความสามารถ", value: "โครงการพัฒนาความสามารถ" },
    { key: "องค์กรนักเรียน", value: "องค์กรนักเรียน" },
  ];

  const getSelectOptions = (radioOption: string) => {
    switch (radioOption) {
      case "สายการเรียน":
        return [
          { key: "กรุณาเลือก", value: "" },
          ...Object.entries(programes).map(([code, name]) => ({
            key: name,
            value: code,
          })),
        ];
      case "ชมรม":
        return [
          { key: "กรุณาเลือก", value: "" },
          ...Object.entries(clubs).map(([code, name]) => ({
            key: name,
            value: code,
          })),
        ];
      case "โครงการพัฒนาความสามารถ":
        return [
          { key: "กรุณาเลือก", value: "" },
          ...Object.entries(gifted).map(([code, name]) => ({
            key: name,
            value: code,
          })),
        ];
      case "องค์กรนักเรียน":
        return [
          { key: "กรุณาเลือก", value: "" },
          ...Object.entries(organizations).map(([code, name]) => ({
            key: name,
            value: code,
          })),
        ];
      default:
        return [{ key: "กรุณาเลือก", value: "" }];
    }
  };

  const validationSchema = Yup.object({
    radioOptions: Yup.string().required("Please select an option"),
    clubOptions: Yup.string().required("Please select an option"),
  });

  const onSubmit = (values: { radioOptions: string; clubOptions: string }) => {
    console.log(values)
  };

  return (
    <Formik
      initialValues={{ radioOptions: "", clubOptions: "" }}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ values, setFieldValue }) => (
        <Form className="flex flex-col bg-blue-100 justify-center items-center py-8 space-y-4">
          <p>Hello </p>

          {radioOptions.map((option) => (
            <div key={option.value}>
              <Field
                type="radio"
                id={option.value}
                name="radioOptions"
                value={option.value}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setFieldValue("radioOptions", e.target.value);
                  setFieldValue("clubOptions", ""); // Reset select when radio changes
                }}
              />
              <label htmlFor={option.value}>{option.key}</label>
            </div>
          ))}

          <Field as="select" name="clubOptions" className="form-select">
            {getSelectOptions(values.radioOptions).map((option) => (
              <option key={option.value} value={option.value}>
                {option.key}
              </option>
            ))}
          </Field>

          <ErrorMessage name="radioOptions" component="div" className="text-red-500" />
          <ErrorMessage name="clubOptions" component="div" className="text-red-500" />

          <button
            className="bg-orange-400 rounded-lg py-2 px-4 transition-all hover:bg-purple-400 hover:text-white hover:-translate-y-2"
            type="submit"
          >
            Submit
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default FormikControl;