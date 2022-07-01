import React from "react";
import PaymentHistory from "./paymentHistory";

class InfoCenter extends React.Component {
  constructor() {
    super();
    this.state = { 
      loanAmount: '',
      interestRate: '',
      
      interestRatePerMonth: '',
      minPayments: '0',

      payment: '',
      newLoanAmount: '0',
      paymentList: [],
      
    };
  }

  loanAmountChange = ({ target: {value}}) => this.setState({ loanAmount: value});

  interestRateChange = ({ target: {value}}) => this.setState({ interestRate: value});

  makePaymentChange = ({ target: {value}}) => this.setState({payment: value});

  handleCalcSubmit = (e) => {
    e.preventDefault();

    const initialLoanAmount = this.state.loanAmount;
    const interestPercent = (this.state.interestRate / 100);
    const interestPerMonth = (interestPercent / 12);
    const interest = interestPerMonth * initialLoanAmount;
    const principal = initialLoanAmount * 0.01;
    const minPayment = (interest + principal).toFixed(2);
 

    this.setState((state) => ({
      minPayments: minPayment,
      newLoanAmount: this.state.loanAmount,
      interestRatePerMonth: interestPerMonth,
      
    }));
  }

  handlePaySubmit = (e) => {
    e.preventDefault();

    if (this.state.payment >= this.state.minPayments) {

      const interest = this.state.interestRatePerMonth * this.state.newLoanAmount;
      const amountToPrincipal = this.state.payment - interest;
      const adjustedLoanAmount = (this.state.newLoanAmount - amountToPrincipal).toFixed(2);
      const minPayment = ((adjustedLoanAmount * this.state.interestRatePerMonth) + (adjustedLoanAmount * 0.01 )).toFixed(2);
      const newPayment = {
        payment: this.state.payment,
        id: Date.now(),
      }
      this.setState((state) => ({
        newLoanAmount: adjustedLoanAmount,
        minPayments: minPayment,
        payment: '',
        paymentList: [...state.paymentList, newPayment],
      }));
    }
    
  }


  render() {
    return(
      <div>
        <div className="loan-calc-box">
        <div>
        <h2>Loan Calculator</h2>
        <form onSubmit={this.handleCalcSubmit}>
          <label htmlFor="newCalc">Loan Amount</label>
          <br />
         <input
         onChange={this.loanAmountChange}
         type="number"
         autoComplete="off"
         value={this.state.loanAmount}/>
          <br />
          <label htmlFor="newCalc">Interest Rate</label>
          <br />
          <input
          onChange={this.interestRateChange}
          type="number"
          autoComplete="off"
          value={this.state.interestRate}/>
          <br />
          <button>Calculate</button>
        </form>
        </div>

        <div>
          <h2>Make a Payment</h2>
          <h3>Balance ${this.state.newLoanAmount}</h3>
          <h3>Min Payment ${this.state.minPayments}</h3>
          <form onSubmit={this.handlePaySubmit}>
            <label htmlFor="newPay">Payment</label>
            <br />
            <input
            onChange={this.makePaymentChange}
            type="number"
            autoComplete="off"
            value={this.state.payment}/>
            <br />
            <button>Submit</button>
          </form>
          
        </div>
        </div>
        <div className="history-box">
          <h2>Payment History</h2>
          <PaymentHistory items={this.state.paymentList}/>
        </div>

      </div>
    )
  }
}

export default InfoCenter;