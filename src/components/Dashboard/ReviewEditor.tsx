import React, { useEffect, useRef } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';
import * as Emoji from "quill2-emoji";
import 'quill2-emoji/dist/style.css';

Quill.register("modules/emoji", Emoji);

interface ReviewEditorProps {
  content: any;
  index: number;
  setFieldValue: (field: string, value: any) => void;
}

const ReviewEditor: React.FC<ReviewEditorProps> = ({ content, index, setFieldValue }) => {
  const quillRef = useRef<HTMLDivElement>(null);
  const editorRef = useRef<Quill | null>(null);

  useEffect(() => {
    if (!editorRef.current && quillRef.current) {
      editorRef.current = new Quill(quillRef.current as HTMLDivElement, {
        theme: 'snow',
        modules: {
          toolbar: [[{ header: [1, 2, false] }], ['bold', 'italic', 'underline', 'emoji'], [{ list: 'ordered' }, { list: 'bullet' }]],
          'emoji-toolbar': true,
        },
      });

      editorRef.current.root.innerHTML = content || '';

      editorRef.current.on('text-change', () => {
        setFieldValue(`reviews[${index}].content`, editorRef.current!.root.innerHTML);
      });
    }
  }, [setFieldValue, content, index]);
  return (
    <>
        <div ref={quillRef} className="quill-editor mt-4 p-2"></div>
    </>

  );
};

export default ReviewEditor;
