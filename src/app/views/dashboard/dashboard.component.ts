import { Component, OnInit } from '@angular/core';
import { foodDetails } from 'src/app/models/foodDetails';
import { FoodService } from 'src/app/services/food.service';
import { filter, map } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public foodList: foodDetails[];
  public searchText: string;
  public foodItem: foodDetails;
  public isResponse: boolean;

  constructor(private foodService: FoodService,) {
    this.foodList = {} as foodDetails[];
    this.searchText = "";
    this.foodItem = {} as foodDetails;
    this.isResponse = false;
   }

  ngOnInit(): void {
    this.getAllFood()
  }

  getAllFood() {
    this.foodService.getFoodList().pipe(map((item: foodDetails[])=>{
      return item.filter((item: foodDetails)=>{
        return (
          item.restaurant.toLowerCase().includes(this.searchText.toLowerCase()) ||  
          item.dishName.toLowerCase().includes(this.searchText.toLowerCase())
        )
      })
    })).subscribe((res: foodDetails[])=>{
      this.foodList = res; 
      this.isResponse=true;
      //console.log(this.foodList);
    })
  }

}
