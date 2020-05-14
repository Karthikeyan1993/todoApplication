import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {throwError, Observable} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {Todo} from './shared/model';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private readonly MOCK_URL = "./assets/mock/todos.json";

  constructor(private http: HttpClient) {
  }

  getAllTodos = (param?: any): Observable<Todo[]> => {
    return this.http.get<Todo[]>(`${this.MOCK_URL}`)
      .pipe(map((res) => res),
        catchError((error) => {
          console.log("Error while retrieving todos data", error);
          return throwError(error);
        }))
  }
}
