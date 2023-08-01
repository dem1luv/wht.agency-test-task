import { State, Action, StateContext, Selector } from '@ngxs/store';
import { CatService } from '../services/cat.service';
import {
  GetBreedList,
  GetCatList,
  SetSearchForm,
  ShowNotificationError
} from './app.actions';
import { Injectable } from '@angular/core';
import { IApp } from '../types/state/app.interface';
import { catchError, of } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

export const getAppInitialState = (): IApp => ({
  catList: [],
  catListLoaded: false,
  breedList: [],
  breedListLoaded: false,
  form: {
    breed: [],
    limit: 10,
  }
});

@State<IApp>({
  name: 'app',
  defaults: getAppInitialState()
})
@Injectable()
export class AppState {
  constructor(
    private catService: CatService,
    private snackBar: MatSnackBar,
  ) {
  }

  @Selector()
  static catList(state: IApp) {
    return state.catList;
  }

  @Selector()
  static catListLoaded(state: IApp) {
    return state.catListLoaded;
  }

  @Selector()
  static breedList(state: IApp) {
    return state.breedList;
  }

  @Selector()
  static breedListLoaded(state: IApp) {
    return state.breedListLoaded;
  }

  @Selector()
  static formLimit(state: IApp) {
    return state.form.limit;
  }

  @Action(GetCatList)
  getCatList(ctx: StateContext<IApp>, action: GetCatList) {
    ctx.setState({
      ...ctx.getState(),
      catListLoaded: false,
    });

    const form = ctx.getState().form;
    this.catService.getList(form.breed, form.limit)
      .pipe(
        catchError(error => {
          ctx.dispatch(new ShowNotificationError('Failed to load list of cats'));
          return of([]);
        })
      )
      .subscribe(catList => {
        ctx.setState({
          ...ctx.getState(),
          catList,
          catListLoaded: true,
        });
      });
  }

  @Action(SetSearchForm)
  setSearchForm(ctx: StateContext<IApp>, action: SetSearchForm) {
    const state = ctx.getState();
    ctx.setState({
      ...state,
      form: action.form
    });
    ctx.dispatch(new GetCatList());
  }

  @Action(GetBreedList)
  getBreedList(ctx: StateContext<IApp>, action: GetBreedList) {
    ctx.setState({
      ...ctx.getState(),
      breedListLoaded: false,
    });

    this.catService.getBreedList()
      .pipe(
        catchError(error => {
          ctx.dispatch(new ShowNotificationError('Failed to load breed list'));
          return of([]);
        })
      )
      .subscribe(breedList => {
        const state = ctx.getState();
        ctx.setState({
          ...state,
          breedList,
          breedListLoaded: true,
        });
      });
  }

  @Action(ShowNotificationError)
  showNotificationError(ctx: StateContext<IApp>, action: ShowNotificationError) {
    this.snackBar.open('⚠️ ' + action.message, 'Close', {
      duration: 5000,
    });
  }
}
