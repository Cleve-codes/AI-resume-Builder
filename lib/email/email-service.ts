import nodemailer from 'nodemailer';

// Determine environment
const isDevelopment = process.env.NODE_ENV !== 'production';

// Configure email transporter based on environment
const createTransport = () => {
  // Development environment - use MailHog
  if (isDevelopment) {
    console.log('Configuring email service for development (MailHog)');
    return nodemailer.createTransport({
      host: 'localhost',
      port: 1025,
      secure: false,
      auth: {
        // MailHog doesn't need authentication, but we'll keep these for consistency
        user: process.env.EMAIL_SERVER_USER || 'test',
        pass: process.env.EMAIL_SERVER_PASSWORD || 'test',
      },
      // Ignore TLS requirements for local development
      ignoreTLS: true,
    });
  }
  
  // Production environment - use SendGrid
  console.log('Configuring email service for production');
  return nodemailer.createTransport({
    host: process.env.EMAIL_SERVER_HOST,
    port: Number(process.env.EMAIL_SERVER_PORT),
    secure: process.env.EMAIL_SERVER_SECURE === 'true',
    auth: {
      user: process.env.EMAIL_SERVER_USER,
      pass: process.env.EMAIL_SERVER_PASSWORD,
    },
  });
};

const transporter = createTransport();

// Set application info
const APP_NAME = 'AI Resume Builder';
const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
const FROM_EMAIL = process.env.EMAIL_FROM || 'noreply@example.com';


/**
 * Send email verification link to user
 */
export async function sendVerificationEmail(email: string, token: string): Promise<void> {
  const verificationUrl = `${APP_URL}/verify-email?token=${token}`;
  
  try {
    await transporter.sendMail({
      from: `"${APP_NAME}" <${FROM_EMAIL}>`,
      to: email,
      subject: `Verify your email for ${APP_NAME}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #3b82f6;">Verify your email address</h2>
          <p>Thank you for signing up for ${APP_NAME}. Please click the button below to verify your email address:</p>
          <div style="margin: 30px 0;">
            <a href="${verificationUrl}" style="background-color: #3b82f6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; display: inline-block;">
              Verify Email Address
            </a>
          </div>
          <p>Or copy and paste this URL into your browser:</p>
          <p style="word-break: break-all; color: #6b7280;">${verificationUrl}</p>
          <p>If you didn't create an account with us, you can safely ignore this email.</p>
          <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;" />
          <p style="color: #6b7280; font-size: 14px;">
            © ${new Date().getFullYear()} ${APP_NAME}
          </p>
        </div>
      `,
      text: `
        Verify your email address for ${APP_NAME}
        
        Thank you for signing up for ${APP_NAME}. Please visit the following URL to verify your email address:
        
        ${verificationUrl}

        If you didn't create an account with us, you can safely ignore this email.
      `,
    });
    
    if (isDevelopment) {
      console.log(`[DEV] Verification email sent to ${email}. Check MailHog at http://localhost:8025`);
    }
  } catch (error) {
    console.error('Failed to send verification email:', error);
    throw new Error('Failed to send verification email');
  }
}


/**
 * Send password reset email
 */
export async function sendPasswordResetEmail(email: string, token: string): Promise<void> {
  const resetUrl = `${APP_URL}/reset-password?token=${token}`;
  
  try {
    await transporter.sendMail({
      from: `"${APP_NAME}" <${FROM_EMAIL}>`,
      to: email,
      subject: `Reset your password for ${APP_NAME}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #3b82f6;">Reset your password</h2>
          <p>You requested a password reset for your ${APP_NAME} account. Click the button below to reset your password:</p>
          <div style="margin: 30px 0;">
            <a href="${resetUrl}" style="background-color: #3b82f6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; display: inline-block;">
              Reset Password
            </a>
          </div>
          <p>Or copy and paste this URL into your browser:</p>
          <p style="word-break: break-all; color: #6b7280;">${resetUrl}</p>
          <p>If you didn't request a password reset, you can safely ignore this email.</p>
          <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;" />
          <p style="color: #6b7280; font-size: 14px;">
            © ${new Date().getFullYear()} ${APP_NAME}
          </p>
        </div>
      `,
      text: `
        Reset your password for ${APP_NAME}
        
        You requested a password reset for your ${APP_NAME} account. Please visit the following URL to reset your password:
        
        ${resetUrl}

        If you didn't request a password reset, you can safely ignore this email.
      `,
    });
    
    if (isDevelopment) {
      console.log(`[DEV] Password reset email sent to ${email}. Check MailHog at http://localhost:8025`);
    }
  } catch (error) {
    console.error('Failed to send password reset email:', error);
    throw new Error('Failed to send password reset email');
  }
}