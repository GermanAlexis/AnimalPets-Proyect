import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';

import { LoadElephant } from '../interfaces/Elephat.interface';
import { RegisterElephant } from '../interfaces/RegisterElephant';
import { Elephant } from '../elephant.model';

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

  login(formdata: { email: any; password: any }) {
    return this.http.post(`${base_url}/login`, formdata).pipe(
      tap((resp: any) => {
        localStorage.setItem('token', resp.token);
      })
    );
  }

  createElephant(data: RegisterElephant) {
    console.log(data);
    return this.http.post<RegisterElephant>(`${base_url}/elephants`, data, this.headers);
  }

  updateElephant(data: Elephant) {
    return this.http.put<RegisterElephant>(`${base_url}/elephants/${data.uid}`, data, this.headers);
  }
  deleteElephant(elephant: Elephant) {
    return this.http.delete(`${base_url}/elephants/${elephant.uid}`, this.headers);
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
