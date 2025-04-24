import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@com.language.exams/exaams/utils';
import { B1AnswersForm } from '@com.language.exams/exaams-backend/utils';

@Injectable({
  providedIn: 'root',
})
export class B1AttemptService {
  private apiUrl = `${environment.apiUrl}/attempts`;

  constructor(private http: HttpClient) {}

  createB1ExamAttempt(b1AnswersSubmission: B1AnswersForm) {
    return this.http.post(`${this.apiUrl}`, b1AnswersSubmission);
  }

  getB1ExamAttemptByExamIdAndUserId(examId: string, userId: string) {
    return this.http.get(`${this.apiUrl}/${examId}/user/${userId}`);
  }
}
