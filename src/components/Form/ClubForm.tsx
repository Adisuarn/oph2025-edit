"use client";

import { Formik, Form, Field, ErrorMessage } from 'Formik';
import * as Yup from 'yup'
//import TextError from '../FormControl/TextError';

// interface ClubFormProps {
//   name: string;
// }

const initialValues = {
  textField1: '',
  textField2: '',
  textField3: '',
}

const validationSchema = Yup.object({
  textField1: Yup.string().required('Required Description'),
  textField2: Yup.string().required('Required Description'),
  textField3: Yup.string().required('Required Description'),
})

const onSubmit = (values: typeof initialValues, { setSubmitting, resetForm }: { setSubmitting: (isSubmitting: boolean) => void, resetForm: () => void }) => {
  console.log('Form data', values);
  setSubmitting(false);
  resetForm();
};

const ClubForm: React.FC<{}> = (props) => {
  // const { name } = props;
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ isSubmitting }) => (
      <Form className=' flex flex-col justify-center items-center space-y-4 p-5 bg-blue-100'>
        <div>
          <label htmlFor="textField1">ชมรมนี้ทำอะไร:</label>
          <Field type="text" name="textField1" className=' bg-green-200 rounded-xl' />
          <ErrorMessage name="textField1" />
        </div>

        <div>
          <label htmlFor="textField2">ประโยชน์ที่ได้รับจากการเข้าชมรม:</label>
          <Field type="text" name="textField2" className=' bg-green-200 rounded-xl' />
          <ErrorMessage name="textField2" />
        </div>

        <div>
          <label htmlFor="textField3">ผลงานของชมรม:</label>
          <Field type="text" name="textField3" className=' bg-green-200 rounded-xl' />
          <ErrorMessage name="textField3" />
        </div>

        <button type="submit" disabled={isSubmitting}>
        Submit
        </button>
      </Form>
      )}
    </Formik>
  );
};

export default ClubForm