"use client";

import { Formik, Form, Field, ErrorMessage } from "Formik";
import * as Yup from "yup";
import { useState, useEffect } from "react";
import Image from "next/image";
//import TextError from '../FormControl/TextError';

const initialValues = {
  textField1: "",
  textField2: "",
  textField3: "",
};

const validationSchema = Yup.object({
  textField1: Yup.string().required("Required Description"),
  textField2: Yup.string().required("Required Description"),
  textField3: Yup.string().required("Required Description"),
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

  const [image, setImage] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];

      if (!selectedFile.type.startsWith("image/")) {
        alert("Please select a valid image file (png, jpg, jpeg).");
        return;
      }

      setImage(selectedFile);
    }
  };

  useEffect(() => {
    if (image) {
      const imageUrl = URL.createObjectURL(image);
      setImageUrl(imageUrl);
      return () => URL.revokeObjectURL(imageUrl);
    }
  }, [image]);

const OrganizatonForm: React.FC<{}> = () => {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ isSubmitting }) => (
        <Form className="flex flex-col items-center justify-center space-y-4 bg-blue-100 p-5">
          <div>
            <label htmlFor="textField1">องค์กรนี้ทำอะไร:</label>
            <Field
              type="text"
              name="textField1"
              className="rounded-xl bg-green-200"
            />
            <ErrorMessage name="textField1" />
          </div>

          <div>
            <label htmlFor="textField2">ตำแหน่งหน้าที่:</label>
            <Field
              type="text"
              name="textField2"
              className="rounded-xl bg-green-200"
            />
            <ErrorMessage name="textField2" />
          </div>

          <div>
            <label htmlFor="textField3">ผลงานขององค์กร:</label>
            <Field
              type="text"
              name="textField3"
              className="rounded-xl bg-green-200"
            />
            <ErrorMessage name="textField3" />
          </div>

          <div>
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
                    <span className="font-semibold">Click to upload</span> or
                    drag and drop
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
            <Image  src={imageUrl || ""} alt="photo2" width={80} height={64} />
          </div>

          <button type="submit" disabled={isSubmitting}>
            Submit
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default OrganizatonForm;
