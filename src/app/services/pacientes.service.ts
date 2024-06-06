import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_CONFIG } from '../config/api.config';
import { Observable } from 'rxjs';
import { Paciente } from '../models/paciente';

@Injectable({
  providedIn: 'root'
})
export class PacientesService {

  constructor(private http: HttpClient) { }

  findById(id: any): Observable<Paciente> {
    return this.http.get<Paciente>(`${API_CONFIG.baseUrl}/pacientes/${id}`);
  }

  findAll(): Observable<Paciente[]> {
    return this.http.get<Paciente[]>(`${API_CONFIG.baseUrl}/pacientes`);
  }

  create(paciente: Paciente): Observable<Paciente> {
    return this.http.post<Paciente>(`${API_CONFIG.baseUrl}/pacientes`, paciente);
  }

  update(paciente: Paciente): Observable<Paciente> {
    return this.http.put<Paciente>(`${API_CONFIG.baseUrl}/pacientes/${paciente.id}`, paciente);
  }

  delete(id: any): Observable<Paciente> {
    return this.http.delete<Paciente>(`${API_CONFIG.baseUrl}/pacientes/${id}`);
  }
}
