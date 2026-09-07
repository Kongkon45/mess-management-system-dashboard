"use client";

import { useMemo, useState } from "react";
import DataTable, { type Column } from "./DataTable";

type ManagementType = "members" | "meals" | "market" | "utility" | "monthly";
type TableRowData = Record<string, string> & { id: string };

const tableConfig: Record<ManagementType, { description: string; columns: Column<TableRowData>[]; rows: TableRowData[] }> = {
  members: {
    description: "Member accounts, contact details and current status.",
    columns: [
      { header: "Member", accessor: "name" },
      { header: "Email", accessor: "email" },
      { header: "Phone", accessor: "phone" },
      { header: "Room", accessor: "room" },
      { header: "Status", cell: (row) => <Status value={row.status} /> },
    ],
    rows: [
      { id: "m1", name: "Rahim Ahmed", email: "rahim@example.com", phone: "01711-000001", room: "A-101", status: "Active" },
      { id: "m2", name: "Karim Hasan", email: "karim@example.com", phone: "01711-000002", room: "A-102", status: "Active" },
      { id: "m3", name: "Nusrat Jahan", email: "nusrat@example.com", phone: "01711-000003", room: "B-201", status: "Inactive" },
    ],
  },
  meals: {
    description: "Daily menu, meal type and serving availability.",
    columns: [
      { header: "Date", accessor: "date" }, { header: "Meal", accessor: "meal" }, { header: "Menu", accessor: "menu" }, { header: "Rate", accessor: "rate" }, { header: "Status", cell: (row) => <Status value={row.status} /> },
    ],
    rows: [
      { id: "meal1", date: "07 Sep 2026", meal: "Lunch", menu: "Rice, fish curry, vegetables", rate: "৳80", status: "Available" },
      { id: "meal2", date: "07 Sep 2026", meal: "Dinner", menu: "Rice, chicken curry, dal", rate: "৳90", status: "Available" },
      { id: "meal3", date: "08 Sep 2026", meal: "Lunch", menu: "Khichuri, egg curry", rate: "৳75", status: "Draft" },
    ],
  },
  market: {
    description: "Market purchases and the person responsible.",
    columns: [
      { header: "Date", accessor: "date" }, { header: "Item", accessor: "item" }, { header: "Purchased by", accessor: "purchasedBy" }, { header: "Amount", accessor: "amount" }, { header: "Status", cell: (row) => <Status value={row.status} /> },
    ],
    rows: [
      { id: "market1", date: "07 Sep 2026", item: "Vegetables and fish", purchasedBy: "Rahim Ahmed", amount: "৳1,250", status: "Approved" },
      { id: "market2", date: "06 Sep 2026", item: "Rice and groceries", purchasedBy: "Karim Hasan", amount: "৳2,800", status: "Approved" },
      { id: "market3", date: "05 Sep 2026", item: "Cooking gas", purchasedBy: "Nusrat Jahan", amount: "৳1,450", status: "Pending" },
    ],
  },
  utility: {
    description: "Monthly utility bills and payment status.",
    columns: [
      { header: "Utility", accessor: "utility" }, { header: "Month", accessor: "month" }, { header: "Amount", accessor: "amount" }, { header: "Due date", accessor: "dueDate" }, { header: "Status", cell: (row) => <Status value={row.status} /> },
    ],
    rows: [
      { id: "utility1", utility: "Electricity", month: "September 2026", amount: "৳4,500", dueDate: "15 Sep 2026", status: "Unpaid" },
      { id: "utility2", utility: "Gas", month: "September 2026", amount: "৳1,200", dueDate: "12 Sep 2026", status: "Paid" },
      { id: "utility3", utility: "Internet", month: "September 2026", amount: "৳1,500", dueDate: "10 Sep 2026", status: "Paid" },
    ],
  },
  monthly: {
    description: "Members who selected meals for the current month.",
    columns: [
      { header: "Member", accessor: "name" }, { header: "Month", accessor: "month" }, { header: "Lunch days", accessor: "lunch" }, { header: "Dinner days", accessor: "dinner" }, { header: "Status", cell: (row) => <Status value={row.status} /> },
    ],
    rows: [
      { id: "selection1", name: "Rahim Ahmed", month: "September 2026", lunch: "26", dinner: "25", status: "Confirmed" },
      { id: "selection2", name: "Karim Hasan", month: "September 2026", lunch: "24", dinner: "26", status: "Confirmed" },
      { id: "selection3", name: "Nusrat Jahan", month: "September 2026", lunch: "20", dinner: "18", status: "Pending" },
    ],
  },
};

function Status({ value }: { value: string }) {
  const colors = value === "Active" || value === "Available" || value === "Approved" || value === "Paid" || value === "Confirmed"
    ? "bg-emerald-100 text-emerald-700"
    : value === "Pending" || value === "Unpaid" ? "bg-amber-100 text-amber-700" : "bg-slate-100 text-slate-700";
  return <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${colors}`}>{value}</span>;
}

export default function ManagementTable({ type }: { type: ManagementType }) {
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const config = tableConfig[type];
  const data = useMemo(() => config.rows.filter((row) => Object.values(row).some((value) => value.toLowerCase().includes(query.toLowerCase()))), [config.rows, query]);

  return (
    <section className="rounded-xl border bg-card p-4 shadow-sm sm:p-6">
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-muted-foreground">{config.description}</p>
        <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search records..." className="h-9 rounded-md border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring" />
      </div>
      <DataTable columns={config.columns} data={data} idKey="id" selectedId={selectedId} onSelectionChange={setSelectedId} />
    </section>
  );
}
