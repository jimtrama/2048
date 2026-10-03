import { AfterViewInit, Component, HostListener, Input } from '@angular/core';
import { Utils } from '../../core/utils.service';

@Component({
  selector: 'app-board-view',
  templateUrl: './board-view.component.html',
  styleUrl: './board-view.component.scss'
})
export class BoardViewComponent implements AfterViewInit {
  @Input() board:number[][] = [];
  @Input() score:number = 0;
  cellWidth:number = 0;
  @Input() addedTileIndex = -1;

  ngAfterViewInit(): void {
    this.setWidthOfTiles()
  }

  setWidthOfTiles(){
    const width = document.getElementsByClassName("playing-container")[0]?.getBoundingClientRect().width??0;
    this.cellWidth = (width / this.board.length ) - 15;
  }

  @HostListener('window:resize')
  onResize() {
    this.setWidthOfTiles()
  }

  checkJustAdded(i:number,j:number):boolean{
    if(this.addedTileIndex === Utils.cordsTo1D(i,j,this.board.length)){
      this.addedTileIndex = -1;
      return true;
    }
    return false;
  }
}
