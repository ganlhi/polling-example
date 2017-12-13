import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'

import { AppComponent } from './app.component'
import { TaskStatusComponent } from './components/task-status/task-status.component'
import { PredictionsService } from './services/predictions.service'

@NgModule({
  declarations: [
    AppComponent,
    TaskStatusComponent,
  ],
  imports: [
    BrowserModule,
  ],
  providers: [PredictionsService],
  bootstrap: [AppComponent],
})
export class AppModule {}
