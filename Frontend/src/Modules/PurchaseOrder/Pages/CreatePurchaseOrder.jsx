import { useNavigate } from "react-router-dom";

import Header from "../../../components/layout/Header";

import PurchaseOrderForm from "../components/PurchaseOrderForm";

import usePurchaseOrder from "../hooks/usePurchaseOrder";

const CreatePurchaseOrder = () => {
  const navigate = useNavigate();

  const {
    createPurchaseOrder,
  } = usePurchaseOrder();

  const handleSubmit =
    async (data) => {
      await createPurchaseOrder(
        data
      );

      navigate(
        "/purchase-orders"
      );
    };

  return (
    <div>
      <Header
        title="Create Purchase Order"
        subtitle="Generate a new purchase order"
      />

      <div className="bg-white p-6 rounded-xl">
        <PurchaseOrderForm
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  );
};

export default CreatePurchaseOrder;