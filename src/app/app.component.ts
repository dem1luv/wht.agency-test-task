import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
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
    this.resizeGridList(event.target.innerWidth);
  }
}
