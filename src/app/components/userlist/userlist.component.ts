import { Component, OnInit } from '@angular/core';
import {UserdataService} from '../../services/userdata.service';

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.css']
})
export class UserlistComponent implements OnInit {
  users:User[];
  pages:number[];
  activePage:number = 1;
  userEdit:string = "";
  userExpand:string = "";

  constructor(private UserdataService:UserdataService) {

   }

  ngOnInit() {
    this.UserdataService.getUsers(this.activePage).subscribe((users) => {
      //console.log(users);
      this.users = users.Data;
      this.pages = [];
      for(let i = 1; i<=Math.ceil(users.Metadata.Total/users.Metadata.Limit);i++){
        this.pages.push(i);
      }      
    });}

    onLinkClick(i){
      this.activePage = i;
      //console.log(i);
      this.userEdit = "";
      this.userExpand = "";
      this.ngOnInit();
      return false;
    }

    addUser(firstName, lastName, userName, email, birthday){
      let user = {
        FirstName:firstName,
        LastName:lastName,
        Username:userName,
        Email:email,
        Birthday:birthday
      }
      console.log(user);
      this.UserdataService.addUser(user).subscribe();
      setTimeout(()=>{
        this.ngOnInit();
        return false;
      }
      ,300);
    }
    deleteUser(id){
      this.UserdataService.deleteUser(id).subscribe();
      setTimeout(()=>{
        this.ngOnInit();
        return false;
      }
      ,300);}
    toggleUserEdit(id){
      if(this.userEdit == id){
        this.userEdit = "";
      }else{
        this.userEdit = id;
      }
      
    }
    editUser(id, firstName, lastName, userName, email, birthday){
      let user = {
        FirstName:firstName,
        LastName:lastName,
        Username:userName,
        Email:email,
        Birthday:birthday
      }
      this.UserdataService.editUser(user, id).subscribe();
      setTimeout(()=>{
        this.ngOnInit();
        return false;
      }
      ,300);
    }
    toggleUserExpand(id){
      if(this.userExpand == id){
        this.userExpand = "";
        this.userEdit = "";
      }else{
        this.userExpand = id;
        this.userEdit = "";
      }
    }
}

interface User {
  Id:string,
  Email:string,
  FirstName:string,
  LastName:string,
  Birthday:string,
  Username:string
}
