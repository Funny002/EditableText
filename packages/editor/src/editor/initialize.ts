import { isArray, isObject } from '@editable-text/utils';
import { EditorOptions } from '../interface';
import { logger } from '../utils';

function initToolbar(root: HTMLElement, opt: EditorOptions) {
  let toolbar: HTMLElement | null = null;
  let menu: any[] | null = null;

  function initToolbar(selectors: any = undefined, menuNav: any = undefined) {
    if (!selectors) {
      toolbar = document.createElement('div');
      root.appendChild(toolbar);
    } else {
      if (typeof selectors === 'string') {
        toolbar = document.querySelector(selectors);
        if (!toolbar) logger.warn('no Element found with selector: ' + selectors);
      } else {
        toolbar = selectors;
      }
    }
    if (toolbar) menu = menuNav;
  }

  if (opt.hasOwnProperty('toolbar')) {
    if (opt.toolbar) {
      if (isArray(opt.toolbar)) {
        initToolbar(undefined, opt.toolbar);
      } else if (isObject(opt.toolbar)) {
        const { selectors, menu } = opt.toolbar as any;
        initToolbar(selectors, menu);
      } else {
        initToolbar(opt.toolbar);
      }
    }
  } else {
    initToolbar();
  }

  return toolbar ? { dom: <HTMLElement>toolbar, menu: menu } : null;
}

export function initialize(root: HTMLElement, opt: EditorOptions) {
  root.classList.add('editor');
  //
  const toolbar = initToolbar(root, opt);
  if (toolbar) toolbar.dom.classList.add('editable-toolbar');

  const body = document.createElement('div');
  body.autofocus = opt.autoFocus || false;
  body.className = 'editable-body';
  body.contentEditable = 'true';
  root.appendChild(body);
  //
  return { body, root, toolbar };
}
