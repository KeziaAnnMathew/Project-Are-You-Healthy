import { Component, OnInit } from '@angular/core';
import { RuhserviceService } from '../ruhservice.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  constructor(public serv:RuhserviceService) { }

  ngOnInit(): void {
    this.serv.search=false;
  }

}
