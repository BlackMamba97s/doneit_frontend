import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_URL } from '../constants/constant';
import { Todo } from '../components/todo/todo.component';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(private httpClient: HttpClient) { }


  createTodo(todo){
    return this.httpClient.post(`${API_URL}/create-todo`, todo)
  }

  getTodoList(){
    return this.httpClient.get<Todo[]>(`${API_URL}/get-todo-list`)
  }

  deleteTodo(todoId){
    return this.httpClient.delete(`${API_URL}/delete-todo/${todoId}`)
  }
}