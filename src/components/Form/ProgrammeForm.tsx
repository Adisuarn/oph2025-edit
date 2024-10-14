"use client";

import { Formik, Form, Field, ErrorMessage } from "Formik";
import * as Yup from "yup";
import Link from "next/link";
import { uploadImage } from "@/server/utils/uploadimg";
import { useState, useEffect } from "react";
import { objectInputType } from "zod";
import Image from "next/image";
import Lamp from "@/vectors/Lamp";
//import Tower from "@/vectors/Tower";
//import TextError from '../FormControl/TextError';

const initialValues = {
  textField1: "Last year info",
  textField2: "Your description here",
  textField3: "Cristiano Ronaldo",
};

const validationSchema = Yup.object({
  textField1: Yup.string().required("Required Description"),
  textField2: Yup.string().required("Required Description"),
  textField3: Yup.string().required("Required Description"),
  textField4: Yup.string().required("Required Description"),
  textField5: Yup.string().required("Required Description"),
});

const onSubmit = (
  values: typeof initialValues,
  {
    setSubmitting,
    resetForm,
  }: { setSubmitting: (isSubmitting: boolean) => void; resetForm: () => void },
) => {
  console.log("Form data", values);
  setSubmitting(false);
  resetForm();
};

const ProgrammeForm: React.FC<{}> = () => {
  const [image, setImage] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [displayImage, setDisplayImage] = useState<boolean>(false);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];

      if (!selectedFile.type.startsWith("image/")) {
        alert("Please select a valid image file (png, jpg, jpeg).");
        return;
      }

      setImage(selectedFile);
      setDisplayImage(true);
    }
  };

  useEffect(() => {
    if (image) {
      const imageUrl = URL.createObjectURL(image);
      setImageUrl(imageUrl);
      return () => URL.revokeObjectURL(imageUrl);
    }
  }, [image]);

  return (
    <main>
      <div className="bg-sky-400">
        <Link href="/account">ย้อนกลับ</Link>
        <div className="flex justify-around">
          <p>สถานะ "ไอเลิฟทูสลีป"</p>
          <div>
            <button className="mr-3 rounded-full bg-grumpyGreen-300 px-4 py-2">
              preview
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center bg-amber-300">
        <p>สายการเรียน</p>
        <p>สายการเรียน จำนวนนักเรียน</p>
        <p>IG</p>
        <p>FB</p>
        <p>อื่น ๆ</p>
      </div>

      <div className="absolute left-0">
        <Lamp className="hidden sm:block" />
      </div>
      {/* <div className="absolute">
        <Tower className=""/>
      </div> */}
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="flex flex-col items-center justify-center space-y-4 bg-blue-100 p-5">
            <div className="flex flex-col">
              <div className="flex">
                <label htmlFor="textField1">การสมัครและการสอบเข้า:</label>
                <div className="size-44 bg-blue-800"></div>
              </div>
              <ErrorMessage name="textField1" />
            </div>

            <div className="m-4 flex flex-col bg-orange-300 p-4">
              <div className="flex">
                <label htmlFor="textField2" className="font-bold md:text-xl">
                  วิชาหรือหลักสูตรที่เรียนเพิ่มเติม:
                </label>

                {displayImage ? (
                  <Image
                    src={imageUrl || ""}
                    alt="photo2"
                    width={100}
                    height={100}
                    style={{ width: "20rem", height: "16rem", borderRadius: "1rem" }}
                  />
                ) : (
                  <div className="mb-3 flex w-full items-center justify-center">
                    <label className="flex h-64 w-80 cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-700 hover:bg-gray-800">
                      <div className="flex flex-col items-center justify-center pb-6 pt-5">
                        <svg
                          className="mb-4 h-8 w-8 text-gray-500"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 20 16"
                        >
                          <path
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                          />
                        </svg>
                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                          <span className="font-semibold">Click to upload</span>{" "}
                          or drag and drop
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          SVG, PNG, JPG or GIF (MAX. 800x400px)
                        </p>
                      </div>
                      <input
                        name="uploadeImage"
                        id="dropzone-file"
                        type="file"
                        className="hidden"
                        onChange={handleFileSelect}
                      />
                    </label>
                  </div>
                )}
              </div>
              <Field
                type="text"
                name="textField2"
                className="rounded-xl bg-green-200 pb-28 pl-3 pt-3 shadow-lg"
              />
              <ErrorMessage name="textField2" />
            </div>

            <div className="flex flex-col">
              <div className="flex">
                <label htmlFor="textField3">ความน่าสนใจ:</label>
                <div className="size-44 bg-blue-800"></div>
              </div>
              <Field
                type="text"
                name="textField3"
                className="rounded-xl bg-green-200 pb-28 pl-3 pt-3"
              />
              <ErrorMessage name="textField3" />
            </div>

            <section className="flex flex-col items-center">
              <p>รีวิวจากรุ่นพี่</p>
              <div className="flex justify-around">
                <div>
                  <div className="size-44 bg-blue-800"></div>
                  <p>ชื่อ</p>
                  <p>รุ่น</p>
                  <p>ช่องทางการติดตาม</p>
                </div>
                <div>
                  <Field
                    type="text"
                    name="textField4"
                    className="h-52 rounded-xl bg-green-200"
                  />
                </div>
                <ErrorMessage name="textField3" />
              </div>
              <button>ไอคอนลบ</button>
            </section>

            <section className="flex flex-col items-center">
              <p>รีวิวจากรุ่นพี่</p>
              <div className="flex justify-around">
                <div>
                  <Field
                    type="text"
                    name="textField5"
                    className="h-52 rounded-xl bg-green-200"
                  />
                  <ErrorMessage name="textField3" />
                </div>
                <div>
                  <div className="size-44 bg-blue-800"></div>
                  <p>ชื่อ</p>
                  <p>รุ่น</p>
                  <p>ช่องทางการติดตาม</p>
                </div>
              </div>
              <button>ไอคอนลบ</button>
            </section>

            <button
              type="submit"
              disabled={isSubmitting}
              className="rounded-full bg-grumpyGreen-300 px-4 py-2"
            >
              ส่งการแก้ไข
            </button>
          </Form>
        )}
      </Formik>
    </main>
  );
};

export default ProgrammeForm;
