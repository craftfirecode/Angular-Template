import {Component, inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Router} from '@angular/router';
import {SupabaseService} from '../../core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {
  MatSnackBar,
  MatSnackBarAction,
  MatSnackBarActions,
  MatSnackBarLabel,
  MatSnackBarRef
} from '@angular/material/snack-bar';
import {LucideAngularModule, Bird} from 'lucide-angular';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatButtonModule,
    LucideAngularModule
  ],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  error: string | null = null;
  private _snackBar = inject(MatSnackBar);
  readonly Bird = Bird;

  durationInSeconds = 5;

  openSnackBar() {
    this._snackBar.openFromComponent(PizzaPartyAnnotatedComponent, {
      duration: this.durationInSeconds * 1000,
    });
  }

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
      this.openSnackBar()
      return;
    }
    this.router.navigate(['/protected']);
  }
}


@Component({
  selector: ' snack-bar-error',
  templateUrl: './snack-bar-error.html',
  styles: `
    :host {
      display: flex;
    }

    .example-pizza-party {
      color: hotpink;
    }
  `,
  imports: [MatButtonModule, MatSnackBarLabel, MatSnackBarActions, MatSnackBarAction],
})
export class PizzaPartyAnnotatedComponent {
  snackBarRef = inject(MatSnackBarRef);
}
