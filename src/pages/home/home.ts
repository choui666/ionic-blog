import { Component, HostListener, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Content, FabButton, NavController } from 'ionic-angular';
import { IndexProvider } from '../../providers/index/index';
import { DetailPage } from "../detail/detail";
import { TagSearchPage } from '../tag-search/tag-search';

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage implements OnInit {

    groups: { title: string, group: any[] }[] = [];
    tags: { label: string, id: string, num: string }[] = [];
    @ViewChild(Content)
    content: Content;
    @ViewChild(FabButton)
    fab: FabButton;


    currenPage = 1;
    totalePage = 3;

    prePage() {
        this.searchCommit(this.currenPage - 1);
    }

    nextPage() {
        this.searchCommit(this.currenPage + 1);
    }

    constructor(public navCtrl: NavController, private service: IndexProvider, private renderer2: Renderer2) {
        this.searchCommit();
        this.service.getAllTags().subscribe((result: { status: '0' | '1', data: any[] }) => {
            if (result.status == '0') {
                this.tags = result.data;
            }
        })
    }

    ngOnInit() {
        console.log('000');
    }

    searchCommit(pageIndex = 1) {
        this.service.getContentList(pageIndex).subscribe((result: { list: any[], totalCount: number }) => {
            this.groups = result.list;
            this.currenPage = pageIndex;
            this.totalePage = Math.ceil(result.totalCount / 10)
        });
    }

    ngAfterViewInit() {
        this.content.ionScrollEnd.subscribe((result => {
            if (!result) return;
            if (result.scrollTop > 200) {
                this.isShowUp = true;
            } else {
                this.isShowUp = false;
            }
        }));
        this.fab._elementRef.nativeElement.style.display = 'none';
    }

    goTop() {
        this.content.scrollToTop();
    }

    set isShowUp(param: boolean) {
        this.fab._elementRef.nativeElement.style.display = param ? 'block' : 'none';
    }

    openDetail(item: { article_title: string, tagNames: string, article_createTime: string, article_content: string }) {
        this.navCtrl.push(DetailPage, item, {
            animate: true,
        })
    }

    openTagSearch(tag: { id: string, label: string }) {
        this.navCtrl.push(TagSearchPage, tag, {
            animate: true,
        })
    }

    delete(o_index: number, i_index: number) {
        this.groups[o_index].group.splice(i_index, 1);
    }


}
