import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';

/**
 * Generated class for the ChatPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
})
export class ChatPage {

  @ViewChild('content') content:any;

	private username: string;
	private message: string;

	private _chatSubscription;
	private messages: Object[] = [];

  constructor(public db:AngularFireDatabase, public alertCtrl:AlertController, public navCtrl: NavController, public navParams: NavParams) {
  	this.username = navParams.data.username;
  	this._chatSubscription = this.db.list('/chat').valueChanges().subscribe((data) => {
  		// console.log(data);
  		this.messages = data;
  	})
  }

  ionViewDidEnter(){
    this.content.scrollToBottom();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChatPage');
    this.db.list('/chat').push({
    	specialMsg: true,
    	message: this.username + ' has joined the room'
    })
  }

  ionViewDidLeave(){
  	this.db.list('/chat').push({
    	specialMsg: true,
    	message: this.username + ' has left the room'
    })
  }

  showAlert(title: string, message: string){
  	this.alertCtrl.create({
  		title: title,
  		subTitle: message,
  		buttons: ['OK']
  	}).present();
  }

  sendMessage(){
  	if(this.message != '' && this.message != null){
		this.db.list('/chat').push({
			username: this.username,
			message: this.message
		})
		.then((data) => {
      this.scrollToBottom(300);
		})
		this.message = '';
  		// console.log('your awesome message is-', this.message);
  	}else{
  		this.showAlert('Error', "Please provide a valid message");
  	}
  }

  scrollToBottom(time) {
    this.content.scrollToBottom(time);
  }

}
