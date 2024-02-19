import { createEditable } from '@editable-text/editor';
import '@editable-text/editor/dist/style.css';
import history from '@editable-text/history';

const editor = createEditable('#editor', {
  placeholder: 'Type here...',
  plugins: [history],
});

// @ts-ignore
console.log(editor, 'Example app running');
