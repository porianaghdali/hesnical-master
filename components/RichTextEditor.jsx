"use client";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Highlight from "@tiptap/extension-highlight";

export default function RichTextEditor({ value }) {
  const editor = useEditor({
    extensions: [StarterKit, Highlight],
    content: value,
    // onUpdate: ({ editor }) => onChange(editor.getHTML()),
  });

  if (!editor) return null;

  return (
    <div className="border rounded p-2 space-y-2">
      {/* نوار ابزار */}
      <div className="flex gap-2">
        <button className="boredr-2" onClick={() => editor.chain().focus().toggleBold().run()} variant="outline">
          B
        </button>
        <button className="boredr-2" onClick={() => editor.chain().focus().toggleItalic().run()} variant="outline">
          I
        </button>
        <button className="boredr-2" onClick={() => editor.chain().focus().toggleHighlight().run()} variant="outline">
          🎨
        </button>
      </div>

      {/* محتوای ویرایشگر */}
      <EditorContent editor={editor} className="min-h-[150px] outline-none border p-2 rounded" />
    </div>
  );
}
