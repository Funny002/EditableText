import { Apply, Editor } from './';

export const create = () => {
  const editor: Editor = {
    children: [],
    apply: (...args) => Apply(editor, ...args),
  };
  return editor;
};
