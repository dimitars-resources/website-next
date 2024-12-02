import { Question } from "../types";

export const mockQuestions: Question[] = [
  {
    id: "1",
    question: "What is your in-game name?",
    placeholder: "Enter your in-game name",
    required: true,
  },
  {
    id: "2",
    question: "How old are you?",
    placeholder: "Enter your age",
    required: true,
  },
  {
    id: "3",
    question: "How long have you been playing FiveM?",
    placeholder: "Enter duration (e.g., 2 years)",
    required: true,
  },
  {
    id: "4",
    question: "Describe your roleplay experience.",
    placeholder: "Provide details about your roleplay background",
    required: true,
  },
  {
    id: "5",
    question: "Why do you want to join our server?",
    placeholder: "Explain your motivation",
    required: true,
  },
  {
    id: "6",
    question: "What roles are you interested in?",
    placeholder: "e.g., Police, EMS, Civilian",
    required: false,
  },
  {
    id: "7",
    question: "Have you been banned from any other servers?",
    placeholder: "Yes or No",
    required: false,
  },
  {
    id: "8",
    question: "Provide a link to your previous roleplay profiles.",
    placeholder: "URL to your profile",
    required: false,
  },
  {
    id: "9",
    question: "How do you handle conflicts in roleplay?",
    placeholder: "Describe your conflict resolution approach",
    required: true,
  },
  {
    id: "10",
    question: "Are you willing to follow server rules and guidelines?",
    placeholder: "Yes or No",
    required: true,
  },
];
