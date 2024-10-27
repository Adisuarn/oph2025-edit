'use client'
import React, { useState, useEffect, useRef } from 'react'
import Image from 'next/image';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';

const Passage2 = ({ type, data }: any) => {
  const [editorHtml, setEditorHtml] = useState(data.data.benefits);
  const quillRef = useRef(null);

  useEffect(() => {
    if (quillRef.current) {
      const quill = new Quill(quillRef.current as unknown as HTMLElement, {
        theme: 'snow',
        modules: {
          toolbar: [
            [{ header: [1, 2, false] }],
            ['bold', 'italic', 'underline'],
            ['link', 'image'],
            ['clean'], // Remove formatting button
          ],
        },
      });

      quill.root.innerHTML = editorHtml;

      // Event listener for content change
      quill.on('text-change', () => {
        setEditorHtml(quill.root.innerHTML);
      });

      return () => {
        quill.disable(); // Clean up on unmount
      };
    }
  }, [editorHtml]);


  return (
    <>
      <div className="flex justify-between mt-24">
        <div className="flex flex-col text-center">
          <div className="rounded-2xl overflow-hidden mr-14 w-[500] h-[300]">
            <div className="rounded-2xl overflow-hidden">
              <Image src={data.data.captureimg2} alt="img1" width={500} height={300} />
            </div>
            <p className="mt-3 font-BaiJamjuree text-[#0C453E] text-[16px] font-light">{data.data.descimg2}</p>
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
      <p className="mt-6 font-BaiJamjuree text-[16px] font-semibold" dangerouslySetInnerHTML={{ __html: editorHtml }} />
    </>
  )
}

export default Passage2
