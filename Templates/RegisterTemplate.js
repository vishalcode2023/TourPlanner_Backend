module.exports = function welcomeTemplate(userName) {
    return `
      <div style="font-family: Arial, sans-serif; padding: 20px; background: #f7f7f7;">
        <div style="max-width: 600px; margin: auto; background: white; padding: 30px; border-radius: 10px;">
          <h2 style="color: #333;">👋 Welcome, ${userName}!</h2>
          <p style="color: #555;">Thank you for signing up. We’re excited to have you on board.</p>
          <p style="color: #555;">Feel free to explore and reach out if you need help.</p>
          <hr style="border: none; border-top: 1px solid #eee;" />
          <p style="font-size: 12px; color: #999;">This is an automated message. Please don’t reply directly.</p>
        </div>
      </div>
    `;
  };
  