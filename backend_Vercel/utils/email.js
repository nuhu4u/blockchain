const nodemailer = require('nodemailer');
const logger = require('./logger');
require('dotenv').config();

class EmailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });
  }

  async sendOTP(email, otp, userName = '') {
    try {
      const mailOptions = {
        from: `"Election System" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: 'Password Reset OTP - Election System',
        html: `
          <!DOCTYPE html>
          <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Password Reset OTP</title>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: #2563eb; color: white; padding: 20px; text-align: center; }
              .content { background: #f8f9fa; padding: 30px; }
              .otp-box { background: white; border: 2px solid #2563eb; padding: 20px; text-align: center; margin: 20px 0; }
              .otp-code { font-size: 32px; font-weight: bold; color: #2563eb; letter-spacing: 5px; }
              .warning { background: #fff3cd; border: 1px solid #ffeaa7; padding: 15px; margin: 20px 0; border-radius: 5px; }
              .footer { text-align: center; padding: 20px; color: #666; font-size: 14px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>🗳️ Election System</h1>
                <h2>Password Reset Request</h2>
              </div>
              <div class="content">
                <p>Hello ${userName || 'User'},</p>
                <p>You have requested to reset your password for the Election System. Please use the OTP code below to proceed:</p>
                
                <div class="otp-box">
                  <p>Your OTP Code:</p>
                  <div class="otp-code">${otp}</div>
                </div>
                
                <div class="warning">
                  <strong>⚠️ Important Security Information:</strong>
                  <ul>
                    <li>This OTP will expire in <strong>2 minutes</strong></li>
                    <li>Do not share this code with anyone</li>
                    <li>If you didn't request this reset, please ignore this email</li>
                    <li>You have maximum 3 attempts to use this OTP</li>
                  </ul>
                </div>
                
                <p>If you're having trouble, please contact our support team.</p>
                <p>Best regards,<br>Election System Team</p>
              </div>
              <div class="footer">
                <p>This is an automated message. Please do not reply to this email.</p>
                <p>© ${new Date().getFullYear()} Election System. All rights reserved.</p>
              </div>
            </div>
          </body>
          </html>
        `
      };

      const result = await this.transporter.sendMail(mailOptions);
      logger.info(`OTP email sent successfully to ${email}`, { messageId: result.messageId });
      return { success: true, messageId: result.messageId };
    } catch (error) {
      logger.error('Failed to send OTP email:', error);
      throw new Error('Failed to send OTP email');
    }
  }

  async sendWelcomeEmail(email, userName, voterID) {
    try {
      const mailOptions = {
        from: `"Election System" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: 'Welcome to Election System - Registration Successful',
        html: `
          <!DOCTYPE html>
          <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Welcome to Election System</title>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: #16a34a; color: white; padding: 20px; text-align: center; }
              .content { background: #f8f9fa; padding: 30px; }
              .voter-id-box { background: white; border: 2px solid #16a34a; padding: 20px; text-align: center; margin: 20px 0; }
              .voter-id { font-size: 24px; font-weight: bold; color: #16a34a; letter-spacing: 2px; }
              .info-box { background: #e7f3ff; border: 1px solid #b3d9ff; padding: 15px; margin: 20px 0; border-radius: 5px; }
              .footer { text-align: center; padding: 20px; color: #666; font-size: 14px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>🗳️ Election System</h1>
                <h2>Welcome & Registration Successful!</h2>
              </div>
              <div class="content">
                <p>Dear ${userName},</p>
                <p>Congratulations! Your registration with the Election System has been completed successfully.</p>
                
                <div class="voter-id-box">
                  <p>Your Unique Voter ID:</p>
                  <div class="voter-id">${voterID}</div>
                </div>
                
                <div class="info-box">
                  <strong>📋 What's Next?</strong>
                  <ul>
                    <li>Your NIN has been verified and secured</li>
                    <li>You can now participate in active elections</li>
                    <li>View live election results and statistics</li>
                    <li>Track your vote using the transaction hash after voting</li>
                  </ul>
                </div>
                
                <p><strong>🔐 Security Reminder:</strong></p>
                <ul>
                  <li>Keep your Voter ID safe and confidential</li>
                  <li>Never share your login credentials</li>
                  <li>Always log out after using the system</li>
                </ul>
                
                <p>Thank you for being part of our democratic process!</p>
                <p>Best regards,<br>Election System Team</p>
              </div>
              <div class="footer">
                <p>This is an automated message. Please do not reply to this email.</p>
                <p>© ${new Date().getFullYear()} Election System. All rights reserved.</p>
              </div>
            </div>
          </body>
          </html>
        `
      };

      const result = await this.transporter.sendMail(mailOptions);
      logger.info(`Welcome email sent successfully to ${email}`, { messageId: result.messageId });
      return { success: true, messageId: result.messageId };
    } catch (error) {
      logger.error('Failed to send welcome email:', error);
      throw new Error('Failed to send welcome email');
    }
  }

  async sendObserverApprovalEmail(email, observerName, observerID, status) {
    try {
      const isApproved = status === 'approved';
      const mailOptions = {
        from: `"Election System" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: `Observer Application ${isApproved ? 'Approved' : 'Update'} - Election System`,
        html: `
          <!DOCTYPE html>
          <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Observer Application ${isApproved ? 'Approved' : 'Update'}</title>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: ${isApproved ? '#16a34a' : '#dc2626'}; color: white; padding: 20px; text-align: center; }
              .content { background: #f8f9fa; padding: 30px; }
              .status-box { background: white; border: 2px solid ${isApproved ? '#16a34a' : '#dc2626'}; padding: 20px; text-align: center; margin: 20px 0; }
              .observer-id { font-size: 24px; font-weight: bold; color: ${isApproved ? '#16a34a' : '#dc2626'}; letter-spacing: 2px; }
              .footer { text-align: center; padding: 20px; color: #666; font-size: 14px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>🗳️ Election System</h1>
                <h2>Observer Application ${isApproved ? 'Approved' : 'Update'}</h2>
              </div>
              <div class="content">
                <p>Dear ${observerName},</p>
                <p>Your observer application has been <strong>${status}</strong>.</p>
                
                ${isApproved ? `
                <div class="status-box">
                  <p>Your Observer ID:</p>
                  <div class="observer-id">${observerID}</div>
                </div>
                
                <p><strong>🎉 Congratulations!</strong> You now have access to:</p>
                <ul>
                  <li>Live election monitoring dashboard</li>
                  <li>Real-time voting statistics</li>
                  <li>Election result tracking</li>
                  <li>Observer-specific reports and analytics</li>
                </ul>
                ` : `
                <div class="status-box">
                  <p>Application Status:</p>
                  <div class="observer-id">${status.toUpperCase()}</div>
                </div>
                `}
                
                <p>Thank you for your interest in election observation.</p>
                <p>Best regards,<br>Election System Team</p>
              </div>
              <div class="footer">
                <p>This is an automated message. Please do not reply to this email.</p>
                <p>© ${new Date().getFullYear()} Election System. All rights reserved.</p>
              </div>
            </div>
          </body>
          </html>
        `
      };

      const result = await this.transporter.sendMail(mailOptions);
      logger.info(`Observer ${status} email sent successfully to ${email}`, { messageId: result.messageId });
      return { success: true, messageId: result.messageId };
    } catch (error) {
      logger.error('Failed to send observer status email:', error);
      throw new Error('Failed to send observer status email');
    }
  }

  // Generic sendEmail function for templates
  async sendEmail({ to, subject, template, context }) {
    try {
      let html = '';
      
      switch (template) {
        case 'welcome':
          html = this.generateWelcomeTemplate(context);
          break;
        case 'password-reset':
          html = this.generatePasswordResetTemplate(context);
          break;
        case 'password-reset-success':
          html = this.generatePasswordResetSuccessTemplate(context);
          break;
        default:
          throw new Error(`Unknown email template: ${template}`);
      }

      const mailOptions = {
        from: `"Election System" <${process.env.EMAIL_USER}>`,
        to,
        subject,
        html
      };

      const result = await this.transporter.sendMail(mailOptions);
      logger.info(`Email sent successfully to ${to}`, { messageId: result.messageId, template });
      return { success: true, messageId: result.messageId };
    } catch (error) {
      logger.error('Failed to send email:', error);
      throw new Error('Failed to send email');
    }
  }

  // Generate welcome email template
  generateWelcomeTemplate({ name, loginUrl }) {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Welcome to Election System</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #2563eb; color: white; padding: 20px; text-align: center; }
          .content { background: #f8f9fa; padding: 30px; }
          .button { display: inline-block; background: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; margin: 20px 0; }
          .footer { text-align: center; padding: 20px; color: #666; font-size: 14px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🗳️ Election System</h1>
            <h2>Welcome!</h2>
          </div>
          <div class="content">
            <p>Hello ${name},</p>
            <p>Welcome to the Election System! Your registration has been completed successfully.</p>
            <p>You can now log in to your account and start using the system.</p>
            <a href="${loginUrl}" class="button">Login Now</a>
            <p>Best regards,<br>Election System Team</p>
          </div>
          <div class="footer">
            <p>This is an automated message. Please do not reply to this email.</p>
            <p>© ${new Date().getFullYear()} Election System. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `;
  }

  // Generate password reset template
  generatePasswordResetTemplate({ name, otp, expiresIn }) {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Password Reset Request</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #dc2626; color: white; padding: 20px; text-align: center; }
          .content { background: #f8f9fa; padding: 30px; }
          .otp-box { background: white; border: 2px solid #dc2626; padding: 20px; text-align: center; margin: 20px 0; }
          .otp-code { font-size: 32px; font-weight: bold; color: #dc2626; letter-spacing: 5px; }
          .warning { background: #fff3cd; border: 1px solid #ffeaa7; padding: 15px; margin: 20px 0; border-radius: 5px; }
          .footer { text-align: center; padding: 20px; color: #666; font-size: 14px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🗳️ Election System</h1>
            <h2>Password Reset Request</h2>
          </div>
          <div class="content">
            <p>Hello ${name || 'User'},</p>
            <p>You have requested to reset your password. Please use the OTP code below to proceed:</p>
            
            <div class="otp-box">
              <p>Your OTP Code:</p>
              <div class="otp-code">${otp}</div>
            </div>
            
            <div class="warning">
              <strong>⚠️ Important Security Information:</strong>
              <ul>
                <li>This OTP will expire in <strong>${expiresIn}</strong></li>
                <li>Do not share this code with anyone</li>
                <li>If you didn't request this reset, please ignore this email</li>
              </ul>
            </div>
            
            <p>Best regards,<br>Election System Team</p>
          </div>
          <div class="footer">
            <p>This is an automated message. Please do not reply to this email.</p>
            <p>© ${new Date().getFullYear()} Election System. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `;
  }

  // Generate password reset success template
  generatePasswordResetSuccessTemplate({ name }) {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Password Reset Successful</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #16a34a; color: white; padding: 20px; text-align: center; }
          .content { background: #f8f9fa; padding: 30px; }
          .success-box { background: white; border: 2px solid #16a34a; padding: 20px; text-align: center; margin: 20px 0; }
          .footer { text-align: center; padding: 20px; color: #666; font-size: 14px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🗳️ Election System</h1>
            <h2>Password Reset Successful</h2>
          </div>
          <div class="content">
            <p>Hello ${name || 'User'},</p>
            <p>Your password has been reset successfully. You can now log in with your new password.</p>
            
            <div class="success-box">
              <p>✅ Password Reset Complete</p>
            </div>
            
            <p>Best regards,<br>Election System Team</p>
          </div>
          <div class="footer">
            <p>This is an automated message. Please do not reply to this email.</p>
            <p>© ${new Date().getFullYear()} Election System. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `;
  }
}

module.exports = new EmailService();
