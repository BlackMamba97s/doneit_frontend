import { Component, OnInit } from '@angular/core';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { LoginAuthenticationService } from 'src/app/services/login-authentication.service';
import { PersonalCard } from 'src/app/models/personal-card/personal-card';
import { UserService } from 'src/app/services/user.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Url } from 'url';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  private username: string
  private personalCard = new PersonalCard()
  private imagePath: Url


  constructor(private route: ActivatedRoute,
    private userAuth: LoginAuthenticationService,
    private userService: UserService) {


  }

  ngOnInit() {
    this.userService.personalCardSubject.subscribe(
      personalCard => {
        this.updateUserInfoNav(personalCard)
      }

    )
    if (this.isUserLoggedIn()) {
      this.userService.getMyPersonalCard().subscribe()
    }
  }


  isUserLoggedIn() {
    this.username = sessionStorage.getItem("username")
    return this.userAuth.isUserLoggedIn()
  }

  updateUserInfoNav(personalCard) {
    this.personalCard = personalCard;
    if (this.personalCard.imageUrl) {
      this.imagePath = this.personalCard.imageUrl
    }
  }

}


