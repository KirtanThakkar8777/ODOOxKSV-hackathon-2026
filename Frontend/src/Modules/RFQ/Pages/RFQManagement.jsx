import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Header from "../../../components/layout/Header";
import Button from "../../../components/common/Button";

import RFQTable from "../components/RFQTable";
import useRFQ from "../hooks/useRFQ";

const RFQManagement = () => {
  const navigate = useNavigate();

  const {
    rfqs,
    getRFQs,
  } = useRFQ();

  useEffect(() => {
    getRFQs();
  }, []);

  return (
    <div>
      <Header
        title="RFQ Management"
        subtitle="Manage requests for quotations"
      />

      <div className="mb-4">
        <Button
          onClick={() =>
            navigate("/rfqs/create")
          }
        >
          Create RFQ
        </Button>
      </div>

      <RFQTable rfqs={rfqs} />
    </div>
  );
};

export default RFQManagement;