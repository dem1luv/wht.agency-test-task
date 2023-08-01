import { ISearchForm } from '../types';

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

export class ShowNotificationError {
  static readonly type = '[Notification] Show Error';
  constructor(public message: string) {}
}

