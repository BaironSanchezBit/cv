import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  letters: { char: string; x: string; y: string }[] = [];
  name = ''; // Texto animado
  fullName = 'Bairon Sánchez'; // Texto completo
  typingIndex = 0; // Índice de escritura
  isDeleting = false; // Indicador de estado
  delay = 2000; // Retardo inicial

  ngOnInit() {
    this.startGeneratingLetters();
    this.startTypingAnimation();
  }

  startGeneratingLetters() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';
    setInterval(() => {
      for (let i = 0; i < 5; i++) {
        const randomChar = characters.charAt(Math.floor(Math.random() * characters.length));
        const randomX = `${Math.random() * 100}vw`;
        const randomY = '-10px';
        this.letters.push({ char: randomChar, x: randomX, y: randomY });
      }
      if (this.letters.length > 500) {
        this.letters.splice(0, 5);
      }
    }, 50);
  }

  startTypingAnimation() {
    const interval = setInterval(() => {
      if (!this.isDeleting && this.typingIndex < this.fullName.length) {
        // Escribir texto
        this.name += this.fullName[this.typingIndex];
        this.typingIndex++;
      } else if (!this.isDeleting && this.typingIndex === this.fullName.length) {
        // Pausa antes de borrar
        this.isDeleting = true;
        clearInterval(interval);
        setTimeout(() => this.startTypingAnimation(), this.delay);
      } else if (this.isDeleting && this.typingIndex > 0) {
        // Borrar texto
        this.name = this.name.slice(0, -1);
        this.typingIndex--;
      } else if (this.isDeleting && this.typingIndex === 0) {
        // Pausa antes de escribir nuevamente
        this.isDeleting = false;
        clearInterval(interval);
        setTimeout(() => this.startTypingAnimation(), this.delay / 2);
      }
    }, 150); // Velocidad de escritura/borrado
  }
}
