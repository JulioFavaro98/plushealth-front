import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_CONFIG } from '../config/api.config';
import { Observable } from 'rxjs';
import { Medico } from '../models/medico';

@Injectable({
  providedIn: 'root'
})
export class MedicosService {

  constructor(private http: HttpClient) { }

  findAll(): Observable<Medico[]> {
    return this.http.get<Medico[]>(`${API_CONFIG.baseUrl}/medicos`);
  }

  create(medico: Medico): Observable<Medico> {
    return this.http.post<Medico>(`${API_CONFIG.baseUrl}/medicos`, medico);
  }

}
