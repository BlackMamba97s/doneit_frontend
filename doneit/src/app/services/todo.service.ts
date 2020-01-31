import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_URL } from '../constants/constant';
import { Todo } from '../components/todo/todo.component';
import { ResponseMessage } from '../models/response-message/response-message';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(private httpClient: HttpClient) { }


  createTodo(todo){
    return this.httpClient.post(`${API_URL}/create-todo`, todo)
  }

  getMyTodoList(state){
    return this.httpClient.get<Todo[]>(`${API_URL}/my-todo-list/`+state)
  }

  deleteTodo(todoId){
    return this.httpClient.delete(`${API_URL}/delete-todo/${todoId}`)
  }

  getTodo(todoId){
    return this.httpClient.get<Todo>(`${API_URL}/get-todo/${todoId}`)
  }

  updateTodo(todo){
    return this.httpClient.put<ResponseMessage>(`${API_URL}/update-todo`,todo)
  }

  getAllTodo(){
    return this.httpClient.get<any>(`${API_URL}/active-todo-list`)
  }

  sendProposal(todo){
    return this.httpClient.post<any>(`${API_URL}/create-proposal`, todo)
  }

  acceptProposal(todo,proposalId){
    return this.httpClient.post<any>(`${API_URL}/accept-proposal/`+proposalId,todo)
  }

  refuseProposal(proposalId){
    return this.httpClient.put<any>(`${API_URL}/refuse-proposal/` + proposalId,null)
  }

  undoRefuseProposal(proposalId){
    return this.httpClient.put<any>(`${API_URL}/undo-refuse-proposal/` + proposalId,null)
  }

  undoAcceptProposal(todoId){
    return this.httpClient.put<any>(`${API_URL}/undo-accept-proposal/todo/` + todoId,null)
  }
}
