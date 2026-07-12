import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Modal from "../../components/ui/Modal";
import Button from "../../components/ui/Button";
import { Input, Select, FormRow } from "../../components/ui/Field";
import { extractErrorMessage } from "../../api/axios";
import * as customersApi from "../../api/customers";

const EMPTY = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  company: "",
  city: "",
  status: "LEAD",
};

export default function CustomerFormModal({ open, onClose, onSaved, customer }) {
  const [form, setForm] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const isEdit = !!customer;

  useEffect(() => {
    if (open) {
      setForm(customer ? { ...EMPTY, ...customer } : EMPTY);
      setErrors({});
    }
  }, [open, customer]);

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const validate = () => {
    const e = {};
    if (!form.firstName?.trim()) e.firstName = "First name is required";
    if (!form.lastName?.trim()) e.lastName = "Last name is required";
    if (!form.email) e.email = "Email is required";
    else if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = "Enter a valid email";
    if (!form.phone?.trim()) e.phone = "Phone number is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const onSubmit = async (ev) => {
    ev.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      const payload = {
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email,
        phone: form.phone,
        company: form.company,
        city: form.city,
        status: form.status,
      };
      if (isEdit) {
        await customersApi.updateCustomer(customer.id, payload);
        toast.success("Customer updated");
      } else {
        await customersApi.addCustomer(payload);
        toast.success("Customer added");
      }
      onSaved();
      onClose();
    } catch (err) {
      toast.error(extractErrorMessage(err, "Could not save customer"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={isEdit ? "Edit customer" : "Add customer"}
      subtitle={isEdit ? "Update this customer's details." : "Add a new customer to your workspace."}
    >
      <form onSubmit={onSubmit} noValidate className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <FormRow label="First name" htmlFor="firstName" required error={errors.firstName}>
            <Input id="firstName" value={form.firstName} onChange={set("firstName")} error={errors.firstName} />
          </FormRow>
          <FormRow label="Last name" htmlFor="lastName" required error={errors.lastName}>
            <Input id="lastName" value={form.lastName} onChange={set("lastName")} error={errors.lastName} />
          </FormRow>
        </div>

        <FormRow label="Email" htmlFor="email" required error={errors.email}>
          <Input id="email" type="email" value={form.email} onChange={set("email")} error={errors.email} />
        </FormRow>

        <div className="grid grid-cols-2 gap-4">
          <FormRow label="Phone" htmlFor="phone" required error={errors.phone}>
            <Input id="phone" value={form.phone} onChange={set("phone")} error={errors.phone} />
          </FormRow>
          <FormRow label="Status" htmlFor="status">
            <Select id="status" value={form.status || "LEAD"} onChange={set("status")}>
              <option value="LEAD">Lead</option>
              <option value="ACTIVE">Active</option>
              <option value="INACTIVE">Inactive</option>
            </Select>
          </FormRow>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <FormRow label="Company" htmlFor="company">
            <Input id="company" value={form.company || ""} onChange={set("company")} />
          </FormRow>
          <FormRow label="City" htmlFor="city">
            <Input id="city" value={form.city || ""} onChange={set("city")} />
          </FormRow>
        </div>

        <div className="flex justify-end gap-3 pt-2">
          <Button type="button" variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" loading={loading}>
            {isEdit ? "Save changes" : "Add customer"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
