import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { IUserDetails } from '../../../models/user-details.model';
import { UserDetailsService } from '../../services/user-details';

@Injectable({ providedIn: 'root' })
export class UserResolver implements Resolve<IUserDetails[]> {
  constructor(private userService: UserDetailsService) {}

  resolve(): Observable<IUserDetails[]> {
    return this.userService.getUsers();
  }
}
