import { Injectable } from '@angular/core'
import { Observable } from 'rxjs/Observable'
import { interval } from 'rxjs/observable/interval'
import { of } from 'rxjs/observable/of'
import { _throw } from 'rxjs/observable/throw'
import {
  concat,
  distinctUntilKeyChanged,
  multicast,
  startWith,
  switchMap,
  take,
  takeWhile,
} from 'rxjs/operators'
import { ReplaySubject } from 'rxjs/ReplaySubject'
import { Task } from '../models/task'

@Injectable()
export class PredictionsService {

  private fakeTasksDb = new Map<number, Task>()

  constructor() { }

  runPrediction(structure: string, frequency: number = 10000): Observable<Task> {

    return this.createTask(structure).pipe(
      // once task created, get its details every X seconds
      switchMap((task: Task) => {
        const task$ = interval(frequency).pipe(
          startWith({}), // force to fetch once before waiting X seconds
          switchMap(() => this.getTask(task.id)),
          // only emit new values
          distinctUntilKeyChanged('progress'),
        )

        return task$.pipe(multicast(
          () => new ReplaySubject(1),
          t$ => t$.pipe(
            takeWhile(t => t.status !== 'done'),
            concat(t$.pipe(take(1))),
          ),
        ))
      }),
    )
  }

  // Fake method mocking HTTP creation
  private createTask(structure: string): Observable<Task> {
    const t: Task = {
      id: this.fakeTasksDb.size + 1,
      structure,
      progress: 0,
      status: 'pending',
    }

    this.fakeTasksDb.set(t.id, t)

    return of(t)
  }

  // Fake method mocking HTTP reading
  private getTask(id: number): Observable<Task> {
    if (this.fakeTasksDb.has(id)) {
      let t = this.fakeTasksDb.get(id)

      if (t.progress < 100) {
        t = { ...t, progress: t.progress + 20 }
        if (t.progress === 100) t.status = 'done'
        this.fakeTasksDb.set(t.id, t)
      }
      console.log('Got task', t)
      return of(t)
    } else {
      return _throw('404 NOT FOUND')
    }
  }

}
