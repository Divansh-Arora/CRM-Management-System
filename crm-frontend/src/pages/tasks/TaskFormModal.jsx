import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Modal from "../../components/ui/Modal";
import Button from "../../components/ui/Button";
import { Input, Select, Textarea, FormRow } from "../../components/ui/Field";
import { extractErrorMessage } from "../../api/axios";
import * as tasksApi from "../../api/tasks";

const EMPTY = {
  title: "",
  description: "",
  assignedEmployee: "",
  priority: "MEDIUM",
  status: "PENDING",
  dueDate: "",
};

export default function TaskFormModal({ open, onClose, onSaved, task }) {
  const [form, setForm] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const isEdit = !!task;

  useEffect(() => {
    if (open) {
      setForm(task ? { ...EMPTY, ...task } : EMPTY);
      setErrors({});
    }
  }, [open, task]);

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const validate = () => {
    const e = {};
    if (!form.title?.trim()) e.title = "Title is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const onSubmit = async (ev) => {
    ev.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      const payload = {
        title: form.title,
        description: form.description,
        assignedEmployee: form.assignedEmployee,
        priority: form.priority,
        status: form.status,
        dueDate: form.dueDate || null,
      };
      if (isEdit) {
        await tasksApi.updateTask(task.id, payload);
        toast.success("Task updated");
      } else {
        await tasksApi.addTask(payload);
        toast.success("Task added");
      }
      onSaved();
      onClose();
    } catch (err) {
      toast.error(extractErrorMessage(err, "Could not save task"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={isEdit ? "Edit task" : "Add task"}
      subtitle={isEdit ? "Update this task's details." : "Assign a new task to your team."}
    >
      <form onSubmit={onSubmit} noValidate className="space-y-4">
        <FormRow label="Title" htmlFor="title" required error={errors.title}>
          <Input id="title" value={form.title} onChange={set("title")} error={errors.title} />
        </FormRow>

        <FormRow label="Description" htmlFor="description">
          <Textarea id="description" value={form.description || ""} onChange={set("description")} />
        </FormRow>

        <div className="grid grid-cols-2 gap-4">
          <FormRow label="Assigned to" htmlFor="assignedEmployee">
            <Input
              id="assignedEmployee"
              value={form.assignedEmployee || ""}
              onChange={set("assignedEmployee")}
              placeholder="Team member name"
            />
          </FormRow>
          <FormRow label="Due date" htmlFor="dueDate">
            <Input id="dueDate" type="date" value={form.dueDate || ""} onChange={set("dueDate")} />
          </FormRow>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <FormRow label="Priority" htmlFor="priority">
            <Select id="priority" value={form.priority || "MEDIUM"} onChange={set("priority")}>
              <option value="LOW">Low</option>
              <option value="MEDIUM">Medium</option>
              <option value="HIGH">High</option>
            </Select>
          </FormRow>
          <FormRow label="Status" htmlFor="status">
            <Select id="status" value={form.status || "PENDING"} onChange={set("status")}>
              <option value="PENDING">Pending</option>
              <option value="IN_PROGRESS">In progress</option>
              <option value="COMPLETED">Completed</option>
            </Select>
          </FormRow>
        </div>

        <div className="flex justify-end gap-3 pt-2">
          <Button type="button" variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" loading={loading}>
            {isEdit ? "Save changes" : "Add task"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
