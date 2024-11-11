import * as Emoji from 'quill2-emoji'

import 'quill2-emoji/dist/style.css'
import 'quill/dist/quill.snow.css'

import { useEffect, useRef, useState } from 'react'
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
          localStorage.setItem(field.name, formattedContent)
          form.setFieldValue(field.name, formattedContent, true)
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
