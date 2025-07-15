import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import EvolutionChain from '../../../shared/models/evolution/EvolutionChain';

@Injectable({
  providedIn: 'root'
})
export class EvolutionService {

  constructor(private http: HttpClient) {}

  getEvolutionChainByURL(url: string): Observable<EvolutionChain> {
    return this.http.get<EvolutionChain>(url);
  }

}
