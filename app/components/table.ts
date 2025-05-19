import { ReactNode } from "react";

export type Column<T> = {
  header: string;
  accessor: keyof T | ((row: T) => ReactNode);
};

export interface ReusableTableProps<T> {
  data: T[];
  columns: Column<T>[];
}
