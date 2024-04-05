interface QuestionResponse {
  question_id: string;
  question_text: string;
  user_answer: string;
  correct_answer: string;
  is_correct: boolean;
}

export interface QuizResult {
  score: number;
  responses: QuestionResponse[];
}
