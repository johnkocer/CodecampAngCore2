import { Injectable } from "@angular/core";
import { Http, Response, Headers, RequestOptions } from "@angular/http";
import "rxjs/add/operator/map";
import 'rxjs/add/operator/do';  // debug
import { Observable } from "rxjs/Observable";
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { Member, Product, Payment } from './app.classLibrary';

@Injectable()
export class PaymentService {
  private baseUrl: string;

  constructor(private http: Http) {
    this.baseUrl = '/api/';  // URL to web API
  }

  getProductList(filter:string): Observable<Product[]> {
    return this.http.get(`${this.baseUrl}GetProductList?filter=${filter}`, this.getOptions())
      .map(response => response.json())
      .catch(this.handleError);
  }

  getMember(id: string): Observable<Member> {

    //console.log("in getMember, id:" + id);
    return this.http.post(`${this.baseUrl}GetMemberInfo/`, JSON.stringify(id), this.getOptions())
      .map(response => response.json())
      .catch(this.handleError);
  }

  makePayment(payment: any): Observable<Payment> {

    console.log("in makePayment, payment:" + payment);
    return this.http.post(`${this.baseUrl}MakePayment/`, JSON.stringify(payment), this.getOptions())
      .map(response => response.json())
      .catch(this.handleError);
  }

  private extractData(res: Response) {
    let body = res.json();
    //console.dir(res);
    return body._body || {};
  }

  private getOptions() {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json; charset=utf-8');
    var options = new RequestOptions({ headers: headers });
    return options;
  }
  private handleError(error: Response | any) {
    // In a real world app, we might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
   // console.error(errMsg);
    return Observable.throw(errMsg);
  }
}