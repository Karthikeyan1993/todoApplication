import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Todo, TodoRequest } from './shared/model';
import { AppSettings } from './shared/AppSettings';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private readonly MOCK_URL = './assets/mock/todos.json';
  private readonly ALL_TODO_URL = 'api/v1/todos';
  private readonly SAVE_TODO_URL = 'api/v1/todo';
  private readonly UPDATE_TODO_URL = 'api/v1/todo';
  private readonly DELETE_TODO_URL = 'api/v1/todo/';
  private readonly FIND_TODO_URL = 'api/v1/todos/';

  constructor(private http: HttpClient) {}

  getAllTodos = (param?: any): Observable<Todo[]> => {
    return this.http
      .get<Todo[]>(AppSettings.APP_BASE_URL + `${this.ALL_TODO_URL}`)
      .pipe(
        map((res: Todo[]) => res),
        catchError((error) => {
          console.log('Error while retrieving todos data', error);
          return throwError(error);
        })
      );
  }

  saveTodo = (param?: TodoRequest): Observable<Todo> => {
    return this.http
      .post(AppSettings.APP_BASE_URL + `${this.SAVE_TODO_URL}`, param)
      .pipe(
        map((res: Todo) => res),
        catchError((error) => {
          console.log('Error while saving todo', error);
          return throwError(error);
        })
      );
  }

  updateTodo = (param?: Todo): Observable<Todo> => {
    return this.http
      .put(AppSettings.APP_BASE_URL + `${this.UPDATE_TODO_URL}`, param)
      .pipe(
        map((res: Todo) => res),
        catchError((error) => {
          console.log('Error while updating todo', error);
          return throwError(error);
        })
      );
  }

  deleteTodo = (param?: string) => {
    return this.http
      .delete(AppSettings.APP_BASE_URL + `${this.DELETE_TODO_URL}` + param)
      .pipe(
        map((res) => res),
        catchError((error) => {
          console.log('Error while deleting todo', error);
          return throwError(error);
        })
      );
  }

  findTodo = (param?: string): Observable<Todo> => {
    return this.http
      .get(AppSettings.APP_BASE_URL + `${this.FIND_TODO_URL}` + param)
      .pipe(
        map((res: Todo) => res),
        catchError((error) => {
          console.log('Error while finding todo', error);
          return throwError(error);
        })
      );
  }
}
