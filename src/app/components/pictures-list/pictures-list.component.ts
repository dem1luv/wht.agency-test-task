import { Component, Input, OnInit } from '@angular/core';
import { ICat } from '../../types/common/cat.interface';

@Component({
  selector: 'app-pictures-list',
  templateUrl: './pictures-list.component.html',
  styleUrls: ['./pictures-list.component.scss']
})
export class PicturesListComponent implements OnInit {
  @Input() list: ICat[] | null = [];

  gridCols: number = 6;

  ngOnInit() {
    this.resizeGridList(window.innerWidth);
  }

  resizeGridList(innerWidth: number) {
    if (innerWidth > 1200) {
      this.gridCols = 6;
    } else if (innerWidth > 900) {
      this.gridCols = 5;
    } else if (innerWidth > 600) {
      this.gridCols = 4;
    } else if (innerWidth > 400) {
      this.gridCols = 3;
    } else {
      this.gridCols = 2;
    }
  }

  onGridResize(event: any) {
    this.resizeGridList(event?.target?.innerWidth);
  }
}
