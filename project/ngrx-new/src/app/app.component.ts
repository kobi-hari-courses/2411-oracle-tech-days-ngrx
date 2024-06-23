import { Component, inject } from '@angular/core';
import { SharedModule } from './shared.module';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { QuestionPresenterComponent } from './components/question-presenter/question-presenter.component';
import { Question } from './models/question.model';
import { ProgressComponent } from './components/progress/progress.component';
import { DoneComponent } from './components/done/done.component';
import { randomColorQuestion } from './services/helpers';
import { Store } from '@ngrx/store';
import { quizFeature } from './redux/quiz.feature';
import { map } from 'rxjs';
import { userActions } from './redux/user.actions';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [SharedModule, ToolbarComponent, QuestionPresenterComponent, ProgressComponent, DoneComponent],
})
export class AppComponent {
  readonly store = inject(Store);

  readonly question$ = this.store.select(quizFeature.selectCurrentQuestion);
  readonly totalQuestions$ = this.store.select(quizFeature.selectQuestionsCount);
  readonly currentIndex$ = this.store.select(quizFeature.selectCurrentQuestionIndex);
  readonly done$ = this.store.select(quizFeature.selectQuizDone);
  readonly correctCount$ = this.store.select(quizFeature.selectCorrectCount);

  reset() {
    const a = userActions.reset();
    this.store.dispatch(a);
  }

  answerCurrentQuestion(userAnswer: number) {
    const a= userActions.answerCurrentQuestion({userAnswer});
    this.store.dispatch(a);
  }

}

