import { ISearchForm } from '../types/state/search-form.interface';

export class GetCatList {
  static readonly type = '[Cat API] Get Cat List';
}

export class SetSearchForm {
  static readonly type = '[Search Form] Set Search Form';
  constructor(public form: ISearchForm) {}
}

export class GetBreedList {
  static readonly type = '[Cat API] Get Breed List';
}
