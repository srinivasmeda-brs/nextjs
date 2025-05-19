"use client";

import React from "react";
import { z } from "zod";
import ReusableForm from "@/app/components/ReusbleForm";
import { UserSchema } from "@/app/models/users";
import userFormField from "../form/userForm";

const UserFormPage = () => {
  const [submittedData, setSubmittedData] = React.useState<Record<
    string,
    unknown
  > | null>(null);

  const handleFormSubmit = async (values: Record<string, unknown>) => {
    try {
      UserSchema.parse(values);
      setSubmittedData(values);
      console.log("Form submitted successfully:", values);
    } catch (error) {
      if (error instanceof z.ZodError) {
        console.error("Validation errors:", error.errors);
      }
    }
  };

  return (
    <div>
      <h1 className="font-bold text-black text-2xl ml-6 mb-4 mt-6">
        User Form
      </h1>
      <ReusableForm
        fields={userFormField}
        schema={UserSchema}
        onSubmit={handleFormSubmit}
      />
      {submittedData && (
        <div className="mt-8 p-4 border rounded bg-gray-50">
          <h2 className="text-lg font-semibold mb-2">Submitted Data:</h2>
          <pre className="text-sm bg-gray-100 p-2 rounded overflow-x-auto">
            {JSON.stringify(submittedData, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
};

export default UserFormPage;
