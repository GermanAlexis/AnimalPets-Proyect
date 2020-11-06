import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';
import { LoadElephant } from '../Elephat.interface';
import { Elephant } from '../elephant.model';
import { environment } from '../../environments/environment';
import { element } from 'protractor';

const base_url = environment.base_url;
@Injectable({
  providedIn: 'root',
})
export class ElephantService {

  elephant: any;

  constructor(private http: HttpClient) {}
  get token(): string {
    return localStorage.getItem('token') || '';
  }
  get headers() {
    return {
      headers: {
        'x-token': this.token,
      },
    };
  }

  login(formdata: { email; password }) {
    return this.http.post(`${base_url}/login`, formdata).pipe(
      tap((resp: any) => {
        localStorage.setItem('token', resp.token);
      })
    );
  }

  allElephant() {
    return this.http.get<LoadElephant>(`${base_url}/elephants`, this.headers);
  }

  search(word: string) {
    return this.http.get<LoadElephant>(`${base_url}/elephants/${word}`, this.headers);
  }

  filterSex(sex: string) {
    return this.http.get<LoadElephant>(`${base_url}/elephants/sex/${sex}`, this.headers);
  }

  filterSpecie(specie: string) {
    return this.http.get<LoadElephant>(`${base_url}/elephants/specie/${specie}`, this.headers);
  }
}
