module.exports = function LoginTemplate(userName) {
    return `
      <div style="font-family: Arial, sans-serif; padding: 20px; background: #f4f4f4;">
        <div style="max-width: 600px; margin: auto; background: #ffffff; padding: 30px; border-radius: 10px; box-shadow: 0 0 10px rgba(0,0,0,0.05);">
          <h2 style="color: #333333;">🔐 Login Alert - Welcome Back, ${userName}!</h2>
          <p style="color: #555555;">We noticed a login to your account. If this was you, there's nothing you need to do.</p>
          <p style="color: #555555;">If you didn’t initiate this login, please reset your password immediately or contact our support team.</p>
          <hr style="border: none; border-top: 1px solid #e0e0e0;" />
          <p style="font-size: 12px; color: #999999;">This is an automated message. Please do not reply to this email.</p>
        </div>
      </div>
    `;
  };
  