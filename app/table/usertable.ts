// components/Table/TableColumnConfig.ts
import { Column } from "@/app/components/table";
import { UserType } from "@/app/models/users";

export const userColumns: Column<UserType>[] = [
  { header: "Name", accessor: "name" },
  { header: "Email", accessor: "email" },
  { header: "Phone", accessor: "phone" },
  { header: "DOB", accessor: "dob" },
  { header: "Gender", accessor: "gender" },
  { header: "Role", accessor: "role" },
  {
    header: "Annual Income",
    accessor: (row) => `₹ ${row.annualIncome.toLocaleString()}`,
  },
  {
    header: "Newsletter",
    accessor: (row) => (row.receiveNewsletter ? "Yes" : "No"),
  },
];
