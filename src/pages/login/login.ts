import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

import { ChatPage } from '../chat/chat'

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

  constructor(public alertCtrl: AlertController, public navCtrl: NavController, public navParams: NavParams) {
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
  	if(/^[a-zA-Z]+$/.test(this.username) && this.username != '' && this.username != null){
  		// console.log('you are welcome awesomelly');
  		this.navCtrl.push(ChatPage, {
  			username: this.username
  		})
  	}else{
  		this.showAlert('Error', 'Invalid username');
  	}
  }

}
