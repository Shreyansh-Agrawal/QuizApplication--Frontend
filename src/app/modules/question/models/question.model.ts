export interface Question {
  question_id?: string;
  question_text: string;
  question_type: string;
  created_by?: string;
  options: {
    answer: string;
    other_options: string[];
  };
}
