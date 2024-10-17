import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Point } from '../models/point.model';

@Injectable({
  providedIn: 'root',
})
export class PointService {
  private url = environment.BASE_URL;

  constructor(private http: HttpClient) {}

  getPoints(): Observable<Point[]> {
    return this.http.get<Point[]>(`${this.url}/points`);
  }
}
