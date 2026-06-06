import { useNavigate } from "react-router-dom";

import Header from "../../../components/layout/Header";

import RFQForm from "../components/RFQForm";
import useRFQ from "../hooks/useRFQ";

const CreateRFQ = () => {
  const navigate = useNavigate();

  const { createRFQ } = useRFQ();

  const handleSubmit =
    async (data) => {
      await createRFQ(data);

      navigate("/rfqs");
    };

  return (
    <div>
      <Header
        title="Create RFQ"
        subtitle="Create a new procurement request"
      />

      <div className="bg-white p-6 rounded-xl">
        <RFQForm
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  );
};

export default CreateRFQ;