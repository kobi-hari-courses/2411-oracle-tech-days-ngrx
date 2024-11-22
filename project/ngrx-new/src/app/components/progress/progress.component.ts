import { Component, computed, input } from '@angular/core';
import { SharedModule } from '../../shared.module';

@Component({
    selector: 'app-progress',
    imports: [SharedModule],
    templateUrl: './progress.component.html',
    styleUrl: './progress.component.scss'
})
export class ProgressComponent {
  readonly value = input.required<number>();

  readonly of = input.required<number>();

  readonly ratio = computed(() => this.value() / this.of());

}
