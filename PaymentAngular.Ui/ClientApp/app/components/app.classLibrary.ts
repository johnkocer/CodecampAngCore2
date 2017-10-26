
export class Product {
  productId: string;
  price: number;
  name: string;
}

export interface IMember {
  MemberId: string;
  FullName: string;
  ZipCode: string;
  ErrorMessage: string;
  isSuccess: boolean;
}

export class Member implements IMember {
  public MemberId: string;
  public FullName: string;
  public ZipCode: string;
  ErrorMessage: string;
  isSuccess: boolean;
  constructor() {
    this.MemberId = "100";
    this.FullName = "jen Smart";
    this.ZipCode = "84223";
    this.ErrorMessage = "OK";
    this.isSuccess = true;
  }
}

export interface ISingleResponse<TModel> {
  model: TModel;
  message: string;
  didError: boolean;
  errorMessage: string;
}

export class SingleResponse<TModel> implements ISingleResponse<TModel> {
  public model: TModel;
  public message: string;
  public didError: boolean;
  public errorMessage: string;
}

export class Payment {
  memberId: string;
  paymentAmount: number;
  paymentDate: Date;
  nameOnCard: string;
  creditCardNumber: string;
  cvv: string;
  paymentSource: string;
  expirationDate: string;
  isSuccess: boolean;
  errorMessage: string;
  paymentMessage: string;
  paymentConfirmationId: string;
  member: Member;
}
