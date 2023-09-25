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

  // 測試完畢 CORS policy問題已從Chrome套件-Allow CORS解決
  // 取得使用者清單 GET
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.userUrl).pipe(
      tap((_) => this.log('使用者獲取中')),
      catchError(this.handleError<User[]>('getUsers', []))
    );
  }

  // 取得單一使用者 Get/ID
  getUser(id: number): Observable<User> {
    const url = `${this.userUrl}/${id}`;
    return this.http.get<User>(url).pipe(
      tap((_) => this.log(`抓到的UserID為：${id}`)),
      catchError(this.handleError<User>(`getUser id=${id}`))
    );
  }

  // 更新對應ID的User資料 PUT
  updateUser(id: number, user: User): Observable<any> {
    const url = `${this.userUrl}/${id}`;
    return this.http.put(url, user, this.httpOptions).pipe(
      tap((_) => this.log(`ID ${id} 資料已更新`)),
      catchError(this.handleError<User>('updateUser'))
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
