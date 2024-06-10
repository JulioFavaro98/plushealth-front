import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Consulta } from '../models/consulta';
import { API_CONFIG } from '../config/api.config';

@Injectable({
  providedIn: 'root'
})
export class ConsultaService {

  constructor(private http: HttpClient) { }

  findAll(): Observable<Consulta[]>{
    return this.http.get<Consulta[]>(`${API_CONFIG.baseUrl}/consultas`)
  }
}
