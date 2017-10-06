import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';

import { LoginPage } from '../login/login'

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

	private username:string;
	private password:string;

  constructor(public atertCtrl: AlertController, public auth:AngularFireAuth, public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }


  showAlert(title: string, message: string){
  	this.atertCtrl.create({
  		title: title,
  		subTitle: message,
  		buttons: ['OK']
  	}).present();
  }

  userRegister(){
    if(this.username != null && this.password != null && this.username != '' && this.password !=''){
	  	this.auth.auth.createUserWithEmailAndPassword(this.username, this.password)
	  	.then((data)=> {
	  		this.showAlert('Success', 'User ' + this.username + ' has been successfully registered');
	  		this.navCtrl.pop(RegisterPage);
	  	})
	  	.catch((err)=> {
	  		this.showAlert('Error', err.message);
	  	})
    }else{
      this.showAlert('Error', 'Please provide a valid email and password');
    }
  }

  gotoLoginPage(){
  	this.navCtrl.pop(RegisterPage);
  }

}
