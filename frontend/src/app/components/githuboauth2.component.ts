import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { UserData } from '../models';
import { UserService } from '../user.service';

@Component({
  selector: 'app-oauth2',
  templateUrl: './githuboauth2.component.html',
  styleUrls: ['./githuboauth2.component.css'],
})
export class GithubOauth2Component implements OnInit {
  code!: string;
  state!: string;
  accessToken!: string;
  userData!: UserData;

  constructor(
    private http: HttpClient,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((params) => {
      this.code = params['code'];
      console.log(this.code);
      if (this.code) {
        this.userService.getGithubToken(this.code).subscribe((response) => {
          //  console.log('Response:', response);
          this.accessToken = response.access_token;
          // console.log('Access token:', this.accessToken);
          // post the token using getUser
          this.userService.getGithubUser(this.accessToken).subscribe((user) => {
            console.log('User:', user);
            this.userData = {
              login: user.login,
              id: user.id,
              html_url: user.html_url,
              avatar_url: user.avatar_url,
            };
            this.userService.setUserData(this.userData);
            // fake a delay
            setTimeout(() => {
              this.router.navigate(['/account']);
            }, 1500);
            console.log(user.login);
            console.log(user.id);
            console.log(user.html_url);
            console.log(user.avatar_url);
          });
        });
      } else {
        console.log('Code or state parameter is missing');
      }
    });
  }
}
