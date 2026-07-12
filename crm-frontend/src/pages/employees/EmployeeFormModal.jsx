import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Modal from "../../components/ui/Modal";
import Button from "../../components/ui/Button";
import { Input, Select, FormRow } from "../../components/ui/Field";
import { extractErrorMessage } from "../../api/axios";
import * as employeesApi from "../../api/employees";

const EMPTY = {
  name: "",
  email: "",
  phone: "",
  department: "",
  designation: "",
  salary: "",
  status: "ACTIVE",
};

const DEPARTMENTS = ["Sales", "Marketing", "Support", "Engineering", "Operations", "Finance"];

export default function EmployeeFormModal({ open, onClose, onSaved, employee }) {
  const [form, setForm] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const isEdit = !!employee;

  useEffect(() => {
    if (open) {
      setForm(employee ? { ...EMPTY, ...employee, salary: employee.salary ?? "" } : EMPTY);
      setErrors({});
    }
  }, [open, employee]);

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const validate = () => {
    const e = {};
    if (!form.name?.trim()) e.name = "Name is required";
    if (!form.email) e.email = "Email is required";
    else if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = "Enter a valid email";
    if (!form.phone?.trim()) e.phone = "Phone number is required";
    if (form.salary !== "" && isNaN(Number(form.salary))) e.salary = "Enter a valid number";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const onSubmit = async (ev) => {
    ev.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      const payload = {
        name: form.name,
        email: form.email,
        phone: form.phone,
        department: form.department,
        designation: form.designation,
        salary: form.salary === "" ? null : Number(form.salary),
        status: form.status,
      };
      if (isEdit) {
        await employeesApi.updateEmployee(employee.id, payload);
        toast.success("Team member updated");
      } else {
        await employeesApi.addEmployee(payload);
        toast.success("Team member added");
      }
      onSaved();
      onClose();
    } catch (err) {
      toast.error(extractErrorMessage(err, "Could not save team member"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={isEdit ? "Edit team member" : "Add team member"}
      subtitle={isEdit ? "Update this team member's details." : "Add a new member to your team."}
    >
      <form onSubmit={onSubmit} noValidate className="space-y-4">
        <FormRow label="Full name" htmlFor="name" required error={errors.name}>
          <Input id="name" value={form.name} onChange={set("name")} error={errors.name} />
        </FormRow>

        <div className="grid grid-cols-2 gap-4">
          <FormRow label="Email" htmlFor="email" required error={errors.email}>
            <Input id="email" type="email" value={form.email} onChange={set("email")} error={errors.email} />
          </FormRow>
          <FormRow label="Phone" htmlFor="phone" required error={errors.phone}>
            <Input id="phone" value={form.phone} onChange={set("phone")} error={errors.phone} />
          </FormRow>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <FormRow label="Department" htmlFor="department">
            <Select id="department" value={form.department || ""} onChange={set("department")}>
              <option value="">Select department</option>
              {DEPARTMENTS.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </Select>
          </FormRow>
          <FormRow label="Designation" htmlFor="designation">
            <Input id="designation" value={form.designation || ""} onChange={set("designation")} placeholder="e.g. Sales Executive" />
          </FormRow>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <FormRow label="Salary" htmlFor="salary" error={errors.salary}>
            <Input id="salary" type="number" min="0" step="0.01" value={form.salary} onChange={set("salary")} error={errors.salary} />
          </FormRow>
          <FormRow label="Status" htmlFor="status">
            <Select id="status" value={form.status || "ACTIVE"} onChange={set("status")}>
              <option value="ACTIVE">Active</option>
              <option value="INACTIVE">Inactive</option>
              <option value="ON_LEAVE">On leave</option>
            </Select>
          </FormRow>
        </div>

        <div className="flex justify-end gap-3 pt-2">
          <Button type="button" variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" loading={loading}>
            {isEdit ? "Save changes" : "Add team member"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
