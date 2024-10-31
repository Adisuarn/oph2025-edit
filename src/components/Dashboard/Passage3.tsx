'use client'
import React, { useEffect, useRef } from 'react'
import Image from 'next/image';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';
import * as Emoji from "quill2-emoji";
import 'quill2-emoji/dist/style.css';
Quill.register("modules/emoji", Emoji);

const Passage3 = ({ type, data, setFieldValue, errors, touched }: any) => {
  const quillRef = useRef<HTMLDivElement>(null);
  const editorRef = useRef<Quill | null>(null); // Add a ref for the Quill editor instance
  const toolbarOptions = [
    [{ header: [1, 2, 3, false] }],
    ['bold', 'italic', 'underline', 'emoji'],
    [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'list': 'check' }, { 'align': [] }],
    [{ 'script': 'sub' }, { 'script': 'super' }],
    [{ 'indent': '-1' }, { 'indent': '+1' }],
    [{ 'direction': 'rtl' }]
  ]

  useEffect(() => {
    if (!editorRef.current && quillRef.current) { // Check if the editor is not yet initialized
      editorRef.current = new Quill(quillRef.current as HTMLDivElement, {
        theme: 'snow',
        modules: {
          toolbar: toolbarOptions,
          'emoji-toolbar': true,
        },
      });

      editorRef.current!.root.innerHTML = data.working || '';

      editorRef.current!.on('text-change', () => {
        setFieldValue('working', editorRef.current!.root.innerHTML);
      });
    }
  }, [setFieldValue, data.working]);

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFieldValue('descimg3', e.target.value); // Update Formik state for description
  };      // Update Formik state on content change



  return (
    <>
      <div className="flex justify-between mt-24 mx-44">
        <div>
          {(() => {
            switch (type) {
              case 'organization':
                return (
                  <>
                    <p className="text-6xl font-semibold text-[#0C453E]">ผลงาน</p>
                    <p className="text-4xl font-semibold text-[#0C453E]">ขององค์กร</p>
                  </>
                );
              case 'club':
                return (
                  <>
                    <p className="text-6xl font-semibold text-[#0C453E]">ผลงาน</p>
                    <p className="text-4xl font-semibold text-[#0C453E]">ของชมรม</p>
                  </>
                );
              case 'program':
                return (
                  <>
                    <p className="text-4xl font-semibold text-[#0C453E]">ความน่าสนใจ</p>
                    <p className="text-2xl font-semibold text-[#0C453E]">ของสายการเรียน</p>
                  </>
                )
              case 'gifted':
                return (
                  <>
                    <p className="text-4xl font-semibold text-[#0C453E]">ความน่าสนใจ</p>
                    <p className="text-2xl font-semibold text-[#0C453E]">ของสายการเรียน</p>
                  </>
                )
              case 'default':
                return ''
            }
          })()}
        </div>
        <div className="flex flex-col text-center">
          <div className="rounded-2xl ml-14 w-[500] h-[300] mb-10">
            <div className="rounded-2xl overflow-hidden">
              <Image src={data.captureimg3} alt="img3" width={500} height={300} />
            </div>
            <input
              type="text"
              className="mt-3 font-BaiJamjuree text-[#0C453E] text-[16px] font-light placeholder: text-center"
              value={data.descimg3}
              onChange={handleDescriptionChange}
              placeholder="กรุณาใส่คำอธิบายรูปภาพ"
              required
            />
            {errors.descimg3 && touched.descimg3 && <div className="text-red-600">{errors.descimg3}</div>}
          </div>
        </div>
      </div>
      <div className="mx-44 border rounded-lg overflow-hidden" onClick={() => editorRef.current?.focus()}>
        <div ref={quillRef} className="quill-editor mt-6 cursor-text font-BaiJamjuree text-[16px] font-semibold p-10 max-w-[797.344px] min-h-[300px]" />
        <div className="text-center">
          {errors.working && touched.working && <div className="text-red-600">{errors.working}</div>}
        </div>
      </div>
    </>
  )
}

export default Passage3
