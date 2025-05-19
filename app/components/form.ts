export type Options = {
  label: string;
  value: string;
};

export type FormField = {
  name: string;
  label: string;
  type:
    | "text"
    | "email"
    | "number"
    | "password"
    | "select"
    | "checkbox"
    | "radio"
    | "textarea"
    | "date";
  placeholder?: string;
  option?: Options[];
  required: boolean;
};
