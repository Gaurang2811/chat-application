import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { LoginPage } from '../login/login'

/**
 * Generated class for the ForgetPasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-forget-password',
  templateUrl: 'forget-password.html',
})
export class ForgetPasswordPage {

	private username:string;

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
    console.log('ionViewDidLoad ForgetPasswordPage');
  }

  getEmailForPassword(){
  	this.auth.auth.sendPasswordResetEmail(this.username)
  	.then(data => {
  		this.showAlert('Success', 'Check your Inbox');
  		this.navCtrl.push(LoginPage);
  	})
  	.catch((err) => {
  		this.showAlert('Error', err.message);
  	})
  }

}
