"use client";

import React from "react";
import { z } from "zod";
import { FormField } from "@/app/components/form";

interface ReusableFormProps {
  fields: FormField[];
  onSubmit: (data: Record<string, unknown>) => void;
  schema: z.ZodObject<z.ZodRawShape>;
}

const ReusableForm: React.FC<ReusableFormProps> = ({
  fields,
  onSubmit,
  schema,
}) => {
  const [formData, setFormData] = React.useState<Record<string, unknown>>({});
  const [formErrors, setFormErrors] = React.useState<Record<string, string>>(
    {}
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = schema.safeParse(formData);
    if (!result.success) {
      const errors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        if (err.path && err.path[0]) {
          errors[err.path[0] as string] = err.message;
        }
      });
      setFormErrors(errors);
    } else {
      setFormErrors({});
      const output: Record<string, unknown> = {};
      fields.forEach((field) => {
        let value = formData[field.name];
        if (!field.required && (value === "" || value === undefined)) {
          value = null;
        }
        output[field.name] = value;
      });
      onSubmit(output);
      setFormData({});
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;
    let newValue: unknown = value;

    if (type === "checkbox") {
      newValue = (e.target as HTMLInputElement).checked;
    } else if (type === "number") {
      newValue = value === "" ? undefined : Number(value);
    }
    const updatedFormData = { ...formData, [name]: newValue };
    setFormData(updatedFormData);

    try {
      schema.pick({ [name]: true }).parse({ [name]: newValue });
      setFormErrors((prev) => {
        const rest = { ...prev };
        delete rest[name];
        return rest;
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        setFormErrors((prev) => ({
          ...prev,
          [name]: error.errors[0]?.message,
        }));
      }
    }
  };

  return (
    <div className="p-6">
      <form onSubmit={handleSubmit}>
        <div className="flex flex-wrap gap-4">
          {fields.map((field) => (
            <div key={field.name} className="w-full md:w-[48%] mb-4">
              <div className="flex items-center gap-3">
                <label className="font-medium min-w-[100px] flex items-center">
                  {field.label}
                  {field.required && (
                    <span className="text-red-500 ml-1">*</span>
                  )}
                </label>
                <div className="flex-1 flex flex-col">
                  {field.type === "textarea" && (
                    <textarea
                      name={field.name}
                      placeholder={field.placeholder}
                      required={field.required}
                      onChange={handleChange}
                      value={
                        typeof formData[field.name] === "string" ||
                        typeof formData[field.name] === "number" ||
                        Array.isArray(formData[field.name])
                          ? (formData[field.name] as
                              | string
                              | number
                              | readonly string[])
                          : ""
                      }
                      rows={3}
                      className="border rounded px-2 py-1"
                    />
                  )}
                  {field.type === "checkbox" && (
                    <input
                      type="checkbox"
                      name={field.name}
                      checked={!!formData[field.name]}
                      onChange={handleChange}
                      className="h-5 w-5"
                    />
                  )}
                  {field.type === "radio" && field.option && (
                    <div className="flex gap-4">
                      {field.option.map((option) => (
                        <label
                          key={option.value}
                          className="flex items-center gap-1"
                        >
                          <input
                            type="radio"
                            name={field.name}
                            value={option.value}
                            checked={formData[field.name] === option.value}
                            required={field.required}
                            onChange={handleChange}
                            className="h-4 w-4"
                          />
                          {option.label}
                        </label>
                      ))}
                    </div>
                  )}
                  {field.type === "select" && (
                    <select
                      name={field.name}
                      required={field.required}
                      value={
                        typeof formData[field.name] === "string" ||
                        typeof formData[field.name] === "number" ||
                        Array.isArray(formData[field.name])
                          ? (formData[field.name] as
                              | string
                              | number
                              | readonly string[])
                          : ""
                      }
                      onChange={handleChange}
                      className="border rounded px-2 py-1"
                    >
                      <option value="">Select...</option>
                      {field.option?.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  )}
                  {["text", "email", "password", "number", "date"].includes(
                    field.type
                  ) && (
                    <input
                      type={field.type}
                      name={field.name}
                      placeholder={field.placeholder}
                      required={field.required}
                      value={
                        typeof formData[field.name] === "string" ||
                        typeof formData[field.name] === "number" ||
                        Array.isArray(formData[field.name])
                          ? (formData[field.name] as
                              | string
                              | number
                              | readonly string[])
                          : ""
                      }
                      onChange={handleChange}
                      className="border rounded px-2 py-1"
                    />
                  )}
                  {formErrors[field.name] && (
                    <div className="text-red-600 text-xs mt-1">
                      {formErrors[field.name]}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
        <button
          type="submit"
          className="mt-4 px-6 py-2 bg-blue-600 text-white rounded w-full md:w-auto"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default ReusableForm;
