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
  numberOfRows: number = 10;
  numberOfColumns: number = 25;
  board: boolean[][] = [];
  intervalId: any = 1000;

  ngOnInit(): void {
    this.initializedBoard();
  }
  // Initialize the board with all cells set to false (dead)
  initializedBoard(): void {
    this.board = Array.from({ length: this.numberOfRows }, () =>
      Array(this.numberOfColumns).fill(false)
    );
  }
  // Toggle the state of a cell (alive or dead)
  toggleCell(row: number, col: number): void {
    this.board[row][col] = !this.board[row][col];
  }

  startGame(): void {
    this.intervalId = setInterval(() => this.nextGeneration(), this.intervalId);
  }

  stopGame(): void {
    clearInterval(this.intervalId);
  }

  resetGame(): void {
    this.stopGame();
    this.initializedBoard();
  }

  nextGeneration(): void {
    const newBoard = this.board.map((arr) => [...arr]);
    let changes = false;

    for (let row = 0; row < this.numberOfRows; row++) {
      for (let col = 0; col < this.numberOfColumns; col++) {
        const aliveNeighbors = this.countAliveNeighbors(row, col);

        if (this.board[row][col]) {
          if (aliveNeighbors < 2 || aliveNeighbors > 3) {
            newBoard[row][col] = false;
            changes = true;
          }
        } else {
          if (aliveNeighbors === 3) {
            newBoard[row][col] = true;
            changes = true;
          }
        }
      }
    }

    this.board = newBoard;

    if (!changes) {
      this.stopGame();
    }
  }

  countAliveNeighbors(row: number, col: number): number {
    let numberOfAliveNighbors = 0;

    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        if (i === 0 && j === 0) continue;

        const newRow = row + i;
        const newCol = col + j;

        if (
          newRow >= 0 &&
          newRow < this.numberOfRows &&
          newCol >= 0 &&
          newCol < this.numberOfColumns
        ) {
          if (this.board[newRow][newCol]) {
            numberOfAliveNighbors++;
          }
        }
      }
    }
    console.log('numberOfAliveNighbors: ', numberOfAliveNighbors);
    return numberOfAliveNighbors;
  }
}
