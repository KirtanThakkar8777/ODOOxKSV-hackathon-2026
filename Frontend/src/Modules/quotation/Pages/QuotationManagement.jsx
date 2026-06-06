import { useEffect } from "react";

import Header from "../../../components/layout/Header";

import QuotationTable from "../components/QuotationTable";
import useQuotation from "../hooks/useQuotation";

const QuotationManagement = () => {
  const {
    quotations,
    getQuotations,
  } = useQuotation();

  useEffect(() => {
    getQuotations();
  }, []);

  return (
    <div>
      <Header
        title="Quotation Management"
        subtitle="Manage vendor quotations"
      />

      <QuotationTable
        quotations={quotations}
      />
    </div>
  );
};

export default QuotationManagement;