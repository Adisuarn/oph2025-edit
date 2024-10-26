"use client";
import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
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
import Trash from "@/vectors/edit-page/Trash";
import postInfo from "./Forms.action";
import postReview from "./Forms.action.review";
import { Status } from "@utils/type";
import { useRouter } from "next/router";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import apiFunction from "../api";
// import { useRouter } from "next/router";

// const Router = useRouter();

const GeneralForm: React.FC<{
  editFormData: any;
  review1: any;
  review2: any;
  review3: any;
}> = ({ editFormData, review1, review2, review3 }) => {
  const notifySuccess = () =>
    toast.success("Successfully Sent!", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      transition: Bounce,
    });
  const notifyError = () =>
    toast.error("There was an error!", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });

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
  const [image6, setImage6] = useState<File | null>(null);
  const [imageUrl6, setImageUrl6] = useState<string | null>(null);
  const [displayImage6, setDisplayImage6] = useState<boolean>(false);
  const [successDataSent, setSuccessDataSent] = useState<boolean>(false);
  const [ReviewAmount, setReviewAmount] = useState<number>(3);

  const incrementReview = () => {
    setReviewAmount(ReviewAmount + 1);
  };
  const decrementReview = () => {
    setReviewAmount(ReviewAmount - 1);
  };

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

  const handleFileSelect6 = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];

      if (!selectedFile.type.startsWith("image/")) {
        alert("Please select a valid image file (png, jpg, jpeg).");
        return;
      }

      setImage6(selectedFile);
      setDisplayImage6(true);
    }
  };

  useEffect(() => {
    if (image6) {
      const imageUrl6 = URL.createObjectURL(image6);
      setImageUrl6(imageUrl6);
      return () => URL.revokeObjectURL(imageUrl6);
    }
  }, [image6]);

  let reviews = [review1, review2, review3];

  return (
    <section className="mx-10 mt-16 sm:mx-24">
      <ToastContainer />
      <Formik
        initialValues={{
          textField1: editFormData.admissions,
          textField2: editFormData.courses,
          textField3: editFormData.interests,
          textField4: "",
          textField5: "",
          textField6: "",
          photoDescription1: "",
          photoDescription2: "",
          photoDescription3: "",
          P1Name: "",
          P2Name: "",
          P3Name: "",
          P1Gen: "",
          P2Gen: "",
          P3Gen: "",
          P1Contact: "",
          P2Contact: "",
          P3Contact: "",
          Members: editFormData.members,
          IG: editFormData.ig,
          FB: editFormData.fb,
          others: editFormData.others,
          submitError: "",
        }}
        validationSchema={Yup.object({
          //.min(150, "Required More than 150 words ")
          textField1: Yup.string()
            .min(150, "Required More than 150 words ")
            .required("Required Description"),
          textField2: Yup.string()
            .min(150, "Required More than 150 words ")
            .required("Required Description"),
          textField3: Yup.string()
            .min(150, "Required More than 150 words ")
            .required("Required Description"),
          textField4: Yup.string().required("Required Description"),
          // textField5: Yup.string().required("Required Description"),
          // textField6: Yup.string().required("Required Description"),
          photoDescription1: Yup.string().required("Required Description"),
          photoDescription2: Yup.string().required("Required Description"),
          photoDescription3: Yup.string().required("Required Description"),
          P1Name: Yup.string().required("Required Name"),
          // P2Name: Yup.string().required("Required Name"),
          // P3Name: Yup.string().required("Required Name"),
          P1Gen: Yup.string().required("Required Triamudom Gen"),
          // P2Gen: Yup.string().required("Required Triamudom Gen"),
          // P3Gen: Yup.string().required("Required Triamudom Gen"),
          P1Contact: Yup.string().required("Required Contact"),
          // P2Contact: Yup.string().required("Required Contact"),
          // P3Contact: Yup.string().required("Required Contact"),
          Members: Yup.string().required("Required Members"),
        })}
        onSubmit={async (
          values: {
            textField1: string;
            textField2: string;
            textField3: string;
            textField4: string;
            textField5: string;
            textField6: string;
            // image1: File
            // image2: File;
            // image3: File;
            // image4: File;
            // image5: File;
            // image6: File;
            photoDescription1: string;
            photoDescription2: string;
            photoDescription3: string;
            P1Name: string;
            P2Name: string;
            P3Name: string;
            P1Gen: string;
            P2Gen: string;
            P3Gen: string;
            P1Contact: string;
            P2Contact: string;
            P3Contact: string;
            Members: string;
            IG: string;
            FB: string;
            others: string;
          }, 
          { setSubmitting },
        ) => {
          const userConfirmed = window.confirm("ยืนยันการส่งข้อมูลหรือไม่?");
          if (userConfirmed) {
            try {
              editFormData.members = values.Members;
              editFormData.ig = values.IG;
              editFormData.fb = values.FB;
              editFormData.others = values.others;
              editFormData.admission = values.textField1;
              editFormData.courses = values.textField2;
              editFormData.interests = values.textField3;
              editFormData.captureimg1 = image1;
              editFormData.captureimg2 = image2;
              editFormData.captureimg3 = image3;
              review1.profile = image4;
              review2.profile = image5;
              review3.profile = image6;
              review1.nick = values.P1Name;
              review2.nick = values.P2Name;
              review3.nick = values.P3Name;
              review1.gen = values.P1Gen;
              review2.gen = values.P2Gen;
              review3.gen = values.P3Gen;
              review1.contact = values.P1Contact;
              review2.contact = values.P2Contact;
              review3.contact = values.P3Contact;
              review1.content = values.textField4;
              review2.content = values.textField5;
              review3.content = values.textField6;
              editFormData.descimg1 = values.photoDescription1;
              editFormData.descimg2 = values.photoDescription2;
              editFormData.descimg3 = values.photoDescription3;
              console.log(editFormData, reviews);
              // await postInfo(editFormData);
              // await postReview(reviews);
              // Router.push("/account");
            } catch (error) {
              console.log(error);
              notifyError();
            } finally {
              setSubmitting(false);
              notifySuccess()
            }
          } else {
            setSubmitting(false);
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <section className="mb-8 flex flex-col items-start space-y-3">
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
                <div className="flex w-[80vw] items-center justify-between">
                  <div className="flex items-center justify-center space-x-2">
                    <p className="md:text-md text-xs sm:text-sm lg:text-lg">
                      สถานะ:{" "}
                    </p>
                    {editFormData.sendData ? (
                      editFormData.status !== Status.PENDING ? (
                        editFormData.status === Status.APPROVED ? (
                          <div className="flex items-center justify-center space-x-1 sm:mt-0">
                            <div className="h-2 w-2 rounded-full bg-[#19C57C] sm:h-5 sm:w-5 md:h-6 md:w-6"></div>
                            <p className="md:text-md text-xs text-[#19C57C] sm:text-sm">
                              ผ่านการตรวจสอบ
                            </p>
                          </div>
                        ) : (
                          <div className="flex items-center justify-center space-x-1 sm:mt-0">
                            <div className="h-2 w-2 rounded-full bg-[#E80808] sm:h-5 sm:w-5 md:h-6 md:w-6"></div>
                            <p className="md:text-md text-xs text-[#E80808] sm:text-sm">
                              ไม่ผ่านการตรวจสอบ
                            </p>
                          </div>
                        )
                      ) : (
                        <div className="flex items-center justify-center space-x-1 sm:mt-0">
                          <div className="h-2 w-2 rounded-full bg-[#FCB52B] sm:h-5 sm:w-5 md:h-6 md:w-6"></div>
                          <p className="md:text-md text-xs text-[#FCB52B] sm:text-sm">
                            อยู่ระหว่างการตรวจสอบ
                          </p>
                        </div>
                      )
                    ) : (
                      <div className="flex items-center justify-center space-x-1 sm:mt-0">
                        <p className="md:text-md text-xs text-zinc-700 sm:text-sm">
                          ยังไม่ได้ส่งแบบฟอร์ม
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center justify-center space-x-2 sm:space-x-4">
                    <Link
                      href={`/preview/${editFormData.tag}`}
                      className="md:text-md rounded-full border border-greenText px-2 text-xs text-greenText transition-all hover:bg-greenText hover:text-white sm:px-4 sm:text-lg"
                    >
                      preview
                    </Link>
                    <button
                      className="rounded-full border bg-gradient-to-r from-buttonFirst via-buttonMiddle to-greenText px-2 font-Thai text-xs font-extralight text-white sm:px-4 sm:text-lg"
                      type="submit"
                      disabled={isSubmitting}
                    >
                      ส่งการแก้ไข
                    </button>
                  </div>
                </div>
              </div>
            </section>

            {/* Hero */}
            <section className="w-full sm:mx-7">
              <section className="w-full rounded-2xl bg-gradient-to-br from-heroFirst via-heroMiddle to-greenText shadow-xl">
                <div className="flex h-40 w-full flex-col items-center justify-center space-y-2 text-xs text-white sm:h-60 sm:w-3/5 sm:space-y-4 md:mx-auto">
                  <p className="sm:border-3 rounded-full border border-white px-6 py-1 text-lg font-extrabold sm:text-2xl">
                    {editFormData.thainame}
                  </p>
                  <div className="flex">
                    <p>{editFormData.tagThai}</p>
                    <Field
                      type="text"
                      name="Members"
                      className="sm:text-md w-12 bg-transparent text-center text-xs text-white"
                    />
                    <FaPen className="h-2 text-white" />
                    <p>คน</p>
                  </div>
                  <div className="sm:space-y-2">
                    <div className="space-y-1 text-start sm:text-lg">
                      <div className="flex">
                        <p>IG : </p>
                        <Field
                          type="text"
                          placeholder="type your ig here"
                          name="IG"
                          className="sm:text-md bg-transparent text-center text-xs text-white"
                        />
                        <FaPen className="h-2 text-white" />
                      </div>
                      <div className="flex">
                        <p>FB : </p>
                        <Field
                          type="text"
                          name="FB"
                          className="sm:text-md bg-transparent text-center text-xs text-white"
                        />
                        <FaPen className="h-2 text-white" />
                      </div>
                      <div className="flex">
                        <p>อื่น ๆ : </p>
                        <Field
                          type="text"
                          name="others"
                          className="sm:text-md bg-transparent text-center text-xs text-white"
                        />
                        <FaPen className="h-2 text-white" />
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* section1 */}
              <div className="mb-14 mt-3 flex flex-col sm:mt-5 md:mb-20 md:mt-8">
                <div className="flex flex-col items-start justify-between sm:flex-row">
                  <div className="flex bg-gradient-to-b from-heroMiddle to-greenText bg-clip-text text-xl font-bold text-transparent sm:w-2/5 sm:flex-col">
                    <p className="sm:text-xs md:text-4xl lg:text-5xl">
                      การรับสมัคร
                    </p>
                    <p className="sm:text-3xl md:text-6xl lg:text-7xl">และ</p>
                    <p className="sm:text-xl md:text-4xl lg:text-5xl">
                      การสอบเข้า
                    </p>
                  </div>
                  <div className="sm:w-[50vw] md:w-[60vw]">
                    <div className="flex w-full items-center justify-center">
                      {displayImage1 ? (
                        <div className="relative w-full">
                          <Image
                            className="mx-auto mb-3 h-44 w-[80vw] rounded-lg object-cover sm:h-48 sm:w-4/5 md:h-60 lg:h-72"
                            src={imageUrl1 || ""}
                            alt="uploaded photo"
                            width={0}
                            height={0}
                          />
                          <button
                            onClick={() => setDisplayImage1(false)} // Replace with your deletion logic
                            className="absolute -right-2 -top-2 z-10 flex h-6 w-6 items-center justify-center rounded-full bg-zinc-500 font-roboto text-[10px] text-white sm:right-2 md:right-[68px] lg:right-14"
                          >
                            X
                          </button>
                        </div>
                      ) : (
                        <label className="flex h-44 w-[80vw] flex-col items-center justify-center rounded-lg bg-[#D9D9D9] sm:h-48 sm:w-4/5 md:h-60 lg:h-72">
                          <div className="flex flex-col items-center justify-center pb-6 pt-5">
                            <GalleryIcon className="h-6 w-6 text-greenText sm:h-12 sm:w-12 md:h-16 md:w-16" />
                          </div>
                          <input
                            type="file"
                            className="hidden"
                            onChange={handleFileSelect1}
                          />
                        </label>
                      )}
                    </div>
                    <div className="mb-3 flex items-center justify-center">
                      <Field
                        type="text"
                        name="photoDescription1"
                        className="md:text-md text-center text-xs text-greenText sm:text-sm"
                        placeholder="Photo description"
                      />
                      <FaPen className="h-2 text-greenText" />
                      <ErrorMessage
                        name="photoDescription1"
                        component="div"
                        className="text-xs text-red-400 sm:text-sm"
                      />
                    </div>
                  </div>
                </div>
                <Field
                  as="textarea"
                  name="textField1"
                  className="rounded-xl border border-greenText pb-28 pl-3 pt-3 text-xs text-greenText shadow-lg sm:text-lg md:text-xl"
                  placeholder="Your description here"
                  rows="5"
                />
                <ErrorMessage
                  name="textField1"
                  component="div"
                  className="text-red-400"
                />
              </div>
              {/* section 2 */}
              <div className="mb-14 mt-3 flex flex-col sm:mt-5 md:mb-20 md:mt-8">
                <div className="flex flex-col items-start justify-between sm:flex-row-reverse">
                  <div className="flex bg-gradient-to-b from-heroMiddle to-greenText bg-clip-text text-xl font-bold text-transparent sm:w-2/5 sm:flex-col">
                    <p className="sm:text-2xl md:text-7xl">วิชา /</p>
                    <p className="sm:text-lg md:text-2xl">หลักสูตรเพิ่มเติม</p>
                    <p className="sm:text-lg md:text-2xl">ที่เรียน</p>
                  </div>
                  <div className="sm:w-[50vw] md:w-[60vw]">
                    <div className="flex w-full items-center justify-center">
                      {displayImage2 ? (
                        <div className="relative w-full">
                          <Image
                            className="mx-auto mb-3 h-44 w-[80vw] rounded-lg object-cover sm:h-48 sm:w-4/5 md:h-60 lg:h-72"
                            src={imageUrl2 || ""}
                            alt="uploaded photo"
                            width={0}
                            height={0}
                          />
                          <button
                            onClick={() => setDisplayImage2(false)} // Replace with your deletion logic
                            className="absolute -right-2 -top-2 z-10 flex h-6 w-6 items-center justify-center rounded-full bg-zinc-500 font-roboto text-[10px] text-white sm:right-2 md:right-[68px] lg:right-14"
                          >
                            X
                          </button>
                        </div>
                      ) : (
                        <label className="flex h-44 w-[80vw] flex-col items-center justify-center rounded-lg bg-[#D9D9D9] sm:h-48 sm:w-4/5 md:h-60 lg:h-72">
                          <div className="flex flex-col items-center justify-center pb-6 pt-5">
                            <GalleryIcon className="h-6 w-6 text-greenText sm:h-12 sm:w-12 md:h-16 md:w-16" />
                          </div>
                          <input
                            type="file"
                            className="hidden"
                            onChange={handleFileSelect2}
                          />
                        </label>
                      )}
                    </div>

                    <div className="mb-3 flex items-center justify-center">
                      <Field
                        type="text"
                        name="photoDescription2"
                        className="md:text-md text-center text-xs text-greenText sm:text-sm"
                        placeholder="Photo description"
                      />
                      <FaPen className="h-2 text-greenText" />
                      <ErrorMessage
                        name="photoDescription2"
                        component="div"
                        className="text-xs text-red-400 sm:text-sm"
                      />
                    </div>
                  </div>
                </div>
                <Field
                  as="textarea"
                  name="textField2"
                  className="rounded-xl border border-greenText pb-28 pl-3 pt-3 text-xs text-greenText shadow-lg sm:text-lg md:text-xl"
                  placeholder="Your description here"
                  rows="5"
                  // style={{ width: "100%", whiteSpace: "pre-wrap" }} // Ensure text wraps without scrolling
                />
                <ErrorMessage
                  name="textField2"
                  component="div"
                  className="text-red-400"
                />
              </div>
              {/* section 3 */}
              <div className="mb-14 mt-3 flex flex-col sm:mt-5 md:mb-20 md:mt-8">
                <div className="flex flex-col items-start justify-between sm:flex-row">
                  <div className="flex bg-gradient-to-b from-heroMiddle to-greenText bg-clip-text text-xl font-bold text-transparent sm:w-2/5 sm:flex-col">
                    <p className="sm:text-3xl md:text-4xl lg:text-5xl">
                      ความน่าสนใจ
                    </p>
                    <p className="sm:text-5xl md:text-6xl lg:text-7xl">ของ</p>
                    <p className="sm:text-3xl md:text-4xl lg:text-5xl">
                      สายการเรียน
                    </p>
                  </div>
                  <div className="sm:w-[50vw] md:w-[60vw]">
                    <div className="flex w-full items-center justify-center">
                      {displayImage3 ? (
                        <div className="relative w-full">
                          <Image
                            className="mx-auto mb-3 h-44 w-[80vw] rounded-lg object-cover sm:h-48 sm:w-4/5 md:h-60 lg:h-72"
                            src={imageUrl3 || ""}
                            alt="uploaded photo"
                            width={0}
                            height={0}
                          />
                          <button
                            onClick={() => setDisplayImage3(false)} // Replace with your deletion logic
                            className="absolute -right-2 -top-2 z-10 flex h-6 w-6 items-center justify-center rounded-full bg-zinc-500 font-roboto text-[10px] text-white sm:right-2 md:right-[68px] lg:right-14"
                          >
                            X
                          </button>
                        </div>
                      ) : (
                        <label className="flex h-44 w-[80vw] flex-col items-center justify-center rounded-lg bg-[#D9D9D9] sm:h-48 sm:w-4/5 md:h-60 lg:h-72">
                          <div className="flex flex-col items-center justify-center pb-6 pt-5">
                            <GalleryIcon className="h-6 w-6 text-greenText sm:h-12 sm:w-12 md:h-16 md:w-16" />
                          </div>
                          <input
                            type="file"
                            className="hidden"
                            onChange={handleFileSelect3}
                          />
                        </label>
                      )}
                    </div>

                    <div className="mb-3 flex items-center justify-center">
                      <Field
                        type="text"
                        name="photoDescription3"
                        className="md:text-md text-center text-xs text-greenText sm:text-sm"
                        placeholder="Photo description"
                      />
                      <FaPen className="h-2 text-greenText" />
                      <ErrorMessage
                        name="photoDescription3"
                        component="div"
                        className="text-xs text-red-400 sm:text-sm"
                      />
                    </div>
                  </div>
                </div>
                <Field
                  as="textarea"
                  name="textField3"
                  className="rounded-xl border border-greenText pb-28 pl-3 pt-3 text-xs text-greenText shadow-lg sm:text-lg md:text-xl"
                  placeholder="Your description here"
                  rows="5"
                  // style={{ width: "100%", whiteSpace: "pre-wrap" }} // Ensure text wraps without scrolling
                />
                <ErrorMessage
                  name="textField3"
                  component="div"
                  className="text-red-400"
                />
              </div>
              {/* section 3 */}

              {/* end section3 */}

              <div className="mb-4 flex items-center justify-center space-x-4">
                <p className="inline-block bg-gradient-to-b from-heroMiddle to-greenText bg-clip-text text-center text-2xl font-bold leading-10 text-transparent sm:text-4xl">
                  รีวิวจากรุ่นพี่
                </p>
              </div>

              <section className="flex flex-col space-y-10">
                <div className="flex flex-col items-center justify-center space-y-5">
                  <div className="flex w-full items-start justify-around">
                    <div className="flex flex-col">
                      <div className="flex flex-col items-center justify-center">
                        {displayImage4 ? (
                          <div className="relative w-full">
                            <Image
                              className="mb-3 rounded-md h-12 w-12 sm:h-24 sm:w-24 md:h-36 md:w-36"
                              src={imageUrl4 || ""}
                              alt="photo4"
                              width={0}
                              height={0}
                            />
                            <button
                            onClick={() => setDisplayImage4(false)} // Replace with your deletion logic
                            className="absolute right-4 -top-2 z-10 flex h-6 w-6 items-center justify-center rounded-full bg-zinc-500 font-roboto text-[10px] text-white"
                          >
                            X
                          </button>
                          </div>
                        ) : (
                          <div className="flex w-full items-center justify-start">
                            <label className="flex h-12 w-12 flex-col items-center justify-center rounded-lg bg-[#D9D9D9] sm:h-24 sm:w-24 md:h-36 md:w-36">
                              <div className="flex flex-col items-center justify-center pb-6 pt-5">
                                <UserIcon className="h-3 w-3 sm:h-6 sm:w-6 text-greenText" />
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
                      <div className="mt-2 flex flex-col">
                        <Field
                          type="text"
                          name="P1Name"
                          className="w-16 text-sm sm:w-24 font-bold text-greenText sm:text-lg"
                          placeholder="ชื่อเล่น"
                        />
                        <ErrorMessage
                          name="P1Name"
                          component="div"
                          className="text-[8px] text-red-400"
                        />
                        <Field
                          type="text"
                          name="P1Gen"
                          className="w-16 text-[8px] text-heroMiddle sm:w-24 sm:text-sm"
                          placeholder="เตรียมอุุดม xx"
                        />
                        <ErrorMessage
                          name="P1Gen"
                          component="div"
                          className="text-[8px] text-red-400"
                        />
                        <Field
                          type="text"
                          name="P1Contact"
                          className="w-20 text-[8px] text-heroMiddle sm:w-32 sm:text-sm"
                          placeholder="contact"
                        />
                        <ErrorMessage
                          name="P1Contact"
                          component="div"
                          className="text-[8px] text-red-400"
                        />
                      </div>
                    </div>
                    <div className="flex w-3/5 flex-col items-center justify-center">
                      <Field
                        as="textarea"
                        name="textField4"
                        className="w-full rounded-xl border border-greenText pb-28 pl-3 pt-3 text-xs text-greenText shadow-lg sm:h-[30vh] sm:text-lg md:text-xl"
                        rows="5"
                        placeholder="รีวิวจากรุ่นพี่"
                      />
                      <ErrorMessage
                        name="textField4"
                        component="div"
                        className="text-red-300"
                      />
                    </div>
                  </div>
                </div>
                {ReviewAmount >= 2 && (
                  <div className="flex flex-col items-center justify-center space-y-3">
                    <div className="flex w-full items-start justify-around">
                      <div className="flex w-3/5 flex-col items-center justify-center">
                        <Field
                          as="textarea"
                          name="textField5"
                          className="w-full rounded-xl border border-greenText pb-28 pl-3 pt-3 text-xs text-greenText shadow-lg sm:h-[30vh] sm:text-lg md:text-xl"
                          rows="5"
                          placeholder="รีวิวจากรุ่นพี่"
                        />
                        <ErrorMessage
                          name="textField5"
                          component="div"
                          className="text-red-300"
                        />
                      </div>
                      <div className="flex flex-col items-end justify-end">
                        <div className="flex flex-col items-center justify-center">
                        {displayImage5 ? (
                          <div className="relative w-full">
                            <Image
                              className="mb-3 rounded-md h-12 w-12 sm:h-24 sm:w-24 md:h-36 md:w-36"
                              src={imageUrl5 || ""}
                              alt="photo5"
                              width={0}
                              height={0}
                            />
                            <button
                            onClick={() => setDisplayImage5(false)} // Replace with your deletion logic
                            className="absolute -right-2 -top-2 z-10 flex h-6 w-6 items-center justify-center rounded-full bg-zinc-500 font-roboto text-[10px] text-white"
                          >
                            X
                          </button>
                          </div>
                        ) : (
                          <div className="flex w-full items-center justify-end">
                            <label className="flex h-12 w-12 flex-col items-center justify-center rounded-lg bg-[#D9D9D9] sm:h-24 sm:w-24 md:h-36 md:w-36">
                              <div className="flex flex-col items-center justify-center pb-6 pt-5">
                                <UserIcon className="h-3 w-3 sm:h-6 sm:w-6 text-greenText" />
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
                        <div className="mt-2 flex flex-col items-end">
                          <Field
                            type="text"
                            name="P2Name"
                            className="w-16 text-end text-sm font-bold text-greenText sm:w-24 sm:text-lg"
                            placeholder="ชื่อเล่น"
                          />
                          <ErrorMessage
                            name="P2Name"
                            component="div"
                            className="text-[8px] text-red-400"
                          />
                          <Field
                            type="text"
                            name="P2Gen"
                            className="w-16 text-end text-[8px] text-heroMiddle sm:w-24 sm:text-sm"
                            placeholder="เตรียมอุุดม xx"
                          />
                          <ErrorMessage
                            name="P2Gen"
                            component="div"
                            className="text-[8px] text-red-400"
                          />
                          <Field
                            type="text"
                            name="P2Contact"
                            className="w-16 text-end text-[8px] text-heroMiddle sm:w-24 sm:text-sm"
                            placeholder="contact"
                          />
                          <ErrorMessage
                            name="P2Contact"
                            component="div"
                            className="text-[8px] text-red-400"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                {ReviewAmount === 3 && (
                  <div className="flex flex-col items-center justify-center space-y-3">
                    <div className="flex w-full items-start justify-around">
                      <div className="flex flex-col">
                        <div className="flex flex-col items-center justify-center">
                        {displayImage6 ? (
                          <div className="relative w-full">
                            <Image
                              className="mb-3 rounded-md h-12 w-12 sm:h-24 sm:w-24 md:h-36 md:w-36"
                              src={imageUrl6 || ""}
                              alt="photo6"
                              width={0}
                              height={0}
                            />
                            <button
                            onClick={() => setDisplayImage6(false)} // Replace with your deletion logic
                            className="absolute right-4 -top-2 z-10 flex h-6 w-6 items-center justify-center rounded-full bg-zinc-500 font-roboto text-[10px] text-white"
                          >
                            X
                          </button>
                          </div>
                        ) : (
                          <div className="flex w-full items-center justify-start">
                            <label className="flex h-12 w-12 flex-col items-center justify-center rounded-lg bg-[#D9D9D9] sm:h-24 sm:w-24 md:h-36 md:w-36">
                              <div className="flex flex-col items-center justify-center pb-6 pt-5">
                                <UserIcon className="h-3 w-3 sm:h-6 sm:w-6 text-greenText" />
                              </div>
                              <input
                                type="file"
                                className="hidden"
                                onChange={handleFileSelect6}
                              />
                            </label>
                          </div>
                        )}
                        </div>
                        <div className="mt-2 flex flex-col">
                          <Field
                            type="text"
                            name="P3Name"
                            className="w-16 text-sm font-bold text-greenText sm:w-24 sm:text-lg"
                            placeholder="ชื่อเล่น"
                          />
                          <ErrorMessage
                            name="P3Name"
                            component="div"
                            className="text-[8px] text-red-400"
                          />
                          <Field
                            type="text"
                            name="P3Gen"
                            className="w-16 text-[8px] text-heroMiddle sm:w-24 sm:text-sm"
                            placeholder="เตรียมอุุดม xx"
                          />
                          <ErrorMessage
                            name="P3Gen"
                            component="div"
                            className="text-[8px] text-red-400"
                          />
                          <Field
                            type="text"
                            name="P3Contact"
                            className="w-20 text-[8px] text-heroMiddle sm:w-32 sm:text-sm"
                            placeholder="contact"
                          />
                          <ErrorMessage
                            name="P3Contact"
                            component="div"
                            className="text-[8px] text-red-400"
                          />
                        </div>
                      </div>
                      <div className="flex w-3/5 flex-col items-center justify-center">
                        <Field
                          as="textarea"
                          name="textField6"
                          className="w-full rounded-xl border border-greenText pb-28 pl-3 pt-3 text-xs text-greenText shadow-lg sm:h-[30vh] sm:text-lg md:text-xl"
                          rows="5"
                          placeholder="รีวิวจากรุ่นพี่"
                        />
                        <ErrorMessage
                          name="textField6"
                          component="div"
                          className="text-red-300"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </section>
              <div className="my-10 flex w-full flex-col items-center space-y-3">
                {ReviewAmount !== 1 && (
                  <div
                    onClick={decrementReview}
                    className="flex h-8 w-8 items-center justify-center rounded-full shadow-xl"
                  >
                    <Trash className="h-3 w-3 sm:h-6 sm:w-6" />
                  </div>
                )}
                <div>
                  {ReviewAmount !== 3 && (
                    <button
                      type="button"
                      onClick={incrementReview}
                      className="mx-auto rounded-full bg-gradient-to-br from-buttonFirst via-buttonMiddle via-45% to-greenText px-2 py-1 text-center text-xs text-white sm:px-4 sm:py-2 sm:text-lg"
                    >
                      + เพิ่มรีวิวจากรุ่นพี่
                    </button>
                  )}
                </div>
              </div>
            </section>
          </Form>
        )}
      </Formik>
    </section>
  );
};

export default GeneralForm;
