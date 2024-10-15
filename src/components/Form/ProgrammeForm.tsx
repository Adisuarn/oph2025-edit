"use client";

import { Formik, Form, Field, ErrorMessage } from 'Formik';
import * as Yup from 'yup'
//import TextError from '../FormControl/TextError';



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

const ProgrammeForm: React.FC<{}> = () => {
  return (
    <main>
      <div className='bg-sky-400'>
        <button>ย้อนกลับ</button>
          <div className=' flex justify-around'>
            <p>สถานะ</p>
              <div>
                <button className='bg-grumpyGreen-300 mr-3 px-4 py-2 rounded-full'>preview</button>
                <button className='bg-grumpyGreen-300 px-4 py-2 rounded-full'>ส่งการแก้ไข</button>
              </div>
          </div>
      </div>

      <div className='bg-amber-300 flex flex-col justify-center items-center'>
        <p>สายการเรียน</p>
        <p>สายการเรียน จำนวนนักเรียน</p>  
        <p>IG</p>
        <p>FB</p>
        <p>อื่น ๆ</p>
      </div>      
      
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={onSubmit}
            >
              {({ isSubmitting }) => (
              <Form className=' flex flex-col justify-center items-center space-y-4 p-5 bg-blue-100'>
                <div className='flex flex-col'>
                  <div className='flex'>
                  <label htmlFor="textField1">การสมัครและการสอบเข้า:</label>
                  <div className=' size-44 bg-blue-800'></div>
                  </div>  
                  <Field type="text" name="textField1" className=' bg-green-200 rounded-xl h-52' />
                  <ErrorMessage name="textField1" />
                </div>

                <div className='flex flex-col'>
                  <div className='flex'>
                  <label htmlFor="textField2">วิชาหรือหลักสูตรที่เรียนเพิ่มเติม:</label>
                  <div className=' size-44 bg-blue-800'></div>
                  </div>  
                  <Field type="text" name="textField2" className=' bg-green-200 rounded-xl h-52' />
                  <ErrorMessage name="textField2" />
                </div>

                <div className='flex flex-col'>
                  <div className='flex'>
                  <label htmlFor="textField3">ความน่าสนใจ:</label>
                  <div className=' size-44 bg-blue-800'></div>
                  </div>  
                  <Field type="text" name="textField3" className=' bg-green-200 rounded-xl h-52' />
                  <ErrorMessage name="textField3" />
                </div>

                <button type="submit" disabled={isSubmitting}>
                Submit
                </button>
              </Form>
              )}
            </Formik>
            
      <section className='flex flex-col items-center'>
        <p>รีวิวจากรุ่นพี่</p>
        <div className='flex justify-around'>
            <div>
              <div className='size-44 bg-blue-800'></div>
              <p>ชื่อ</p>
              <p>รุ่น</p>
              <p>ช่องทางการติดตาม</p>
            </div>
            <div className='w-1/3'>
            มาบอกสูตรเด็ดของอาหารคลีนกันอีกแล้วจ้าอาหารคลีนไม่มีวันเอาท์แน่นอนสำหรับสาวๆที่รักสุขภาพต้องการห่างไกลจากเมนูที่ทำร้ายร่างกายแต่อะไรที่ไม่ดีต่อสุขภาพมักจะอร่อยอยู่เสมอๆอย่างเมนูผัดกะเพราที่ต้องเจอทุกมื้อกลางวันแต่สาวกอาหารคลีนไม่ต้องห่วงว่าจะอดกินกะเพราวันนี้มาแนะนำเมนูกะเพราไก่ไข่ดาวแบบฉบับอาหารคลีนเตรียมตัวเข้าครัวกันได้เลยมาบอกสูตรเด็ดของอาหารคลีนกันอีกแล้วจ้าอาหารคลีนไม่มีวันเอาท์แน่นอนสำหรับสาวๆที่รักสุขภาพต้องการห่างไกลจากเมนูที่ทำร้ายร่างกายแต่อะไรที่ไม่ดีต่อสุขภาพมักจะอร่อยอยู่เสมอๆอย่างเมนูผัดกะเพราที่ต้องเจอทุกมื้อกลางวันแต่สาวกอาหารคลีนไม่ต้องห่วงว่าจะอดกินกะเพราวันนี้มาแนะนำเมนูกะเพราไก่ไข่ดาวแบบฉบับอาหารคลีนเตรียมตัวเข้าครัวกันได้เลย
            </div>
        </div>
        <button>ไอคอนลบ</button>
      </section>

      <section className='flex flex-col items-center'>
        <p>รีวิวจากรุ่นพี่</p>
        <div className='flex justify-around'>
            <div className='w-1/3'>
            มาบอกสูตรเด็ดของอาหารคลีนกันอีกแล้วจ้าอาหารคลีนไม่มีวันเอาท์แน่นอนสำหรับสาวๆที่รักสุขภาพต้องการห่างไกลจากเมนูที่ทำร้ายร่างกายแต่อะไรที่ไม่ดีต่อสุขภาพมักจะอร่อยอยู่เสมอๆอย่างเมนูผัดกะเพราที่ต้องเจอทุกมื้อกลางวันแต่สาวกอาหารคลีนไม่ต้องห่วงว่าจะอดกินกะเพราวันนี้มาแนะนำเมนูกะเพราไก่ไข่ดาวแบบฉบับอาหารคลีนเตรียมตัวเข้าครัวกันได้เลยมาบอกสูตรเด็ดของอาหารคลีนกันอีกแล้วจ้าอาหารคลีนไม่มีวันเอาท์แน่นอนสำหรับสาวๆที่รักสุขภาพต้องการห่างไกลจากเมนูที่ทำร้ายร่างกายแต่อะไรที่ไม่ดีต่อสุขภาพมักจะอร่อยอยู่เสมอๆอย่างเมนูผัดกะเพราที่ต้องเจอทุกมื้อกลางวันแต่สาวกอาหารคลีนไม่ต้องห่วงว่าจะอดกินกะเพราวันนี้มาแนะนำเมนูกะเพราไก่ไข่ดาวแบบฉบับอาหารคลีนเตรียมตัวเข้าครัวกันได้เลย
            </div>
            <div>
              <div className='size-44 bg-blue-800'></div>
              <p>ชื่อ</p>
              <p>รุ่น</p>
              <p>ช่องทางการติดตาม</p>
            </div>
        </div>
        <button>ไอคอนลบ</button>
      </section>


    </main>
  );
};

export default ProgrammeForm