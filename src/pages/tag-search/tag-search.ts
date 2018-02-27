import { Component, ViewChild } from '@angular/core';
import { Content, FabButton, NavController, NavParams } from 'ionic-angular';
import { DetailPage } from '../detail/detail';
import { IndexProvider } from '../../providers/index/index';

/**
 * Generated class for the TagSearchPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
    selector: 'page-tag-search',
    templateUrl: 'tag-search.html',
})
export class TagSearchPage {

    groups: any[];
    tag:  string ;
    title:  string ;
    @ViewChild(Content)
    content: Content;
    @ViewChild(FabButton)
    fab: FabButton;

    currenPage = 1;
    totalePage = 3;

    prePage(){
        this.searchCommit(this.currenPage-1);
    }

    nextPage(){
        this.searchCommit(this.currenPage+1);
    }


    constructor(public navCtrl: NavController, public navParams: NavParams, private service: IndexProvider,) {
        this.tag = this.navParams.get('id');
        this.title = this.navParams.get('label');
        this.searchCommit();
    }

    searchCommit(pageIndex = 1) {
        this.service.getContentListByTag(this.tag,pageIndex).subscribe((result:{data:{list:any[],totalCount:number},status:'0'|'1'}) => {
            if(result.status === '0'){
                this.groups = result.data.list;
                this.currenPage = pageIndex;
                this.totalePage = Math.ceil(result.data.totalCount/20)
            }
        });
    }

    ngAfterViewInit() {
        // this.content.ionScrollEnd.subscribe((result => {
        //     if (!result)return;
        //     if (result.scrollTop > 200) {
        //         this.isShowUp = true;
        //     } else {
        //         this.isShowUp = false;
        //     }
        // }));
        // this.fab._elementRef.nativeElement.style.display = 'none';
    }

    goTop() {
        this.content.scrollToTop();
    }

    goBack(){
        this.navCtrl.pop();
    }

    set isShowUp(param: boolean) {
        this.fab._elementRef.nativeElement.style.display = param ? 'block' : 'none';
    }

    openDetail(item: { article_title: string, tagNames: string, article_createTime: string, article_content: string }) {
        this.navCtrl.push(DetailPage, item, {
            animate: true,
        })
    }

    delete(index:number){
        this.groups.splice(index,1);
    }
}
