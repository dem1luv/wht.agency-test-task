import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-lazy-loading-picture',
  templateUrl: './lazy-loading-picture.component.html',
  styleUrls: ['./lazy-loading-picture.component.scss']
})
export class LazyLoadingPictureComponent {
  @Input() src!: string;
  loading: boolean = true;

  onLoad() {
    console.log('onLoad');
    this.loading = false;
  }
}
