import { WithEditorFirst } from '../types';
import { Editor } from '../interface';

export const Apply: WithEditorFirst<Editor['apply']> = (editor, op) => {
  console.log(editor, op);
};
