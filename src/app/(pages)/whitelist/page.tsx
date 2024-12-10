"use client";

import { useState } from "react";
import { z } from "zod";
import Button from "@/components/ui/button";
import { mockQuestions } from "@/lib/mock";
import { Textarea } from "@/components/ui/textarea";
import { createWhitelistApplication } from "@/lib/actions";

const createSchema = () => {
  const schemaObj: Record<string, any> = {};
  mockQuestions.forEach((question) => {
    schemaObj[question.question] = question.required
      ? z.string().min(1, { message: "This field is required." })
      : z.string().optional();
  });
  return z.object(schemaObj);
};

const WhitelistForm = () => {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [message, setMessage] = useState<{ text: string; success: boolean } | null>(null);

  const sortedQuestions = mockQuestions.sort((a, b) => (a.required === b.required ? 0 : a.required ? -1 : 1));
  const schema = createSchema();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = schema.safeParse(answers);

    if (!result.success) {
      const validationErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) validationErrors[err.path[0] as string] = err.message;
      });
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    const response = await createWhitelistApplication(result.data);
    setMessage({ text: response.message, success: response.success });
  };

  const handleChange = (question: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [question]: value }));
  };

  return (
    <div className="px-4 py-6">
      <h1 className="mb-6 text-3xl font-bold">Whitelist Application</h1>

      {message && (
        <p className={`mb-4 text-lg ${message.success ? "text-green-500" : "text-red-500"}`}>{message.text}</p>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {sortedQuestions.map((question) => {
          return (
            <div key={question.id} className="space-y-2">
              <label htmlFor={question.id} className="text-lg font-medium">
                {question.question} {question.required && <span className="text-red-500">*</span>}
              </label>

              <Textarea
                id={question.id}
                placeholder={question.placeholder}
                required={question.required}
                value={answers[question.question] || ""}
                onChange={(e) => handleChange(question.question, e.target.value)}
                className="resize-none"
              />
              {errors[question.question] && <p className="text-sm text-red-500">{errors[question.question]}</p>}
            </div>
          );
        })}

        <div className="flex justify-end pt-10">
          <Button type="submit" rounded="full">
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
};

export default WhitelistForm;
