import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';

import { ChatPage } from '../chat/chat'
import { RegisterPage } from '../register/register'
import { ForgetPasswordPage } from '../forget-password/forget-password'

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  public username: string;
	public password: string;

  constructor(public auth: AngularFireAuth, public alertCtrl: AlertController, public navCtrl: NavController, public navParams: NavParams) {
  }

  showAlert(title: string, message: string){
  	this.alertCtrl.create({
  		title: title,
  		subTitle: message,
  		buttons: ['OK']
  	}).present();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  userLogin(){
    if(this.username != null && this.password != null && this.username != '' && this.password !=''){
      this.auth.auth.signInWithEmailAndPassword(this.username, this.password)
      .then((data) => {
        this.navCtrl.push(ChatPage, {
          username: this.username.split('@')[0]
        })
      })
      .catch((err) => {
        this.showAlert('Error', err.message)
      })
    }else{
      this.showAlert('Error', 'Please provide a valid email and password');
    }
  	// if(/^[a-zA-Z]+$/.test(this.username) && this.username != '' && this.username != null){
  	// 	// console.log('you are welcome awesomelly');
  	// 	this.navCtrl.push(ChatPage, {
  	// 		username: this.username
  	// 	})
  	// }else{
  	// 	this.showAlert('Error', 'Invalid username');
  	// }
  }

  gotoRegisterPage(){
    this.navCtrl.push(RegisterPage);
  }

  forgetPasswordPage(){
    this.navCtrl.push(ForgetPasswordPage);
  }
}
