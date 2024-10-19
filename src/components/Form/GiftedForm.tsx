"use client"

import { Formik, Form, Field, ErrorMessage } from "Formik";
import * as Yup from "yup";

import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export default function GiftedForm(){
  return (
    <div className={inter.className}>
      <h1>สวัสดี</h1>
      <Formik
        initialValues={{ name: '', email: '', age: '', password: '' }}
        onSubmit={(values) => {
          console.log(values);
        }}
      >
        {({ isSubmitting }) => (
        <Form className="flex flex-col justify-center items-center">
          <div>
          <label htmlFor="name">Name</label>
          <Field type="text" id="name" name="name" className=" bg-cream pb-40 pr-28" />
          <ErrorMessage name="name" />
          </div>
          <div>
          <label htmlFor="email">Email</label>
          <Field type="email" id="email" name="email" />
          <ErrorMessage name="email" />
          </div>
          <div>
          <label htmlFor="age">Age</label>
          <Field type="number" id="age" name="age" />
          <ErrorMessage name="age" />
          </div>
          <div>
          <label htmlFor="password">Password</label>
          <Field type="password" id="password" name="password" />
          <ErrorMessage name="password" />
          </div>

          <input type="file" name="file" accept=".png"/>
          <button type="submit" disabled={isSubmitting}>Submit</button>
        </Form>
        )}
      </Formik>
    </div>


  )
}