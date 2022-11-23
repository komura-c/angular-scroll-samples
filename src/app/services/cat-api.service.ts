import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { take } from 'rxjs';
import { CatData } from '../interfaces/cat-data';

@Injectable({
  providedIn: 'root',
})
export class CatApiService {
  constructor(private http: HttpClient) {}

  getCatDatas(page: number, limit: number) {
    return this.http
      .get<CatData[]>(
        `https://api.thecatapi.com/v1/breeds?page=${page}&limit=${limit}`
      )
      .pipe(take(1));
  }
}
