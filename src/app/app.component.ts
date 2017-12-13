import { Component } from '@angular/core'
import { Observable } from 'rxjs/Observable'
import { Task } from './models/task'
import { PredictionsService } from './services/predictions.service'

@Component({
  selector: 'app-root',
  template: `
    <p>
      <input #structure placeholder="Structure">
      <button type="button" (click)="predict(structure.value); structure.value = ''">Predict
      </button>
    </p>

    <ul>
      <li *ngFor="let task$ of tasks">
        <app-task-status [task]="task$ | async"></app-task-status>
      </li>
    </ul>
  `,
  styles: [],
})
export class AppComponent {
  tasks: Observable<Task>[] = []

  constructor(private service: PredictionsService) {}

  predict(structure: string) {
    this.tasks.push(
      this.service.runPrediction(structure, 3000),
    )
  }
}
