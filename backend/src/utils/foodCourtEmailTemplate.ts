export const foodCourtEmailTemplate = (
  amount: string,
  name: string,
  email: string,
  userId: string,
  preference: string,
  timeSlot: string,
  totalPeople: string,
) => {
  return `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
  <html dir="ltr" lang="en">
    <head>
      <meta content="width=device-width" name="viewport" />
      <meta content="text/html; charset=UTF-8" http-equiv="Content-Type" />
      <meta name="x-apple-disable-message-reformatting" />
      <meta content="IE=edge" http-equiv="X-UA-Compatible" />
      <meta name="x-apple-disable-message-reformatting" />
      <meta content="telephone=no,address=no,email=no,date=no,url=no" name="format-detection" />
    </head>
    <body style="margin:0;padding:0;background-color:#f4f4f5;">
      <table border="0" width="100%" cellpadding="0" cellspacing="0" role="presentation" style="background-color:#f4f4f5;padding:40px 20px;">
        <tbody>
          <tr>
            <td align="center">
              <table border="0" width="100%" cellpadding="0" cellspacing="0" role="presentation" style="max-width:600px;background-color:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 6px rgba(0,0,0,0.1);">
                <tbody>
                  <!-- Header with Brand Colors -->
                  <tr>
                    <td style="background:linear-gradient(135deg, #002a3a 0%, #004d5c 100%);padding:40px 30px;text-align:center;">
                      <h1 style="margin:0;color:#ffffff;font-size:32px;font-weight:700;font-family:'Segoe UI',Arial,sans-serif;letter-spacing:2px;">BIVA</h1>
                      <div style="width:60px;height:4px;background-color:#fb923c;margin:16px auto;border-radius:2px;"></div>
                      <p style="margin:10px 0 0 0;color:#fbbf24;font-size:14px;font-weight:500;letter-spacing:1px;">FOOD COURT</p>
                    </td>
                  </tr>

                  <!-- Main Content -->
                  <tr>
                    <td style="padding:40px 30px;">
                      <h2 style="margin:0 0 20px 0;color:#002a3a;font-size:28px;font-weight:700;font-family:'Segoe UI',Arial,sans-serif;">
                        🍽️ Table Reserved!
                      </h2>
                      <p style="margin:0 0 24px 0;color:#4b5563;font-size:16px;line-height:1.6;font-family:'Segoe UI',Arial,sans-serif;">
                        Dear <strong style="color:#002a3a;">${name}</strong>,
                      </p>
                      <p style="margin:0 0 30px 0;color:#4b5563;font-size:16px;line-height:1.6;font-family:'Segoe UI',Arial,sans-serif;">
                        Thank you for choosing Biva Food Court! Your table reservation has been confirmed. Your payment of <strong style="color:#fb923c;">₹${amount}</strong> has been successfully processed.
                      </p>

                      <!-- Invoice Section -->
                      <div style="background:linear-gradient(135deg, #f0fdfa 0%, #e0f2fe 100%);padding:24px;border-radius:12px;border-left:4px solid #fb923c;margin:0 0 30px 0;">
                        <h3 style="margin:0 0 8px 0;color:#002a3a;font-size:20px;font-weight:600;font-family:'Segoe UI',Arial,sans-serif;">
                          📋 Reservation #${userId}
                        </h3>
                        <p style="margin:0;color:#6b7280;font-size:14px;font-family:'Segoe UI',Arial,sans-serif;">
                          Biva Food Court<br/>
                          Hailakandi Road, Silchar, Assam, India - 788005
                        </p>
                      </div>

                      <!-- Booking Details -->
                      <div style="background-color:#ffffff;border:2px solid #e5e7eb;border-radius:12px;overflow:hidden;margin:0 0 30px 0;">
                        <div style="background-color:#002a3a;padding:16px 24px;border-bottom:3px solid #fb923c;">
                          <h3 style="margin:0;color:#ffffff;font-size:18px;font-weight:600;font-family:'Segoe UI',Arial,sans-serif;">
                            📝 Reservation Details
                          </h3>
                        </div>
                        <div style="padding:24px;">
                          <table width="100%" cellpadding="8" cellspacing="0" style="font-family:'Segoe UI',Arial,sans-serif;">
                            <tr>
                              <td style="color:#6b7280;font-size:14px;padding:12px 0;border-bottom:1px solid #e5e7eb;">
                                <strong style="color:#002a3a;">Name:</strong>
                              </td>
                              <td style="color:#1f2937;font-size:14px;padding:12px 0;border-bottom:1px solid #e5e7eb;text-align:right;">
                                ${name}
                              </td>
                            </tr>
                            <tr>
                              <td style="color:#6b7280;font-size:14px;padding:12px 0;border-bottom:1px solid #e5e7eb;">
                                <strong style="color:#002a3a;">Email:</strong>
                              </td>
                              <td style="color:#1f2937;font-size:14px;padding:12px 0;border-bottom:1px solid #e5e7eb;text-align:right;">
                                ${email}
                              </td>
                            </tr>
                            <tr>
                              <td style="color:#6b7280;font-size:14px;padding:12px 0;border-bottom:1px solid #e5e7eb;">
                                <strong style="color:#002a3a;">Total Guests:</strong>
                              </td>
                              <td style="color:#1f2937;font-size:14px;padding:12px 0;border-bottom:1px solid #e5e7eb;text-align:right;">
                                ${totalPeople}
                              </td>
                            </tr>
                            <tr>
                              <td style="color:#6b7280;font-size:14px;padding:12px 0;border-bottom:1px solid #e5e7eb;">
                                <strong style="color:#002a3a;">Food Preference:</strong>
                              </td>
                              <td style="color:#1f2937;font-size:14px;padding:12px 0;border-bottom:1px solid #e5e7eb;text-align:right;">
                                ${preference}
                              </td>
                            </tr>
                            <tr>
                              <td style="color:#6b7280;font-size:14px;padding:12px 0;border-bottom:1px solid #e5e7eb;">
                                <strong style="color:#002a3a;">Time Slot:</strong>
                              </td>
                              <td style="color:#1f2937;font-size:14px;padding:12px 0;border-bottom:1px solid #e5e7eb;text-align:right;">
                                ${timeSlot}
                              </td>
                            </tr>
                            <tr>
                              <td style="color:#6b7280;font-size:14px;padding:16px 0 0 0;">
                                <strong style="color:#002a3a;font-size:16px;">Amount Paid:</strong>
                              </td>
                              <td style="color:#fb923c;font-size:18px;font-weight:700;padding:16px 0 0 0;text-align:right;">
                                ₹${amount}
                              </td>
                            </tr>
                          </table>
                        </div>
                      </div>

                      <!-- Important Note -->
                      <div style="background-color:#fef3c7;padding:20px;border-radius:12px;border:2px solid #fbbf24;margin:0 0 30px 0;">
                        <p style="margin:0 0 8px 0;color:#002a3a;font-size:15px;font-weight:600;font-family:'Segoe UI',Arial,sans-serif;">
                          ⏰ Important Reminder
                        </p>
                        <p style="margin:0;color:#4b5563;font-size:14px;line-height:1.6;font-family:'Segoe UI',Arial,sans-serif;">
                          Please arrive on time for your reservation. Looking forward to serving you a delightful dining experience!
                        </p>
                      </div>

                      <!-- Contact Section -->
                      <div style="background-color:#f0fdfa;padding:20px;border-radius:12px;border:2px solid #5eead4;margin:0 0 30px 0;">
                        <p style="margin:0 0 12px 0;color:#002a3a;font-size:15px;font-weight:600;font-family:'Segoe UI',Arial,sans-serif;">
                          📞 Need Help?
                        </p>
                        <p style="margin:0;color:#4b5563;font-size:14px;line-height:1.6;font-family:'Segoe UI',Arial,sans-serif;">
                          Contact us at <strong style="color:#002a3a;">+91 81359 38393</strong><br/>
                          Email: <a href="mailto:hello@thebiva.com" style="color:#fb923c;text-decoration:none;font-weight:600;">hello@thebiva.com</a>
                        </p>
                      </div>

                      <!-- Social Media Links -->
                      <div style="text-align:center;padding:24px 0;border-top:2px solid #e5e7eb;">
                        <p style="margin:0 0 16px 0;color:#6b7280;font-size:14px;font-weight:600;font-family:'Segoe UI',Arial,sans-serif;">
                          Connect With Us
                        </p>
                        <table cellpadding="0" cellspacing="0" border="0" align="center">
                          <tr>
                            <td style="padding:0 12px;">
                              <a href="https://www.instagram.com/hotel_biva?igsh=Yml2em5oamdxdjF3" target="_blank" style="display:inline-block;width:44px;height:44px;background:linear-gradient(135deg, #f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%);border-radius:50%;text-align:center;line-height:44px;text-decoration:none;">
                                <span style="color:#ffffff;font-size:20px;font-weight:bold;">📷</span>
                              </a>
                            </td>
                            <td style="padding:0 12px;">
                              <a href="https://www.facebook.com/share/17x84vyR3P/" target="_blank" style="display:inline-block;width:44px;height:44px;background-color:#1877f2;border-radius:50%;text-align:center;line-height:44px;text-decoration:none;">
                                <span style="color:#ffffff;font-size:20px;font-weight:bold;">f</span>
                              </a>
                            </td>
                            <td style="padding:0 12px;">
                              <a href="https://chat.whatsapp.com/B5AsDHnQ7AvFowEU152BDX" target="_blank" style="display:inline-block;width:44px;height:44px;background-color:#25d366;border-radius:50%;text-align:center;line-height:44px;text-decoration:none;">
                                <span style="color:#ffffff;font-size:20px;font-weight:bold;">💬</span>
                              </a>
                            </td>
                          </tr>
                        </table>
                        <p style="margin:16px 0 0 0;color:#9ca3af;font-size:12px;font-family:'Segoe UI',Arial,sans-serif;">
                          Instagram • Facebook • WhatsApp
                        </p>
                      </div>
                    </td>
                  </tr>

                  <!-- Footer -->
                  <tr>
                    <td style="background-color:#002a3a;padding:24px 30px;text-align:center;">
                      <p style="margin:0 0 8px 0;color:#ffffff;font-size:12px;font-family:'Segoe UI',Arial,sans-serif;">
                        © ${new Date().getFullYear()} Biva Food Court. All rights reserved.
                      </p>
                      <p style="margin:0;color:#9ca3af;font-size:11px;font-family:'Segoe UI',Arial,sans-serif;">
                        Hailakandi Road, Silchar, Assam, India - 788005
                      </p>
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
        </tbody>
      </table>
    </body>
  </html>
  `;
};