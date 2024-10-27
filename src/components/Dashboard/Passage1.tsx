'use client'
import React, {useState, useEffect, useRef} from 'react'
import Image from 'next/image';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';

const Passage1 = ({ type, data } : any ) => {
  const [editorHtml, setEditorHtml] = useState(data.data.activities);
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
      <div className="flex justify-between">
        <div>
          {(() => {
            switch (type) {
              case 'organization':
                return (
                  <>
                    <p className="text-6xl font-semibold text-[#0C453E]">องค์กร</p>
                    <p className="text-4xl font-semibold text-[#0C453E]">ทำอะไร</p>
                  </>
                );
              case 'club':
                return (
                  <>
                    <p className="text-6xl font-semibold text-[#0C453E]">ชมรมนี้</p>
                    <p className="text-4xl font-semibold text-[#0C453E]">ทำอะไร</p>
                  </>
                );
              case 'program':
                return (
                  <>
                    <p className="text-4xl font-semibold text-[#0C453E]">การรับสมัคร</p>
                    <p className="text-6xl font-semibold text-[#0C453E]">และ</p>
                    <p className="text-4xl font-semibold text-[#0C453E]">การสอบเข้า</p>
                  </>
                )
              case 'gifted':
                return (
                  <>
                    <p className="text-4xl font-semibold text-[#0C453E]">การรับสมัคร</p>
                    <p className="text-6xl font-semibold text-[#0C453E]">และ</p>
                    <p className="text-4xl font-semibold text-[#0C453E]">การสอบเข้า</p>
                  </>
                )
              case 'default':
                return ''
            }
          })()}
        </div>
        <div className="flex flex-col text-center">
          <div className="rounded-2xl overflow-hidden ml-14 w-[500] h-[300]">
            <div className="rounded-2xl overflow-hidden">
              <Image src={data.data.captureimg1} alt="img1" width={500} height={300} />
            </div>
            <p className="mt-3 font-BaiJamjuree text-[#0C453E] text-[16px] font-light">{data.data.descimg1}</p>
          </div>
        </div>
      </div>
      <p className="mt-6 font-BaiJamjuree text-[16px] font-semibold" dangerouslySetInnerHTML={{ __html: editorHtml }} />
    </>
  )
}

export default Passage1
