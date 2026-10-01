import { Metadata } from 'next';
import { EditorShell } from '@/components/editor/EditorShell';

export const metadata: Metadata = {
  title: 'Editor | Visual Site Builder',
  description: 'Interactive visual site builder editor demo',
};

export default function EditorDemoPage() {
  return <EditorShell />;
}
