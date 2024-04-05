export interface QuizQuestion {
  question_id: string;
  question_text: string;
  question_type: string;
  options: string[];
  userResponse?: string;
}
