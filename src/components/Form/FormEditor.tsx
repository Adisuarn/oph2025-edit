import * as Emoji from 'quill2-emoji'

import 'quill2-emoji/dist/style.css'
import 'quill/dist/quill.snow.css'

import { useEffect, useRef, useState } from 'react'
import Quill from 'quill'

Quill.register('modules/emoji', Emoji)

const toolbarOptions = [
  [{ header: [1, 2, 3, false] }],
  ['bold', 'italic', 'underline', 'emoji'],
  [{ list: 'ordered' }, { list: 'bullet' }, { list: 'check' }, { align: [] }],
  [{ script: 'sub' }, { script: 'super' }],
  [{ indent: '-1' }, { indent: '+1' }],
  [{ direction: 'rtl' }],
]

const QuillField: React.FC<{ field: any; form: any }> = ({ field, form }) => {
  const [isClient, setIsClient] = useState(false)
  const quillRef = useRef<HTMLDivElement>(null)
  const editorRef = useRef<Quill | null>(null)

  // Only run this on the client side
  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    if (isClient && quillRef.current && !editorRef.current) {
      editorRef.current = new Quill(quillRef.current, {
        theme: 'snow',
        modules: {
          toolbar: toolbarOptions,
          'emoji-toolbar': true,
        },
      })

      // Initialize the content of the editor
      editorRef.current.root.innerHTML = field.value || ''

      // Update form field on text change
      editorRef.current.on('text-change', () => {
        form.setFieldValue(field.name, editorRef.current!.root.innerHTML)
      })
    }

    // Cleanup on unmount
    return () => {
      if (editorRef.current) {
        editorRef.current.off('text-change')
      }
    }
  }, [isClient, field.value, form.setFieldValue, field.name])

  if (!isClient) {
    return <div>Loading...</div> // Or return null if you prefer
  }

  return (
    <div>
      <div ref={quillRef} />
    </div>
  )
}

export default QuillField
