import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Alert } from 'src/app/common/alert';
import { AutenticacaoService } from 'src/app/model/services/autenticacao.service';


@Component({
  selector: 'app-logar',
  templateUrl: './logar.page.html',
  styleUrls: ['./logar.page.scss'],
})
export class LogarPage implements OnInit {
  loginForm!: FormGroup;

  constructor(private router: Router, private alert: Alert, private auth: AutenticacaoService, private builder: FormBuilder){
    this.loginForm = new FormGroup({
      email: new FormControl(''),
      password: new FormControl('')
    });
  }

  ngOnInit(){
    this.loginForm = this.builder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }
  get errorControl(){
    return this.loginForm.controls
  }
  submitForm(){
    if(!this.loginForm.valid){
      this.alert.presentAlert("OK", "Erro ao logar!");
    }else{
      this.login();
    }
  }
  private login(){
    this.auth.login(this.loginForm.value['email'], this.loginForm.value['password'])
    .then((res)=>{
      this.alert.presentAlert("OK", "Seja bem Vindo!");
      this.router.navigate(['home']); })
    .catch((error)=>{
      this.alert.presentAlert("OK", "Erro ao Logar! Tente Novamente");
      console.log(error); })
  }
  loginWithGmail(){
    this.auth.loginWithGoogle()
    .then((res)=>{
      this.alert.presentAlert("OK", "Seja bem Vindo!");
      this.router.navigate(['home']); })
    .catch((error)=>{
      this.alert.presentAlert("OK", "Erro ao Logar! Tente Novamente");
      console.log(error); })
  }

  loginWithGithub(){
    this.auth.loginWithGithub().then((res) => {
      this.alert.presentAlert('OK', 'Seja bem Vindo!');
      this.router.navigate(['home']);}).catch((error) => {
      this.alert.presentAlert('Erro', 'Erro ao Logar com o Github! Tente Novamente');
      console.log(error);});
  }

  goToRegister(){
    this.router.navigate(["/cadastrar-usuario"]);
  }
}