import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { CadastroEtapa1Form } from '../../../core/services/auth.service';

function senhasIguaisValidator(control: AbstractControl): ValidationErrors | null {
  const group = control.parent;
  if (!group) return null;
  const senha = group.get('senha')?.value;
  const confirmar = control.value;
  if (senha && confirmar && senha !== confirmar) {
    return { senhasNaoCoincidem: true };
  }
  return null;
}

@Component({
  selector: 'app-cadastro-etapa1',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './cadastro-etapa1.component.html',
  styleUrls: ['./cadastro-etapa1.component.scss'],
})
export class CadastroEtapa1Component {
  @Output() concluido = new EventEmitter<CadastroEtapa1Form>();
  @Output() navigateToLogin = new EventEmitter<void>();

  form: FormGroup;
  showSenha = false;
  showConfirmarSenha = false;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      nomeCompleto: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(8)]],
      confirmarSenha: ['', [Validators.required, senhasIguaisValidator]],
    });

    // Revalidar confirmarSenha quando senha muda
    this.form.get('senha')?.valueChanges.subscribe(() => {
      this.form.get('confirmarSenha')?.updateValueAndValidity();
    });
  }

  get nomeCompleto() {
    return this.form.get('nomeCompleto')!;
  }
  get email() {
    return this.form.get('email')!;
  }
  get senha() {
    return this.form.get('senha')!;
  }
  get confirmarSenha() {
    return this.form.get('confirmarSenha')!;
  }

  get forcaSenha(): 'fraca' | 'media' | 'forte' | '' {
    const val: string = this.senha.value || '';
    if (!val) return '';
    if (val.length < 8) return 'fraca';
    const temMaiuscula = /[A-Z]/.test(val);
    const temNumero = /[0-9]/.test(val);
    const temEspecial = /[^A-Za-z0-9]/.test(val);
    const score = [temMaiuscula, temNumero, temEspecial].filter(Boolean).length;
    if (score >= 2) return 'forte';
    if (score === 1) return 'media';
    return 'fraca';
  }

  get forcaSenhaLabel(): string {
    const forca = this.forcaSenha;
    if (forca === 'fraca') return 'Fraca';
    if (forca === 'media') return 'Media';
    if (forca === 'forte') return 'Forte';
    return '';
  }

  get forcaSenhaLargura(): string {
    const forca = this.forcaSenha;
    if (forca === 'fraca') return '33%';
    if (forca === 'media') return '66%';
    if (forca === 'forte') return '100%';
    return '0%';
  }

  get forcaSenhaCor(): string {
    const forca = this.forcaSenha;
    if (forca === 'fraca') return '#d92d20';
    if (forca === 'media') return '#f79009';
    if (forca === 'forte') return '#12b76a';
    return '#e9eaeb';
  }

  toggleSenha(): void {
    this.showSenha = !this.showSenha;
  }

  toggleConfirmarSenha(): void {
    this.showConfirmarSenha = !this.showConfirmarSenha;
  }

  onContinuar(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const { confirmarSenha, ...dados } = this.form.value;
    this.concluido.emit(this.form.value as CadastroEtapa1Form);
  }

  onEntrar(): void {
    this.navigateToLogin.emit();
  }
}
