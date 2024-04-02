import { Question } from "./question";

export interface QuizData {
    category_id: string;
    category: string;
    created_by: string;
    question_data: Question[];
  }
  