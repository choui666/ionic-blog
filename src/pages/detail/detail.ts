import { Component, ViewChild } from '@angular/core';
import { Content, FabButton, IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the DetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
//
// @IonicPage()
@Component({
    selector: 'page-detail',
    templateUrl: 'detail.html',
})
export class DetailPage {
    @ViewChild(Content)
    content: Content;
    detail:string;

    constructor(public navCtrl: NavController, public navParams: NavParams) {
         this.detail = this.navParams.get('article_content');
    }

    ngAfterViewInit() {

    }


    goTop(){
        this.content.scrollToTop();
    }

    goBack(){
        this.navCtrl.pop();
    }
}
