import React from 'react';

const EmbedCheckout = () => {
  const bigCommerceUrl = 'https://bw-sandbox-03.mybigcommerce.com/cart.php';

  return (
    <div>
      <iframe
        title="BigCommerce Checkout"
        src={bigCommerceUrl}
        width="100%"
        height="600px"
        frameBorder="0"
        scrolling="auto"
      ></iframe>
    </div>
  );
};

export default EmbedCheckout;
