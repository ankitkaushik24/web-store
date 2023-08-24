import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatToolbarModule} from '@angular/material/toolbar';
import { UserService } from 'src/app/login/user.service';
import {inject} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'stc-global-header',
  standalone: true,
  imports: [CommonModule, MatToolbarModule, MatButtonModule],
  templateUrl: './global-header.component.html',
  styleUrls: ['./global-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GlobalHeaderComponent {
  private userService = inject(UserService);

  get username(): string {
    return this.userService.currentUser?.username;
  }

  logout() {
    this.userService.logout();
  }

}
