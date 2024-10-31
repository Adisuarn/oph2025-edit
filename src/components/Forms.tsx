"use client";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { AllData } from "@/libs/data";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import BigLamp from "@/vectors/forms/BigLamp";
import FormLeft from "@/vectors/forms/FormLeft";
import SmallFormLeft from "@/vectors/forms/SmallFormLeft";
import Frames from "@/vectors/forms/Frames";
import LogoutButton from "@/components/LogoutButton";
import postInfo from "./Forms.action";
import { Tag } from "@utils/type"

type FormProps = {
  dataRecord: any;
};

const programes = AllData.Programs;
const clubs = AllData.Clubs;
const gifted = AllData.Gifted;
const organizations = AllData.Organizations;


const Forms: React.FC<FormProps> = ({dataRecord}) => {
  const Router = useRouter()

  const tagOptions = [
    { key: "สายการเรียน", value: Tag.PROGRAM },
    { key: "ชมรม", value: Tag.CLUB },
    { key: "โครงการพัฒนาความสามารถพิเศษ", value: Tag.GIFTED },
    { key: "องค์กรนักเรียน", value: Tag.ORGANIZATION },
  ];

  const getSelectOptions = (radioOption: string) => {
    switch (radioOption) {
      case Tag.PROGRAM:
        return [
          { key: "กรุณาเลือก", value: "" },
          ...Object.entries(programes).map(([code, name]) => ({
            key: name,
            value: code,
          })),
        ];
      case Tag.CLUB:
        return [
          { key: "กรุณาเลือก", value: "" },
          ...Object.entries(clubs).map(([code, name]) => ({
            key: name,
            value: code,
          })),
        ];
      case Tag.GIFTED:
        return [
          { key: "กรุณาเลือก", value: "" },
          ...Object.entries(gifted).map(([code, name]) => ({
            key: name,
            value: code,
          })),
        ];
      case Tag.ORGANIZATION:
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
    tagOptions: Yup.string().required("Please select an option"),
    keyOptions: Yup.string().required("Please select an option"),
  });

  const onSubmit = async (values: {
    tagOptions: string;
    keyOptions: string;
  }) => {
    try {
      dataRecord.tag = values.tagOptions
      dataRecord.key = values.keyOptions
      await postInfo(dataRecord)
      Router.push('/account')
    } catch (error) {
      console.log(error)
    }
  };

  
  return (
    <main className="flex h-screen w-screen items-center justify-center relative overflow-hidden bg-gradient-to-b from-[#ECF5C8] to-[#1A8B6D]">
      <div className="absolute -left-20 bottom-0 z-40 sm:-left-10">
        <FormLeft className="hidden sm:block sm:h-screen" />
      </div>
      <div className="absolute -left-24 bottom-0 z-40 sm:-left-10">
        <SmallFormLeft className="h-screen sm:hidden" />
      </div>
      <div className="absolute bottom-0 right-0 z-20">
        <BigLamp className="hidden sm:block sm:h-full" />
      </div>
      <div className="absolute top-16 -right-20 z-20">
        <Frames className="h-[50vh] sm:hidden" />
      </div>
      <Formik
        initialValues={{ tagOptions: "", keyOptions: "" }}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ values, setFieldValue }) => (
          <Form>
            <div className="-mt-14 flex h-[60vh] w-[80vw] sm:w-[50vw] flex-col items-center justify-center space-y-5 rounded-2xl bg-white relative z-50 shadow-xl">
              <p className="text-3xl font-bold">กรอกข้อมูล </p>
              <div className="sm:w-3/5 w-4/5 rounded-md border border-gray py-2 pl-2 pr-12">
                <p className="text-gray text-xs sm:text-md md:text-lg">Hello! {dataRecord.email}</p>
              </div>
              <div className="flex flex-col space-y-2">
                <p>ประเภท</p>
                {tagOptions.map((option) => (
                  <div key={option.value} className=" space-x-2">
                    <Field
                      type="radio"
                      id={option.value}
                      name="tagOptions"
                      value={option.value}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setFieldValue("tagOptions", e.target.value);
                        setFieldValue("keyOptions", ""); // Reset select when radio changes
                      }}
                    />
                    <label htmlFor={option.value}>{option.key}</label>
                  </div>
                ))}
              </div>

              <Field as="select" name="keyOptions" className="form-select border border-gray pl-2 py-2 px-8 rounded-md">
                {getSelectOptions(values.tagOptions).map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.key}
                  </option>
                ))}
              </Field>

              <ErrorMessage
                name="tagOptions"
                component="div"
                className="text-red-500"
              />
              <ErrorMessage
                name="keyOptions"
                component="div"
                className="text-red-500"
              />

              <button
                className=" text-indigo-500 px-4 py-2 text-center border border-indigo-500 rounded-lg hover:text-white hover:bg-indigo-500 transition-all"
                type="submit"
              >
                Submit
              </button>
              <div>
                <LogoutButton />
              </div>
            </div>
          </Form>
        )}
      </Formik>
      <div className="absolute bottom-0 h-44 w-screen bg-[#ECF5C8]"></div>
      <div className="absolute bottom-36 z-10 h-2 w-screen bg-[#6AB692]"></div>
    </main>
  );
};

export default Forms;
