import { State, Action, StateContext, Selector } from '@ngxs/store';
import { CatService } from '../services/cat.service';
import { GetCatList, SetSearchForm } from './app.actions';
import { Injectable } from '@angular/core';

export const getAppInitialState = (): App => ({
  catList: [],
  form: {
    limit: 10,
  }
});

@State<App>({
  name: 'app',
  defaults: getAppInitialState()
})
@Injectable()
export class AppState {
  constructor(private catService: CatService) {
  }

  @Selector()
  static catList(state: App) {
    return state.catList;
  }

  @Selector()
  static formLimit(state: App) {
    return state.form.limit;
  }

  @Action(GetCatList)
  async getCatList(ctx: StateContext<App>, action: GetCatList) {
    try {
      const state = ctx.getState();
      this.catService.getList(state.form.limit).subscribe((catList: any[]) => {
        ctx.setState({
          ...state,
          catList
        });
      });
    } catch (error) {
      // ctx.dispatch(new GetCatListFailed(error))
    }
  }

  @Action(SetSearchForm)
  async setSearchForm(ctx: StateContext<App>, action: SetSearchForm) {
    const state = ctx.getState();
    ctx.setState({
      ...state,
      form: action.form
    });
    ctx.dispatch(new GetCatList());
  }
}
