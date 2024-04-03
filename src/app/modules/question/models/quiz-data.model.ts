import { Question } from './question.model';

export interface QuizData {
  category_id: string;
  category: string;
  created_by: string;
  question_data: Question[];
}
