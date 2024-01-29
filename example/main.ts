import { Editable } from '@editable-text/editor';
import history from '@editable-text/history';

const editor = new Editable('#editor', {
  placeholder: 'Type here...',
  plugins: [history],
});

// @ts-ignore
console.log(editor, 'Example app running');
