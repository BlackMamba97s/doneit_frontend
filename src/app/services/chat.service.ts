import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_URL } from '../constants/constant';
import { ChatMessage, SocketChatMessage } from '../models/chat-message';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private stompClient = null;
  private connected = false
  private interval;
  private status;
  private statusSubject: BehaviorSubject<string>

  socketChatMessage = new SocketChatMessage()
  socketChatMessageSubject = new BehaviorSubject<SocketChatMessage>(this.socketChatMessage)




  constructor(private httpClient: HttpClient) {
  }

  connect() {
    this.disconnect()
    let socket = new SockJS(`${API_URL}/gs-guide-websocket`);
    this.stompClient = Stomp.over(socket);
    const _this = this;
    _this.stompClient.connect({
      "Auth": sessionStorage.getItem("token")
    }, function (frame) {
      _this.stompClient.subscribe("/user/queue/reply", function (frame) {
        console.log(frame)
        let chatMessage = JSON.parse(frame.body)
        _this.updateSocketChatMessage(chatMessage)
      })
    })

  }

  reconnect() {
    let socket = new SockJS(`${API_URL}/gs-guide-websocket`);
    this.stompClient = Stomp.over(socket);
    const _this = this;
    _this.stompClient.connect({
      "Auth": sessionStorage.getItem("token")
    }, function (frame) {
      clearInterval(_this.interval)
      _this.stompClient.subscribe("/user/queue/reply", function (frame) {
        console.log(frame)
        let chatMessage = JSON.parse(frame.body)
        _this.updateSocketChatMessage(chatMessage)
      })
    })
  }



  disconnect() {
    if (this.stompClient != null) {
      this.stompClient.disconnect();
    }

  }

  sendChatMessage(dest, message) {

    this.stompClient.send("/app/send", {
    }, JSON.stringify({
      'userTo': dest,
      'content': message
    }));
  }

  updateSocketChatMessage(chatMessage) {
    this.socketChatMessageSubject.next(chatMessage)
  }




  // sendMessage(chatMessage) {
  //   return this.httpClient.post<any>(`${API_URL}/chat/send-message`, chatMessage);
  // }

  getConversation(username) {
    return this.httpClient.get<ChatMessage[]>(`${API_URL}/chat/get-conversation/${username}`);

  }
}
