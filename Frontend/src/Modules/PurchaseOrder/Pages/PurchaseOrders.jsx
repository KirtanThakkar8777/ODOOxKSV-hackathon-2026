import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Header from "../../../components/layout/Header";
import Button from "../../../components/common/Button";

import PurchaseOrderTable from "../components/PurchaseOrderTable";

import usePurchaseOrder from "../hooks/usePurchaseOrder";

const PurchaseOrders = () => {
  const navigate = useNavigate();

  const {
    purchaseOrders,
    getPurchaseOrders,
  } = usePurchaseOrder();

  useEffect(() => {
    getPurchaseOrders();
  }, []);

  return (
    <div>
      <Header
        title="Purchase Orders"
        subtitle="Manage procurement orders"
      />

      <div className="mb-4">
        <Button
          onClick={() =>
            navigate(
              "/purchase-orders/create"
            )
          }
        >
          Create Purchase Order
        </Button>
      </div>

      <PurchaseOrderTable
        purchaseOrders={
          purchaseOrders
        }
      />
    </div>
  );
};

export default PurchaseOrders;