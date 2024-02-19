import { Logger } from '@editable-text/utils';

class MyLogger extends Logger {
  constructor(name: string) {
    super(name);
  }
}

export const logger = new MyLogger('Editable');
