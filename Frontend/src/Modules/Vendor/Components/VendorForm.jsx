import { useForm } from "react-hook-form";

export default function VendorForm({
  onSubmit,
  defaultValues,
}) {
  const { register, handleSubmit } =
    useForm({
      defaultValues,
    });

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4"
    >
      <input
        {...register("companyName")}
        placeholder="Company Name"
        className="w-full border rounded-lg p-3"
      />

      <input
        {...register("contactPerson")}
        placeholder="Contact Person"
        className="w-full border rounded-lg p-3"
      />

      <input
        {...register("email")}
        placeholder="Email"
        className="w-full border rounded-lg p-3"
      />

      <input
        {...register("phone")}
        placeholder="Phone"
        className="w-full border rounded-lg p-3"
      />

      <input
        {...register("gstNumber")}
        placeholder="GST Number"
        className="w-full border rounded-lg p-3"
      />

      <button
        className="bg-blue-600 text-white px-5 py-3 rounded-lg"
      >
        Save Vendor
      </button>
    </form>
  );
}