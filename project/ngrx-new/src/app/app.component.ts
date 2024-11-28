import { Component, inject } from '@angular/core';
import { SharedModule } from './shared.module';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { QuestionPresenterComponent } from './components/question-presenter/question-presenter.component';
import { Question } from './models/question.model';
import { ProgressComponent } from './components/progress/progress.component';
import { DoneComponent } from './components/done/done.component';
import { randomColorQuestion } from './services/helpers';
import { Store } from '@ngrx/store';
import { quizFeature } from './store/quiz/quiz.feature';
import { userActions } from './store/user.actions';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    imports: [SharedModule, ToolbarComponent, QuestionPresenterComponent, ProgressComponent, DoneComponent]
})
export class AppComponent {
  readonly store = inject(Store);
  readonly currentQuestion$ = this.store
    .select(quizFeature.selectCurrentQuestion);
  readonly currentQuestionIndex$ = this.store
    .select(quizFeature.selectCurrentQuestionIndex);

  readonly isDone$ = this.store
    .select(quizFeature.selectIsDone);

  readonly isBusy$ = this.store
    .select(quizFeature.selectIsBusy);

  readonly questionsCount$ = this.store
    .select(quizFeature.selectQuestionsCount);

  readonly correctCount$ = this.store
    .select(quizFeature.selectCorrectAnswers);

  reset() {
    const action = userActions.reset();
    this.store.dispatch(action);
  }

  answerQuestion(userAnswer: number) {
    const action = userActions.answerCurrentQuestion({userAnswer});
    this.store.dispatch(action);
  }

  generateQuiz() {
    const action = userActions.generateQuiz();
    this.store.dispatch(action);
  }


  constructor() {
  }


}
