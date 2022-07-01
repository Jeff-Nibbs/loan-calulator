import React from "react";

class PaymentHistory extends React.Component {

  render() {
    const { items } = this.props;
    return (
      <ol>
        {items.map((item) => (
          <li key={item.id}>${item.payment}</li>
        ))}
      </ol>
    )
  }
}

export default PaymentHistory;