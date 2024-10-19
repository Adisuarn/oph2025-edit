"use client";

import { Formik, Form, Field, ErrorMessage } from "Formik";
import * as Yup from "yup";
import Link from "next/link";
import { uploadImage } from "@/server/utils/uploadimg";
import { useState, useEffect } from "react";
import { objectInputType } from "zod";
import Image from "next/image";
import Lamp from "@/vectors/Lamp";
import BackArrow from "@/vectors/edit-page/BackArrow";
import GalleryIcon from "@/vectors/edit-page/GalleryIcon";
import { FaPen } from "react-icons/fa";
import { AiOutlineInfoCircle } from "react-icons/ai";

//import Tower from "@/vectors/Tower";
//import TextError from '../FormControl/TextError';

const initialValues = {
  textField1: "Last year info",
  textField2: "Your description here",
  textField3: "Cristiano Ronaldo",
  textField4: "Your description here",
  textField5: "Your description here",
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
    <main className="mx-10 mt-16">
      <section className="flex flex-col items-start space-y-3 font-sansThai">
        <div className="flex items-center justify-center space-x-1">
          <Link href='/account'><BackArrow className="h-5 w-5 sm:h-8 sm:w-8 md:h-12 md:w-12" /></Link>
          <Link href='/account' className="text-greenText text-xs font-inter sm:text-lg md:text-2xl">ย้อนกลับ</Link>
        </div>
        <div>
            <div className="flex justify-between">
            <p className="text-greenText font-inter text-xs sm:text-lg md:text-2xl">
              สถานะ : approved
            </p>
            <div className="flex space-x-4">
              <Link href='/preview/oranization' className="text-greenText border-greenText hover:bg-greenText rounded-full border px-4 text-xs transition-all hover:text-white md:text-md">
              preview
              </Link>
              <button className="from-buttonFirst via-buttonMiddle to-greenText rounded-full border bg-gradient-to-r px-4 text-xs font-extralight text-white">
              ส่งการแก้ไข
              </button>
            </div>
            </div>
        </div>
      </section>

      <section className="from-heroFirst via-heroMiddle to-greenText mt-8 flex h-36 flex-col items-center justify-center space-y-2 rounded-2xl bg-gradient-to-br text-xs text-white shadow-xl">
        <p className="rounded-full border border-white px-6 py-1">
          สายการเรียน ภาษา-ภาษาจีน
        </p>
        <p>สายการเรียน 80 คน</p>
        <div>
          <p>IG</p>
          <p>FB</p>
          <p>อื่น ๆ</p>
        </div>
      </section>

      <section>
        <div></div>
      </section>

      <section>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="flex flex-col p-4">
                <div className="flex justify-between">
                  <label
                    htmlFor="textField1"
                    className="from-heroMiddle to-greenText inline-block bg-gradient-to-b bg-clip-text text-xl font-bold text-transparent"
                  >
                    การรับสมัคร <br />
                    และ
                    <br />
                    การสอบเข้า
                  </label>
                  <div className="flex flex-col items-center">
                    {displayImage ? (
                      <Image
                        className="mb-3"
                        src={imageUrl || ""}
                        alt="photo1"
                        width={100}
                        height={100}
                        style={{
                          width: "8rem",
                          height: "6rem",
                          borderRadius: "1rem",
                        }}
                      />
                    ) : (
                      <div className="mb-3 flex w-full items-center justify-center">
                        <label className="flex h-24 w-32 cursor-pointer flex-col items-center justify-center rounded-lg border-2 bg-gray-300 hover:bg-gray-500">
                          <div className="flex flex-col items-center justify-center pb-6 pt-5">
                            <GalleryIcon />
                          </div>
                          <input
                            name="uploadeImage1"
                            type="file"
                            className="hidden"
                            onChange={handleFileSelect}
                          />
                        </label>
                      </div>
                    )}
                    <div className="flex justify-center items-center">
                      <p className="text-xs font-normal">คำอธิบายใต้รูปภาพ</p>
                      <FaPen className="h-2" />
                    </div>
                  </div>
                </div>
                <Field
                  type="text"
                  name="textField1"
                  className="border-greenText rounded-xl border pb-28 pl-3 pt-3 shadow-lg"
                />
                <ErrorMessage name="textField1" />
              </div>

              <div className="flex flex-col p-4">
                <div className="flex justify-between sm:justify-around items-center space-x-2">
                  <div className="flex flex-col justify-center items-center">
                    {displayImage ? (
                      <div>
                        <input
                            name="uploadeImage2"
                            type="file"
                            className="hidden"
                            onChange={handleFileSelect}
                          />
                        <Image
                        className="mb-3"
                        src={imageUrl || ""}
                        alt="photo2"
                        width={100}
                        height={100}
                        style={{
                          width: "12rem",
                          height: "7rem",
                          borderRadius: "1rem",
                        }}
                      />
                      </div> 
                    ) : (
                      <div className=" flex w-full items-center justify-center">
                        <label className="flex h-28 w-48 cursor-pointer flex-col items-center justify-center rounded-lg border-2 bg-gray-300 hover:bg-gray-500">
                          <div className="flex flex-col items-center justify-center pb-6 pt-5">
                            <GalleryIcon />
                          </div>
                          <input
                            name="uploadeImage2"
                            type="file"
                            className="hidden"
                            onChange={handleFileSelect}
                          />
                        </label>
                      </div>
                    )}
                    <div className="flex justify-center items-center mb-3">
                      <p className="text-xs font-normal text-greenText sm:text-sm md:text-lg">คำอธิบายใต้รูปภาพ</p>
                      <FaPen className="h-2 text-greenText" />
                    </div>
                  </div>
                  <div className="from-heroMiddle to-greenText inline-block bg-gradient-to-b bg-clip-text text-xl font-bold text-transparent sm:flex sm:text-2xl md:text-4xl">
                    <p>วิชา/</p>
                    <p>หลักสูตรเพิ่มเติม</p>
                    <p>ที่เรียน</p>
                  </div>
                </div>
                <Field
                  type="text"
                  name="textField2"
                  className="text-greenText border-greenText rounded-xl border pb-28 pl-3 pt-3 shadow-lg text-xs sm:text-lg md:text-xl"
                />
                <ErrorMessage name="textField2" className="text-red-300" />
              </div>

              <div className="flex flex-col p-4">
                <div className="flex justify-between">
                  <label
                    htmlFor="textField3"
                    className="from-heroMiddle to-greenText inline-block bg-gradient-to-b bg-clip-text text-xl font-bold text-transparent"
                  >
                    ความน่าสนใจ /<br />
                    ของk
                    <br />
                    สายการเรียน
                  </label>
                  <div className="flex flex-col items-center">
                    {displayImage ? (
                      <Image
                        className="mb-3"
                        src={imageUrl || ""}
                        alt="photo1"
                        width={100}
                        height={100}
                        style={{
                          width: "8rem",
                          height: "6rem",
                          borderRadius: "1rem",
                        }}
                      />
                    ) : (
                      <div className="mb-3 flex w-full items-center justify-center">
                        <label className="flex h-24 w-32 cursor-pointer flex-col items-center justify-center rounded-lg border-2 bg-gray-300 hover:bg-gray-500">
                          <div className="flex flex-col items-center justify-center pb-6 pt-5">
                            <GalleryIcon />
                          </div>
                          <input
                            name="uploadeImage3"
                            id="dropzone-file"
                            type="file"
                            className="hidden"
                            onChange={handleFileSelect}
                          />
                        </label>
                      </div>
                    )}
                    <div className="flex justify-center items-center">
                      <p className="text-xs font-normal">คำอธิบายใต้รูปภาพ</p>
                      <FaPen className="h-2" />
                    </div>
                  </div>
                </div>
                <Field
                  type="text"
                  name="textField3"
                  className="border-greenText rounded-xl border pb-28 pl-3 pt-3 shadow-lg"
                />
                <ErrorMessage name="textField3" />
              </div>

              <div className="flex items-center justify-center space-x-4 mb-4">
                <p className="from-heroMiddle to-greenText inline-block bg-gradient-to-b bg-clip-text text-center text-xl font-bold text-transparent">
                  รีวิวจากรุ่นพี่
                </p>
                <AiOutlineInfoCircle className="text-greenText" />
              </div>

              <div className="flex justify-center mb-4 space-x-2">
                <div className="flex flex-col">
                  <div className="mb-3 flex w-full items-center justify-center">
                    <label className="flex h-24 w-32 cursor-pointer flex-col items-center justify-center rounded-lg border-2 bg-gray-300 hover:bg-gray-500">
                      <div className="flex flex-col items-center justify-center pb-6 pt-5">
                        <GalleryIcon />
                      </div>
                      <input
                        name="uploadeImage4"
                        id="dropzone-file"
                        type="file"
                        className="hidden"
                        onChange={handleFileSelect}
                      />
                    </label>
                  </div>
                  <p className="text-greenText">ชื่อ</p>
                  <p className="text-heroMiddle">เตรียมอุดม</p>
                  <p className="text-heroMiddle">ช่องทาการติดตาม</p>
                </div>
                <Field
                  type="text"
                  name="textField4"
                  className="border-greenText rounded-xl border pb-28 pl-3 pt-3 shadow-lg"
                />
                <ErrorMessage name="textField4" />
              </div>

              <div className="flex justify-center mb-4 space-x-2">
              <Field
                  type="text"
                  name="textField5"
                  className="border-greenText rounded-xl border pb-28 pl-3 pt-3 shadow-lg"
                />
                <ErrorMessage name="textField5" />
                <div className="flex flex-col">
                  <div className="mb-3 flex w-full items-center justify-center">
                    <label className="flex h-24 w-32 cursor-pointer flex-col items-center justify-center rounded-lg border-2 bg-gray-300 hover:bg-gray-500">
                      <div className="flex flex-col items-center justify-center pb-6 pt-5">
                        <GalleryIcon />
                      </div>
                      <input
                        name="uploadeImage5"
                        id="dropzone-file"
                        type="file"
                        className="hidden"
                        onChange={handleFileSelect}
                      />
                    </label>
                  </div>
                  <p className="text-greenText">ชื่อ</p>
                  <p className="text-heroMiddle">เตรียมอุดม</p>
                  <p className="text-heroMiddle">ช่องทาการติดตาม</p>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </section>

      <section></section>
    </main>
  );
};
export default ProgrammeForm;
