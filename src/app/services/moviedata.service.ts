import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class MoviedataService {

  constructor(public http:Http) { }

  getMovies(page){
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer example-token');    
    const options = new RequestOptions({headers: headers});
    return this.http.get('https://serverlesswiekonek.azurewebsites.net/api/ivanv/movies', options)
      .map(res => res.json());
  }
  addMovie(movie){
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer example-token');
    const options = new RequestOptions({headers: headers});
    return this.http.post('https://serverlesswiekonek.azurewebsites.net/api/ivanv/movies',JSON.stringify(movie), options);

  }
  editMovie(movie, id){
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer example-token');
    const options = new RequestOptions({headers: headers});
    return this.http.put('https://serverlesswiekonek.azurewebsites.net/api/ivanv/movies/' + id,JSON.stringify(movie), options);
  }
  deleteMovie(id){
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer example-token');    
    const options = new RequestOptions({headers: headers});
    return this.http.delete('https://serverlesswiekonek.azurewebsites.net/api/ivanv/movies/' + id, options);
  }

}
