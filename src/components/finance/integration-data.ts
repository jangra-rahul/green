// Finance ERP Step 04 — CRM ↔ Finance integration records (frontend module state).
// CRM owns customers, units, contracts and payment plans; Finance owns receivables, receipts, postings and clearance.
export type SyncStatus="Synced"|"Pending"|"Processing"|"Failed"|"Conflict"|"Manual Review Required";
export type SyncEvent={id:string;time:string;event:string;direction:"CRM → Finance"|"Finance → CRM";source:string;sourceRef:string;target:string;targetRef:string;customer:string;amount:string;status:SyncStatus;attempts:number;message:string;idempotencyKey:string};
export const syncEvents:SyncEvent[]=[
{id:"SYN-2026-18842",time:"29 Sep · 10:42 AM",event:"Receipt cleared",direction:"Finance → CRM",source:"Finance ERP",sourceRef:"RCT-2026-00941",target:"CRM Payments",targetRef:"ACC-2026-00482",customer:"Sarah Ahmed",amount:"AED 122,500",status:"Synced",attempts:1,message:"Receipt status and amount received updated in CRM.",idempotencyKey:"RCT-2026-00941:cleared:v1"},
{id:"SYN-2026-18841",time:"29 Sep · 10:40 AM",event:"Reservation created",direction:"CRM → Finance",source:"CRM Sales",sourceRef:"RSV-2026-00194",target:"Accounts receivable",targetRef:"AR-2026-01845",customer:"Blue Crest Holdings LLC",amount:"AED 52,500",status:"Synced",attempts:1,message:"Reservation fee receivable created.",idempotencyKey:"RSV-2026-00194:created:v1"},
{id:"SYN-2026-18838",time:"29 Sep · 10:31 AM",event:"SPA installment schedule",direction:"CRM → Finance",source:"CRM SPA",sourceRef:"SPA-2026-00149",target:"Accounts receivable",targetRef:"AR-2026-01844",customer:"Aisha Rahman",amount:"AED 310,000",status:"Processing",attempts:1,message:"Creating 8 installment receivables.",idempotencyKey:"SPA-2026-00149:schedule:v2"},
{id:"SYN-2026-18835",time:"29 Sep · 10:12 AM",event:"Receipt recorded",direction:"Finance → CRM",source:"Finance ERP",sourceRef:"RCT-2026-00943",target:"CRM Payments",targetRef:"ACC-2026-00502",customer:"Aisha Rahman",amount:"AED 160,000",status:"Pending",attempts:0,message:"Waiting for bank verification before CRM update.",idempotencyKey:"RCT-2026-00943:recorded:v1"},
{id:"SYN-2026-18829",time:"29 Sep · 9:48 AM",event:"EOI deposit",direction:"CRM → Finance",source:"CRM EOI",sourceRef:"EOI-2026-00231",target:"Accounts receivable",targetRef:"—",customer:"Omar Khalid",amount:"AED 50,000",status:"Failed",attempts:3,message:"Customer record not yet linked to a Finance customer account.",idempotencyKey:"EOI-2026-00231:deposit:v1"},
{id:"SYN-2026-18826",time:"29 Sep · 9:30 AM",event:"Payment plan amendment",direction:"CRM → Finance",source:"CRM SPA",sourceRef:"SPA-2026-00138",target:"Accounts receivable",targetRef:"AR-2026-01843",customer:"Mohammed Al Farsi",amount:"AED 245,000",status:"Conflict",attempts:1,message:"Installment already partially paid in Finance; amendment changes its amount.",idempotencyKey:"SPA-2026-00138:amend:v3"},
{id:"SYN-2026-18820",time:"29 Sep · 9:02 AM",event:"Receipt reversed",direction:"Finance → CRM",source:"Finance ERP",sourceRef:"RCT-2026-00917",target:"CRM Payments",targetRef:"ACC-2026-00491",customer:"Mohammed Al Farsi",amount:"AED 25,000",status:"Manual Review Required",attempts:1,message:"Cheque returned. CRM collection status needs confirmation.",idempotencyKey:"RCT-2026-00917:reversed:v1"},
{id:"SYN-2026-18811",time:"28 Sep · 5:40 PM",event:"Handover clearance",direction:"Finance → CRM",source:"Finance ERP",sourceRef:"FC-2026-00412",target:"CRM Handover",targetRef:"HO-2026-00082",customer:"Sarah Ahmed",amount:"AED 0 outstanding",status:"Synced",attempts:1,message:"Finance clearance issued.",idempotencyKey:"FC-2026-00412:cleared:v1"}
];
export const conflicts=[
{id:"CNF-2026-0031",event:"SYN-2026-18826",customer:"Mohammed Al Farsi",field:"Installment 4 amount",crm:"AED 220,000",finance:"AED 245,000 (AED 147,000 received)",authority:"Finance ERP — posted receipt exists",raised:"29 Sep · 9:30 AM",status:"Open"},
{id:"CNF-2026-0030",event:"SYN-2026-18790",customer:"Aisha Rahman",field:"Unit number",crm:"A-1402",finance:"A-1420",authority:"CRM — unit master data",raised:"28 Sep · 3:12 PM",status:"Open"},
{id:"CNF-2026-0028",event:"SYN-2026-18744",customer:"Blue Crest Holdings LLC",field:"Customer TRN",crm:"TRN 100339812200003",finance:"—",authority:"CRM — customer master data",raised:"27 Sep · 11:05 AM",status:"Open"}
];
export const reconRows=[
["Sarah Ahmed","A-1204","RSV-2026-00182","AR-2026-01842","AED 122,500","AED 122,500","AED 0","Matched"],
["Mohammed Al Farsi","B-0806","SPA-2026-00138","AR-2026-01843","AED 220,000","AED 245,000","AED 25,000","Amount mismatch"],
["Aisha Rahman","A-1402","SPA-2026-00149","AR-2026-01844","AED 310,000","AED 310,000","AED 0","Matched"],
["Omar Khalid","C-0304","EOI-2026-00231","—","AED 50,000","—","AED 50,000","Missing Finance record"],
["Unmatched payer","—","—","RCT-2026-00944","—","AED 50,000","AED 50,000","Finance-only record"],
["Blue Crest Holdings LLC","A-1402","RSV-2026-00194","AR-2026-01845","AED 52,500","AED 52,500","AED 0","Matched"]
];
export const scenarios=[
["1","EOI deposit","EOI-2026-00231 → AR deposit","Failed","Customer link missing; retry after linking"],
["2","Reservation","RSV-2026-00182 → AR-2026-01842","Passed","Receivable created, receipt cleared, CRM updated"],
["3","SPA installments","SPA-2026-00149 → 8 receivables","Processing","Schedule sync in progress"],
["4","Full payment","RCT-2026-00941 → CRM paid","Passed","Outstanding AED 0 shown in CRM"],
["5","Partial payment","RCT-2026-00943 → CRM partial","Pending","Awaits bank verification"],
["6","Reversal","RCT-2026-00917 reversal","Manual review","Cheque return flagged to collections"],
["7","Plan amendment","SPA-2026-00138 v3","Conflict","Resolve in conflict queue"],
["8","Handover clearance","FC-2026-00412 → HO-2026-00082","Passed","CRM cannot override clearance"],
["9","Sync failure","Retry with idempotency key","Passed","No duplicate receivable created"],
["10","Data conflict","CNF-2026-0031","Open","Authoritative source rules applied"]
];
