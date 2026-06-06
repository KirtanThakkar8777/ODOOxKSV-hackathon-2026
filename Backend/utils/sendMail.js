import nodemailer from 'nodemailer';

export const sendInvoiceMail = async (to, invoice) => {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.warn('EMAIL_USER/EMAIL_PASS not set. Skipping SMTP send for invoice:', invoice.invoiceNumber);
    return { skipped: true };
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  return transporter.sendMail({
    from: process.env.EMAIL_USER,
    to,
    subject: `Invoice #${invoice.invoiceNumber} from VendorBridge`,
    html: `
      <h2>Invoice #${invoice.invoiceNumber}</h2>
      <p>Subtotal: Rs. ${invoice.subtotal}</p>
      <p>GST (18%): Rs. ${invoice.taxAmount}</p>
      <strong>Total: Rs. ${invoice.totalAmount}</strong>
    `,
  });
};
