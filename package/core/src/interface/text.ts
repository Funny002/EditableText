import { ExtendedType } from '../types';

export interface BaseText {
  text: string;
}

export type Text = ExtendedType<'Text', BaseText>

export interface TextInterface {

}

export const Text: TextInterface = {};
