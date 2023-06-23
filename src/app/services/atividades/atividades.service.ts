import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Atividade, EditarAtividadeRequest, NovaAtividadeRequest } from 'src/app/models/atividades/Atividade';
import { Observable } from 'rxjs';
import { environment } from 'src/app/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AtividadesService {

  API = `${environment.config.apis.smarttimer}/atividades`;
  ID_USUARIO = 1;

  constructor(private http: HttpClient) {}

  listar(): Observable<Atividade[]> {
    return this.http.get<Atividade[]>(`${this.API}?idUsuario=${this.ID_USUARIO}`);
  }

  inserir(atividade: NovaAtividadeRequest): Observable<Atividade> {
    atividade.idUsuario = this.ID_USUARIO;
    return this.http.post<Atividade>(this.API, atividade);
  }

  editar(id: number, atividade: EditarAtividadeRequest): Observable<Atividade> {
    const url = `${this.API}/${id}`;
    return this.http.put<Atividade>(url, atividade);
  }

}
