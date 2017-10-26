import { Component, OnInit, Input } from '@angular/core';
import 'rxjs/add/operator/catch';
import { PaymentService } from "../paymentService";
import { Observable } from "rxjs/Observable";
import { FormsModule } from '@angular/forms';
import { Payment, Product, Member } from "../app.classLibrary";

@Component({
  selector: 'jk-payment',
  providers: [PaymentService],
  templateUrl: './payment.component.html'
})
export class PaymentComponent implements OnInit {
  @Input() uiMember: Member;
  @Input() uiProduct: Product;
  errorMessage: string;
  paymentMessage: string;
  payment: Payment;
  paymentTypeList: any;
  paymenRes: any;
  constructor(private paymentService: PaymentService) {
    this.payment = new Payment();
    this.payment.creditCardNumber = "4441111111111111";
    this.payment.cvv = "941";
    this.payment.expirationDate = "12/2020";
    this.payment.nameOnCard = "jim Rich";
    this.payment.paymentAmount = 199.00;
    this.paymentTypeList = this.getPaymentType();
    this.paymentMessage = "";
  }

  ngOnInit() {
    this.payment.paymentAmount = this.uiProduct.price;
  }

  public handleMakePaymentClick(uiMember: Member, uiProduct: Product) {
   // console.log("In handleMakePaymentClick: " + this.uiMember + this.uiProduct);
    this.payment.nameOnCard = uiMember.FullName;
    this.payment.member = uiMember;
    this.payment.paymentAmount = uiProduct.price;
    //console.dir(this.payment);
    // validate inputs here
    if (this.payment.paymentAmount == undefined) {
      this.paymentMessage = "Select Payment!";
      return;
    }
    let res = this.makePayment(this.payment);
   // console.dir(res);
  }

  public OnPaymentTypeChange(item: any) {
    //console.log("In OnPaymentTypeChange: " + item);
    this.payment.creditCardNumber = "";
  }

  makePayment(payment: any) {
    if (!payment) { return; }
    this.paymentService.makePayment(payment)
     // .do(data => console.dir(data), )
      .subscribe(
      data => { this.paymenRes = data; this.paymentMessage = data.paymentMessage },
      error => this.errorMessage = <any>error);
  }

  getPayment() {
    let payment = {
      "memberId": "sample string 1",
      "paymentAmount": 2.0,
      "paymentDate": "2017-01-21T13:27:07.556148-07:00",
      "nameOnCard": "sample string 4",
      "creditCardNumber": "4441111111111111",
      "cvv": "sample string 6",
      "paymentSource": "sample string 7",
      "expirationDate": "sample string 8",
      "isSuccess": true,
      "errorMessage": "sample string 10",
      "paymentConfirmationId": "sample string 11",
      "member": {
        "memberId": "sample string 1",
        "fullName": "sample string 2",
        "zipCode": "sample string 3",
        "isSuccess": true,
        "errorMessage": "sample string 5"
      }
    };
    return payment;
  }

  getPaymentType() {
    let paymentType = [
      { text: "Visa", value: "Visa" }, { text: "Mastercard", value: "Mastercard" },
      { text: "Discover", value: "Discover" },
      { text: "AmericanExpress", value: "AmericanExpress" },
      { text: "SearsCard", value: "SearsCard" }, { text: "SearsGiftCard", value: "SearsGiftCard" }
    ];

    return paymentType;
  }
}

export class KeyValue {
  text: string;
  value: string;
}