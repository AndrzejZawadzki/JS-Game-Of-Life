import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-game-of-life',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './game-of-life.component.html',
  styleUrl: './game-of-life.component.css',
})
export class GameOfLifeComponent implements OnInit {
  rows: number = 20;
  cols: number = 30;
  board: boolean[][] = [];

  ngOnInit(): void {
    this.initializedBoard();
  }

  initializedBoard(): void {
    this.board = Array.from({ length: this.rows }, () =>
      Array(this.cols).fill(false)
    );
  }

  toggleCell(row: number, col: number): void {
    this.board[row][col] = !this.board[row][col];
  }
}
