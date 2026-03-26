import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { LocalStorageKeys } from './constants/local-storage-keys';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatButtonModule, MatIconModule, MatMenuModule, RouterLink],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  readonly router = inject(Router);

  get isLoggedIn() {
    return localStorage.getItem(LocalStorageKeys.TOKEN) !== null;
  }

  onLogout() {
    localStorage.removeItem(LocalStorageKeys.TOKEN);
    this.router.navigateByUrl('login');
  }
}
