import React from 'react';

const PaymentInstructions = () => {
  const methods = [
    {
      title: 'Bkash Merchant',
      number: '01912218666',
      img: '/bkash.png',
      steps: [
        'Go to bKash App or Dial *247#',
        'Choose Payment',
        'Enter Merchant bKash Wallet No 01912218666',
        'Enter the amount of your order value',
        'Enter a reference No: Your First name or Email address',
        'Enter Counter No: 1',
        'Enter your Menu PIN to confirm',
        'Done! You will receive a confirmation SMS'
      ]
    },
    {
      title: 'Nagad Merchant',
      number: '01716404876',
      img: '/nagad.png',
      steps: [
        'Log in to Nagad App',
        'Click the Merchant Pay button',
        'Type 01716404876',
        'Type the amount',
        'Type reference and PIN',
        'Tap & hold',
        'Receive confirmation SMS at the end of payment'
      ]
    },
    {
      title: 'Rocket Personal',
      number: '01568016460',
      img: '/rocket.png',
      steps: [
        'Go to your DBBL Mobile Menu by dialing *322#',
        'Choose Personal Pay by press 2',
        'Enter our Personal Rocket Account Number 01568016460',
        'Enter Your First name or Email as a reference',
        'Enter the Invoice Amount',
        'Enter your DBBL Rocket Mobile Menu PIN to confirm',
        'Done! You will receive a confirmation message from DBBL Rocket'
      ]
    }
  ];

  return (
    <div className="px-4 sm:p-8 bg-white text-black dark:text-white dark:bg-[#1b1b1b]">
      <div className="grid md:grid-cols-3 gap-6 pb-8 font-Lato">
        {methods.map((item, i) => (
          <div key={i} className="text-center p-6 shadow-sm">
            <img src={item.img} alt={item.title} className="mx-auto w-16 h-16 object-contain" />
            <h2 className="font-semibold mt-2">{item.title}</h2>
            <p className="text-sm text-gray-700 mb-2">{item.number}</p>
            <div className="border-t border-gray-300 my-3"></div>
            <ol className="text-left text-sm leading-relaxed space-y-1 font-Monrope">
              {item.steps.map((s, idx) => (
                <li key={idx} className="flex gap-1"><span className="font-semibold">{idx + 1}.</span> {s}</li>
              ))}
            </ol>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PaymentInstructions;