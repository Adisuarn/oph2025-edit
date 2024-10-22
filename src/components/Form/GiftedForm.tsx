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
// import apiFunction from "../api";
// import { useRouter } from "next/router";

//const Router = useRouter();

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
  others: "Your Others here",
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

const onSubmit = async (
  values: typeof initialValues,
  {
    setSubmitting,
    resetForm,
  }: { setSubmitting: (isSubmitting: boolean) => void; resetForm: () => void },
) => {
  const userConfirmed = window.confirm("ยืนยันการส่งข้อมูลหรือไม่?");

  if (userConfirmed) {
    try {
      // await apiFunction("POST", "path", {
      //   textField1: values.textField1,
      // })
      //Router.push("/account")
      console.log(values);
    } catch (error) {
      console.error("Error updating status:", error);
    }
  }
};

const ProgrammeForm: React.FC<{ key: string }> = ({ key }) => {
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
    <main className="mx-10 mt-16 sm:mx-24">
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
                <div className="flex w-[80vw] justify-between">
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
                      disabled={isSubmitting}
                    >
                      ส่งการแก้ไข
                    </button>
                  </div>
                </div>
              </div>
            </section>

            <div className="mt-8 flex h-40 flex-col items-center justify-center space-y-2 rounded-2xl bg-gradient-to-br from-heroFirst via-heroMiddle to-greenText font-Thai text-xs text-white shadow-xl sm:h-60 sm:space-y-4 md:mx-auto md:w-3/5">
              <p className="sm:border-3 rounded-full border border-white px-6 py-1 text-lg font-extrabold sm:text-2xl">
                {key}
              </p>
              <p className="sm:text-lg">สายการเรียน 80 คน</p>
              <div className="sm:space-y-2">
                <div className="space-y-1 text-start sm:text-lg">
                  <div className="flex">
                    <p>IG: </p>
                    <Field
                      type="text"
                      name="IG"
                      className="sm:text-md bg-transparent text-center text-xs text-white"
                    />
                    <FaPen className="h-2 text-white" />
                  </div>
                  <div className="flex">
                    <p>FB: </p>
                    <Field
                      type="text"
                      name="FB"
                      className="sm:text-md bg-transparent text-center text-xs text-white"
                    />
                    <FaPen className="h-2 text-white" />
                  </div>
                  <div className="flex">
                    <p>อื่นๆ: </p>
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

            {/* section1 */}
            <div className="mt-3 flex flex-col sm:mt-5 md:mt-8 mb-14 md:mb-20">
              <div className="flex flex-col items-start justify-between sm:flex-row">
                <div className="flex bg-gradient-to-b from-heroMiddle to-greenText bg-clip-text text-xl font-bold text-transparent sm:w-2/5 sm:flex-col">
                  <p className="sm:text-3xl md:text-4xl lg:text-5xl">
                    การรับสมัคร
                  </p>
                  <p className="sm:text-5xl md:text-6xl lg:text-7xl">และ</p>
                  <p className="sm:text-3xl md:text-4xl lg:text-5xl">
                    การสอบเข้า
                  </p>
                </div>
                <div className="sm:w-[50vw] md:w-[60vw]">
                  {displayImage1 ? (
                    <div>
                      <input
                        type="file"
                        className="hidden"
                        onChange={handleFileSelect1}
                      />
                      <Image
                        className="mx-auto mb-3 h-44 w-[80vw] rounded-lg object-cover sm:h-48 sm:w-4/5 md:h-60 lg:h-72"
                        src={imageUrl1 || ""}
                        alt="uploaded photo"
                        width={0}
                        height={0}
                      />
                    </div>
                  ) : (
                    <div className="flex w-full items-center justify-center">
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
                    </div>
                  )}
                  <div className="mb-3 flex items-center justify-center">
                    <Field
                      type="text"
                      name="photoDescription1"
                      className="md:text-md text-center text-xs text-greenText sm:text-sm"
                    />
                    <FaPen className="h-2 text-greenText" />
                    <ErrorMessage
                      name="photoDescription1"
                      component="div"
                      className="text-red-400"
                    />
                  </div>
                </div>
              </div>
              <Field
                type="text"
                name="textField1"
                className="rounded-xl border border-greenText pb-28 pl-3 pt-3 text-xs text-greenText shadow-lg sm:text-lg md:text-xl"
              />
              <ErrorMessage
                name="textField1"
                component="div"
                className="text-red-400"
              />
            </div>
            {/* section 2 */}
            <div className="mt-3 flex flex-col sm:mt-5 md:mt-8 mb-14 md:mb-20">
              <div className="flex flex-col items-start justify-between sm:flex-row">
                <div className="sm:w-[50vw] md:w-[60vw]">
                  {displayImage1 ? (
                    <div>
                      <input
                        type="file"
                        className="hidden"
                        onChange={handleFileSelect1}
                      />
                      <Image
                        className="mx-auto mb-3 h-44 w-[80vw] rounded-lg object-cover sm:h-48 sm:w-4/5 md:h-60 lg:h-72"
                        src={imageUrl1 || ""}
                        alt="uploaded photo"
                        width={0}
                        height={0}
                      />
                    </div>
                  ) : (
                    <div className="flex w-full items-center justify-center">
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
                    </div>
                  )}
                  <div className="mb-3 flex items-center justify-center">
                    <Field
                      type="text"
                      name="photoDescription1"
                      className="md:text-md text-center text-xs text-greenText sm:text-sm"
                    />
                    <FaPen className="h-2 text-greenText" />
                    <ErrorMessage
                      name="photoDescription1"
                      component="div"
                      className="text-red-400"
                    />
                  </div>
                </div>
                <div className="flex bg-gradient-to-b from-heroMiddle to-greenText bg-clip-text text-xl font-bold text-transparent sm:w-2/5 sm:flex-col">
                  <p className="sm:text-3xl md:text-7xl">วิชา /</p>
                  <p className="sm:text-xl md:text-2xl">หลักสูตรเพิ่มเติม</p>
                  <p className="sm:text-xl md:text-2xl">ที่เรียน</p>
                </div>
              </div>
              <Field
                type="text"
                name="textField1"
                className="rounded-xl border border-greenText pb-28 pl-3 pt-3 text-xs text-greenText shadow-lg sm:text-lg md:text-xl"
              />
              <ErrorMessage
                name="textField1"
                component="div"
                className="text-red-400"
              />
            </div>
            {/* section 3 */}
            <div className="mt-3 flex flex-col sm:mt-5 md:mt-8 mb-14 md:mb-20">
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
                  {displayImage1 ? (
                    <div>
                      <input
                        type="file"
                        className="hidden"
                        onChange={handleFileSelect1}
                      />
                      <Image
                        className="mx-auto mb-3 h-44 w-[80vw] rounded-lg object-cover sm:h-48 sm:w-4/5 md:h-60 lg:h-72"
                        src={imageUrl1 || ""}
                        alt="uploaded photo"
                        width={0}
                        height={0}
                      />
                    </div>
                  ) : (
                    <div className="flex w-full items-center justify-center">
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
                    </div>
                  )}
                  <div className="mb-3 flex items-center justify-center">
                    <Field
                      type="text"
                      name="photoDescription1"
                      className="md:text-md text-center text-xs text-greenText sm:text-sm"
                    />
                    <FaPen className="h-2 text-greenText" />
                    <ErrorMessage
                      name="photoDescription1"
                      component="div"
                      className="text-red-400"
                    />
                  </div>
                </div>
              </div>
              <Field
                type="text"
                name="textField1"
                className="rounded-xl border border-greenText pb-28 pl-3 pt-3 text-xs text-greenText shadow-lg sm:text-lg md:text-xl"
              />
              <ErrorMessage
                name="textField1"
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

            <section className="flex flex-col md:space-y-4 sm:h-[40vh] sm:justify-around md:h-[60vh]">
              <div className="flex w-full items-center justify-around">
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
                            width: "2rem",
                            height: "2rem",
                            borderRadius: "1rem",
                          }}
                        />
                      </div>
                    ) : (
                      <div className="flex w-full items-center justify-center">
                        <label className="flex h-12 w-12 flex-col items-center justify-center rounded-lg bg-[#D9D9D9] sm:h-24 sm:w-24">
                          <div className="flex flex-col items-center justify-center pb-6 pt-5">
                            <UserIcon className="h-3w-3 text-greenText" />
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
                  <div className="mt-2">
                    <p className="text-sm font-bold text-greenText sm:text-lg">
                      ชื่อ
                    </p>
                    <p className="text-[8px] text-heroMiddle sm:text-sm">
                      เตรียมอุมดม xx
                    </p>
                    <p className="text-[8px] text-heroMiddle sm:text-sm">
                      ช่องทางการติดตาม
                    </p>
                  </div>
                </div>
                <Field
                  type="text"
                  name="textField4"
                  className="w-3/5 rounded-xl border border-greenText pb-28 pl-3 pt-3 text-xs text-greenText shadow-lg sm:text-lg md:text-xl"
                />
                <ErrorMessage name="textField4" className="text-red-300" />
              </div>

              {/* reviewP2 */}

              <div className="flex w-full items-center justify-around">
                <Field
                  type="text"
                  name="textField4"
                  className="w-3/5 rounded-xl border border-greenText pb-28 pl-3 pt-3 text-xs text-greenText shadow-lg sm:text-lg md:text-xl"
                />
                <ErrorMessage name="textField4" className="text-red-300" />
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
                            width: "2rem",
                            height: "2rem",
                            borderRadius: "1rem",
                          }}
                        />
                      </div>
                    ) : (
                      <div className="flex w-full items-center justify-center">
                        <label className="flex h-12 w-12 flex-col items-center justify-center rounded-lg bg-[#D9D9D9] sm:h-24 sm:w-24">
                          <div className="flex flex-col items-center justify-center pb-6 pt-5">
                            <UserIcon className="h-3w-3 text-greenText" />
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
                  <div className="mt-2">
                    <p className="text-sm font-bold text-greenText sm:text-lg">
                      ชื่อ
                    </p>
                    <p className="text-[8px] text-heroMiddle sm:text-sm">
                      เตรียมอุมดม xx
                    </p>
                    <p className="text-[8px] text-heroMiddle sm:text-sm">
                      ช่องทางการติดตาม
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </Form>
        )}
      </Formik>
    </main>
  );
};

export default ProgrammeForm;
