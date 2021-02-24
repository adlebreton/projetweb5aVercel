import { Component,ViewEncapsulation, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { AngularFireAuth } from 'angularfire2/auth';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.css'],
})

@Injectable({
  providedIn: 'root'
})

export class ForgotComponent {


  constructor(private afAuth: AngularFireAuth, private fb: FormBuilder,private route: ActivatedRoute, private router: Router) {}


  frmPasswordReset: FormGroup = this.fb.group({
    email: [null, [Validators.required, Validators.email]]
  });

 
  sendPasswordResetRequest()
  {
  const email = this.frmPasswordReset.controls['email'].value;

  this.afAuth.auth.sendPasswordResetEmail(email).then(
    () => {
      this.router.navigate(['/auth'])
    },
    err => {
      // handle errors
    }
  );
  }


}
