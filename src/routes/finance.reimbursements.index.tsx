import {createFileRoute,Link} from "@tanstack/react-router";
import {CheckCircle2,Clock,Users,Wallet} from "lucide-react";
import {AppShell} from "@/components/app-shell";
import {fmt} from "@/components/finance/accounting-data";
import {Kpis,Panel,RecordTable,Toolbar,pageMeta} from "@/components/finance/accounting-ui";
import {FinancePage} from "@/components/finance/finance-ui";
import {reimbursements} from "@/components/finance/spend-data";
export const Route=createFileRoute("/finance/reimbursements/")({head:()=>pageMeta("Reimbursements","Employee reimbursement claims, approvals, partial and full payments."),component:Page});
function Page(){return <AppShell crumbs={["Workspace","Finance ERP","Reimbursements"]}><FinancePage eyebrow="REIMBURSEMENTS" title="Reimbursements" description="Employee claims grouped from approved expenses and paid through payroll or bank transfer.">
<div className="mt-5"><Kpis items={[["Open claims","3","AED 14,850 outstanding",<Users/>],["Pending approval","1","AED 6,800",<Clock/>],["Approved to pay","1","AED 2,450",<Wallet/>],["Paid this month","AED 12,900","6 claims",<CheckCircle2/>]]}/></div>
<div className="mt-4"><Panel flush title="Reimbursement claims"><Toolbar placeholder="Search claim or employee" filters={[["Status",["All","Pending approval","Approved","Partially paid","Paid"]],["Method",["All","Payroll","Bank transfer"]]]}/><RecordTable headers={["Claim","Employee","Department","Expenses","Submitted","Amount","Paid","Outstanding","Method","Status"]} badges={[9]} right={[5,6,7]} rows={reimbursements.map(r=>[<Link to="/finance/reimbursements/$reimbursementId" params={{reimbursementId:r.id}} className="font-semibold text-primary">{r.id}</Link>,r.employee,r.department,String(r.expenses.length),r.submitted,fmt(r.amount),fmt(r.paid),fmt(r.amount-r.paid),r.method,r.status])}/></Panel></div></FinancePage></AppShell>}
