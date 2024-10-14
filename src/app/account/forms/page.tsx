"use client";

import { Formik, Form, Field, ErrorMessage } from "Formik";
import * as Yup from "yup";
import { getUser } from "@/server/middlewares/derive";
import { redirect } from "next/navigation";
import { useState, useEffect } from "react";
import Data from "./pageData";
import navBar from "@/app/navBar";
import apiFunction from "@/components/api";

// x cross sign
import { RxCross2 } from "react-icons/rx";

//   const user = await getUser()
//   if(!user.success){
//     redirect('/')
//   }

//   const data = user.data

type UserData = {
  email: string;
  picture: string | null;
  name: string;
  studentId: string;
  TUCMC: boolean | null;
} | null;

const FormikControl = () => {
  // useEffect(() => {
  // }, []);
  const [userData, setUserData] = useState<UserData>(null);

  const fetchData = async () => {
    try {
      const fetchedUserData = await Data();
      setUserData(fetchedUserData);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

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
          { key: "วิทยาศาสตร์-คณิตศาสตร์", value: "วิทยาศาสตร์-คณิตศาสตร์" },
          { key: "ภาษา-คณิตศาสตร์", value: "ภาษา-คณิตศาสตร์" },
          { key: "ภาษา-ภาษาฝรั่งเศส", value: "ภาษา-ภาษาฝรั่งเศส" },
          { key: "ภาษา-ภาษาเยอรมัน", value: "ภาษา-ภาษาเยอรมัน" },
          { key: "ภาษา-ภาษาญี่ปุ่น", value: "ภาษา-ภาษาญี่ปุ่น" },
          { key: "ภาษา-ภาษาจีน", value: "ภาษา-ภาษาจีน" },
          { key: "ภาษา-ภาษาสเปน", value: "ภาษา-ภาษาสเปน" },
          { key: "ภาษา-ภาษาเกาหลี", value: "ภาษา-ภาษาเกาหลี" },
        ];
      case "ชมรม":
        return [
          { key: "กรุณาเลือก", value: "" },
          { key: "ชมรม", value: "ชมรม" },
        ];
      case "โครงการพัฒนาความสามารถ":
        return [
          { key: "กรุณาเลือก", value: "" },
          {
            key: "โครงการพัฒนาความสามารถพิเศษด้านคณิตศาสตร์",
            value: "โครงการพัฒนาความสามารถพิเศษด้านคณิตศาสตร์",
          },
          {
            key: "โครงการพัฒนาความสามารถพิเศษด้านวิทยาศาสตร์",
            value: "โครงการพัฒนาความสามารถพิเศษด้านวิทยาศาสตร์",
          },
          {
            key: "โครงการพัฒนาความสามารถพิเศษด้านภาษาอังกฤษ",
            value: "โครงการพัฒนาความสามารถพิเศษด้านภาษาอังกฤษ",
          },
          {
            key: "โครงการพัฒนาความสามารถพิเศษด้านภาษาไทย",
            value: "โครงการพัฒนาความสามารถพิเศษด้านภาษาไทย",
          },
        ];
      case "องค์กรนักเรียน":
        return [
          { key: "กรุณาเลือก", value: "" },
          { key: "คณะกรรมการนักเรียน", value: "คณะกรรมการนักเรียน" },
          {
            key: "นักเรียนผู้ช่วยงานประชาสัมพันธ์ (ปชส.)",
            value: "นักเรียนผู้ช่วยงานประชาสัมพันธ์ (ปชส.)",
          },
          { key: "กลุ่มนักเรียน AIC (กอ.)", value: "กลุ่มนักเรียน AIC (กอ.)" },
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
    await apiFunction("POST", `/api`, {
      data1: values.radioOptions,
      data2: values.clubOptions,
    });
  };

  return (
    <>
      <section className="flex h-screen items-center justify-center bg-gradient-to-tr from-grumpyGreen-500 to-emerald-500">
        <Formik
          initialValues={{ radioOptions: "", clubOptions: "" }}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({ values, setFieldValue }) => (
            <Form>
              <div className="space-y-4 rounded-3xl bg-grumpyGreen-100 p-1 md:p-4 text-2xl shadow-xl sm:space-y-8 sm:p-16">
                <p className="text-center text-lg font-bold text-grumpyGreen-700 sm:text-xl md:text-3xl">
                  Registration Form
                </p>
                <p className="text-lg">Signed in as: {userData?.email || ""}</p>

                {radioOptions.map((option) => (
                    <div key={option.value} className="flex items-center space-x-2">
                    <Field
                      className="mr-2 text-grumpyGreen-600 focus:ring-grumpyGreen-500 border-grumpyGreen-500 rounded"
                      type="radio"
                      id={option.value}
                      name="radioOptions"
                      value={option.value}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      setFieldValue("radioOptions", e.target.value);
                      setFieldValue("clubOptions", ""); // Reset select when radio changes
                      }}
                    />
                    <label htmlFor={option.value} className=" text-sm ">
                      {option.key}
                    </label>
                    </div>
                ))}

                <Field
                  as="select"
                  name="clubOptions"
                  className="block bg-cream text-sm py-1 w-24 rounded-xl md:py-2 md:pl-2 md:pr-25 md:w-80"
                >
                  {getSelectOptions(values.radioOptions).map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.key}
                    </option>
                  ))}
                </Field>

                <ErrorMessage
                  name="radioOptions"
                  component="div"
                  className="text-red-800"
                />
                <ErrorMessage
                  name="clubOptions"
                  component="div"
                  className="text-red-800"
                />

                <button
                  className="rounded-lg text-sm bg-cream px-2 md:px-4 md:py-2 transition-all hover:bg-oldyGoldy hover:text-white active:opacity-50"
                  type="submit"
                >
                  Submit
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </section>
    </>
  );
};

export default FormikControl;
