import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendInvoiceMail = async (to, invoice) => {
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to,
    subject: `Invoice #${invoice.invoiceNumber} from VendorBridge`,
    html: `
      <h2>Invoice #${invoice.invoiceNumber}</h2>
      <p>Subtotal: ₹${invoice.subtotal}</p>
      <p>GST (18%): ₹${invoice.taxAmount}</p>
      <strong>Total: ₹${invoice.totalAmount}</strong>
    `,
  });
};