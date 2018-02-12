import { Component, OnInit } from '@angular/core';
import {MoviedataService} from '../../services/moviedata.service';

@Component({
  selector: 'app-movielist',
  templateUrl: './movielist.component.html',
  styleUrls: ['./movielist.component.css']
})
export class MovielistComponent implements OnInit {
  movies:Movie[];
  pages:Page[];
  activePageNumber:number = 1;
  activePage:Movie[];
  movieEdit:string = "";
  tmpPage:Page;
  //tmpMovies:Movie;
  pageLimit:number = 15;
  movieExpand:string = "";

  constructor(private MoviedataService:MoviedataService) { }

  ngOnInit() {
    this.MoviedataService.getMovies(this.activePage).subscribe((movies) => {
      //console.log(movies);
      this.movies = movies;
      this.pages = [];
      let tmpMovies;
      for(let i = 0; i<Math.ceil(this.movies.length/this.pageLimit);i++){
        tmpMovies = [];
        for(let j = i*this.pageLimit; j<(i+1)*this.pageLimit&&j<this.movies.length; j++){
          tmpMovies.push(movies[j]);
        }
        this.tmpPage = {
          page:i+1,
          movies:tmpMovies
        }
        this.pages.push(this.tmpPage);
      }
      console.log(this.pages);
      this.activePage = this.pages[this.activePageNumber - 1].movies;
    });
  }
  toggleMovieEdit(id){
    if(this.movieEdit == id){
      this.movieEdit = "";
    }else{
      this.movieEdit = id;
    }
  }
  toggleMovieExpand(id){
    if(this.movieExpand == id){
      this.movieExpand = "";
      this.movieEdit = "";
    }else{
      this.movieExpand = id;
      this.movieEdit = "";
    }
  }
  onLinkClick(i){
    this.activePageNumber = i;
    this.movieEdit = "";
    this.ngOnInit();
    return false;
  }
  editMovie(id, title, year, director, rating){
    if(title!=""&&year!=""&&director!=""&&rating!=""){
      let movie = {
        Title:title,
        Year:year,
        Director:director,
        Rating:rating
      }
      console.log(movie);
      this.MoviedataService.editMovie(movie, id).subscribe();
      setTimeout(()=>{
        this.ngOnInit();
        return false;
      }
      ,300);
      alert("Movie edited!");
    }else{
      alert("Fill all fields!");
    }    
  }
  addMovie(title, year, director, rating){
    if(title!=""&&year!=""&&director!=""&&rating!=""){
      let movie = {
        Title:title,
        Year:year,
        Director:director,
        Rating:rating
      }
      console.log(movie);
      this.MoviedataService.addMovie(movie).subscribe();
      setTimeout(()=>{
        this.ngOnInit();
        return false;
      }
      ,300);
      alert("Movie added!");
    }else{
      alert("Fill all fields!");
    }
  }
  deleteMovie(id){
    this.MoviedataService.deleteMovie(id).subscribe();
      setTimeout(()=>{
        this.ngOnInit();
        return false;
      }
      ,300);

  }

}
interface Movie {
  Id:string,
  Title:string,
  Year:number,
  Director:string,
  Rating:number
}
interface Page{
  page:number,
  movies:Movie[]
}