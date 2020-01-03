import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user/user.model';
import { LoginAuthenticationService } from 'src/app/services/login-authentication.service';
import { Router } from '@angular/router';
import { MessageCode } from 'src/app/models/response-message/message-code';
import { ResponseMessage } from 'src/app/models/response-message/response-message';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  errorLogin: string
  errorCode: number
  user = new User('', '')
  responseMessage: ResponseMessage

  constructor(private loginAuth: LoginAuthenticationService, private router: Router) { }

  ngOnInit() {
    if (this.loginAuth.isUserLoggedIn()) {
      this.router.navigate(['home'])
    }
  }

  handleLogin() {
    console.log(this.user)
    this.loginAuth.executeLoginAuthentication(this.user).subscribe(
      data => {
        this.handleResponse(data);
      },
      error => {
        this.errorLogin = 'Impossibile effettuare il login. Ci scusiamo per il disagio.'
      }
    );
  }

  createUserSession() {
    sessionStorage.setItem("username", this.user.getUsername())
    sessionStorage.setItem("token", `Bearer ${this.responseMessage.token}`)
  }

  handleResponse(data) {
    this.responseMessage = data;
    this.errorCode = this.responseMessage.messageCode;
    switch (this.errorCode) {
      case MessageCode.INVALID_CREDENTIAL:
        console.log("nome utente o password errati")
        this.errorLogin = this.responseMessage.message
        break
      case MessageCode.SUCCESSFUL_LOGIN:
        console.log("Login effettuato con successo")
        console.log(this.responseMessage)
        this.createUserSession()
        this.router.navigate(['home'])
        break
    }
  }
}
