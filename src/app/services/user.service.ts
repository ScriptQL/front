import { Injectable } from '@angular/core';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  userList: User[] = [
    {id: '1', name: 'Claudio', email: '', group: 'Manager', status: 'active'},
    {id: '2', name: 'Tiago', email: '', group: 'Manager', status: 'active'},
    {id: '3', name: 'Zanatta', email: 'teste@teste.com', group: 'trainee', status: 'inactive'},
    {id: '4', name: 'Fabricio', email: '', group: 'Manager', status: 'active'},
    {id: '5', name: 'Schneider', email: '', group: 'Manager', status: 'active'},
    {id: '6', name: 'Ruan', email: '', group: 'Manager', status: 'inactive'},
  ];

  constructor() { }

  getUser() {
    return this.userList.slice();
  }

  deleteUser(index: number) {
    this.userList.slice(index, 1);
  }

  createUser(user: User) {
    this.userList.unshift(user);
  }
}
