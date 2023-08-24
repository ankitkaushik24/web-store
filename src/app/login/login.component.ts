import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from './user.service';
import { Notifier } from '../utity/operators/notifier';

@Component({
  selector: 'stc-login',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    NgOptimizedImage,
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class LoginComponent {
  private fb = inject(FormBuilder);
  private loginService = inject(UserService);

  loginFormGroup = this.fb.nonNullable.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  });

  onLogin() {
    if (this.loginFormGroup.valid) {
      const { credentials } = this.loginService.login(
        this.loginFormGroup.value as Required<typeof this.loginFormGroup.value>
      );

      if (credentials === false) {
        Notifier.notification$.next({
          type: 'error',
          message: 'Perhaps Wrong Credentials!',
          heading: 'Error',
          primary: { text: 'Dismiss' },
        });
      }
    }
  }
}
