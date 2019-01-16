import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { NewListComponent } from './new-list/new-list.component';
import { ShowListComponent } from './show-list/show-list.component';
import { ListComponent } from './list/list.component';
import { TaskComponent } from './task/task.component';
import { DataManagerService } from './data-manager.service';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    NewListComponent,
    ShowListComponent,
    ListComponent,
    TaskComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    DataManagerService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
