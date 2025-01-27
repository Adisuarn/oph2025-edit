'use client'

import Image from 'next/image'
import React, { useEffect, useRef, useState } from 'react'
import Quill from 'quill'

import 'quill/dist/quill.snow.css'

import * as Emoji from 'quill2-emoji'

import 'quill2-emoji/dist/style.css'

Quill.register('modules/emoji', Emoji)

const Passage2 = ({ type, data, setFieldValue, errors, touched }: any) => {
  const quillRef = useRef<HTMLDivElement>(null)
  const editorRef = useRef<Quill | null>(null)
  const [imageLoaded, setImageLoaded] = useState(false)

  const toolbarOptions = [
    [{ header: [1, 2, 3, false] }],
    [{ color: [] }, { background: [] }],
    ['bold', 'italic', 'underline', 'emoji'],
    [{ list: 'ordered' }, { list: 'bullet' }, { list: 'check' }, { align: [] }],
    [{ script: 'sub' }, { script: 'super' }],
    [{ indent: '-1' }, { indent: '+1' }],
    [{ direction: 'rtl' }],
  ]

  useEffect(() => {
    if (!editorRef.current && quillRef.current) {
      const style = document.createElement('style');
      style.innerHTML = `
      .ql-editor {
        font-family: 'Noto Sans Thai', sans-serif;
      }
    `;
      document.head.appendChild(style);
      editorRef.current = new Quill(quillRef.current as HTMLDivElement, {
        theme: 'snow',
        modules: {
          toolbar: toolbarOptions,
          'emoji-toolbar': true,
          keyboard: {
            bindings: {
              tab: {
                key: 9,
                handler: function (range: any, context: any) {
                  editorRef.current!.insertText(range.index, '  ', Quill.sources.USER)
                  editorRef.current!.setSelection(range.index + 2, 0)
                  return false
                },
              },
              newline: {
                key: 13,
                handler: function (range: any, context: any) {
                  editorRef.current!.insertText(range.index, '\n', Quill.sources.USER)
                  editorRef.current!.setSelection(range.index + 1, 0)
                  return false
                },
              },
            },
          },
        },
      })

      editorRef.current!.root.innerHTML = data.benefits || ''

      editorRef.current!.on('text-change', () => {
        setFieldValue('benefits', editorRef.current!.root.innerHTML)
      })
    }
  }, [setFieldValue, data.benefits])

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFieldValue('descimg2', e.target.value)
  }

  const handleImageLoad = () => {
    setImageLoaded(true)
  }

  return (
    <>
      <div className="mx-44 mt-24 flex justify-between">
        <div className="flex flex-col text-center">
          <div className="relative mb-20 mr-14 h-[300px] w-[500px]">
            <div className="h-[300px] w-[500px]">
              <div
                className={`w-full h-full transition-opacity duration-500 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
              >
                <Image
                  src={data.captureimg2}
                  alt="img2"
                  fill
                  quality={100}
                  onLoad={handleImageLoad}
                  className="object-cover overflow-hidden rounded-2xl"
                />
              </div>
              {!imageLoaded && (
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform">
                  <div className="h-8 w-8 animate-spin rounded-full border-4 border-t-4 border-solid border-green-500"></div>
                </div>
              )}
            </div>
            <input
              type="text"
              className="placeholder: mt-3 w-full rounded-lg border text-center font-BaiJamjuree text-[16px] font-light text-[#0C453E]"
              value={data.descimg2}
              onChange={handleDescriptionChange}
              placeholder="กรุณาใส่คำอธิบายรูปภาพ"
              required
            />
            {errors.descimg2 && touched.descimg2 && (
              <div className="text-red-600">{errors.descimg2}</div>
            )}
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
                )
              case 'club':
                return (
                  <>
                    <p className="text-6xl font-semibold text-[#0C453E]">ประโยชน์</p>
                    <p className="text-4xl font-semibold text-[#0C453E]">ที่ได้รับ</p>
                    <p className="text-2xl font-semibold text-[#0C453E]">จากการเข้าชมรม</p>
                  </>
                )
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
      <div
        className="mx-44 mt-12 overflow-hidden rounded-lg border"
        onClick={() => editorRef.current?.focus()}
      >
        <div
          ref={quillRef}
          className="quill-editor mt-6 min-h-[300px] max-w-[797.344px] cursor-text p-10 font-BaiJamjuree text-[16px] font-semibold"
        />
        <div className="text-center">
          {errors.benefits && touched.benefits && (
            <div className="text-red-600">{errors.benefits}</div>
          )}
        </div>
      </div>
    </>
  )
}

export default Passage2
