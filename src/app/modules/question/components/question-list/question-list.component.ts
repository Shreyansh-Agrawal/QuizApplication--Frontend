import { Component, OnInit, inject } from '@angular/core';
import { QuestionService } from '../../../../core/services/question.service';

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
  categories: any[] = [];
  selectedCategory: string = '';
  filteredCategories: any[] = [];

  questions: any[] = [];
  selectedQuestion: string = '';
  filteredQuestions: any[] = [];

  questionService = inject(QuestionService);

  ngOnInit() {
    this.questionService.getQuizData();
    this.questionService.questionList.subscribe({
      next: (res) => {
        console.log(res);
        
        // const categories = res.map((item) => ({
        //   category_id: item.category_id,
        //   category: item.category,
        // }));
        this.categories = res;
      },
    });
  }

  filterCategory(event: AutoCompleteCompleteEvent) {
    const filtered: any[] = [];
    const query = event.query;
    console.log(event);
    console.log(query);

    for (const item of this.categories) {
      if (item.category.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(item);
      }
    }

    this.filteredCategories = filtered;
    console.log(this.filteredCategories);
    console.log(this.selectedCategory);
  }

  filterQuestion(event: AutoCompleteCompleteEvent) {
    const filtered: any[] = [];
    const query = event.query;
    console.log(event);
    console.log(query);

    for (const item of this.categories) {
      if (item.question.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(item);
      }
    }

    this.filteredQuestions = filtered;
    console.log(this.filteredQuestions);
    console.log(this.selectedQuestion);
  }
}
