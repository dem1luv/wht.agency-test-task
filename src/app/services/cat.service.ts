import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CAT_API_KEY } from '../app.constant';

const apiUrl = `https://api.thecatapi.com/v1`;

@Injectable({
  providedIn: 'root'
})
export class CatService {

  constructor(private readonly http: HttpClient) { }

  getList(breedIds: string[], limit: number) {
    const breedIdsQuery = breedIds ? breedIds.join(',') : '';
    return this.http.get<any[]>(`${apiUrl}/images/search?api_key=${CAT_API_KEY}&breed_ids=${breedIdsQuery}&limit=${limit}`);
  }

  getBreedList() {
    return this.http.get<any[]>(`${apiUrl}/breeds?api_key=${CAT_API_KEY}`);
  }
}
