import * as Dialog from "@radix-ui/react-dialog";
import { Link } from "@tanstack/react-router";
import { Download, FileText, LockKeyhole, Mail, Printer, X } from "lucide-react";
import { useState, useSyncExternalStore, type ReactNode } from "react";
import { aed, installments, type Installment } from "@/components/payments/payment-data";
import { InfoGrid, SimpleTable } from "@/components/sales/sales-ui";
import { Button, DashboardCard, FieldError, FormField, Input, StatusBadge } from "@/components/ui/crm";

/* ---------- Shared sample context (canonical CRM IDs) ---------- */
const ctx = { customer: "Sarah Ahmed", customerId: "CU-2026-00482", project: "Horizon Residences", unit: "A-1204", spa: "SPA-2026-00142" };
const arFor: Record<string, string> = { "INS-001": "AR-2026-01842", "INS-002": "AR-2026-01843", "INS-003": "AR-2026-01851", "INS-004": "AR-2026-01866" };
const ordinal = ["1st", "2nd", "3rd", "4th", "5th", "6th"];

export type ProformaStatus = "Draft" | "Generated" | "Sent" | "Viewed" | "Paid" | "Cancelled" | "Expired";
export type Proforma = { id: string; installmentId: string; installment: string; milestone: string; ar: string; issueDate: string; dueDate: string; amount: number; received: number; version: number; status: ProformaStatus; receipt?: string; paidDate?: string; history: [string, string, string][] };
export type Statement = { id: string; customer: string; scope: string; period: string; generated: string; outstanding: number; by: string; file: string };

let proformas: Proforma[] = [
  { id: "PI-2026-00171", installmentId: "INS-001", installment: "Installment 1", milestone: "Reservation", ar: "AR-2026-01842", issueDate: "10 Sep 2026", dueDate: "18 Sep 2026", amount: 122500, received: 122500, version: 1, status: "Paid", receipt: "RCT-2026-00941", paidDate: "24 Sep 2026", history: [["10 Sep 2026 09:12", "Layla Noor", "Proforma generated · Version 1"], ["10 Sep 2026 09:14", "Layla Noor", "Sent by email"], ["24 Sep 2026 16:40", "System", "Paid status changed · AR fully settled"]] },
  { id: "PI-2026-00176", installmentId: "INS-002", installment: "Installment 2", milestone: "Construction Milestone 1", ar: "AR-2026-01843", issueDate: "22 Sep 2026", dueDate: "01 Oct 2026", amount: 245000, received: 120000, version: 2, status: "Viewed", history: [["18 Sep 2026 10:02", "Layla Noor", "Proforma generated · Version 1"], ["22 Sep 2026 11:30", "Nadia Rahman", "Version 2 created · approved plan amendment (due date)"], ["22 Sep 2026 11:32", "Nadia Rahman", "Sent by email"], ["23 Sep 2026 08:05", "Customer", "Viewed"]] },
];
let statements: Statement[] = [
  { id: "SOA-2026-00471", customer: "Sarah Ahmed", scope: "Horizon Residences · A-1204", period: "01 Jan 2026 — 31 Aug 2026", generated: "31 Aug 2026", outstanding: 122500, by: "Layla Noor", file: "SOA-2026-00471_Sarah-Ahmed_A-1204.pdf" },
  { id: "SOA-2026-00465", customer: "Mohammed Al Farsi", scope: "Green Park · B-0806", period: "01 Jan 2026 — 15 Sep 2026", generated: "15 Sep 2026", outstanding: 98000, by: "Nadia Rahman", file: "SOA-2026-00465_Mohammed-Al-Farsi_B-0806.pdf" },
];
let seq = 182, soaSeq = 482;
const listeners = new Set<() => void>();
const emit = () => listeners.forEach(l => l());
const subscribe = (l: () => void) => { listeners.add(l); return () => listeners.delete(l); };
export function useProformas() { return useSyncExternalStore(subscribe, () => proformas, () => proformas); }
export function useStatements() { return useSyncExternalStore(subscribe, () => statements, () => statements); }
const now = () => "29 Sep 2026 " + new Date().toTimeString().slice(0, 5);
function update(id: string, fn: (p: Proforma) => Proforma) { proformas = proformas.map(p => (p.id === id ? fn(p) : p)); emit(); }
function generate(i: Installment): Proforma {
  const p: Proforma = { id: `PI-2026-00${seq++}`, installmentId: i.id, installment: i.name, milestone: i.milestone, ar: arFor[i.id] ?? "AR-2026-01843", issueDate: "29 Sep 2026", dueDate: i.due, amount: i.amount, received: i.received, version: 1, status: "Generated", history: [[now(), "Layla Noor", "Proforma generated · Version 1"]] };
  proformas = [p, ...proformas]; emit(); return p;
}
export const proformaTone = (s: string) => (s === "Paid" ? "success" : s === "Cancelled" || s === "Expired" ? "danger" : s === "Draft" ? "neutral" : s === "Sent" || s === "Viewed" ? "info" : "warning");
const fileName = (id: string) => `${id}_Sarah-Ahmed_A-1204.pdf`;

/* ---------- Wide document dialog ---------- */
function DocDialog({ open, onOpenChange, title, children }: { open: boolean; onOpenChange: (v: boolean) => void; title: string; children: ReactNode }) {
  return <Dialog.Root open={open} onOpenChange={onOpenChange}><Dialog.Portal><Dialog.Overlay className="fixed inset-0 z-50 bg-overlay" /><Dialog.Content className="fixed left-1/2 top-1/2 z-50 flex max-h-[calc(100dvh-32px)] w-[min(1040px,calc(100vw-32px))] -translate-x-1/2 -translate-y-1/2 flex-col overflow-hidden rounded-card border border-border bg-surface shadow-modal"><div className="flex items-center justify-between border-b border-border px-5 py-3"><Dialog.Title className="text-lg font-bold">{title}</Dialog.Title><Dialog.Close className="grid size-8 place-items-center rounded-md hover:bg-muted" aria-label="Close"><X size={16} /></Dialog.Close></div><div className="flex-1 overflow-y-auto">{children}</div></Dialog.Content></Dialog.Portal></Dialog.Root>;
}
function A4({ title, children }: { title: string; children: ReactNode }) {
  return <div className="mx-auto w-full max-w-[640px] rounded-md border border-border bg-surface p-8 text-xs"><div className="flex items-start justify-between border-b border-border pb-4"><div><strong className="block text-sm tracking-wide text-primary">GREEN HORIZON DEVELOPMENTS</strong><span className="text-[11px] text-muted-foreground">Dubai, United Arab Emirates · TRN 100482913700003</span></div><strong className="text-base tracking-wide">{title}</strong></div>{children}</div>;
}
function KV({ items }: { items: [string, string][] }) { return <dl className="grid grid-cols-2 gap-x-6 gap-y-2">{items.map(([k, v]) => <div key={k} className="flex justify-between gap-3 border-b border-border/60 py-1"><dt className="text-muted-foreground">{k}</dt><dd className="text-right font-semibold">{v}</dd></div>)}</dl>; }

/* ---------- PART A: Proforma ---------- */
export function ProformaDocument({ p }: { p: Proforma }) {
  const idx = Number(p.installment.replace(/\D/g, "")) - 1;
  const paid = p.received >= p.amount;
  return <A4 title="PROFORMA INVOICE"><div className="mt-4"><KV items={[["Proforma Invoice No", p.id], ["Version", `Version ${p.version}`], ["Issue Date", p.issueDate], ["Due Date", p.dueDate], ["Customer", ctx.customer], ["Customer ID", ctx.customerId], ["Project", ctx.project], ["Unit", ctx.unit], ["SPA", ctx.spa], ["Finance AR", p.ar]]} /></div>
    <table className="mt-5 w-full text-left"><thead className="bg-muted text-muted-foreground"><tr><th className="p-2">Installment</th><th className="p-2">Description</th><th className="p-2 text-right">Amount</th></tr></thead><tbody><tr className="border-b border-border"><td className="p-2 font-semibold">{p.installment}</td><td className="p-2">{ordinal[idx] ?? ""} Installment Payment · {p.milestone}</td><td className="p-2 text-right">{aed(p.amount)}</td></tr><tr><td className="p-2" colSpan={2}>Tax / VAT <span className="text-muted-foreground">(configured Finance rule: residential first supply — exempt)</span></td><td className="p-2 text-right">AED 0</td></tr><tr className="border-t border-border"><td className="p-2 font-bold" colSpan={2}>Total Due</td><td className="p-2 text-right font-bold">{aed(p.amount)}</td></tr></tbody></table>
    {paid && <div className="mt-4 rounded-md bg-success-soft p-3 text-success"><KV items={[["Payment Status", "Paid"], ["Receipt", p.receipt ?? "—"], ["Paid Date", p.paidDate ?? "—"], ["Received", aed(p.received)], ["Outstanding", "AED 0"]]} /></div>}
    <div className="mt-5 rounded-md bg-muted p-3"><strong>Payment instructions</strong><p className="mt-1 text-muted-foreground">Emirates NBD · Green Horizon Developments LLC Escrow · IBAN AE07 0260 0010 1548 2913 701 · Reference: {p.ar}</p></div>
    <p className="mt-4 text-[11px] text-muted-foreground">This Proforma Invoice is a request for payment and is not a receipt or proof of payment. Payment is confirmed only by an official Finance receipt.</p></A4>;
}
export function ProformaDialog({ open, onOpenChange, proformaId }: { open: boolean; onOpenChange: (v: boolean) => void; proformaId?: string | undefined }) {
  const list = useProformas(); const p = list.find(x => x.id === proformaId);
  const [msg, setMsg] = useState("");
  if (!p) return null;
  const act = (label: string, status?: ProformaStatus) => { update(p.id, x => ({ ...x, status: status ?? x.status, history: [...x.history, [now(), "Layla Noor", label]] })); setMsg(label); };
  const revise = () => { update(p.id, x => ({ ...x, version: x.version + 1, status: "Generated", history: [...x.history, [now(), "Layla Noor", `Version ${x.version + 1} created · previous version preserved`]] })); setMsg(`Version ${p.version + 1} created; Version ${p.version} kept in history`); };
  const locked = p.status === "Paid" || p.status === "Cancelled";
  return <DocDialog open={open} onOpenChange={v => { onOpenChange(v); setMsg(""); }} title={`Proforma Invoice ${p.id}`}><div className="grid gap-4 p-5 lg:grid-cols-[1fr_280px]"><div className="rounded-md bg-muted/50 p-4"><ProformaDocument p={p} /></div><aside className="space-y-4"><div className="flex items-center justify-between"><strong className="text-sm">Status</strong><StatusBadge tone={proformaTone(p.status)}>{p.status}</StatusBadge></div><InfoGrid columns="grid-cols-1" items={[["Linked AR", p.ar], ["CRM installment", p.installment], ["Outstanding", aed(p.amount - p.received)], ["File", fileName(p.id)]]} />
    <div className="grid gap-2"><Button variant="secondary" onClick={() => act("Downloaded PDF")}><Download size={15} />Download PDF</Button><Button variant="secondary" disabled={locked} onClick={() => act("Sent by email", "Sent")}><Mail size={15} />Email to customer</Button><Button variant="secondary" disabled={locked} onClick={() => act("Sent via configured channel", "Sent")}>Send via configured channel</Button><Button variant="secondary" disabled={locked} onClick={revise}>Create revised version</Button><Button variant="ghost" disabled={locked} onClick={() => act("Proforma cancelled", "Cancelled")}>Cancel proforma</Button>
      <Link to="/finance/receivables/$receivableId" params={{ receivableId: p.ar }}><Button variant="ghost" className="w-full">View related receivable</Button></Link>{p.receipt && <Button variant="ghost" onClick={() => setMsg(`Receipt ${p.receipt} · ${aed(p.received)}`)}>View related receipt</Button>}</div>
    {msg && <p className="rounded-md bg-success-soft p-2 text-xs text-success">{msg}</p>}
    <div><strong className="text-sm">Audit</strong><ul className="mt-2 space-y-2">{[...p.history].reverse().map((h, i) => <li key={i} className="border-l-2 border-border pl-2 text-[11px]"><span className="text-muted-foreground">{h[0]} · {h[1]}</span><br />{h[2]}</li>)}</ul></div></aside></div></DocDialog>;
}
/** Contextual installment action: Generate or View Proforma Invoice. */
export function ProformaButton({ installment, className = "h-7 px-2 text-xs" }: { installment: Installment; className?: string }) {
  const list = useProformas(); const existing = list.find(p => p.installmentId === installment.id && p.status !== "Cancelled");
  const [open, setOpen] = useState(false); const [id, setId] = useState<string>();
  return <><Button variant="ghost" className={className} onClick={() => { const p = existing ?? generate(installment); setId(p.id); setOpen(true); }}>{existing ? "View Proforma" : "Generate Proforma"}</Button><ProformaDialog open={open} onOpenChange={setOpen} proformaId={id ?? existing?.id} /></>;
}
export function ProformaPanel({ title = "Proforma invoices", subtitle = "Generated per installment from the payment schedule; linked to the same Finance receivable." }: { title?: string; subtitle?: string }) {
  const list = useProformas(); const [open, setOpen] = useState<string>();
  return <DashboardCard className="overflow-hidden"><div className="p-4"><h2 className="text-lg font-bold">{title}</h2><p className="text-xs text-muted-foreground">{subtitle}</p></div><div className="overflow-x-auto"><table className="w-full min-w-[760px] text-left text-xs"><thead className="bg-muted text-muted-foreground"><tr>{["Installment", "Due date", "Amount", "Outstanding", "Proforma", "Status", "Action"].map(h => <th key={h} className="p-3 font-medium">{h}</th>)}</tr></thead><tbody>{installments.map(i => { const p = list.find(x => x.installmentId === i.id && x.status !== "Cancelled"); return <tr key={i.id} className="border-b border-border"><td className="p-3 font-semibold">{i.name}<span className="block font-normal text-muted-foreground">{i.milestone}</span></td><td className="p-3">{i.due}</td><td className="p-3">{aed(i.amount)}</td><td className="p-3">{aed(i.outstanding)}</td><td className="p-3">{p ? <button className="font-semibold text-primary" onClick={() => setOpen(p.id)}>{p.id} · v{p.version}</button> : "—"}</td><td className="p-3">{p ? <StatusBadge tone={proformaTone(p.status)}>{p.status}</StatusBadge> : <StatusBadge>Not generated</StatusBadge>}</td><td className="p-3"><ProformaButton installment={i} /></td></tr>; })}</tbody></table></div><ProformaDialog open={Boolean(open)} onOpenChange={v => !v && setOpen(undefined)} proformaId={open} /></DashboardCard>;
}
export function ProformaReport() {
  const list = useProformas();
  return <SimpleTable headers={["PI Number", "Customer", "Project / Unit", "Installment", "Amount", "Due Date", "Status", "Payment Status"]} rows={list.map(p => [`${p.id} · v${p.version}`, ctx.customer, `${ctx.project} · ${ctx.unit}`, p.installment, aed(p.amount), p.dueDate, p.status, p.received >= p.amount ? "Paid" : p.received > 0 ? "Partially Paid" : "Upcoming"])} badges={[6, 7]} />;
}

/* ---------- PART B: Unit profitability ---------- */
export const unitCosts: [string, string, number, string, string][] = [
  ["Project cost allocation", "Construction / development allocation", 720000, "Project Costing", "PC-HR-ALLOC-0926"],
  ["Unit-specific cost", "Fit-out / unit-specific cost", 40000, "Accounts Payable", "AP-2026-00318"],
  ["Allocated other costs", "Marketing", 15000, "Overhead allocation", "ALLOC-2026-09"],
  ["Allocated other costs", "Broker commission", 24500, "Broker Commission", "COM-2026-00218"],
  ["Allocated other costs", "Legal / admin", 8000, "Expenses", "EXP-2026-00441"],
  ["Allocated other costs", "Finance / overhead", 27500, "Overhead allocation", "ALLOC-2026-09"],
];
export const unitProfitRows: [string, string, string, number, number, string][] = [
  ["A-1204", "Horizon Residences", "Sarah Ahmed", 1225000, 835000, "Finalized at Handover"],
  ["A-1402", "Horizon Residences", "Aisha Rahman", 1420000, 968000, "Preliminary"],
  ["B-0806", "Green Park", "Blue Crest Holdings LLC", 980000, 742000, "Finalized at Handover"],
  ["B-1103", "Green Park", "Omar Siddiqui", 1045000, 781000, "Estimated"],
  ["C-0704", "Creek Vista", "Priya Nair", 1150000, 1062000, "Adjusted after Handover"],
];
export function UnitProfitabilityPanel({ stage = "handover" }: { stage?: "handover" | "unit" }) {
  const [finalized, setFinalized] = useState(stage === "unit");
  const [error, setError] = useState("");
  const [adjust, setAdjust] = useState(false);
  const revenue = 1225000; const total = unitCosts.reduce((s, c) => s + c[2], 0); const profit = revenue - total;
  const status = adjust ? "Adjusted after Handover" : finalized ? "Finalized at Handover" : "Preliminary";
  const finalize = () => { setError(""); setFinalized(true); };
  return <div className="space-y-4"><DashboardCard className="p-5"><div className="flex flex-wrap items-start justify-between gap-3"><div><h2 className="text-lg font-bold">Unit profitability · A-1204</h2><p className="text-xs text-muted-foreground">Horizon Residences · Sarah Ahmed · Handover 04 Oct 2026 · sample values from approved Finance data</p></div><div className="flex items-center gap-2"><StatusBadge tone="neutral"><LockKeyhole size={11} className="mr-1 inline" />Finance / Management only</StatusBadge><StatusBadge tone={finalized ? "success" : "warning"}>{status}</StatusBadge></div></div>
    <div className="mt-4 grid gap-3 sm:grid-cols-3 xl:grid-cols-6">{[["Unit revenue", aed(revenue)], ["Project cost allocation", aed(720000)], ["Unit-specific cost", aed(40000)], ["Allocated other costs", aed(75000)], ["Total unit cost", aed(total)], ["Profit · margin", `${aed(profit)} · ${((profit / revenue) * 100).toFixed(1)}%`]].map(([k, v]) => <div key={k} className="rounded-md border border-border p-3"><p className="text-[11px] text-muted-foreground">{k}</p><strong className="text-sm">{v}</strong></div>)}</div>
    <p className="mt-3 text-[11px] text-muted-foreground">Formula (Finance-configured): Unit profit = Unit revenue (SPA contract value, net of approved discounts) − Total unit cost. Collections status does not affect profit.</p></DashboardCard>
    <DashboardCard className="overflow-hidden"><div className="p-4"><h2 className="text-lg font-bold">Unit cost breakdown</h2><p className="text-xs text-muted-foreground">Each cost drills to its Finance source; nothing is re-entered.</p></div><SimpleTable headers={["Group", "Cost category", "Amount", "Source", "Reference"]} rows={[...unitCosts.map(c => [c[0], c[1], aed(c[2]), c[3], c[4]]), ["Total", "", aed(total), "", ""]]} /></DashboardCard>
    {stage === "handover" && <DashboardCard className="p-5"><h2 className="text-lg font-bold">Handover snapshot</h2>{!finalized ? <><p className="mt-1 text-xs text-muted-foreground">Finalizing creates an immutable profitability snapshot. Requires finance clearance and approved cost allocations.</p><div className="mt-3"><InfoGrid columns="grid-cols-3" items={[["Finance clearance", "Cleared · FC-2026-00412"], ["Cost allocations", "Approved · Sep 2026 run"], ["Revenue basis", "SPA value · AED 1,225,000"]]} /></div><FieldError>{error}</FieldError><Button className="mt-3" onClick={finalize}>Finalize profitability snapshot</Button></> : <><div className="mt-3"><InfoGrid columns="grid-cols-3" items={[["Snapshot", "PS-2026-00182"], ["Finalized", "04 Oct 2026 · Nadia Rahman"], ["Profit at handover", aed(profit)]]} /></div>{adjust ? <p className="mt-3 rounded-md bg-info-soft p-2 text-xs text-info">Post-handover adjustment ADJ-2026-00017 created (late fit-out invoice). Original snapshot preserved.</p> : <Button variant="secondary" className="mt-3" onClick={() => setAdjust(true)}>Create post-handover adjustment</Button>}</>}</DashboardCard>}
  </div>;
}

/* ---------- PART C: Statement of Account ---------- */
const soaLines: [string, string, string, number, number][] = [
  ["18 Sep 2026", "RSV-2026-00182", "Reservation installment", 122500, 0],
  ["24 Sep 2026", "RCT-2026-00941", "Payment received · PAY-2026-01894", 0, 80000],
  ["24 Sep 2026", "RCT-2026-00941", "Payment received · reservation balance", 0, 42500],
  ["22 Sep 2026", "PI-2026-00176", "Proforma issued · Installment 2 (memo, not a debit)", 0, 0],
  ["01 Oct 2026", "AR-2026-01843", "Installment 2 · Construction Milestone 1", 245000, 0],
  ["28 Sep 2026", "RCT-2026-00949", "Payment received · PAY-2026-01902", 0, 40000],
];
const futureLines: [string, string, string, number, number][] = [["01 Jan 2027", "AR-2026-01851", "Installment 3 · Construction Milestone 2 (future)", 245000, 0], ["On handover", "AR-2026-01866", "Installment 4 · Handover (future)", 612500, 0]];
function StatementDocument({ id, period, includeFuture }: { id: string; period: string; includeFuture: boolean }) {
  let bal = 0; const lines = includeFuture ? [...soaLines, ...futureLines] : soaLines;
  return <A4 title="STATEMENT OF ACCOUNT"><div className="mt-4"><KV items={[["Statement No", id], ["Statement Date", "29 Sep 2026"], ["Customer", ctx.customer], ["Customer ID", ctx.customerId], ["Project", ctx.project], ["Unit", ctx.unit], ["SPA", ctx.spa], ["Statement Period", period]]} /></div>
    <div className="mt-4 grid grid-cols-3 gap-2">{[["Contract value", "AED 1,225,000"], ["Total due to date", "AED 367,500"], ["Total received", "AED 245,000"], ["Outstanding due", "AED 122,500"], ["Future installments", "AED 857,500"], ["Overdue", "AED 0"]].map(([k, v]) => <div key={k} className="rounded-md bg-muted p-2"><span className="text-[10px] text-muted-foreground">{k}</span><strong className="block">{v}</strong></div>)}</div>
    <table className="mt-4 w-full text-left"><thead className="bg-muted text-muted-foreground"><tr>{["Date", "Reference", "Description", "Debit", "Credit", "Balance"].map(h => <th key={h} className={`p-2 ${["Debit", "Credit", "Balance"].includes(h) ? "text-right" : ""}`}>{h}</th>)}</tr></thead><tbody>{lines.map((l, i) => { bal += l[3] - l[4]; return <tr key={i} className="border-b border-border/60"><td className="p-2">{l[0]}</td><td className="p-2 font-semibold">{l[1]}</td><td className="p-2">{l[2]}</td><td className="p-2 text-right">{l[3] ? aed(l[3]) : "—"}</td><td className="p-2 text-right">{l[4] ? aed(l[4]) : "—"}</td><td className="p-2 text-right">{aed(bal)}</td></tr>; })}</tbody></table>
    <p className="mt-4 text-[11px] text-muted-foreground">Debits are installments invoiced through Finance AR; credits are cleared Finance receipts. Proforma invoices are shown for reference only and do not change the balance.</p></A4>;
}
export function StatementButton({ variant = "secondary" }: { variant?: "primary" | "secondary" }) {
  const [step, setStep] = useState<"options" | "preview">(); const [from, setFrom] = useState("2026-01-01"); const [to, setTo] = useState("2026-09-29"); const [scope, setScope] = useState("Specific Unit"); const [future, setFuture] = useState(true); const [error, setError] = useState(""); const [id, setId] = useState(""); const [msg, setMsg] = useState("");
  const fmt = (d: string) => new Date(d).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
  const period = `${fmt(from)} — ${fmt(to)}`;
  const go = () => { if (!from || !to || from > to) { setError("Choose a valid period: From date must be on or before To date"); return; } setError(""); const sid = `SOA-2026-00${soaSeq++}`; setId(sid); statements = [{ id: sid, customer: ctx.customer, scope: scope === "All Transactions" ? "All transactions" : `${ctx.project} · ${ctx.unit}`, period, generated: "29 Sep 2026", outstanding: 122500, by: "Layla Noor", file: `${sid}_Sarah-Ahmed_A-1204.pdf` }, ...statements]; emit(); setStep("preview"); setMsg(""); };
  return <><Button variant={variant} onClick={() => setStep("options")}><FileText size={15} />Statement of Account</Button>
    <DocDialog open={Boolean(step)} onOpenChange={v => !v && setStep(undefined)} title={step === "preview" ? `Statement ${id}` : "Generate Statement of Account"}>{step === "options" ? <div className="grid max-w-[640px] gap-4 p-5 sm:grid-cols-2"><FormField label="Customer *"><Input value={`${ctx.customer} · ${ctx.customerId}`} readOnly /></FormField><FormField label="Scope *"><select className="h-control rounded-md border border-input bg-surface px-3 text-sm" value={scope} onChange={e => setScope(e.target.value)}>{["All Transactions", "Specific Project", "Specific Unit", "Specific SPA"].map(s => <option key={s}>{s}</option>)}</select></FormField><FormField label="From date *"><Input type="date" value={from} onChange={e => setFrom(e.target.value)} /></FormField><FormField label="To date *"><Input type="date" value={to} onChange={e => setTo(e.target.value)} /></FormField><div className="flex flex-wrap gap-4 text-xs sm:col-span-2">{["Include paid transactions", "Include outstanding transactions"].map(l => <label key={l} className="flex items-center gap-2"><input type="checkbox" defaultChecked />{l}</label>)}<label className="flex items-center gap-2"><input type="checkbox" checked={future} onChange={e => setFuture(e.target.checked)} />Include future installments</label></div><div className="sm:col-span-2"><FieldError>{error}</FieldError><div className="mt-2 flex justify-end gap-2"><Button variant="secondary" onClick={() => setStep(undefined)}>Cancel</Button><Button onClick={go}>Generate statement</Button></div></div></div>
      : <div className="grid gap-4 p-5 lg:grid-cols-[1fr_240px]"><div className="rounded-md bg-muted/50 p-4"><StatementDocument id={id} period={period} includeFuture={future} /></div><aside className="grid content-start gap-2"><p className="text-xs text-muted-foreground">Saved to customer documents as {id}_Sarah-Ahmed_A-1204.pdf · snapshot preserved.</p><Button variant="secondary" onClick={() => setMsg("Downloaded · audit recorded")}><Download size={15} />Download PDF</Button><Button variant="secondary" onClick={() => setMsg("Sent for printing · audit recorded")}><Printer size={15} />Print</Button><Button variant="secondary" onClick={() => setMsg("Emailed to sarah.ahmed@email.com · audit recorded")}><Mail size={15} />Email statement</Button>{msg && <p className="rounded-md bg-success-soft p-2 text-xs text-success">{msg}</p>}</aside></div>}</DocDialog></>;
}
export function StatementHistory() {
  const list = useStatements();
  return <SimpleTable headers={["Statement", "Customer", "Project / Unit", "Period", "Generated", "Outstanding at generation", "Generated by"]} rows={list.map(s => [s.id, s.customer, s.scope, s.period, s.generated, aed(s.outstanding), s.by])} />;
}
