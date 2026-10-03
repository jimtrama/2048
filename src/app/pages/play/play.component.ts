import {  Component, OnInit } from '@angular/core';
import { Board } from '../../core/board.model';
import { Controller } from '../../core/controller.model';

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrl: './play.component.scss'
})
export class PlayComponent implements OnInit {
  private _board:Board;
  get board(){
    return this._board.board2D;
  }
  get score(){
    return this._board.score;
  }
  cellWidth:number = 0;
  addedTileIndex = -1;
  controller:Controller;

  constructor(){
    this._board = new Board();
    this._board.onAddedTile = this.addedTileOnIndex.bind(this);
    this.controller = new Controller();
  }

  ngOnInit(): void {
    this.controller.listen(this._board);
  }

  addedTileOnIndex(v:number){
    this.addedTileIndex = v;
  }
  
}
