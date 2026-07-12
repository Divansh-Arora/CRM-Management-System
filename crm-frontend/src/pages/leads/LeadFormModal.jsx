import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Modal from "../../components/ui/Modal";
import Button from "../../components/ui/Button";
import { Input, Select, FormRow } from "../../components/ui/Field";
import { extractErrorMessage } from "../../api/axios";
import * as leadsApi from "../../api/leads";

const EMPTY = {
  customerName: "",
  email: "",
  phone: "",
  company: "",
  source: "",
  status: "NEW",
  assignedTo: "",
};

const SOURCES = ["Website", "Referral", "Cold Call", "Social Media", "Event", "Advertisement"];

export default function LeadFormModal({ open, onClose, onSaved, lead }) {
  const [form, setForm] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const isEdit = !!lead;

  useEffect(() => {
    if (open) {
      setForm(lead ? { ...EMPTY, ...lead } : EMPTY);
      setErrors({});
    }
  }, [open, lead]);

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const validate = () => {
    const e = {};
    if (!form.customerName?.trim()) e.customerName = "Customer name is required";
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
        customerName: form.customerName,
        email: form.email,
        phone: form.phone,
        company: form.company,
        source: form.source,
        status: form.status,
        assignedTo: form.assignedTo,
      };
      if (isEdit) {
        await leadsApi.updateLead(lead.id, payload);
        toast.success("Lead updated");
      } else {
        await leadsApi.addLead(payload);
        toast.success("Lead added");
      }
      onSaved();
      onClose();
    } catch (err) {
      toast.error(extractErrorMessage(err, "Could not save lead"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={isEdit ? "Edit lead" : "Add lead"}
      subtitle={isEdit ? "Update this lead's details." : "Capture a new sales lead."}
    >
      <form onSubmit={onSubmit} noValidate className="space-y-4">
        <FormRow label="Customer name" htmlFor="customerName" required error={errors.customerName}>
          <Input id="customerName" value={form.customerName} onChange={set("customerName")} error={errors.customerName} />
        </FormRow>

        <div className="grid grid-cols-2 gap-4">
          <FormRow label="Email" htmlFor="email" required error={errors.email}>
            <Input id="email" type="email" value={form.email} onChange={set("email")} error={errors.email} />
          </FormRow>
          <FormRow label="Phone" htmlFor="phone" required error={errors.phone}>
            <Input id="phone" value={form.phone} onChange={set("phone")} error={errors.phone} />
          </FormRow>
        </div>

        <FormRow label="Company" htmlFor="company">
          <Input id="company" value={form.company || ""} onChange={set("company")} />
        </FormRow>

        <div className="grid grid-cols-2 gap-4">
          <FormRow label="Source" htmlFor="source">
            <Select id="source" value={form.source || ""} onChange={set("source")}>
              <option value="">Select source</option>
              {SOURCES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </Select>
          </FormRow>
          <FormRow label="Status" htmlFor="status">
            <Select id="status" value={form.status || "NEW"} onChange={set("status")}>
              <option value="NEW">New</option>
              <option value="CONTACTED">Contacted</option>
              <option value="QUALIFIED">Qualified</option>
              <option value="LOST">Lost</option>
            </Select>
          </FormRow>
        </div>

        <FormRow label="Assigned to" htmlFor="assignedTo">
          <Input id="assignedTo" value={form.assignedTo || ""} onChange={set("assignedTo")} placeholder="Team member name" />
        </FormRow>

        <div className="flex justify-end gap-3 pt-2">
          <Button type="button" variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" loading={loading}>
            {isEdit ? "Save changes" : "Add lead"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
