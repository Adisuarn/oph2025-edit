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
import { IoIosInformationCircleOutline } from "react-icons/io";

//import Tower from "@/vectors/Tower";
//import TextError from '../FormControl/TextError';

const initialValues = {
  textField1: "Last year info",
  textField2: "Your description here",
  textField3: "Cristiano Ronaldo",
  textField4: "Your description here",
  textField5: "Your description here",
  photoDescription2: "Your description here",
  photoDescription1: "Your description here",
  photoDescription3: "Your description here",
  photoDescription4: "Your description here",
  photoDescription5: "Your description here",
};

const validationSchema = Yup.object({
  textField1: Yup.string().required("Required Description"),
  textField2: Yup.string().required("Required Description"),
  textField3: Yup.string().required("Required Description"),
  textField4: Yup.string().required("Required Description"),
  textField5: Yup.string().required("Required Description"),
  photoDescription1: Yup.string().required("Required Description"),
  photoDescription2: Yup.string().required("Required Description"),
  photoDescription3: Yup.string().required("Required Description"),
  photoDescription4: Yup.string().required("Required Description"),
  photoDescription5: Yup.string().required("Required Description"),
});

const onSubmit = (
  values: typeof initialValues,
  {
    setSubmitting,
    resetForm,
  }: { setSubmitting: (isSubmitting: boolean) => void; resetForm: () => void },
) => {
  const userConfirmed = window.confirm("ยืนยันการส่งข้อมูลหรือไม่?");

  if (userConfirmed) {
    console.log("Form data", values);
    setSubmitting(false);
    resetForm();
  } else {
    setSubmitting(false);
  }
};

const ProgrammeForm: React.FC<{}> = () => {
  const [image1, setImage1] = useState<File | null>(null);
  const [imageUrl1, setImageUrl1] = useState<string | null>(null);
  const [displayImage1, setDisplayImage1] = useState<boolean>(false);
  const [image2, setImage2] = useState<File | null>(null);
  const [imageUrl2, setImageUrl2] = useState<string | null>(null);
  const [displayImage2, setDisplayImage2] = useState<boolean>(false);
  const [image3, setImage3] = useState<File | null>(null);
  const [imageUrl3, setImageUrl3] = useState<string | null>(null);
  const [displayImage3, setDisplayImage3] = useState<boolean>(false);

  const [showTooltip2, setShowTooltip2] = useState(false);

  const handleFileSelect1 = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];

      if (!selectedFile.type.startsWith("image/")) {
        alert("Please select a valid image file (png, jpg, jpeg).");
        return;
      }

      setImage1(selectedFile);
      setDisplayImage1(true);
    }
  };

  useEffect(() => {
    if (image1) {
      const imageUrl1 = URL.createObjectURL(image1);
      setImageUrl1(imageUrl1);
      return () => URL.revokeObjectURL(imageUrl1);
    }
  }, [image1]);

  const handleFileSelect2 = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];

      if (!selectedFile.type.startsWith("image/")) {
        alert("Please select a valid image file (png, jpg, jpeg).");
        return;
      }

      setImage2(selectedFile);
      setDisplayImage2(true);
    }
  };

  useEffect(() => {
    if (image2) {
      const imageUrl2 = URL.createObjectURL(image2);
      setImageUrl2(imageUrl2);
      return () => URL.revokeObjectURL(imageUrl2);
    }
  }, [image2]);

  const handleFileSelect3 = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];

      if (!selectedFile.type.startsWith("image/")) {
        alert("Please select a valid image file (png, jpg, jpeg).");
        return;
      }

      setImage3(selectedFile);
      setDisplayImage3(true);
    }
  };

  useEffect(() => {
    if (image3) {
      const imageUrl3 = URL.createObjectURL(image3);
      setImageUrl3(imageUrl3);
      return () => URL.revokeObjectURL(imageUrl3);
    }
  }, [image3]);

  return (
    <main className="mx-10 mt-16">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <section className="flex flex-col items-start space-y-3">
              <div className="flex items-center justify-center space-x-1">
                <Link href="/account">
                  <BackArrow className="h-5 w-5 sm:h-8 sm:w-8 md:h-10 md:w-10" />
                </Link>
                <Link
                  href="/account"
                  className="font-Thai text-xs text-greenText sm:text-lg md:text-2xl"
                >
                  ย้อนกลับ
                </Link>
              </div>
              <div>
                <div className="flex w-[80vw] justify-between sm:w-[90vw]">
                  <p className="font-Thai text-xs text-greenText sm:text-lg md:text-2xl">
                    สถานะ : approved
                  </p>
                  <div className="flex space-x-4">
                    <Link
                      href="/preview/oranization"
                      className="md:text-md rounded-full border border-greenText px-4  text-xs text-greenText transition-all hover:bg-greenText hover:text-white"
                    >
                      preview
                    </Link>
                    <button
                      className="rounded-full border bg-gradient-to-r from-buttonFirst via-buttonMiddle to-greenText px-4 font-Thai text-xs font-extralight text-white"
                      type="submit"
                    >
                      ส่งการแก้ไข
                    </button>
                  </div>
                </div>
              </div>
            </section>

            <div className="mt-8 flex h-36 flex-col items-center justify-center space-y-2 rounded-2xl bg-gradient-to-br from-heroFirst via-heroMiddle to-greenText font-Thai text-xs text-white shadow-xl md:mx-auto md:w-3/5">
              <p className="rounded-full border border-white px-6 py-1 text-lg font-extrabold">
                สายการเรียน ภาษา-ภาษาจีน
              </p>
              <p>สายการเรียน 80 คน</p>
              <div>
                <p>IG</p>
                <p>FB</p>
                <p>อื่น ๆ</p>
              </div>
            </div>

            <section>
              <div></div>
            </section>

            <div className="flex flex-col p-4">
              <div className="flex justify-between">
                <label className="inline-block bg-gradient-to-b from-heroMiddle to-greenText bg-clip-text text-xl font-bold text-transparent">
                  การรับสมัคร <br />
                  และ
                  <br />
                  การสอบเข้า
                </label>
                <div className="flex flex-col items-center">
                  {displayImage1 ? (
                    <Image
                      className="mb-3"
                      src={imageUrl1 || ""}
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
                          onChange={handleFileSelect1}
                        />
                      </label>
                    </div>
                  )}
                  <div className="flex items-center justify-center">
                    <Field
                      type="text"
                      name="photoDescription1"
                      className="text-xs"
                    />
                    <FaPen className="h-2" />
                  </div>
                </div>
              </div>
              <Field
                type="text"
                name="textField1"
                className="rounded-xl border border-greenText pb-28 pl-3 pt-3 shadow-lg"
              />
              <ErrorMessage name="textField1" />
            </div>

            <div className="flex flex-col p-4">
              <div className="flex items-center justify-between space-x-2 sm:justify-around">
                <div className="flex flex-col items-center justify-center">
                  {displayImage2 ? (
                    <div>
                      <input
                        name="uploadeImage2"
                        type="file"
                        className="hidden"
                        onChange={handleFileSelect2}
                      />
                      <Image
                        className="mb-3"
                        src={imageUrl2 || ""}
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
                    <div className="flex w-full items-center justify-center">
                      <label className="flex h-28 w-48 cursor-pointer flex-col items-center justify-center rounded-lg border-2 bg-gray-300 hover:bg-gray-500">
                        <div className="flex flex-col items-center justify-center pb-6 pt-5">
                        <GalleryIcon className="h-3 w-3 text-greenText" />
                        </div>
                        <input
                          name="uploadeImage2"
                          type="file"
                          className="hidden"
                          onChange={handleFileSelect2}
                        />
                      </label>
                    </div>
                  )}
                  <div className="mb-3 flex items-center justify-center">
                    <Field
                      type="text"
                      name="photoDescription2"
                      className="text-center text-xs text-greenText"
                    />
                    <FaPen className="h-2 text-greenText" />
                  </div>
                </div>
                <div className="relative inline-block bg-gradient-to-b from-heroMiddle to-greenText bg-clip-text text-xl font-bold text-transparent sm:flex sm:text-2xl md:text-4xl">
                  <p className="-mb-2 text-2xl sm:mb-0">วิชา/</p>
                  <p className="text-xs md:text-2xl">หลักสูตรเพิ่มเติม</p>
                  <p className="text-xs md:text-2xl">ที่เรียน</p>
                  <IoIosInformationCircleOutline
                    className="h-3 w-3 text-greenText md:h-6 md:w-6"
                    onClick={() => setShowTooltip2(!showTooltip2)}
                  />
                  {showTooltip2 && (
                    <div className="absolute bottom-0 z-10 rounded-md bg-grumpyGreen-700 px-2 py-1 text-xs text-white shadow-lg">
                      Hello World
                    </div>
                  )}
                </div>
              </div>
              <Field
                type="text"
                name="textField2"
                className="rounded-xl border border-greenText pb-28 pl-3 pt-3 text-xs text-greenText shadow-lg sm:text-lg md:text-xl"
              />
              <ErrorMessage name="textField2" className="text-red-300" />
            </div>

            <div className="flex flex-col p-4">
              <div className="flex justify-between">
                <label
                  htmlFor="textField3"
                  className="inline-block bg-gradient-to-b from-heroMiddle to-greenText bg-clip-text text-xl font-bold text-transparent"
                >
                  ความน่าสนใจ /<br />
                  ของ
                  <br />
                  สายการเรียน
                </label>
                <div className="flex flex-col items-center">
                  {displayImage3 ? (
                    <Image
                      className="mb-3"
                      src={imageUrl3 || ""}
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
                          onChange={handleFileSelect3}
                        />
                      </label>
                    </div>
                  )}
                  <div className="flex items-center justify-center">
                    <p className="text-xs font-normal">คำอธิบายใต้รูปภาพ</p>
                    <FaPen className="h-2" />
                  </div>
                </div>
              </div>
              <Field
                type="text"
                name="textField3"
                className="rounded-xl border border-greenText pb-28 pl-3 pt-3 shadow-lg"
              />
              <ErrorMessage name="textField3" />
            </div>

            <div className="mb-4 flex items-center justify-center space-x-4">
              <p className="inline-block bg-gradient-to-b from-heroMiddle to-greenText bg-clip-text text-center text-xl font-bold text-transparent">
                รีวิวจากรุ่นพี่
              </p>
              <AiOutlineInfoCircle className="text-greenText" />
            </div>

            {/* <div className="mb-4 flex justify-center space-x-2">
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
                      onChange={handleFileSelect4}
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
                className="rounded-xl border border-greenText pb-28 pl-3 pt-3 shadow-lg"
              />
              <ErrorMessage name="textField4" />
            </div>

            <div className="mb-4 flex justify-center space-x-2">
              <Field
                type="text"
                name="textField5"
                className="rounded-xl border border-greenText pb-28 pl-3 pt-3 shadow-lg"
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
                      onChange={handleFileSelect5}
                    />
                  </label>
                </div>
                <p className="text-greenText">ชื่อ</p>
                <p className="text-heroMiddle">เตรียมอุดม</p>
                <p className="text-heroMiddle">ช่องทาการติดตาม</p>
              </div>
            </div> */}
          </Form>
        )}
      </Formik>
    </main>
  );
};
export default ProgrammeForm;
