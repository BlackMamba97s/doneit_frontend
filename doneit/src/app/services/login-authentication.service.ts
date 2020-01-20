import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { MessageCode } from '../models/response-message/message-code';
import { ResponseMessage } from '../models/response-message/response-message';
import { API_URL } from '../constants/constant';

@Injectable({
  providedIn: 'root'
})
export class LoginAuthenticationService {

  constructor(private httpClient: HttpClient) { }


  executeLoginAuthentication(user){
    return this.httpClient.post<ResponseMessage>('http://localhost:8080/authenticate-user', user)
  }

  isUserLoggedIn(){
    return sessionStorage.getItem("username")
  }

  checkIfFirstLoginRequest(){
    return this.httpClient.get<any>(`${API_URL}/verify-first-login`)
  }

}
