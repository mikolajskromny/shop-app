import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ItemsModel} from '../models/items-model';

@Injectable({
  providedIn: 'root'
})
export class ProductListService {

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  };

  constructor(private http: HttpClient) {
  }

  getItems() {
    return this.http.get<Array<ItemsModel>>('../assets/items.json', this.httpOptions);
  }
}
