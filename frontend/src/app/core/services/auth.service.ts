import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface CadastroEtapa1Form {
  nomeCompleto: string;
  email: string;
  senha: string;
  confirmarSenha: string;
}

export interface CadastroEtapa2Form {
  nomeEmpresa: string;
  cnpj: string;
  telefone: string;
  cargo: string;
  aceitaTermos: boolean;
  receberNovidades: boolean;
}

export interface CadastroPayload extends CadastroEtapa1Form, CadastroEtapa2Form {}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  register(dados: CadastroPayload): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/auth/register`, dados);
  }
}
