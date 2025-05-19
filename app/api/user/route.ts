import { UserSchema, UserType } from "@/app/models/users";

import { NextResponse } from "next/server";

const users: UserType[] = [
  {
    name: "Srinu",
    email: "srinu@example.com",
    password: "secret",
    phone: "9876543210",
    address: "Hyderabad",
    dob: "1995-05-20",
    bio: "Tech Enthusiast",
    gender: "Male",
    role: "Admin",
    receiveNewsletter: true,
    annualIncome: 300000,
  },
  {
    name: "Vasu",
    email: "vasu@example.com",
    password: "123456",
    phone: "9876543211",
    address: "Vijayawada",
    dob: "1997-09-10",
    bio: null,
    gender: "Male",
    role: "User",
    receiveNewsletter: false,
    annualIncome: 150000,
  },
];

export async function GET() {
  return NextResponse.json(users.map((user) => UserSchema.parse(user)));
}
