export class GetCatList {
  static readonly type = '[Cat API] Get Cat List';
}

export class SetSearchForm {
  static readonly type = '[Search Form] Set Search Form';
  constructor(public form: any) {}
}
