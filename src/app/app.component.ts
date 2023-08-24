import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { LoaderComponent } from './utity/components/loader.component';
import { RxIf } from '@rx-angular/template/if';
import { IsLoadingPipe } from './utity/pipes/is-loading.pipe';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, LoaderComponent, RxIf, IsLoadingPipe],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'stc-store';
}
