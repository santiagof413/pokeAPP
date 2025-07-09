import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import NamedAPIResourceList from '../../shared/models/api/NamedAPIResourceList ';

@Injectable({
  providedIn: 'root'
})
export class PaginationService {

  constructor(private http:HttpClient) { }


  getPaginationData(url: string) {
    return this.http.get<NamedAPIResourceList>(url);
  }

}
