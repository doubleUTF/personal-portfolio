import { NgModule } from '@angular/core';
import {SharedModule} from '../../shared/shared.module';
import {IssueTrackerRouting} from './issue-tracker.routing';
import {IssueTrackerComponent} from './issue-tracker.component';
import { ProjectListComponent } from './project-list/project-list.component';
import { IssueListComponent } from './issue-list/issue-list.component';
import { IssueComponent } from './issue/issue.component';
import {IssueTrackerService} from './issue-tracker.service';
import { NavbarComponent } from './navbar/navbar.component';
@NgModule({
  imports: [
    SharedModule,
    IssueTrackerRouting
  ],
  declarations: [
    IssueTrackerComponent,
    ProjectListComponent,
    IssueListComponent,
    IssueComponent,
    NavbarComponent,
  ],
  providers:[IssueTrackerService]
})
export class IssueTrackerModule { }
