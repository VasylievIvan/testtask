import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';



import { AppComponent } from './app.component';
import { UserlistComponent } from './components/userlist/userlist.component';
import { MovielistComponent } from './components/movielist/movielist.component';

import { UserdataService } from './services/userdata.service';
import { MoviedataService } from './services/moviedata.service';


const appRoutes: Routes = [
  {path:'users', component:UserlistComponent},
  {path:'movies', component:MovielistComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    UserlistComponent,
    MovielistComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [UserdataService, MoviedataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
