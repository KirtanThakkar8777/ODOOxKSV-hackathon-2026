import vendorService from "../services/vendor.service";
import useVendorStore from "../store/vendorStore";

const useVendor = () => {
  const {
    vendors,
    setVendors,
    setLoading,
    loading,
  } = useVendorStore();

  const getVendors = async () => {
    try {
      setLoading(true);

      const data =
        await vendorService.getVendors();

      setVendors(data);
    } finally {
      setLoading(false);
    }
  };

  const createVendor = async (
    payload
  ) => {
    return vendorService.createVendor(
      payload
    );
  };

  const updateVendor = async (
    id,
    payload
  ) => {
    return vendorService.updateVendor(
      id,
      payload
    );
  };

  const deleteVendor = async (
    id
  ) => {
    return vendorService.deleteVendor(
      id
    );
  };

  return {
    vendors,
    loading,
    getVendors,
    createVendor,
    updateVendor,
    deleteVendor,
  };
};

export default useVendor;