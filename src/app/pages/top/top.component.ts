import { CommonModule, DOCUMENT } from '@angular/common';
import { Component, HostListener, Inject, OnInit } from '@angular/core';
import { finalize, Observable } from 'rxjs';
import { CatData } from 'src/app/interfaces/cat-data';
import { CatApiService } from 'src/app/services/cat-api.service';
import { CatTableComponent } from '../../components/cat-table/cat-table.component';

@Component({
  standalone: true,
  imports: [CommonModule, CatTableComponent],
  selector: 'app-top',
  templateUrl: './top.component.html',
  styleUrls: ['./top.component.scss'],
})
export class TopComponent implements OnInit {
  datas: Array<any> = [];
  private isLoading = false;
  private page = 0;
  private maxPage = 4;
  private limit = 10;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private catApiService: CatApiService
  ) {}

  ngOnInit() {
    this.getDatas(this.page, this.limit).subscribe((datas) => {
      this.datas = datas;
    });
  }

  @HostListener('window:scroll') // イベントバインディングの時はコメントアウト
  onScroll(scrollArea: HTMLElement) {
    // 残りのスクロール量
    const maxScroll =
      this.document.documentElement.scrollHeight ||
      this.document.scrollingElement!.scrollHeight;
    const screenHeight =
      this.document.documentElement.clientHeight ||
      this.document.scrollingElement!.clientHeight;
    const scrollTop =
      this.document.body.scrollTop ||
      this.document.documentElement.scrollTop ||
      this.document.scrollingElement!.scrollTop;
    const leftScroll = maxScroll - screenHeight - scrollTop;

    // 残りのスクロール量が一定量以下なら続きをロード
    if (!this.isLoading && leftScroll < 1000) {
      this.onLoadNext();
    }
  }

  onLoadNext() {
    if (this.isLoading) {
      return;
    }

    this.page++;

    if (this.page > this.maxPage) {
      return;
    }

    this.getDatas(this.page, this.limit).subscribe((datas) => {
      this.datas = [...this.datas, ...datas];
    });
  }

  private getDatas(page: number, limit: number): Observable<CatData[]> {
    this.isLoading = true;
    return this.catApiService.getCatDatas(page, limit).pipe(
      finalize(() => {
        this.isLoading = false;
      })
    );
  }
}
