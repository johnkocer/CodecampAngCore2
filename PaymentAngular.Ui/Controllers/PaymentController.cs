using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using SmartIT.Payment.MockDB.DataAccess;

namespace Payment.Ui.Controllers
{
  public class PaymentController : Controller
  {
    private PaymentRespository _repository = PaymentRespository.Current;

    [Route("api/GetMemberInfo")]
    [HttpPost]
    public Member GetMemberInfo([FromBody]string id)
    {
      var errorMessage = string.Empty;
      var member = new Member();
      if (!string.IsNullOrEmpty(id))
      {
        Member found = _repository.Get(id);
        if (found != null)
        {
          member = found;
          errorMessage = "200 OK";
          member.ErrorMessage = errorMessage;
          member.IsSuccess = true;
        }
        else
        {
          errorMessage = "id: IsNullOrEmpty";
          member.ErrorMessage = errorMessage;
          member.IsSuccess = false;
        }
      }
      else
      {
        errorMessage = " Query string arguments memberId is missing!";
      }
      return member;
    }

    [Route("api/MakePayment")]
    [HttpPost]
    public SmartIT.Payment.MockDB.DataAccess.Payment MakePayment([FromBody]SmartIT.Payment.MockDB.DataAccess.Payment item)
    {

      if (string.IsNullOrEmpty(item.ExpirationDate))
      {
        item.IsSuccess = false;
        item.ErrorMessage = "expiration date is not valid!";
        return item;
      }
      var expirationMmYy = item.ExpirationDate.Split('/');
      item.ErrorMessage = "200 OK";
      item.PaymentMessage = "Your payment of $" + item.PaymentAmount + " has been processed!";
      return item;
    }

    [Route("api/GetProductList")]
    [HttpGet]
    public List<Product> GetProductList(string filter)
    {
      var productList = _repository.GetAllProduct();
      return productList;
    }
  }
}