import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
@Component({
  standalone: true,
  selector: 'app-header',
  imports: [CommonModule, RouterModule],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  isMenuOpen = false;

  // Alternar visibilidad del menú móvil
  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  // Cerrar menú móvil
  closeMenu() {
    this.isMenuOpen = false;
  }
}
