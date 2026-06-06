import { useNavigate } from "react-router-dom";

import Header from "../../../components/layout/Header";

import InvoiceForm from "../components/InvoiceForm";

import useInvoice from "../hooks/useInvoice";

const GenerateInvoice = () => {
  const navigate = useNavigate();

  const { createInvoice } =
    useInvoice();

  const handleSubmit =
    async (data) => {
      await createInvoice(data);

      navigate("/invoices");
    };

  return (
    <div>
      <Header
        title="Generate Invoice"
        subtitle="Create a new invoice"
      />

      <div className="bg-white p-6 rounded-xl">
        <InvoiceForm
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  );
};

export default GenerateInvoice;