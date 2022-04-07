import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { foodDetails } from 'src/app/models/foodDetails';

@Component({
  selector: 'app-food-card',
  templateUrl: './food-card.component.html',
  styleUrls: ['./food-card.component.scss']
})
export class FoodCardComponent implements OnInit {

  @Input() FoodList! : foodDetails[];

  @ViewChild('placeOrder', {static :true}) placeOrder :any;
  @ViewChild('addToCart', {static :true}) addToCart :any;

  constructor() { }

  ngOnInit(): void {
    console.log("foodlist", this.FoodList)
  }

}
