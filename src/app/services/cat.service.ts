import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_URL, CAT_API_KEY } from '../app.constant';
import { ICat, IBreed } from '../types';
import { Subject, takeUntil } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CatService {
  getListCancelRequest: Subject<void> = new Subject<void>();

  constructor(private readonly http: HttpClient) { }

  getList(breedIds: string[], limit: number) {
    this.getListCancelRequest.next();

    const breedIdsQuery = breedIds ? breedIds.join(',') : '';
    const url = `${API_URL}/images/search?api_key=${CAT_API_KEY}&breed_ids=${breedIdsQuery}&limit=${limit}`;

    return this.http
      .get<ICat[]>(url)
      .pipe(takeUntil(this.getListCancelRequest));
  }

  getBreedList() {
    return this.http.get<IBreed[]>(`${API_URL}/breeds?api_key=${CAT_API_KEY}`);
  }
}
