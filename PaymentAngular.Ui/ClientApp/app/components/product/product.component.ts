import { Component, OnInit, Input } from '@angular/core';
import 'rxjs/add/operator/catch';
import { PaymentService } from "../paymentService";
import { Observable } from "rxjs/Observable";
import { FormsModule } from '@angular/forms';
import { Member, Product, Payment } from '../app.classLibrary';

@Component({
  selector: 'jk-product',
  providers: [PaymentService],
  templateUrl: './product.component.html'
})
export class ProductComponent implements OnInit {
  errorMessage: string;
  productList: Product[];
  selectedProduct: Product;
  montlyPayment: number;
  constructor(private paymentService: PaymentService) {
    this.productList = [];
    this.selectedProduct = new Product();
  }

  ngOnInit() {
    this.getProductList("all");
  }

  getProductList(filter: string) {
    this.paymentService.getProductList(filter)
      //.do(data => console.dir(data))
      .subscribe(
      data => this.productList = data,
      error => this.errorMessage = <any>error);
  }

  public onProductListChange(item: any) {
   // console.log("In onProductListChange: " + item);
    this.selectedProduct = item;
    this.montlyPayment = item.price / 12;
  }
}

