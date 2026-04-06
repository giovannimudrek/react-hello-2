import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { CadastroEtapa2Form } from '../../../core/services/auth.service';

function cnpjValidator(control: { value: string }) {
  const value = control.value?.replace(/\D/g, '') || '';
  if (!value) return null;
  // Validacao basica de comprimento
  if (value.length !== 14) return { cnpjInvalido: true };
  return null;
}

@Component({
  selector: 'app-cadastro-etapa2',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './cadastro-etapa2.component.html',
  styleUrls: ['./cadastro-etapa2.component.scss'],
})
export class CadastroEtapa2Component {
  @Input() isLoading = false;
  @Output() voltar = new EventEmitter<void>();
  @Output() criarConta = new EventEmitter<CadastroEtapa2Form>();
  @Output() navigateToLogin = new EventEmitter<void>();

  form: FormGroup;

  cargosOpcoes: string[] = [
    'Desenvolvedor(a)',
    'Designer',
    'Gerente de Projetos',
    'Analista de Negocios',
    'Arquiteto(a) de Software',
    'DevOps / SRE',
    'Product Owner',
    'Scrum Master',
    'QA / Testador(a)',
    'Outro',
  ];

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      nomeEmpresa: ['', [Validators.required]],
      cnpj: ['', [Validators.required, cnpjValidator as any]],
      telefone: ['', [Validators.required, Validators.minLength(14)]],
      cargo: ['', [Validators.required]],
      aceitaTermos: [false, [Validators.requiredTrue]],
      receberNovidades: [false],
    });
  }

  get nomeEmpresa() {
    return this.form.get('nomeEmpresa')!;
  }
  get cnpj() {
    return this.form.get('cnpj')!;
  }
  get telefone() {
    return this.form.get('telefone')!;
  }
  get cargo() {
    return this.form.get('cargo')!;
  }
  get aceitaTermos() {
    return this.form.get('aceitaTermos')!;
  }
  get receberNovidades() {
    return this.form.get('receberNovidades')!;
  }

  onCnpjInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    let value = input.value.replace(/\D/g, '');
    if (value.length > 14) value = value.slice(0, 14);
    // Formato: 00.000.000/0001-00
    if (value.length > 12) {
      value = `${value.slice(0, 2)}.${value.slice(2, 5)}.${value.slice(5, 8)}/${value.slice(8, 12)}-${value.slice(12)}`;
    } else if (value.length > 8) {
      value = `${value.slice(0, 2)}.${value.slice(2, 5)}.${value.slice(5, 8)}/${value.slice(8)}`;
    } else if (value.length > 5) {
      value = `${value.slice(0, 2)}.${value.slice(2, 5)}.${value.slice(5)}`;
    } else if (value.length > 2) {
      value = `${value.slice(0, 2)}.${value.slice(2)}`;
    }
    input.value = value;
    this.form.get('cnpj')!.setValue(value, { emitEvent: false });
  }

  onTelefoneInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    let value = input.value.replace(/\D/g, '');
    if (value.length > 11) value = value.slice(0, 11);
    // Formato: (00) 00000-0000
    if (value.length > 7) {
      value = `(${value.slice(0, 2)}) ${value.slice(2, 7)}-${value.slice(7)}`;
    } else if (value.length > 2) {
      value = `(${value.slice(0, 2)}) ${value.slice(2)}`;
    } else if (value.length > 0) {
      value = `(${value}`;
    }
    input.value = value;
    this.form.get('telefone')!.setValue(value, { emitEvent: false });
  }

  onVoltar(): void {
    this.voltar.emit();
  }

  onCriarConta(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.criarConta.emit(this.form.value as CadastroEtapa2Form);
  }

  onEntrar(): void {
    this.navigateToLogin.emit();
  }
}
