import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class UserdataService {

  constructor(public http:Http) { }

  getUsers(page){
    return this.http.get('https://serverlesswiekonek.azurewebsites.net/api/ivanv/users?_page=' + page + '&_limit=15')
      .map(res => res.json());
  }
  addUser(user){
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const options = new RequestOptions({headers: headers});
    return this.http.post('https://serverlesswiekonek.azurewebsites.net/api/ivanv/users',JSON.stringify(user), options);
  }
  deleteUser(id){
    return this.http.delete('https://serverlesswiekonek.azurewebsites.net/api/ivanv/users/' + id);
  }
  editUser(user, id){
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const options = new RequestOptions({headers: headers});
    return this.http.put('https://serverlesswiekonek.azurewebsites.net/api/ivanv/users/' + id,JSON.stringify(user), options);
  }
}
