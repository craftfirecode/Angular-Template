import {Component, inject} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {RouterModule, Router} from '@angular/router';
import {SupabaseService} from '../../core';
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
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required)
  });

  constructor(private auth: SupabaseService, private router: Router) {}

  async onSubmit() {
    this.error = null;
    const email: string = this.profileForm.value.email ?? '';
    const password: string = this.profileForm.value.password ?? '';
    const res = await this.auth.signIn(email, password);
    if ((res as any).error) {
      return;
    }
    this.router.navigate(['/protected']);
  }
}
