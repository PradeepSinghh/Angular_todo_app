import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private apiUrl = 'http://localhost:3000/todos'; // Ensure your JSON server is running at this address

  constructor(private http: HttpClient) { }

  getTodos(): Observable<{ id: number, todo: string }[]> {
    return this.http.get<{ id: number, todo: string }[]>(this.apiUrl);
  }

  addTodo(todo: string): Observable<any> {
    return this.http.post(this.apiUrl, { todo });
  }

  deleteTodo(id: number): Observable<any> {
    const deleteUrl = `${this.apiUrl}/${id}`;
    return this.http.delete(deleteUrl);
  }

  updateTodo(id: number, todo: string): Observable<any> {
    const updateUrl = `${this.apiUrl}/${id}`;
    return this.http.put(updateUrl, { todo });
  }
}
