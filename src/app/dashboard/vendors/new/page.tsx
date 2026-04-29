import VendorForm from "@/components/VendorForm";

export default function NewVendorPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Add Vendor</h1>
        <p className="text-sm text-gray-500 mt-1">Create a new vendor for the public site</p>
      </div>
      <VendorForm />
    </div>
  );
}
