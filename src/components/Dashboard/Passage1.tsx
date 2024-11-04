'use client'

import Image from 'next/image'
import React, { useEffect, useRef } from 'react'
import Quill from 'quill'

import 'quill/dist/quill.snow.css'

import * as Emoji from 'quill2-emoji'

import 'quill2-emoji/dist/style.css'

Quill.register('modules/emoji', Emoji)

const Passage1 = ({ type, data, setFieldValue, errors, touched }: any) => {
  const quillRef = useRef<HTMLDivElement>(null)
  const editorRef = useRef<Quill | null>(null)
  const toolbarOptions = [
    [{ header: [1, 2, 3, false] }],
    ['bold', 'italic', 'underline', 'emoji'],
    [{ list: 'ordered' }, { list: 'bullet' }, { list: 'check' }, { align: [] }],
    [{ script: 'sub' }, { script: 'super' }],
    [{ indent: '-1' }, { indent: '+1' }],
    [{ direction: 'rtl' }],
  ]

  useEffect(() => {
    if (!editorRef.current && quillRef.current) {
      // Check if the editor is not yet initialized
      editorRef.current = new Quill(quillRef.current as HTMLDivElement, {
        theme: 'snow',
        modules: {
          toolbar: toolbarOptions,
          'emoji-toolbar': true,
        },
      })

      // Initialize Quill with current content
      editorRef.current!.root.innerHTML = data.activities || ''

      // Update Formik state on content change
      editorRef.current!.on('text-change', () => {
        setFieldValue('activities', editorRef.current!.root.innerHTML)
      })
    }
  }, [setFieldValue, data.activities])

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFieldValue('descimg1', e.target.value) // Update Formik state for description
  }

  return (
    <>
      <div className="mx-44 mt-12 flex justify-between">
        <div>
          {(() => {
            switch (type) {
              case 'organization':
                return (
                  <>
                    <p className="text-6xl font-semibold text-[#0C453E]">องค์กร</p>
                    <p className="text-4xl font-semibold text-[#0C453E]">ทำอะไร</p>
                  </>
                )
              case 'club':
                return (
                  <>
                    <p className="text-6xl font-semibold text-[#0C453E]">ชมรมนี้</p>
                    <p className="text-4xl font-semibold text-[#0C453E]">ทำอะไร</p>
                  </>
                )
              case 'program':
              case 'gifted':
                return (
                  <>
                    <p className="text-4xl font-semibold text-[#0C453E]">การรับสมัคร</p>
                    <p className="text-6xl font-semibold text-[#0C453E]">และ</p>
                    <p className="text-4xl font-semibold text-[#0C453E]">การสอบเข้า</p>
                  </>
                )
              default:
                return ''
            }
          })()}
        </div>

        <div className="flex flex-col text-center">
          <div className="mb-28 ml-14 h-[300px] w-[500px] rounded-2xl">
            <div className="overflow-hidden rounded-2xl">
              <Image src={data.captureimg1} alt="img1" width={500} height={300} />
            </div>
            <input
              type="text"
              className="placeholder: mt-3 text-center font-BaiJamjuree text-[16px] font-light text-[#0C453E]"
              value={data.descimg1}
              onChange={handleDescriptionChange}
              placeholder="กรุณาใส่คำอธิบายรูปภาพ"
              required
            />
            {errors.descimg1 && touched.descimg1 && (
              <div className="text-red-600">{errors.descimg1}</div>
            )}
          </div>
        </div>
      </div>

      <div
        className="mx-44 overflow-hidden rounded-lg border"
        onClick={() => editorRef.current?.focus()}
      >
        <div
          ref={quillRef}
          className="quill-editor mt-6 min-h-[300px] max-w-[797.344px] cursor-text p-10 font-BaiJamjuree text-[16px] font-semibold"
        ></div>
        <div className="text-center">
          {errors.activities && touched.activities && (
            <div className="text-red-600">{errors.activities}</div>
          )}
        </div>
      </div>
    </>
  )
}

export default Passage1
