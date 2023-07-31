import { State, Action, StateContext, Selector } from '@ngxs/store';
import { CatService } from '../services/cat.service';
import { GetBreedList, GetCatList, SetSearchForm } from './app.actions';
import { Injectable } from '@angular/core';
import { IApp } from '../types/state/app.interface';

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
  constructor(private catService: CatService) {
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
  async getCatList(ctx: StateContext<IApp>, action: GetCatList) {
    try {
      ctx.setState({
        ...ctx.getState(),
        catListLoaded: false,
      });

      const form = ctx.getState().form;
      this.catService.getList(form.breed, form.limit).subscribe(catList => {
        ctx.setState({
          ...ctx.getState(),
          catList,
          catListLoaded: true,
        });
      });
    } catch (error) {
      // ctx.dispatch(new GetCatListFailed(error))
    }
  }

  @Action(SetSearchForm)
  async setSearchForm(ctx: StateContext<IApp>, action: SetSearchForm) {
    const state = ctx.getState();
    ctx.setState({
      ...state,
      form: action.form
    });
    ctx.dispatch(new GetCatList());
  }

  @Action(GetBreedList)
  async getBreedList(ctx: StateContext<IApp>, action: GetBreedList) {
    try {
      ctx.setState({
        ...ctx.getState(),
        breedListLoaded: false,
      });

      this.catService.getBreedList().subscribe(breedList => {
        const state = ctx.getState();
        ctx.setState({
          ...state,
          breedList,
          breedListLoaded: true,
        });
      });
    } catch (error) {
      // ctx.dispatch(new GetCatListFailed(error))
    }
  }
}
