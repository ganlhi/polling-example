import { ChangeDetectionStrategy, Component, Input } from '@angular/core'
import { Task } from '../../models/task'

@Component({
  selector: 'app-task-status',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <progress
      [value]="task?.progress"
      max="100"
      [ngClass]="{'done': task?.status === 'done'}"
    ></progress>
    <label>{{task?.structure}}</label>
  `,
  styles: [
    '.done { background-color: green; }',
  ],
})
export class TaskStatusComponent {
  @Input() task: Task
}
