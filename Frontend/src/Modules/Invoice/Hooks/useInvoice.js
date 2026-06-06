import invoiceService from "../Service/invoice.service";
import useInvoiceStore from "../store/invoiceStore";

const useInvoice = () => {
  const {
    invoices,
    setInvoices,
    loading,
    setLoading,
  } = useInvoiceStore();

  const getInvoices = async () => {
    try {
      setLoading(true);

      const data =
        await invoiceService.getInvoices();

      setInvoices(data);
    } finally {
      setLoading(false);
    }
  };

  const createInvoice = async (
    payload
  ) => {
    return invoiceService.createInvoice(
      payload
    );
  };

  const updateInvoice = async (
    id,
    payload
  ) => {
    return invoiceService.updateInvoice(
      id,
      payload
    );
  };

  const deleteInvoice = async (id) => {
    return invoiceService.deleteInvoice(
      id
    );
  };

  return {
    invoices,
    loading,
    getInvoices,
    createInvoice,
    updateInvoice,
    deleteInvoice,
  };
};

export default useInvoice;