import purchaseOrderService from "../services/purchaseOrder.service";

import usePurchaseOrderStore from "../store/purchaseOrderStore";

const usePurchaseOrder = () => {
  const {
    purchaseOrders,
    setPurchaseOrders,
    loading,
    setLoading,
  } = usePurchaseOrderStore();

  const getPurchaseOrders =
    async () => {
      try {
        setLoading(true);

        const data =
          await purchaseOrderService.getPurchaseOrders();

        setPurchaseOrders(data);
      } finally {
        setLoading(false);
      }
    };

  const createPurchaseOrder =
    async (payload) => {
      return purchaseOrderService.createPurchaseOrder(
        payload
      );
    };

  const updatePurchaseOrder =
    async (id, payload) => {
      return purchaseOrderService.updatePurchaseOrder(
        id,
        payload
      );
    };

  const deletePurchaseOrder =
    async (id) => {
      return purchaseOrderService.deletePurchaseOrder(
        id
      );
    };

  return {
    purchaseOrders,
    loading,
    getPurchaseOrders,
    createPurchaseOrder,
    updatePurchaseOrder,
    deletePurchaseOrder,
  };
};

export default usePurchaseOrder;