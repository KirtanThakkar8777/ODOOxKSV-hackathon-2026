import rfqService from "../services/rfq.service";
import useRFQStore from "../store/rfqStore";

const useRFQ = () => {
  const {
    rfqs,
    setRFQs,
    loading,
    setLoading,
  } = useRFQStore();

  const getRFQs = async () => {
    try {
      setLoading(true);

      const data =
        await rfqService.getRFQs();

      setRFQs(data);
    } finally {
      setLoading(false);
    }
  };

  const createRFQ = async (
    payload
  ) => {
    return rfqService.createRFQ(
      payload
    );
  };

  const updateRFQ = async (
    id,
    payload
  ) => {
    return rfqService.updateRFQ(
      id,
      payload
    );
  };

  const deleteRFQ = async (id) => {
    return rfqService.deleteRFQ(id);
  };

  return {
    rfqs,
    loading,
    getRFQs,
    createRFQ,
    updateRFQ,
    deleteRFQ,
  };
};

export default useRFQ;