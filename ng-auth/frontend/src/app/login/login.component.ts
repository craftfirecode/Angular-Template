import {Component} from '@angular/core';
import {AuthService} from '../auth.service';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [
    FormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  email = '';
  password = '';

  constructor(private auth: AuthService) {
  }

  onSubmit() {
    this.auth.login(this.email, this.password).subscribe({
      next: (res) => {
        this.auth.saveToken(res.access_token);
        alert('Login erfolgreich!');
      },
      error: () => alert('Login fehlgeschlagen'),
    });
  }
}
