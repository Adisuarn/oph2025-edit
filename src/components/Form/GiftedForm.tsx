"use client";

import { Formik, Form, Field, ErrorMessage } from "Formik";
import * as Yup from "yup";
import Link from "next/link";
import { uploadImage } from "@/server/utils/uploadimg";
import { useState, useEffect } from "react";
import { objectInputType } from "zod";
import Image from "next/image";
import BackArrow from "@/vectors/edit-page/BackArrow";
import UserIcon from "@/vectors/edit-page/UserIcon";
import GalleryIcon from "@/vectors/edit-page/GalleryIcon";
import { FaPen } from "react-icons/fa";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { IoIosInformationCircleOutline } from "react-icons/io";
import apiFunction from "../api";

//import Tower from "@/vectors/Tower";
//import TextError from '../FormControl/TextError';

// const user = await apiFunction("GET", "/api/user", "" );

const initialValues = {
  textField1: "Your description here 1",
  textField2: "Your description here 2",
  textField3: "Your description here 3",
  textField4: "Your description here 4",
  textField5: "Your description here 5",
  photoDescription1: "Your description here 1",
  photoDescription2: "Your description here 2",
  photoDescription3: "Your description here 3",
  photoDescription4: "Your description here 4",
  photoDescription5: "Your description here 5",
  IG: "Your IG here",
  FB: "Your FB here",
  others: "Your Others here"
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
  IG: Yup.string().required("Required Instagram account"),
  FB: Yup.string().required("Required Facebook account"),
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
  const [image4, setImage4] = useState<File | null>(null);
  const [imageUrl4, setImageUrl4] = useState<string | null>(null);
  const [displayImage4, setDisplayImage4] = useState<boolean>(false);
  const [image5, setImage5] = useState<File | null>(null);
  const [imageUrl5, setImageUrl5] = useState<string | null>(null);
  const [displayImage5, setDisplayImage5] = useState<boolean>(false);

  const [showTooltip1, setShowTooltip1] = useState(false);
  const [showTooltip2, setShowTooltip2] = useState(false);
  const [showTooltip3, setShowTooltip3] = useState(false);
  const [showTooltipP, setShowTooltipP] = useState(false);

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

  const handleFileSelect4 = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];

      if (!selectedFile.type.startsWith("image/")) {
        alert("Please select a valid image file (png, jpg, jpeg).");
        return;
      }

      setImage4(selectedFile);
      setDisplayImage4(true);
    }
  };

  useEffect(() => {
    if (image4) {
      const imageUrl4 = URL.createObjectURL(image4);
      setImageUrl4(imageUrl4);
      return () => URL.revokeObjectURL(imageUrl4);
    }
  }, [image4]);

  const handleFileSelect5 = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];

      if (!selectedFile.type.startsWith("image/")) {
        alert("Please select a valid image file (png, jpg, jpeg).");
        return;
      }

      setImage5(selectedFile);
      setDisplayImage5(true);
    }
  };

  useEffect(() => {
    if (image5) {
      const imageUrl5 = URL.createObjectURL(image5);
      setImageUrl5(imageUrl5);
      return () => URL.revokeObjectURL(imageUrl5);
    }
  }, [image5]);

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
                      className="md:text-md rounded-full border border-greenText px-4 text-xs text-greenText transition-all hover:bg-greenText hover:text-white sm:text-lg"
                    >
                      preview
                    </Link>
                    <button
                      className="rounded-full border bg-gradient-to-r from-buttonFirst via-buttonMiddle to-greenText px-4 font-Thai text-xs font-extralight text-white sm:text-lg"
                      type="submit"
                    >
                      ส่งการแก้ไข
                    </button>
                  </div>
                </div>
              </div>
            </section>

            <div className="mt-8 flex h-40 flex-col items-center justify-center space-y-2 rounded-2xl bg-gradient-to-br from-heroFirst via-heroMiddle to-greenText font-Thai text-xs text-white shadow-xl md:mx-auto md:w-3/5">
              <p className="rounded-full border border-white px-6 py-1 text-lg font-extrabold">
                สายการเรียน ภาษา-ภาษาจีน
              </p>
              <p>สายการเรียน 80 คน</p>
              <div className="text-start space-y-1">
                <div className="flex">
                  <p>IG: </p>
                <Field
                  type="text"
                  name="IG"
                  className="text-center text-xs text-white bg-transparent"
                />
                <FaPen className="h-2 text-white" />
                </div>
                <div className="flex">
                  <p>FB: </p>
                <Field
                  type="text"
                  name="FB"
                  className="text-center text-xs text-white bg-transparent"
                />
                <FaPen className="h-2 text-white" />
                </div>
                <div className="flex">
                  <p>อื่นๆ: </p>
                <Field
                  type="text"
                  name="others"
                  className="text-center text-xs text-white bg-transparent"
                />
                <FaPen className="h-2 text-white" />
                </div>
              </div>
            </div>

            {/* section1 */}

            <div className="flex flex-col p-4">
              <div className="flex items-start justify-between space-x-2 sm:justify-around">
                <div className="relative -space-y-2 bg-gradient-to-b from-heroMiddle to-greenText bg-clip-text text-xl font-bold text-transparent sm:flex sm:text-2xl md:text-4xl">
                  <p className="text-sm">การรับสมัคร</p>
                  <p className="text-xl md:text-2xl">และ</p>
                  <p className="text-sm md:text-2xl">การสอบเข้า</p>
                  <IoIosInformationCircleOutline
                    className="mt-3 h-3 w-3 text-greenText md:h-6 md:w-6"
                    onClick={() => setShowTooltip1(!showTooltip1)}
                  />
                  {showTooltip2 && (
                    <div className="absolute bottom-0 z-10 rounded-md bg-grumpyGreen-700 px-2 py-1 text-xs text-white shadow-lg">
                      Hello World
                    </div>
                  )}
                </div>
                <div className="flex flex-col items-center justify-center">
                  {displayImage1 ? (
                    <div>
                      <input
                        type="file"
                        className="hidden"
                        onChange={handleFileSelect1}
                      />
                      <Image
                        className="mb-3"
                        src={imageUrl1 || ""}
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
                      <label className="bg-gray-300 hover:bg-gray-500 flex h-28 w-48 cursor-pointer flex-col items-center justify-center rounded-lg border-2">
                        <div className="flex flex-col items-center justify-center pb-6 pt-5">
                          <GalleryIcon className="h-3 w-3 text-greenText" />
                        </div>
                        <input
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
                      name="photoDescription1"
                      className="text-center text-xs text-greenText"
                    />
                    <FaPen className="h-2 text-greenText" />
                  </div>
                </div>
              </div>
              <Field
                type="text"
                name="textField1"
                className="rounded-xl border border-greenText pb-28 pl-3 pt-3 text-xs text-greenText shadow-lg sm:text-lg md:text-xl"
              />
              <ErrorMessage name="textField1" className="text-red-300" />
            </div>

            {/* section2 */}

            <div className="flex flex-col p-4">
              <div className="flex items-start justify-between space-x-2 sm:justify-around">
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
                      <label className="bg-gray-300 hover:bg-gray-500 flex h-28 w-48 cursor-pointer flex-col items-center justify-center rounded-lg border-2">
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
                <div className="relative bg-gradient-to-b from-heroMiddle to-greenText bg-clip-text text-xl font-bold text-transparent sm:flex sm:text-2xl md:text-4xl">
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

            {/* section3 */}

            <div className="flex flex-col p-4">
              <div className="flex items-start justify-between space-x-2 sm:justify-around">
                <div className="relative inline-block -space-y-2 bg-gradient-to-b from-heroMiddle to-greenText bg-clip-text text-xl font-bold text-transparent sm:flex sm:text-2xl md:text-4xl">
                  <p className="text-sm md:text-2xl">ความน่าสนใจ</p>
                  <p className="text-2xl md:text-2xl">ของ</p>
                  <p className="text-sm md:text-2xl">สายการเรียน</p>
                  <IoIosInformationCircleOutline
                    className="h-3 w-3 space-y-2 text-greenText md:h-6 md:w-6"
                    onClick={() => setShowTooltip3(!showTooltip3)}
                  />
                  {showTooltip3 && (
                    <div className="absolute bottom-0 z-10 rounded-md bg-grumpyGreen-700 px-2 py-1 text-xs text-white shadow-lg">
                      Hello World
                    </div>
                  )}
                </div>
                <div className="flex flex-col items-center justify-center">
                  {displayImage3 ? (
                    <div>
                      <input
                        type="file"
                        className="hidden"
                        onChange={handleFileSelect3}
                      />
                      <Image
                        className="mb-3"
                        src={imageUrl3 || ""}
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
                      <label className="bg-gray-300 hover:bg-gray-500 flex h-28 w-48 cursor-pointer flex-col items-center justify-center rounded-lg border-2">
                        <div className="flex flex-col items-center justify-center pb-6 pt-5">
                          <GalleryIcon className="h-3 w-3 text-greenText" />
                        </div>
                        <input
                          type="file"
                          className="hidden"
                          onChange={handleFileSelect3}
                        />
                      </label>
                    </div>
                  )}
                  <div className="mb-3 flex items-center justify-center">
                    <Field
                      type="text"
                      name="photoDescription3"
                      className="text-center text-xs text-greenText"
                    />
                    <FaPen className="h-2 text-greenText" />
                  </div>
                </div>
              </div>
              <Field
                type="text"
                name="textField3"
                className="rounded-xl border border-greenText pb-28 pl-3 pt-3 text-xs text-greenText shadow-lg sm:text-lg md:text-xl"
              />
              <ErrorMessage name="textField3" className="text-red-300" />
            </div>

            {/* end section3 */}

            <div className="mb-4 flex items-center justify-center space-x-4">
              <p className="inline-block bg-gradient-to-b from-heroMiddle to-greenText bg-clip-text text-center text-2xl font-bold text-transparent sm:text-3xl">
                รีวิวจากรุ่นพี่
              </p>
              <AiOutlineInfoCircle
                className="text-greenText"
                onClick={() => setShowTooltipP(!showTooltipP)}
              />
              {showTooltipP && (
                <div className="absolute bottom-0 z-10 rounded-md bg-grumpyGreen-700 px-2 py-1 text-xs text-white shadow-lg">
                  Hello World
                </div>
              )}
            </div>

            {/* sectionP1 */}
            <div className="flex items-center justify-center">
              <div className="flex flex-col">
                <div className="flex flex-col items-center justify-center">
                  {displayImage4 ? (
                    <div>
                      <input
                        type="file"
                        className="hidden"
                        onChange={handleFileSelect4}
                      />
                      <Image
                        className="mb-3"
                        src={imageUrl4 || ""}
                        alt="photo4"
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
                      <label className="bg-gray-300 hover:bg-gray-500 flex h-16 w-16 cursor-pointer flex-col items-center justify-center rounded-lg border-2">
                        <div className="flex flex-col items-center justify-center pb-6 pt-5">
                          <UserIcon className="h-3 w-3 text-greenText" />
                        </div>
                        <input
                          type="file"
                          className="hidden"
                          onChange={handleFileSelect4}
                        />
                      </label>
                    </div>
                  )}
                </div>
                <div className="pr-8">
                  <p className="text-lg font-bold text-greenText">ชื่อ</p>
                  <p className="text-xs text-heroMiddle">เตรียมอุมดม xx</p>
                  <p className="text-xs text-heroMiddle">ช่องทางการติดตาม</p>
                </div>
              </div>
              <Field
                type="text"
                name="textField4"
                className="w-full rounded-xl border border-greenText pb-28 pl-3 pt-3 text-xs text-greenText shadow-lg sm:text-lg md:text-xl"
              />
              <ErrorMessage name="textField4" className="text-red-300" />
            </div>

            {/* sectionP2 */}

            <div className="flex items-center justify-center">
              <Field
                type="text"
                name="textField5"
                className="w-full rounded-xl border border-greenText pb-28 pl-3 pt-3 text-xs text-greenText shadow-lg sm:text-lg md:text-xl"
              />
              <ErrorMessage name="textField5" className="text-red-300" />
              <div className="flex flex-col">
                <div className="flex flex-col items-center justify-center">
                  {displayImage5 ? (
                    <div>
                      <input
                        type="file"
                        className="hidden"
                        onChange={handleFileSelect5}
                      />
                      <Image
                        className="mb-3"
                        src={imageUrl5 || ""}
                        alt="photo4"
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
                      <label className="bg-gray-300 hover:bg-gray-500 flex h-16 w-16 cursor-pointer flex-col items-center justify-center rounded-lg border-2">
                        <div className="flex flex-col items-center justify-center pb-6 pt-5">
                          <UserIcon className="h-3 w-3 text-greenText" />
                        </div>
                        <input
                          type="file"
                          className="hidden"
                          onChange={handleFileSelect5}
                        />
                      </label>
                    </div>
                  )}
                </div>
                <div>
                  <p className="text-lg font-bold text-greenText">ชื่อ</p>
                  <p className="text-xs text-heroMiddle">เตรียมอุมดม xx</p>
                  <p className="text-xs text-heroMiddle">ช่องทางการติดตาม</p>
                </div>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </main>
  );
};

export default ProgrammeForm;
