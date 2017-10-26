import { Component, OnInit } from '@angular/core';
import 'rxjs/add/operator/catch';
import { PaymentService } from "../paymentService";
import { Observable } from "rxjs/Observable";
import { Payment, Product, Member } from '../app.classLibrary';

@Component({
  selector: 'jk-member',
  providers: [PaymentService],
  templateUrl: './member.component.html'
})
export class MemberComponent implements OnInit {
  errorMessage: string;
  member: Member;
  paymenRes: any;
  constructor(private paymentService: PaymentService) {
    this.member = new Member();
  }

  ngOnInit() {
    this.getMember("1");
  }

  getMember(id: string) {
    if (!id) { return; }
    this.paymentService.getMember(id)
      .do(data => console.dir(data))
      .subscribe(
      data => this.member = data,
      error => this.errorMessage = <any>error);
  }
}