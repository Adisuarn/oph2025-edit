import * as Emoji from 'quill2-emoji'

import 'quill2-emoji/dist/style.css'
import 'quill/dist/quill.snow.css'

import { useEffect, useRef, useState } from 'react'
import { useFormStore, useReviewStore1, useReviewStore2, useReviewStore3 } from '@/store/formStore'
import Quill from 'quill'

Quill.register('modules/emoji', Emoji)


const toolbarOptions = [
  [{ header: [1, 2, 3, false] }],
  ['bold', 'italic', 'underline', 'emoji'],
  [{ color: [] }, { background: [] }],
  [{ list: 'ordered' }, { list: 'bullet' }, { list: 'check' }, { align: [] }],
  [{ script: 'sub' }, { script: 'super' }],
  [{ indent: '-1' }, { indent: '+1' }],
  [{ direction: 'rtl' }],
]

const QuillField: React.FC<{ field: any; form: any }> = ({ field, form }) => {
  const [isClient, setIsClient] = useState(false)
  const quillRef = useRef<HTMLDivElement>(null)
  const editorRef = useRef<Quill | null>(null)
  const updateForm = useFormStore((state) => state.updateForm)
  const updateReview1 = useReviewStore1((state) => state.updateReview)
  const updateReview2 = useReviewStore2((state) => state.updateReview)
  const updateReview3 = useReviewStore3((state) => state.updateReview)

  const handleFieldChange = (fieldName: string, value: any) => {
    updateForm({ [fieldName]: value })
  }

  const handleReviewChange = (count: number, fieldName: string, value: any) => { 
    switch (count) {
      case 1:
        updateReview1({ [fieldName]: value })
        break
      case 2:
        updateReview2({ [fieldName]: value })
        break
      case 3:
        updateReview3({ [fieldName]: value })
        break
      default:
        break
    }
  }

  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    if (isClient && quillRef.current) {
      const style = document.createElement('style');
      style.innerHTML = `
      .ql-editor {
        font-family: 'Noto Sans Thai', sans-serif;
      }
    `;
      document.head.appendChild(style);
      if (!editorRef.current) {
        editorRef.current = new Quill(quillRef.current, {
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
        editorRef.current.on('text-change', () => {
          const htmlContent = editorRef.current!.root.innerHTML
          const formattedContent = htmlContent.replace(/\n/g, '<br>')
          form.setFieldValue(field.name, formattedContent, true)
          if(field.name === 'textField1' || field.name === 'textField2' || field.name === 'textField3')
            handleFieldChange(field.name === 'textField1' ? 'text1' : field.name === 'textField2' ? 'text2' : field.name === 'textField3' ? 'text3' : '', formattedContent)
          if(field.name === 'textField4' || field.name === 'textField5' || field.name === 'textField6')
            if(field.name === 'textField4')
              handleReviewChange(1, 'content', formattedContent)
            else if(field.name === 'textField5')
              handleReviewChange(2, 'content', formattedContent)
            else if(field.name === 'textField6')
              handleReviewChange(3, 'content', formattedContent)
        })
      }

      if (field.value && editorRef.current.root.innerHTML !== field.value)
        editorRef.current.root.innerHTML = field.value

    }
  }, [isClient, field.value, form, field.name])

  if (!isClient) {
    return <div>Loading...</div>
  }

  return (
    <div>
    <div ref= { quillRef } />
    </div>
  )
}

export default QuillField
