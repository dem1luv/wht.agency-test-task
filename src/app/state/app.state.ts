import { State, Action, StateContext, Selector } from '@ngxs/store';
import { CatService } from '../services/cat.service';
import { GetCatList } from './app.actions';
import { Injectable } from '@angular/core';

export const getAppInitialState = (): App => ({
  catList: []
});

@State<App>({
  name: 'app',
  defaults: getAppInitialState()
})
@Injectable()
export class AppState {
  constructor(private catService: CatService) { }

  @Selector()
  static catList(state: App) {
    return state.catList;
  }

  @Action(GetCatList)
  async getCatList(ctx: StateContext<App>, action: GetCatList) {
    try {
      this.catService.getList(10).subscribe((catList: any[]) => {
        ctx.setState({
          ...ctx.getState(),
          catList
        });
      });
    } catch (error) {
      // ctx.dispatch(new GetCatListFailed(error))
    }
  }
}
