'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import Placeholder from '@tiptap/extension-placeholder';
import { TextAlign } from '@tiptap/extension-text-align';
import { Underline } from '@tiptap/extension-underline';
import { CharacterCount } from '@tiptap/extension-character-count';
import { TextStyle } from '@tiptap/extension-text-style';
import { Color } from '@tiptap/extension-color';
import { Highlight } from '@tiptap/extension-highlight';
import { Table } from '@tiptap/extension-table';
import { HorizontalRule } from '@tiptap/extension-horizontal-rule';
import { Superscript } from '@tiptap/extension-superscript';
import { Subscript } from '@tiptap/extension-subscript';
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import { common, createLowlight } from 'lowlight';
import { useState, useRef, useCallback } from 'react';
import {
  Bold, Italic, Strikethrough, Underline as UnderlineIcon,
  List, ListOrdered, Heading1, Heading2, Heading3, Heading4,
  Link as LinkIcon, Image as ImageIcon, Quote, Code,
  Undo, Redo, Upload, X, AlignLeft, AlignCenter, AlignRight, AlignJustify,
  Eye, EyeOff, Trash2, Highlighter, Palette, Type, Minus, Table as TableIcon,
  Superscript as SupIcon, Subscript as SubIcon, IndentIncrease, IndentDecrease,
  Maximize2, Minimize2, Search, Printer, FileText, Eraser
} from 'lucide-react';

const lowlight = createLowlight(common);

interface RichTextEditorProps {
  content: string;
  onChange: (content: string) => void;
  placeholder?: string;
  maxWords?: number;
}

export function RichTextEditor({
  content,
  onChange,
  placeholder = 'Write something amazing...',
  maxWords = 1000
}: RichTextEditorProps) {
  const [uploading, setUploading] = useState(false);
  const [showLinkInput, setShowLinkInput] = useState(false);
  const [linkUrl, setLinkUrl] = useState('');
  const [linkText, setLinkText] = useState('');
  const [showWordCount, setShowWordCount] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showFindReplace, setShowFindReplace] = useState(false);
  const [findText, setFindText] = useState('');
  const [replaceText, setReplaceText] = useState('');
  const [fontSize, setFontSize] = useState('normal');
  const [textColor, setTextColor] = useState('#000000');
  const [bgColor, setBgColor] = useState('#ffffff');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const linkInputRef = useRef<HTMLInputElement>(null);
  const editorRef = useRef<HTMLDivElement>(null);

  const fontSizeMap = {
    small: '12px',
    normal: '16px',
    large: '20px',
    huge: '28px',
  };

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2, 3, 4] },
        codeBlock: false,
      }),
      Underline,
      TextStyle,
      Color,
      Highlight.configure({ multicolor: true }),
      TextAlign.configure({ types: ['heading', 'paragraph'], alignments: ['left', 'center', 'right', 'justify'] }),
      Link.configure({ openOnClick: false, HTMLAttributes: { class: 'text-blue-600 underline', rel: 'noopener', target: '_blank' } }),
      Image.configure({ HTMLAttributes: { class: 'rounded-lg max-w-full my-3 shadow-sm' } }),
      Placeholder.configure({ placeholder }),
      CharacterCount.configure({ limit: maxWords }),
      Table.configure({ resizable: true }),
      TableRow,
      TableHeader,
      TableCell,
      HorizontalRule,
      Superscript,
      Subscript,
      CodeBlockLowlight.configure({ lowlight }),
    ],
    content,
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
    editorProps: {
      attributes: {
        class: 'prose prose-slate max-w-none min-h-[400px] px-5 py-4 focus:outline-none prose-headings:font-semibold prose-headings:text-slate-900 prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl prose-h4:text-lg prose-p:text-slate-700 prose-p:leading-relaxed prose-a:text-blue-600 prose-img:rounded-xl prose-img:shadow-sm prose-img:border prose-img:border-slate-200 prose-blockquote:border-l-4 prose-blockquote:border-blue-400 prose-blockquote:bg-slate-50 prose-blockquote:py-2 prose-blockquote:px-4 prose-code:bg-slate-100 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-code:text-blue-700 prose-pre:bg-slate-900 prose-pre:text-slate-100 prose-table:border-collapse prose-table:w-full prose-th:border prose-th:border-slate-300 prose-th:bg-slate-100 prose-th:p-2 prose-td:border prose-td:border-slate-300 prose-td:p-2',
      },
    },
  });

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) return alert('Only images');
    if (file.size > 5 * 1024 * 1024) return alert('Max 5MB');
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      const res = await fetch('/api/admin/upload-image', { method: 'POST', body: formData });
      const data = await res.json();
      if (data.success && data.url) editor?.chain().focus().setImage({ src: data.url }).run();
      else alert(data.error || 'Upload failed');
    } catch (err) { alert('Upload error'); }
    finally { setUploading(false); if (fileInputRef.current) fileInputRef.current.value = ''; }
  };

  const addLink = () => {
    if (!linkUrl) return;
    if (linkText) editor?.chain().focus().insertContent({ type: 'text', text: linkText, marks: [{ type: 'link', attrs: { href: linkUrl } }] }).run();
    else editor?.chain().focus().setLink({ href: linkUrl }).run();
    setLinkUrl(''); setLinkText(''); setShowLinkInput(false);
  };

  const removeLink = () => editor?.chain().focus().unsetLink().run();
  const insertImageFromUrl = () => { const url = prompt('Image URL:'); if (url) editor?.chain().focus().setImage({ src: url }).run(); };
  const clearContent = () => { if (confirm('Clear all?')) editor?.chain().focus().clearContent().run(); };
  const clearFormatting = () => editor?.chain().focus().clearNodes().unsetAllMarks().run();
  const insertTable = () => editor?.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run();
  const insertHorizontalRule = () => editor?.chain().focus().setHorizontalRule().run();
  const toggleFullscreen = () => setIsFullscreen(!isFullscreen);
  const printContent = () => { const win = window.open(); win?.document.write(editor?.getHTML() || ''); win?.print(); };
  const exportHtml = () => { const blob = new Blob([editor?.getHTML() || ''], { type: 'text/html' }); const url = URL.createObjectURL(blob); const a = document.createElement('a'); a.href = url; a.download = 'document.html'; a.click(); URL.revokeObjectURL(url); };
  const findAndReplace = () => { if (!findText) return; const content = editor?.getText() || ''; const newContent = content.replaceAll(new RegExp(findText, 'g'), replaceText); editor?.commands.setContent(newContent); };
  const setFontSizeStyle = (size: string) => { setFontSize(size); editor?.chain().focus().setMark('textStyle', { fontSize: fontSizeMap[size as keyof typeof fontSizeMap] }).run(); };
  const setTextColorStyle = (color: string) => { setTextColor(color); editor?.chain().focus().setColor(color).run(); };
  const setHighlightStyle = (color: string) => { setBgColor(color); editor?.chain().focus().toggleHighlight({ color }).run(); };
  const indent = () => editor?.chain().focus().sinkListItem('listItem').run();
  const outdent = () => editor?.chain().focus().liftListItem('listItem').run();

  const wordCount = editor?.storage.characterCount.words() || 0;
  const isLimitReached = wordCount >= maxWords;
  if (!editor) return null;

  const ToolbarButton = ({ icon: Icon, action, isActive = false, disabled = false, title }: any) => (
    <button type="button" onClick={action} disabled={disabled} className={`p-2 rounded-md transition focus:ring-2 focus:ring-blue-400 ${isActive ? 'bg-blue-100 text-blue-700' : 'text-slate-600 hover:bg-slate-100'} ${disabled ? 'opacity-40 cursor-not-allowed' : ''}`} title={title}>
      <Icon className="w-4 h-4" />
    </button>
  );
  const Divider = () => <div className="w-px h-6 bg-slate-200 mx-1" />;

  return (
    <div className={`border border-slate-200 rounded-xl overflow-hidden bg-white shadow-sm ${isFullscreen ? 'fixed inset-4 z-50 flex flex-col' : ''}`} ref={editorRef}>
      {/* Toolbar */}
      <div className="sticky top-0 z-10 flex flex-wrap items-center gap-0.5 p-2 border-b border-slate-200 bg-white max-h-[200px] overflow-y-auto">
        {/* Basic */}
        <ToolbarButton icon={Bold} action={() => editor.chain().focus().toggleBold().run()} isActive={editor.isActive('bold')} title="Bold" />
        <ToolbarButton icon={Italic} action={() => editor.chain().focus().toggleItalic().run()} isActive={editor.isActive('italic')} title="Italic" />
        <ToolbarButton icon={UnderlineIcon} action={() => editor.chain().focus().toggleUnderline().run()} isActive={editor.isActive('underline')} title="Underline" />
        <ToolbarButton icon={Strikethrough} action={() => editor.chain().focus().toggleStrike().run()} isActive={editor.isActive('strike')} title="Strikethrough" />
        <Divider />
        {/* Headings */}
        <ToolbarButton icon={Heading1} action={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} isActive={editor.isActive('heading', { level: 1 })} title="H1" />
        <ToolbarButton icon={Heading2} action={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} isActive={editor.isActive('heading', { level: 2 })} title="H2" />
        <ToolbarButton icon={Heading3} action={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} isActive={editor.isActive('heading', { level: 3 })} title="H3" />
        <ToolbarButton icon={Heading4} action={() => editor.chain().focus().toggleHeading({ level: 4 }).run()} isActive={editor.isActive('heading', { level: 4 })} title="H4" />
        <Divider />
        {/* Font size dropdown */}
        <select value={fontSize} onChange={(e) => setFontSizeStyle(e.target.value)} className="text-xs border border-slate-200 rounded-md px-2 py-1 bg-white">
          <option value="small">Small</option>
          <option value="normal">Normal</option>
          <option value="large">Large</option>
          <option value="huge">Huge</option>
        </select>
        {/* Color pickers */}
        <input type="color" value={textColor} onChange={(e) => setTextColorStyle(e.target.value)} className="w-7 h-7 rounded border cursor-pointer" title="Text color" />
        <input type="color" value={bgColor} onChange={(e) => setHighlightStyle(e.target.value)} className="w-7 h-7 rounded border cursor-pointer" title="Highlight color" />
        <ToolbarButton icon={Eraser} action={clearFormatting} title="Clear formatting" />
        <Divider />
        {/* Lists & alignment */}
        <ToolbarButton icon={List} action={() => editor.chain().focus().toggleBulletList().run()} isActive={editor.isActive('bulletList')} title="Bullet list" />
        <ToolbarButton icon={ListOrdered} action={() => editor.chain().focus().toggleOrderedList().run()} isActive={editor.isActive('orderedList')} title="Numbered list" />
        <ToolbarButton icon={AlignLeft} action={() => editor.chain().focus().setTextAlign('left').run()} isActive={editor.isActive({ textAlign: 'left' })} title="Left" />
        <ToolbarButton icon={AlignCenter} action={() => editor.chain().focus().setTextAlign('center').run()} isActive={editor.isActive({ textAlign: 'center' })} title="Center" />
        <ToolbarButton icon={AlignRight} action={() => editor.chain().focus().setTextAlign('right').run()} isActive={editor.isActive({ textAlign: 'right' })} title="Right" />
        <ToolbarButton icon={AlignJustify} action={() => editor.chain().focus().setTextAlign('justify').run()} isActive={editor.isActive({ textAlign: 'justify' })} title="Justify" />
        <Divider />
        {/* Indent/Outdent */}
        <ToolbarButton icon={IndentIncrease} action={indent} title="Increase indent" />
        <ToolbarButton icon={IndentDecrease} action={outdent} title="Decrease indent" />
        <Divider />
        {/* Sup/Sub */}
        <ToolbarButton icon={SupIcon} action={() => editor.chain().focus().toggleSuperscript().run()} isActive={editor.isActive('superscript')} title="Superscript" />
        <ToolbarButton icon={SubIcon} action={() => editor.chain().focus().toggleSubscript().run()} isActive={editor.isActive('subscript')} title="Subscript" />
        <Divider />
        {/* Blocks */}
        <ToolbarButton icon={Quote} action={() => editor.chain().focus().toggleBlockquote().run()} isActive={editor.isActive('blockquote')} title="Quote" />
        <ToolbarButton icon={Code} action={() => editor.chain().focus().toggleCodeBlock().run()} isActive={editor.isActive('codeBlock')} title="Code block" />
        <ToolbarButton icon={TableIcon} action={insertTable} title="Insert table" />
        <ToolbarButton icon={Minus} action={insertHorizontalRule} title="Horizontal rule" />
        <Divider />
        {/* Links, images, emoji */}
        <ToolbarButton icon={LinkIcon} action={() => setShowLinkInput(!showLinkInput)} isActive={editor.isActive('link')} title={editor.isActive('link') ? "Remove link" : "Add link"} />
        <ToolbarButton icon={ImageIcon} action={() => fileInputRef.current?.click()} title="Upload image" />
        <Divider />
        {/* Undo/Redo */}
        <ToolbarButton icon={Undo} action={() => editor.chain().focus().undo().run()} disabled={!editor.can().undo()} title="Undo" />
        <ToolbarButton icon={Redo} action={() => editor.chain().focus().redo().run()} disabled={!editor.can().redo()} title="Redo" />
        <Divider />
        {/* Find/Replace, Print, Export, Fullscreen */}
        <ToolbarButton icon={Search} action={() => setShowFindReplace(!showFindReplace)} title="Find & replace" />
        <ToolbarButton icon={Printer} action={printContent} title="Print" />
        <ToolbarButton icon={FileText} action={exportHtml} title="Export HTML" />
        <ToolbarButton icon={isFullscreen ? Minimize2 : Maximize2} action={toggleFullscreen} title="Fullscreen" />
        <ToolbarButton icon={Trash2} action={clearContent} title="Clear all" />
        <div className="ml-auto flex items-center gap-2">
          <button onClick={() => setShowWordCount(!showWordCount)} className="p-2 rounded-md text-slate-500 hover:bg-slate-100">{showWordCount ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}</button>
        </div>
      </div>

      {/* Link input */}
      {showLinkInput && (
        <div className="flex items-center gap-2 p-3 bg-slate-50 border-b">
          <input type="text" placeholder="Text (optional)" value={linkText} onChange={(e) => setLinkText(e.target.value)} className="flex-1 px-3 py-2 border rounded-md text-sm" />
          <input type="url" placeholder="URL" value={linkUrl} onChange={(e) => setLinkUrl(e.target.value)} className="flex-1 px-3 py-2 border rounded-md text-sm" onKeyDown={(e) => e.key === 'Enter' && addLink()} />
          <button onClick={addLink} className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm">Insert</button>
          <button onClick={() => setShowLinkInput(false)} className="p-2"><X className="w-4 h-4" /></button>
        </div>
      )}

      {/* Find/Replace */}
      {showFindReplace && (
        <div className="flex items-center gap-2 p-3 bg-slate-50 border-b">
          <input type="text" placeholder="Find" value={findText} onChange={(e) => setFindText(e.target.value)} className="px-3 py-2 border rounded-md text-sm w-40" />
          <input type="text" placeholder="Replace with" value={replaceText} onChange={(e) => setReplaceText(e.target.value)} className="px-3 py-2 border rounded-md text-sm w-40" />
          <button onClick={findAndReplace} className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm">Replace all</button>
          <button onClick={() => setShowFindReplace(false)} className="p-2"><X className="w-4 h-4" /></button>
        </div>
      )}

      <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />

      <EditorContent editor={editor} />

      {showWordCount && (
        <div className="flex flex-wrap items-center justify-between gap-2 px-4 py-2 border-t border-slate-100 bg-slate-50 text-xs text-slate-500">
          <span>{wordCount} / {maxWords} words • {editor?.storage.characterCount.characters()} chars {isLimitReached && <span className="text-red-600 ml-2">Limit reached</span>}</span>
          <button onClick={insertImageFromUrl} className="text-blue-600 hover:underline">Insert image from URL</button>
        </div>
      )}
    </div>
  );
}
