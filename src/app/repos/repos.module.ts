import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReposComponent } from './repos.component';
import { ReposService } from './shared/repos.service';

@NgModule({
  declarations: [
    ReposComponent
  ],
  imports: [
    CommonModule
  ],
  providers: [
    ReposService
  ],
  exports: [
    ReposComponent
  ]
})
export class ReposModule { }
