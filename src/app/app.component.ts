import { Component, OnInit } from '@angular/core';
import { AppState } from './state/app.state';
import { Select, Store } from '@ngxs/store';
import { Observable, of } from 'rxjs';
import { GetCatList } from './state/app.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  @Select(AppState.catList) catList$!: Observable<any[]>;

  constructor(private store: Store) {}

  ngOnInit() {
    this.store.dispatch(new GetCatList(10));
  }
}
