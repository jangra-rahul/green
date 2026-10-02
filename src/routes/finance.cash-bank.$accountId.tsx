import {createFileRoute,Link,notFound} from "@tanstack/react-router";
import {useState} from "react";
import {AppShell} from "@/components/app-shell";
import {bankAccounts,bankTransactions,fmt,reconciliations} from "@/components/finance/accounting-data";
import {AuditPanel,Panel,RecordTable,pageMeta} from "@/components/finance/accounting-ui";
import {FinancePage} from "@/components/finance/finance-ui";
import {InfoGrid} from "@/components/sales/sales-ui";
import {Button,StatusBadge} from "@/components/ui/crm";
export const Route=createFileRoute("/finance/cash-bank/$accountId")({loader:({params})=>{const account=bankAccounts.find(b=>b.id===params.accountId);if(!account)throw notFound();return {account}},head:({loaderData})=>loaderData?pageMeta(`${loaderData.account.name} · Bank account`,`Balances, transactions and reconciliation history for ${loaderData.account.name}.`):{meta:[{title:"Bank account not found"},{name:"robots",content:"noindex"}]},notFoundComponent:Missing,component:Page});
function Missing(){return <AppShell crumbs={["Finance ERP","Cash & bank"]}><div className="p-8 text-sm">Bank account not found. <Link to="/finance/cash-bank" className="text-primary">Back to Cash & bank</Link></div></AppShell>}
function Page(){const {account:a}=Route.useLoaderData();const [reveal,setReveal]=useState(false);return <AppShell crumbs={["Finance ERP","Cash & bank",a.id]}><FinancePage eyebrow={`BANK ACCOUNT · ${a.id}`} title={a.name} description={`${a.bank} · ${a.type} · ${a.project}`} actions={<StatusBadge tone="success">{a.status}</StatusBadge>}>
<div className="mt-5 grid gap-4 xl:grid-cols-[1fr_360px]"><Panel title="Account details"><InfoGrid items={[["Bank",a.bank],["Account number",reveal?a.iban:a.masked],["Currency",a.currency],["Linked GL account",a.gl],["Book balance",fmt(a.book)],["Statement balance",fmt(a.statement)],["Difference",fmt(a.statement-a.book)],["Last reconciled",a.lastRecon],["Project",a.project]]}/><Button variant="secondary" className="mt-4" onClick={()=>setReveal(r=>!r)}>{reveal?"Mask account number":"Reveal if authorized"}</Button></Panel>
<Panel title="Reconciliation history">{reconciliations.filter(r=>r[1]?.startsWith(a.id)).map(r=><div key={r[0]} className="flex justify-between border-b border-border py-2 text-xs"><span>{r[0]} · {r[2]}</span><StatusBadge tone={r[6]==="Completed"?"success":"warning"}>{r[6]}</StatusBadge></div>)}<p className="mt-2 text-[11px] text-muted-foreground">Earlier periods are archived and read-only.</p></Panel></div>
<div className="mt-4"><Panel flush title="Transactions"><RecordTable headers={["Transaction","Date","Description","Credit","Debit","Source","Journal","Status"]} badges={[7]} rows={bankTransactions.filter(t=>t[2]===a.id).map(t=>[t[0],t[1],t[3],t[4],t[5],t[6],t[7]&&t[7]!=="—"?<Link to="/finance/ledger/journals/$journalId" params={{journalId:t[7]}} className="text-primary">{t[7]}</Link>:"—",t[8]])}/></Panel></div>
<div className="mt-4"><AuditPanel/></div></FinancePage></AppShell>}
