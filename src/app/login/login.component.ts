import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario: any;
  formLogin: FormGroup;
  formRegister: FormGroup;
  submitted: boolean = false;
  msg_error:  any = null;
  isloading: boolean = false;
  isLogin: boolean = true;

  constructor( private fb: FormBuilder, private auth_s:AuthService, private router: Router) {
    this.formLogin = this.fb.group({
      username: ['', Validators.required],
      password : ['', Validators.required],
    });
    this.formRegister = this.fb.group({
      username: ['', Validators.required],
      name: ['', Validators.required],
      email: ['', Validators.required],
      password : ['', Validators.required],
    });
  }

  ngOnInit(): void {
    if (localStorage.getItem('user')) {
      this.usuario = JSON.parse(localStorage.getItem('user'));
      this.formLogin.get('username').setValue(this.usuario.username);
    }
  }

  onLogin(){
    this.submitted = true;
    console.log(this.formLogin);
    this.isloading = true;

    if (!this.formLogin.valid) {
      this.isloading = false;
      return;
    }

    // success->response, error  y completed
    this.auth_s.login(this.formLogin.value).subscribe(
      (response) => {
        this.auth_s.setLocalStorage(response);
        console.log(response);
        this.msg_error = response['message'];

        this.isloading = false;
      },
      (error) => {
        this.isloading = true;
        console.log(error);
        this.msg_error = error.error.message;
        this.isloading = false;

      },
      // When observable completes
      () => {
        this.isloading = false;
        console.log('done!');

        this.router.navigate(['/dashboard']);
      }
    );
  }

  onRegister() {
    this.submitted = true;
    console.log(this.formRegister);
    this.isloading = true;

    if (!this.formRegister.valid) {
      this.isloading = false;
      return;
    }

    // success->response, error  y completed
    this.auth_s.register(this.formRegister.value).subscribe(
      (response) => {
        this.auth_s.setLocalStorage(response);
        console.log(response);
        this.msg_error = response['message'];

        this.isloading = false;
      },
      (error) => {
        this.isloading = true;
        console.log(error);
        this.msg_error = error.error.message;
        this.isloading = false;

      },
      // When observable completes
      () => {
        this.isloading = false;
        console.log('done!');

        this.router.navigate(['/dashboard']);
      }
    );
  }

}
