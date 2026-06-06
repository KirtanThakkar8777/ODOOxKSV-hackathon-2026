import Header from "../../../components/layout/Header";

import ComparisonTable from "../components/ComparisonTable";

const QuotationComparison = () => {
  const quotations = [];

  return (
    <div>
      <Header
        title="Quotation Comparison"
        subtitle="Compare vendor quotations"
      />

      <ComparisonTable
        quotations={quotations}
      />
    </div>
  );
};

export default QuotationComparison;