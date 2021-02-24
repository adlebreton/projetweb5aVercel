import { Component,ViewEncapsulation, OnInit } from '@angular/core';
import { ActivatedRoute , Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { AuthService, AuthResponseData } from './auth.service';
import { AddictionService } from '../addict-panel/addict-panel.component.service';


import { MatDialog } from '@angular/material/dialog';
import { ThisReceiver } from '@angular/compiler';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent   {

  onSubscribe = true;
  //onForgetPassword = false;
  isLoading = false;
  error:string = "";
  fail = false;
  _name :any;
  addictid: any;
  addictname: any;
  _new : Boolean = true;

  constructor(private route: ActivatedRoute ,
              private dialog: MatDialog,
              private router: Router,
              private authService: AuthService, private addictService : AddictionService) {}

  onSignup() {
    this.onSubscribe = true;
  }

  onSignin() {
    this.onSubscribe = false;
  }

 
  onSubmit(form: NgForm) {
    
    const email = form.value.email;
    const password = form.value.password;
    const name = form.value.name;
   
    let authObs: Observable<AuthResponseData>;

    this.isLoading = true;
    if (!this.onSubscribe) {
      console.log("subscribe");
      this._new = true;
      authObs = this.authService.login(email, password);
    } else {
      console.log("login");
      this._new = false;
      authObs = this.authService.signup(email, password);
    }    

    authObs.subscribe(
      resData => {
        console.log(resData);
        this.isLoading = false;
        if (this._new= true)
        {
          this.router.navigate(['/addictions']); 
        }
        else{
          if(localStorage.getItem('userId')){
            this._name = localStorage.getItem('userId');
          }else{
            this._name="Inconnus";
          }
          //this.router.navigate(['/main']); 

          this.addictService.recupereAddictions(this._name).subscribe(actions => {actions.forEach(action => 
            {   
              //this.router.navigate(['/main']); 
              this.router.navigate(['/main',{ key: action.payload.doc.id , key2: action.payload.doc.data().name}]);
            });});
        }

        
        
      },
      errorMessage => {
        console.log(errorMessage);
        this.fail = true;
        this.error = errorMessage;
        
        this.isLoading = false;
      }
    );

    form.reset();
  }

  onClickConnexion() {
    this.router.navigate(['../forgot'], { relativeTo: this.route });
  }

}
