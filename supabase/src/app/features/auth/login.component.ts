import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { SupabaseService } from '../../core';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, MatInputModule, MatFormFieldModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  email = '';
  password = '';
  error: string | null = null;

  name = new FormControl('');

  constructor(private auth: SupabaseService, private router: Router) { }

  async onSubmit() {
    this.error = null;
    const res = await this.auth.signIn(this.email, this.password);
    if ((res as any).error) {
      this.error = (res as any).error.message;
      return;
    }
    this.router.navigate(['/protected']);
  }
}
