import { Control } from 'react-hook-form';
export default interface TaskComponentProps {
  fieldData: {
    label: string;
    binding: string;
    name: string;
    id: string;
    defaultValue: string;
    readOnly: boolean;
    required: boolean;
    maxLength: number;
    options: {
      text: string;
      value: string;
    }[];
  };
  errors: object;
  control?: Control;
  register: (Ref, RegisterOptions?) => void;
  type?: string;
  watch?: (names?: string | string[]) => void;
}
