export class GetCatList {
  static readonly type = '[Cat API] Get Cat List';
  constructor(public limit: number) {}
}
