// Types not related to fetch requests or Users
export type PostInputs = {
  'Your name': string;
  Email: string;
  Phone: string;
  Position: number;
  Image: FileList;
};

export type PostInputsKeys = keyof PostInputs;

export type InputField = {
  title: string;
  pattern: RegExp;
  minLenght: number;
  maxLenght: number;
  helper_text?: string;
};