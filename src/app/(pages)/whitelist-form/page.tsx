"use client";

import { useState } from "react";
import Button from "@/components/ui/button";
import { mockQuestions } from "@/lib/mock";
import { Textarea } from "@/components/ui/textarea";

const WhitelistForm = () => {
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitted answers:", answers);
  };

  const handleChange = (question: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [question]: value }));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-6 text-3xl font-bold">Whitelist Application</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        {mockQuestions.map((question) => (
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
              className="w-full"
            />
          </div>
        ))}
        <Button type="submit" className="w-full">
          Submit Application
        </Button>
      </form>
    </div>
  );
};

export default WhitelistForm;
