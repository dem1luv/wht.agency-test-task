import { ICat } from '../common';
import { IBreed } from '../common';
import { ISearchForm } from './search-form.interface';

export interface IApp {
  catList: ICat[]
  catListLoaded: boolean
  breedList: IBreed[]
  breedListLoaded: boolean
  form: ISearchForm
}
