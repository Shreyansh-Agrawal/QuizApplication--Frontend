import { Component, OnInit, inject } from '@angular/core';
import { QuestionService } from '../../services/question.service';
import { QuizData } from '../../models/quiz-data.model';
import { Question } from '../../models/question.model';

interface AutoCompleteCompleteEvent {
  originalEvent: Event;
  query: string;
}

@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styleUrl: './question-list.component.css',
})
export class QuestionListComponent implements OnInit {
  quizData: QuizData[] = [];
  selectedCategory: QuizData | undefined;
  filteredCategories: QuizData[] = [];

  selectedQuestion: Question | undefined;
  filteredQuestions: Question[] = [];

  questionService = inject(QuestionService);

  ngOnInit() {
    this.questionService.getQuizData();
    this.questionService.questionList.subscribe({
      next: (res) => {
        // const quizData = res.map((item) => ({
        //   category_id: item.category_id,
        //   category: item.category,
        // }));
        this.quizData = res;
      },
    });
  }

  filterCategory(event: AutoCompleteCompleteEvent) {
    const filtered: QuizData[] = [];
    const query = event.query;

    for (const item of this.quizData) {
      if (item.category.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(item);
      }
    }
    console.log(filtered);

    this.filteredCategories = filtered;
  }

  filterQuestion(event: AutoCompleteCompleteEvent) {
    const filtered: Question[] = [];
    const query = event.query;

    for (const item of this.quizData) {
      for (const questionItem of item.question_data) {
        if (
          questionItem.question_text
            .toLowerCase()
            .indexOf(query.toLowerCase()) == 0
        ) {
          filtered.push(questionItem);
        }
      }
    }
    this.filteredQuestions = filtered;
  }
}
