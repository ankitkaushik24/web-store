import {inject, Injectable} from '@angular/core';
import {Router} from "@angular/router";

interface IUser {
  username: string;
  password: string;
}

@Injectable({providedIn: 'root'})
export class UserService {
  #users = [{username: 'admin', password: 'admin'}, {username: 'user', password: 'user'}];

  private router = inject(Router);

  get currentUser() {
    let user = sessionStorage.getItem('currentUser');
    if (user) {
      return JSON.parse(user);
    }
    return null;
  }
  set currentUser(value) {
    sessionStorage.setItem('currentUser', value && JSON.stringify(value))
  }

  constructor() { }

  login(user: IUser) {
    if (this.isValidUser(user)) {
      this.currentUser = user;
      this.router.navigate(['/products'], {replaceUrl: true});
    }

    return { credentials: !!this.currentUser};

  }

  logout(): void {
    this.currentUser = null;
    this.router.navigateByUrl('/', {replaceUrl: true});
  }

  get isAdmin(): boolean {
    return this.currentUser?.username === 'admin';
  }

  get isUser(): boolean {
    return this.currentUser?.username === 'user';
  }

  private isValidUser(user: IUser) {
    return this.#users.some(({username, password}) => {
      return user.username === username && user.password === password;
    });
  }
}
