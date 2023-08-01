import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CAT_API_KEY } from '../app.constant';
import { ICat } from '../types/common/cat.interface';
import { IBreed } from '../types/common/breed.interface';
import { BehaviorSubject, of, retry, Subject, takeUntil, tap } from 'rxjs';

const apiUrl = `https://api.thecatapi.com/v1`;

@Injectable({
  providedIn: 'root'
})
export class CatService {
  getListLastTimestamp: number = 0;

  constructor(private readonly http: HttpClient) { }

  getList(breedIds: string[], limit: number) {
    const timestamp = Date.now();
    this.getListLastTimestamp = timestamp;
    const cancelRequest = new Subject<void>();

    const breedIdsQuery = breedIds ? breedIds.join(',') : '';
    const url = `${apiUrl}/images/search?api_key=${CAT_API_KEY}&breed_ids=${breedIdsQuery}&limit=${limit}`;

    return this.http
      .get<ICat[]>(url)
      .pipe(
        tap(() => {
          if (timestamp < this.getListLastTimestamp) {
            cancelRequest.next();
            cancelRequest.complete();
          }
        }),
        takeUntil(cancelRequest),
      );
  }

  getBreedList() {
    return this.http.get<IBreed[]>(`${apiUrl}/breeds?api_key=${CAT_API_KEY}`);
  }
}
