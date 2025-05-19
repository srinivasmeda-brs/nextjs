import { FormField } from "../components/form";

const userFormField: FormField[] = [
  {
    name: "name",
    label: "Name",
    type: "text",
    placeholder: "Enter your name",
    required: true,
  },
  {
    name: "email",
    label: "Email",
    type: "email",
    placeholder: "Enter your email",
    required: false,
  },
  {
    name: "password",
    label: "Password",
    type: "password",
    placeholder: "Enter your password",
    required: true,
  },
  {
    name: "phone",
    label: "Phone Number",
    type: "text",
    placeholder: "Enter your phone number",
    required: true,
  },
  {
    name: "address",
    label: "Address",
    type: "text",
    placeholder: "Enter your address",
    required: true,
  },
  {
    name: "dob",
    label: "Date of Birth",
    type: "date",
    placeholder: "Select your date of birth",
    required: true,
  },
  {
    name: "bio",
    label: "Bio",
    type: "textarea",
    placeholder: "Tell us about yourself",
    required: false,
  },
  {
    name: "gender",
    label: "Gender",
    type: "radio",
    option: [
      { label: "Male", value: "male" },
      { label: "Female", value: "female" },
      { label: "Other", value: "other" },
    ],
    required: true,
  },
  {
    name: "role",
    label: "Role",
    type: "select",
    option: [
      { label: "Admin", value: "admin" },
      { label: "User", value: "user" },
      { label: "Guest", value: "guest" },
    ],
    required: true,
  },
  {
    name: "annualIncome",
    label: "Annual Income",
    type: "number",
    placeholder: "Enter your annual income",
    required: true,
  },

  {
    name: "receiveNewsletter",
    label: "Subscribe",
    type: "checkbox",
    required: false,
  },
];
export default userFormField;
