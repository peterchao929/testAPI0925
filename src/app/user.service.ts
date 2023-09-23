import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { User } from './user';
import { MessagesService } from './messages.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(
    private http: HttpClient,
    private messageService: MessagesService
  ) {}

  private log(message: string) {
    this.messageService.add(`UserService:${message}`);
  }

  // Api Url
  private userUrl = 'https://localhost:7169/api/UserDatas';

  // 定義其標頭
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  // 取得使用者清單
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.userUrl).pipe(
      tap((_) => this.log('使用者獲取中')),
      catchError(this.handleError<User[]>('getUsers', []))
    );
  }

  // 對應錯誤發生時的處理函式
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);

      this.log(`${operation} failed: ${error.message}`);

      return of(result as T);
    };
  }
}
