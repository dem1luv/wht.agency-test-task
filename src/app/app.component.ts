import { Component, OnInit } from '@angular/core';
import { AppState } from './state/app.state';
import { Select, Store } from '@ngxs/store';
import { Observable, of } from 'rxjs';
import { GetCatList, SetSearchForm } from './state/app.actions';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  @Select(AppState.catList) catList$!: Observable<any[]>;

  form: FormGroup = new FormGroup({
    limit: new FormControl(10),
  });

  constructor(private store: Store) {}

  ngOnInit() {
    this.store.dispatch(new GetCatList());
  }

  onSelectChange() {
    this.store.dispatch(new SetSearchForm(this.form.value));
  }
}
