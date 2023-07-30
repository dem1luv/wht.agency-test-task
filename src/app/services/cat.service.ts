import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CAT_API_KEY } from '../app.constant';

@Injectable({
  providedIn: 'root'
})
export class CatService {

  constructor(private readonly http: HttpClient) { }

  getList(limit: number) {
    return this.http.get<any[]>(`https://api.thecatapi.com/v1/images/search?api_key=${CAT_API_KEY}&limit=${limit}`);
  }
}
