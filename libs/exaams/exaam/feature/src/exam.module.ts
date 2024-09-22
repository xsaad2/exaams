import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ExamRoutingModule } from './exam-routing.module';
import { MarkdownPipe } from '@com.language.exams/shared/utils';

@NgModule({
    imports: [
        RouterModule,
        ExamRoutingModule,
    ],
    exports: [],
    declarations: [],
    providers: [MarkdownPipe],
})
export class ExamModule { }
