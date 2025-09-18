import {Component, inject} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {RouterModule, Router} from '@angular/router';
import {AuthService} from '../../core/auth.service';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {LucideAngularModule, Bird} from 'lucide-angular';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    LucideAngularModule,
    NgOptimizedImage
  ],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  error: string | null = null;
  readonly Bird = Bird;

  profileForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', Validators.required)
  });

  constructor(private auth: AuthService, private router: Router) {}

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
