import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@com.language.exams/exaams/utils';
import { B1Exam } from '@prisma/client';
import {B1ExamWithTasks} from "@com.language.exams/exaams-backend/utils";

@Injectable({
  providedIn: 'root'
})
export class B1ExamService {
  private apiUrl = `${environment.apiUrl}/exaams`;

  constructor(private http: HttpClient) {}

  getAllB1Exams() {
    return this.http.get<B1ExamWithTasks[]>(this.apiUrl);
  }

  getB1ExamByName(name: string) {
    return this.http.get<B1ExamWithTasks>(`${this.apiUrl}/${name}`);
  }

  createB1Exam(exam: any, files: FormData): Observable<B1ExamWithTasks> {
    return this.http.post<B1ExamWithTasks>(this.apiUrl, files);
  }
}
