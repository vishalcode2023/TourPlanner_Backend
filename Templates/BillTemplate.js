module.exports = function BillTemplate(place, amount) {
    return `
      <div style="font-family: Arial, sans-serif; padding: 20px; background: #f4f4f4;">
        <div style="max-width: 600px; margin: auto; background: #ffffff; padding: 30px; border-radius: 10px; box-shadow: 0 0 10px rgba(0,0,0,0.05);">
          <h2 style="color: #333333;">🧾 Payment Receipt</h2>
          <p style="color: #555555;">Thank you for your payment. Here are the details of your transaction:</p>
  
          <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
            <tr style="background: #f9f9f9;">
              <td style="padding: 10px; border: 1px solid #e0e0e0;"><strong>Place</strong></td>
              <td style="padding: 10px; border: 1px solid #e0e0e0;">${place}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border: 1px solid #e0e0e0;"><strong>Amount</strong></td>
              <td style="padding: 10px; border: 1px solid #e0e0e0;">₹${amount}</td>
            </tr>
            <tr style="background: #f9f9f9;">
              <td style="padding: 10px; border: 1px solid #e0e0e0;"><strong>Date</strong></td>
              <td style="padding: 10px; border: 1px solid #e0e0e0;">${new Date().toLocaleString()}</td>
            </tr>
          </table>
  
          <p style="margin-top: 20px; color: #555555;">If you have any questions, feel free to contact our support team.</p>
  
          <hr style="border: none; border-top: 1px solid #e0e0e0; margin-top: 30px;" />
          <p style="font-size: 12px; color: #999999;">This is an automated receipt. Please keep it for your records.</p>
        </div>
      </div>
    `;
  };
  