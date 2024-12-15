"use client";

import { useState, useEffect } from "react";
import { z } from "zod";
import Button from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { createWhitelistApplication, getWhitelistQuestions, updateQuestions } from "@/lib/actions";
import { Question } from "@/lib/types";
import { Switch } from "./ui/switch";
import { Checkbox } from "./ui/checkbox";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";

interface WhitelistFormProps {
  questions: Question[];
  isAdmin: boolean;
}

const WhitelistForm: React.FC<WhitelistFormProps> = ({ questions, isAdmin }) => {
  const [editableQuestions, setEditableQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [message, setMessage] = useState<{ text: string; success: boolean } | null>(null);
  const [editMode, setEditMode] = useState(false);
  const t = useTranslations("WhitelistPage");

  useEffect(() => {
    setEditableQuestions(questions);
  }, [questions]);

  const createSchema = () => {
    const schemaObj: Record<string, any> = {};
    editableQuestions.forEach((question) => {
      schemaObj[question.question] = question.required
        ? z.string().min(1, { message: t("filedRequired") })
        : z.string().optional();
    });
    return z.object(schemaObj);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (editMode) {
      const response = await updateQuestions(editableQuestions);
      setEditableQuestions(await getWhitelistQuestions());
      setEditMode(false);
      setMessage({ text: response.message, success: response.success });
    } else {
      const schema = createSchema();
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
    }
  };

  const handleChange = (question: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [question]: value }));
  };

  const handleLabelChange = (id: string, value: string) => {
    setEditableQuestions((prevQuestions) => prevQuestions.map((q) => (q.id === id ? { ...q, question: value } : q)));
  };

  const handlePlaceHolderChange = (id: string, value: string) => {
    setEditableQuestions((prevQuestions) => prevQuestions.map((q) => (q.id === id ? { ...q, placeholder: value } : q)));
  };

  const handleRemoveQuestion = (id: string) => {
    setEditableQuestions((prevQuestions) => prevQuestions.filter((q) => q.id !== id));
  };

  const handleAddQuestion = () => {
    const newQuestion: Question = {
      id: `new-${Date.now()}`, // Temporary ID until saved in the backend
      question: "",
      placeholder: "",
      required: false,
    };
    setEditableQuestions((prevQuestions) => [newQuestion, ...prevQuestions]);
  };

  const handleEditMode = () => {
    setEditMode((prev) => !prev);
  };

  return (
    <div className="px-4 py-6">
      <div className="flex justify-between">
        <h1 className="mb-6 text-3xl font-bold">{t("title")}</h1>
        {isAdmin && (
          <div className="flex items-center space-x-2">
            <Switch checked={editMode} onCheckedChange={handleEditMode} />
            <span className="text-lg">{t("editMode")}</span>
          </div>
        )}
      </div>

      {message && (
        <p className={`mb-4 text-lg ${message.success ? "text-green-500" : "text-red-500"}`}>{message.text}</p>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {editMode && (
          <div className="space-y-2">
            <Button type="button" intent="ghost" onClick={handleAddQuestion} className="p-2 text-blue-500">
              {t("addQuestion")}
            </Button>
          </div>
        )}

        {editableQuestions.map((question) => (
          <div key={question.id} className="space-y-2">
            <div className="flex items-center space-x-2">
              {editMode ? (
                <input
                  type="text"
                  value={question.question}
                  onChange={(e) => handleLabelChange(question.id, e.target.value)}
                  className={cn(
                    "flex h-10 min-h-10 w-full overflow-hidden rounded-md bg-transparent px-3 py-2 outline-none placeholder:text-white/50",
                    "ring-2 ring-white/5 ring-offset-zinc-950 focus-visible:ring-primary focus-visible:ring-offset-2",
                    "disabled:cursor-not-allowed disabled:opacity-50",
                    "resize-none",
                  )}
                />
              ) : (
                <label htmlFor={question.id} className="text-lg font-medium">
                  {question.question} {question.required && <span className="text-red-500">*</span>}
                </label>
              )}

              {editMode && (
                <div className="flex items-center space-x-2">
                  <Checkbox
                    defaultChecked={question.required}
                    onCheckedChange={(checked) =>
                      setEditableQuestions((prevQuestions) =>
                        prevQuestions.map((q) => (q.id === question.id ? { ...q, required: checked === true } : q)),
                      )
                    }
                  />
                  <span className="text-lg">{t("required")}</span>

                  <Button
                    type="button"
                    intent="ghost"
                    onClick={() => handleRemoveQuestion(question.id)}
                    className="p-2 text-red-500"
                  >
                    {t("remove")}
                  </Button>
                </div>
              )}
            </div>

            {editMode ? (
              <input
                id={question.id}
                value={question.placeholder || ""}
                onChange={(e) => handlePlaceHolderChange(question.id, e.target.value)}
                className={cn(
                  "flex h-10 min-h-10 w-full overflow-hidden rounded-md bg-transparent px-3 py-2 outline-none placeholder:text-white/50",
                  "ring-2 ring-white/5 ring-offset-zinc-950 focus-visible:ring-primary focus-visible:ring-offset-2",
                  "disabled:cursor-not-allowed disabled:opacity-50",
                  "resize-none",
                )}
              />
            ) : (
              <Textarea
                id={question.id}
                placeholder={question.placeholder}
                required={question.required}
                value={answers[question.question] || ""}
                onChange={(e) => handleChange(question.question, e.target.value)}
                className="resize-none"
              />
            )}

            {errors[question.question] && <p className="text-sm text-red-500">{errors[question.question]}</p>}
          </div>
        ))}

        <div className="flex justify-end pt-10">
          <Button type="submit" rounded="full">
            {editMode ? t("save") : t("submit")}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default WhitelistForm;
