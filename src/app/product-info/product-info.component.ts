import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'product-info',
  templateUrl: './product-info.component.html',
  styleUrls: ['./product-info.component.css']
})
export class ProductInfoComponent implements OnInit {

  prodID="Initial Def value";

  constructor() { }

  ngOnInit() {
  }

}
