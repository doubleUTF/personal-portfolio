import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-stage',
  templateUrl: './stage.component.html',
  styleUrls: ['./stage.component.css']
})
export class StageComponent implements OnInit {

  constructor() { }
  fadeIn:Boolean=false;
  ngOnInit() {
    this.fadeIn=true;
  }

}
