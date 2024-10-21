"use client";

import { Formik, Form, Field, ErrorMessage } from "Formik";
import * as Yup from "yup";
import { getUser } from "@/server/middlewares/derive";
import { redirect } from "next/navigation";
import { AllData } from "@/libs/data";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import FlowerVase from "@/vectors/forms/FlowerVase";
import Table from "@/vectors/forms/Table";
import BigLamp from "@/vectors/forms/BigLamp";
import FormLeft from "@/vectors/forms/FormLeft";
// import apiFunction from "@/components/api";

//   const user = await getUser()
//   if(!user.success){
//     redirect('/')
//   }

//   const data = user.data
const programes = AllData.Programs;
const clubs = AllData.Clubs;
const gifted = AllData.Gifted;
const organizations = AllData.Organizations;

// const Router = useRouter()

const FormikControl: React.FC = () => {
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

  const onSubmit = async (values: {
    radioOptions: string;
    clubOptions: string;
  }) => {
    console.log(values);
    // try {
    //   await apiFunction("POST", "path", {
    //     status: values.radioOptions,
    //     club: values.clubOptions,
    //   })
    //   Router.push("/account")
    // } catch (error) {
    //   console.error("Error updating status:", error)
    // }
  };

  return (
    <main className="flex h-screen items-center justify-center bg-gradient-to-b from-[#ECF5C8] to-[#1A8B6D]">
      <div className="absolute -left-20 bottom-0 z-40 sm:-left-10">
        <FormLeft className="h-screen" />
      </div>
      <div className="absolute bottom-0 right-0 z-20">
        <BigLamp className="" />
      </div>
      <Formik
        initialValues={{ radioOptions: "", clubOptions: "" }}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ values, setFieldValue }) => (
          <Form>
            <div className="flex flex-col items-center justify-center">
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

              <ErrorMessage
                name="radioOptions"
                component="div"
                className="text-red-500"
              />
              <ErrorMessage
                name="clubOptions"
                component="div"
                className="text-red-500"
              />

              <button
                className="rounded-lg bg-orange-400 px-4 py-2 transition-all hover:-translate-y-2 hover:bg-purple-400 hover:text-white"
                type="submit"
              >
                Submit
              </button>
            </div>
          </Form>
        )}
      </Formik>
      <div className="absolute bottom-0 h-44 w-screen bg-[#ECF5C8]"></div>
      <div className="absolute bottom-36 z-10 h-2 w-screen bg-[#6AB692]"></div>
    </main>
  );
};

export default FormikControl;
