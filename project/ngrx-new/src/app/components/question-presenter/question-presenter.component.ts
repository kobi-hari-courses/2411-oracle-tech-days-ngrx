import { Component, computed, input, output, signal } from '@angular/core';
import { Question } from '../../models/question.model';
import { SharedModule } from '../../shared.module';
import { FormsModule } from '@angular/forms';
import { toObservable } from '@angular/core/rxjs-interop';

@Component({
    selector: 'app-question-presenter',
    imports: [SharedModule, FormsModule],
    templateUrl: './question-presenter.component.html',
    styleUrl: './question-presenter.component.scss'
})
export class QuestionPresenterComponent {
  readonly question = input.required<Question>();

  readonly answered = output<number>();

  readonly userAnswer = signal<number | null>(null);
  readonly submittedAnswer = signal<number | null>(null);
  readonly isAnswered = computed(() => this.submittedAnswer() !== null);
  readonly canSubmit = computed(() => this.userAnswer() !== null && !this.isAnswered());

  constructor() {
    toObservable(this.question)
      .subscribe(_ => this.reset());
  }

  reset() {
    this.userAnswer.set(null);
    this.submittedAnswer.set(null);
  }

  submit() {
    if (this.isAnswered() === null) return;
    this.submittedAnswer.set(this.userAnswer());

    setTimeout(() => {
      this.answered.emit(this.submittedAnswer()!);
      
    }, 1500);


  }


}
