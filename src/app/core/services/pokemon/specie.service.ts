import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import Specie from '../../../shared/models/pokemon/specie/specie';

@Injectable({
  providedIn: 'root',
})
export class SpecieService {
  constructor(private http: HttpClient) {}

  getSpecieByURL(url: string): Observable<Specie> {
    return this.http.get<Specie>(url);
  }
}
