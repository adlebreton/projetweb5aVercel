import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { AngularFireAuth } from 'angularfire2/auth';


import { Injectable } from '@angular/core';
import { FirebaseErrors } from './firebaseerrors.component';

@Component({
    selector: 'app-auth',
    templateUrl: './reset.component.html',
    styleUrls: ['./forgot.component.css']
})

@Injectable({
    providedIn: 'root'
   })

export class ResetComponent {

    err: String ="";
    cd: string ="code";
    constructor(private afAuth: AngularFireAuth, private fb: FormBuilder, private route: ActivatedRoute, private router: Router) { }

    frmSetNewPassword = this.fb.group({
        password: [null, [Validators.required]],
        confirmPassword: [null, [Validators.required]]
    });

    setPassword() {
        const password = this.frmSetNewPassword.controls['password'].value;
        const confirmPassword = this.frmSetNewPassword.controls['confirmPassword'].value;

        if (password !== confirmPassword) {
            // react to error
            this.err="Les 2 mots de passes sont différents";
            return;
        }
        const code = this.route.snapshot.queryParams['oobCode'];
        this.cd=code;

        this.afAuth.auth
            .confirmPasswordReset(this.cd, password)
            .then(() =>  this.router.navigate(['/auth']))
            .catch(err => {
               const errorMessage = FirebaseErrors.Parse(err.code); // check this helper class at the bottom
               
            });
        }

}
