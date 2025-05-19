import { z } from "zod";

export const UserSchema = z.object({
  name: z.string().nonempty("Name is required"),
  email: z.string().email("Invalid email"),
  password: z.string().nonempty("Password is required"),
  phone: z
    .string()
    .nonempty("Phone Number is required")
    .regex(/^\d{10}$/, "Phone Number must be 10 digits"),
  address: z
    .string()
    .nonempty("Address is required")
    .regex(/[a-zA-Z]/, "Address must contain letters"),
  dob: z.string().nonempty("Date of Birth is required"),
  bio: z.string().nullable().optional(),
  gender: z.string().nonempty("Gender is required"),
  role: z.string().nonempty("Role is required"),
  receiveNewsletter: z.boolean().nullable().optional(),
  annualIncome: z.number().min(100000, "Annual Income must be at least 100000"),
});

export type UserType = z.infer<typeof UserSchema>;

export const addressSchema = z.object({
  address: z.string().nonempty("Address is required"),
  state: z.string().nonempty("State is required"),
  city: z.string().nonempty("City is required"),
  zipCode: z
    .number({ required_error: "Zip Code is required" })
    .refine((val) => /^\d{6}$/.test(val.toString()), {
      message: "Zip Code must be 6 digits",
    }),
});
