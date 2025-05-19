"use client";

import { useEffect, useState } from "react";
import ReusableTable from "@/app/components/ReusbleTable";
import { userColumns } from "@/app/table/usertable";
import { UserType } from "@/app/models/users";

export default function UsersPage() {
  const [users, setUsers] = useState<UserType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/user")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">User List</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ReusableTable data={users} columns={userColumns} />
      )}
    </div>
  );
}
