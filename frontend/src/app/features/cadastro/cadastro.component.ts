import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CadastroEtapa1Component } from './etapa1/cadastro-etapa1.component';
import { CadastroEtapa2Component } from './etapa2/cadastro-etapa2.component';
import {
  AuthService,
  CadastroEtapa1Form,
  CadastroEtapa2Form,
  CadastroPayload,
} from '../../core/services/auth.service';

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [CommonModule, CadastroEtapa1Component, CadastroEtapa2Component],
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss'],
})
export class CadastroComponent {
  etapa = 1;
  isLoading = false;
  errorMessage = '';
  networkError = false;

  dadosEtapa1: CadastroEtapa1Form | null = null;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  onEtapa1Concluida(dados: CadastroEtapa1Form): void {
    this.dadosEtapa1 = dados;
    this.etapa = 2;
  }

  onVoltar(): void {
    this.etapa = 1;
    this.errorMessage = '';
    this.networkError = false;
  }

  onCriarConta(dadosEtapa2: CadastroEtapa2Form): void {
    if (!this.dadosEtapa1) return;

    const payload: CadastroPayload = {
      ...this.dadosEtapa1,
      ...dadosEtapa2,
    };

    this.isLoading = true;
    this.errorMessage = '';
    this.networkError = false;

    this.authService.register(payload).subscribe({
      next: () => {
        this.isLoading = false;
        this.router.navigate(['/login'], {
          queryParams: { cadastro: 'sucesso' },
        });
      },
      error: (err) => {
        this.isLoading = false;
        if (err.status === 0) {
          this.networkError = true;
        } else if (err.status === 409) {
          this.errorMessage = 'Este e-mail ja esta em uso.';
        } else {
          this.errorMessage =
            err.error?.message || 'Ocorreu um erro. Tente novamente.';
        }
      },
    });
  }

  onNavigateToLogin(): void {
    this.router.navigate(['/login']);
  }

  retry(): void {
    this.networkError = false;
  }
}
