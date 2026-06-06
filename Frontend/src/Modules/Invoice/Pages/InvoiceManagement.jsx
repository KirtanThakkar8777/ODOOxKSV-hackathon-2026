import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Header from "../../../components/layout/Header";
import Button from "../../../components/common/Button";

import InvoiceTable from "../components/InvoiceTable";
import useInvoice from "../hooks/useInvoice";

const InvoiceManagement = () => {
  const navigate = useNavigate();

  const {
    invoices,
    getInvoices,
  } = useInvoice();

  useEffect(() => {
    getInvoices();
  }, []);

  return (
    <div>
      <Header
        title="Invoice Management"
        subtitle="Manage vendor invoices"
      />

      <div className="mb-4">
        <Button
          onClick={() =>
            navigate(
              "/invoices/generate"
            )
          }
        >
          Generate Invoice
        </Button>
      </div>

      <InvoiceTable
        invoices={invoices}
      />
    </div>
  );
};

export default InvoiceManagement;