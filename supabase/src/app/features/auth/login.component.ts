import {Component, inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Router} from '@angular/router';
import {AuthService} from '../../core/auth.service';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {LucideAngularModule, Bird} from 'lucide-angular';
import {IconField} from 'primeng/iconfield';
import {InputIcon} from 'primeng/inputicon';
import {ButtonDirective, ButtonLabel} from 'primeng/button';
import {InputText} from 'primeng/inputtext';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    LucideAngularModule,
    IconField,
    InputIcon,
    ButtonDirective,
    ButtonLabel,
    InputText
  ],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  error: string | null = null;
  readonly Bird = Bird;

  auth = inject(AuthService)
  router = inject(Router)

  profileForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', Validators.required)
  });

  async onSubmit() {
    this.error = null;
    const username: string = this.profileForm.value.username ?? '';
    const password: string = this.profileForm.value.password ?? '';
    const res = await this.auth.signIn(username, password);
    if ((res as any).error) {
      this.error = (res as any).error;
      return;
    }
    this.router.navigate(['/protected']);
  }
}
