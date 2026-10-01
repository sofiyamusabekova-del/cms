'use client';

import React, { useState, useRef, useEffect } from 'react';

interface InlineTextEditProps {
  value: string;
  onChange: (newValue: string) => void;
  className?: string;
  style?: React.CSSProperties;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
  multiline?: boolean;
  placeholder?: string;
}

export const InlineTextEdit: React.FC<InlineTextEditProps> = ({
  value,
  onChange,
  className = '',
  style,
  as: Component = 'span',
  multiline = false,
  placeholder = 'Нажмите для ввода текста...',
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState(value);
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);

  useEffect(() => {
    setDraft(value);
  }, [value]);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  const handleStartEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsEditing(true);
  };

  const handleSave = () => {
    setIsEditing(false);
    if (draft.trim() !== value) {
      onChange(draft);
    }
  };

  const handleCancel = () => {
    setDraft(value);
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !multiline) {
      e.preventDefault();
      handleSave();
    } else if (e.key === 'Escape') {
      e.preventDefault();
      handleCancel();
    }
  };

  if (isEditing) {
    if (multiline) {
      return (
        <textarea
          ref={inputRef as React.RefObject<HTMLTextAreaElement>}
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onBlur={handleSave}
          onKeyDown={handleKeyDown}
          onClick={(e) => e.stopPropagation()}
          style={style}
          className={`${className} outline-none ring-2 ring-indigo-500 bg-white dark:bg-zinc-800 rounded-md p-1.5 shadow-md w-full resize-none`}
          rows={3}
        />
      );
    }

    return (
      <input
        ref={inputRef as React.RefObject<HTMLInputElement>}
        type="text"
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        onBlur={handleSave}
        onKeyDown={handleKeyDown}
        onClick={(e) => e.stopPropagation()}
        style={style}
        className={`${className} outline-none ring-2 ring-indigo-500 bg-white dark:bg-zinc-800 rounded-md px-1.5 py-0.5 shadow-md w-full`}
      />
    );
  }

  return (
    <Component
      onClick={handleStartEdit}
      title="Нажмите дважды для редактирования текста"
      style={style}
      className={`${className} cursor-text hover:outline-dashed hover:outline-1 hover:outline-indigo-400/80 rounded transition-all group/text relative`}
    >
      {value || (
        <span className="text-zinc-400 italic opacity-60">
          {placeholder}
        </span>
      )}
    </Component>
  );
};
