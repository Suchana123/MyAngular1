import { Component, ElementRef, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { map } from 'rxjs';
import { OrderDetails } from 'src/app/models/order';
import { User } from 'src/app/models/user';
import { OrderStatus } from 'src/app/models/order';
import { UserAuthService } from 'src/app/services/user-auth.service';
import { OrderService } from 'src/app/services/order.service';
import { FoodService } from 'src/app/services/food.service';

@Component({
  selector: 'app-place-order',
  templateUrl: './place-order.component.html',
  styleUrls: ['./place-order.component.scss']
})
export class PlaceOrderComponent implements OnInit {
  @ViewChild('OrderSuccess', {static :true}) OrderSuccess :any;
  public bankForm: FormGroup;
  public cardForm: FormGroup;
  public payOpt: string;
  public orderDetails: OrderStatus;
  public itemTotal: number;
  public disabled: boolean;
  public currentUser: User;
  public searchText: string;
  public orderHistory: OrderStatus;
  public showOrderStatus: boolean;
  public showOrderHistory: boolean;
  constructor(
    //private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private confirmOrderService: OrderService,
    private authenticationService: UserAuthService,
    private foodService: FoodService
  ) {
    //this.paymentModal = {} as TemplateRef<any>;
    this.bankForm = {} as FormGroup;
    this.cardForm = {} as FormGroup;
    this.payOpt = "bank";
    this.orderDetails = {} as OrderStatus;
    this.itemTotal = 0;
    this.disabled = true;
    this.currentUser = {} as User;
    this.searchText = '';
    this.orderHistory = {} as OrderStatus;
    this.showOrderStatus = false;
    this.showOrderHistory = false;
   }

  ngOnInit(): void {
    this.authenticationService.currentUser.subscribe((user) => {
      this.currentUser = user 
    });
    this.initializeForms();
    this.itemTotal = this.confirmOrderService.getTotal;
  }
  
  public initializeForms():void{
      this.bankForm =  this.formBuilder.group({
        bankName:["",[Validators.required]],
        accHolderName:["",[Validators.required]],
        accNo:["",[Validators.required]], 
        
      })

      this.cardForm =  this.formBuilder.group({
        
        cardNo:["",[Validators.required, Validators.minLength(16)]],
       
        year:["",[Validators.required] ],
        cvv:["",[Validators.required, Validators.minLength(3), Validators.minLength(3)] ],
      })
    }

    get bankFormControls(){
      return this.bankForm.controls;
    }
    get cardFormControls(){
      return this.cardForm.controls;
    }

  
  ngDoCheck(): void{
    
    if(this.cardForm.status ==="VALID" || this.bankForm.status == "VALID"){
      this.disabled = false;
    }
    else{
      this.disabled = true;
    }
    
    
  }

  public resetForm(): void{
    this.bankFormControls['bankName'].setValue('');
    this.bankFormControls['accHolderName'].setValue('');
    this.bankFormControls['accNo'].setValue('');

    this.cardFormControls['cardNo'].setValue('');
    
    this.cardFormControls['year'].setValue('');
    this.cardFormControls['cvv'].setValue('');

  }
  public placeOrder(): void{
    let d = new Date();

    this.foodService.getOrdersList().subscribe((res: OrderStatus[])=>{
      let order = res.find(x=> x.userid === this.currentUser.id);
      
      
      if(order){
        this.orderDetails = {
     
          userid: this.currentUser.id,
          feedId: order.feedId + 1,
          orderstatus: "placed",
          paymentStatus: "paid",
          orderDateTime: `${d.toLocaleDateString()}:${d.toLocaleTimeString()}`
        }
        this.foodService.updateOrderList(order.id,this.orderDetails).subscribe((res: OrderStatus)=>{
          return res;;
        })
      }
      else{
        this. orderDetails = {
     
          userid: this.currentUser.id,
          feedId: 1,
          orderstatus: "placed",
          paymentStatus: "paid",
          orderDateTime: `${d.toLocaleDateString()}:${d.toLocaleTimeString()}`
        }
        this.foodService.placeOrder(this.orderDetails).subscribe((res: OrderStatus)=>{
          return res;
          
        })
      }
      this.confirmOrderService.clearConfirmOrderList();
      this.OrderSuccess.showModal();
      //this.modalService.dismissAll();
    })   
  }

  
  public changeOption(opt: string): void{
    this.payOpt = opt;
    this.resetForm();
  }

 
}
