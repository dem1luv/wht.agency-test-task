import { ICat } from '../common/cat.interface';
import { IBreed } from '../common/breed.interface';
import { ISearchForm } from './search-form.interface';

export interface IApp {
  catList: ICat[]
  catListLoaded: boolean
  breedList: IBreed[]
  breedListLoaded: boolean
  form: ISearchForm
}
