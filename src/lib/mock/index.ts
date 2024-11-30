import { Question } from "../types";

export const mockQuestions: Question[] = [
  {
    id: "1",
    question: "What is your name?",
    placeholder: "Enter your name",
    required: true,
  },
  {
    id: "2",
    question: "What is your email?",
    placeholder: "Enter your email",
    required: true,
  },
  {
    id: "3",
    question: "What is your age?",
    placeholder: "Enter your age",
    required: false,
  },
];
