import quotationService from "../Service/quotation.service";
import useQuotationStore from "../store/quotationStore";

const useQuotation = () => {
  const {
    quotations,
    setQuotations,
    loading,
    setLoading,
  } = useQuotationStore();

  const getQuotations = async () => {
    try {
      setLoading(true);

      const data =
        await quotationService.getQuotations();

      setQuotations(data);
    } finally {
      setLoading(false);
    }
  };

  const createQuotation = async (
    payload
  ) => {
    return quotationService.createQuotation(
      payload
    );
  };

  const updateQuotation = async (
    id,
    payload
  ) => {
    return quotationService.updateQuotation(
      id,
      payload
    );
  };

  const deleteQuotation = async (
    id
  ) => {
    return quotationService.deleteQuotation(
      id
    );
  };

  return {
    quotations,
    loading,
    getQuotations,
    createQuotation,
    updateQuotation,
    deleteQuotation,
  };
};

export default useQuotation;