import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Question } from '../../models/question.model';
import { QuizData } from '../../models/quiz-data.model';
import { QuestionService } from '../../services/question.service';
import { FileUpload } from 'primeng/fileupload';

interface AutoCompleteCompleteEvent {
  originalEvent: Event;
  query: string;
}

interface UploadEvent {
  originalEvent: Event;
  currentFiles: File[];
}

@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styleUrl: './question-list.component.css',
})
export class QuestionListComponent implements OnInit {
  @ViewChild(FileUpload) fileUpload: FileUpload | undefined;
  quizData: QuizData[] = [];
  selectedCategory: QuizData | undefined;
  filteredCategories: QuizData[] = [];

  selectedQuestion: Question | undefined;
  filteredQuestions: Question[] = [];

  questionService = inject(QuestionService);

  confirmationService = inject(ConfirmationService);
  messageService = inject(MessageService);

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

  openCreateQuestionForm(categoryId?: string) {
    console.log(categoryId);
  }

  handleUpdateQuestion(question?: Question) {
    console.log(question);
  }

  handleDeleteQuestion(question?: Question) {
    this.confirmationService.confirm({
      // target: event.target as EventTarget,
      message: `Note: Deleted questions cannot be restored!`,
      header: `Are you sure you want to permanently delete: ${question?.question_text}?`,
      icon: 'pi pi-exclamation-triangle',
      acceptIcon: 'none',
      rejectIcon: 'none',
      acceptButtonStyleClass: 'p-button-danger p-button-text',
      rejectButtonStyleClass: 'p-button-text',
      accept: () => {
        this.questionService.deleteQuestion(question?.question_id);
        this.questionService.successSubject.subscribe({
          next: () => {
            this.questionService.getQuizData();
          },
        });
      },
      reject: () => {
        this.messageService.add({
          severity: 'info',
          summary: 'Question not deleted',
          life: 3000,
        });
      },
    });
  }

  confirmUpload(event: UploadEvent) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to upload the selected file?',
      accept: () => {
        this.uploadQuizData(event);
        this.fileUpload?.clear(); // Clear uploaded files after confirmation
      },
      reject: () => {
        this.fileUpload?.clear(); // Clear uploaded files if user cancels
      },
    });
  }

  uploadQuizData(event: UploadEvent) {
    for (const file of event.currentFiles) {
      this.readUploadedFile(file);
    }
  }

  readUploadedFile(file: File) {
    const reader = new FileReader();
    reader.onload = () => {
      const content = reader.result as string;
      const jsonData = JSON.parse(content);
      this.questionService.postQuizData(jsonData);
    };
    reader.readAsText(file);
  }

  downloadQuizData() {
    this.questionService.getQuizDataForDownload();
  }
}
