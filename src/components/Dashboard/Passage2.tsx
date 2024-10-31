'use client'
import React, { useEffect, useRef } from 'react'
import Image from 'next/image';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';
import * as Emoji from "quill2-emoji";
import 'quill2-emoji/dist/style.css';
Quill.register("modules/emoji", Emoji);

const Passage2 = ({ type, data, setFieldValue }: any) => {
  const quillRef = useRef<HTMLDivElement>(null);
  const editorRef = useRef<Quill | null>(null); // Add a ref for the Quill editor instance

  const toolbarOptions = [
    [{ header: [1, 2, 3, false] }],
    ['bold', 'italic', 'underline', 'emoji'],
    [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'list': 'check' }, { 'align': []}],
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

      // Initialize Quill with current content
      editorRef.current!.root.innerHTML = data.benefits || '';

      // Update Formik state on content change
      editorRef.current!.on('text-change', () => {
        setFieldValue('benefits', editorRef.current!.root.innerHTML);
      });
    }
  }, [setFieldValue, data.benefits]);

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFieldValue('descimg2', e.target.value); // Update Formik state for description
  };


  return (
    <>
      <div className="flex justify-between mt-24 mx-44">
        <div className="flex flex-col text-center">
          <div className="rounded-2xl mr-14 w-[500px] h-[300px] mb-12">
            <div className="rounded-2xl overflow-hidden">
              <Image src={data.captureimg2} alt="img2" width={500} height={300} />
            </div>
            <input
              type="text"
              className="mt-3 font-BaiJamjuree text-[#0C453E] text-[16px] font-light placeholder: text-center"
              value={data.descimg2} 
              onChange={handleDescriptionChange}
              placeholder="กรุณาใส่คำอธิบายรูปภาพ"
              required
            />
          </div>
        </div>
        <div>
          {(() => {
            switch (type) {
              case 'organization':
                return (
                  <>
                    <p className="text-6xl font-semibold text-[#0C453E]">ตำแหน่ง</p>
                    <p className="text-4xl font-semibold text-[#0C453E]">/หน้าที่</p>
                  </>
                );
              case 'club':
                return (
                  <>
                    <p className="text-6xl font-semibold text-[#0C453E]">ประโยชน์</p>
                    <p className="text-4xl font-semibold text-[#0C453E]">ที่ได้รับ</p>
                    <p className="text-2xl font-semibold text-[#0C453E]">จากการเข้าชมรม</p>
                  </>
                );
              case 'program':
                return (
                  <>
                    <p className="text-6xl font-semibold text-[#0C453E]">วิชา /</p>
                    <p className="text-2xl font-semibold text-[#0C453E]">หลักสูตรเพิ่มเติม</p>
                    <p className="text-2xl font-semibold text-[#0C453E]">ที่เรียน</p>
                  </>
                )
              case 'gifted':
                return (
                  <>
                    <p className="text-6xl font-semibold text-[#0C453E]">วิชา /</p>
                    <p className="text-2xl font-semibold text-[#0C453E]">หลักสูตรเพิ่มเติม</p>
                    <p className="text-2xl font-semibold text-[#0C453E]">ที่เรียน</p>
                  </>
                )
              case 'default':
                return ''
            }
          })()}
        </div>
      </div>
      <div className="mx-44 border rounded-lg overflow-hidden mt-12">
        <div ref={quillRef} className="quill-editor mt-6 font-BaiJamjuree text-[16px] font-semibold p-10"></div>
      </div>
    </>
  )
}

export default Passage2
