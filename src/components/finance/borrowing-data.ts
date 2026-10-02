// Borrowing costs — IAS 23-ready sample data. Frontend module state only; treatment always follows configured Finance policy.
export const bcStatuses=["Draft","Active","Under Review","Pending Approval","Partially Capitalized","Capitalized","Expensed","Closed","On Hold"] as const;
export const costTypes=["Interest","Facility fee","Arrangement fee","Commitment fee","Exchange difference (finance)","Other finance cost"];
export const costSources=["Bank statement","Lender notice","Manual journal","Payables invoice","Interest accrual"];
export const allocationBases=["Saleable area (sq ft)","Unit sales value","Equal per unit","Construction cost share","Manual Finance allocation"];
export const K=(n:number)=>n>=1e6?`AED ${(n/1e6).toFixed(1)}M`:`AED ${Math.round(n/1e3)}K`;

export type Facility={id:string;name:string;lender:string;projects:{project:string;share:number}[];amount:number;currency:string;start:string;end:string;owner:string;status:string;reference:string;notes:string};
export const facilities:Facility[]=[
{id:"FAC-2026-001",name:"Project Development Facility",lender:"Emirates National Bank",projects:[{project:"Horizon Residences",share:100}],amount:80_000_000,currency:"AED",start:"15 Jan 2025",end:"14 Jan 2028",owner:"Layla Noor",status:"Active",reference:"ENB/PDF/2025/118",notes:"Construction-linked drawdowns against certified progress."},
{id:"FAC-2026-002",name:"Green Park Construction Loan",lender:"Gulf Commercial Bank",projects:[{project:"Green Park",share:100}],amount:55_000_000,currency:"AED",start:"01 Mar 2025",end:"28 Feb 2027",owner:"Layla Noor",status:"Active",reference:"GCB/CL/0442",notes:"Interest at EIBOR + 2.75%."},
{id:"FAC-2026-003",name:"Corporate Revolving Facility",lender:"Abu Dhabi Trade Bank",projects:[{project:"Horizon Residences",share:40},{project:"Green Park",share:35},{project:"Creek Vista",share:25}],amount:40_000_000,currency:"AED",start:"01 Jul 2025",end:"",owner:"Omar Haddad",status:"Under Review",reference:"ADTB/RCF/77",notes:"General borrowing — allocation per configured policy."},
{id:"FAC-2026-004",name:"Creek Vista Land Bridge",lender:"Emirates National Bank",projects:[{project:"Creek Vista",share:100}],amount:25_000_000,currency:"AED",start:"10 Feb 2026",end:"",owner:"Omar Haddad",status:"On Hold",reference:"ENB/BR/2026/09",notes:"Development activity paused — capitalization suspended pending Finance review."},
];

export type FinanceCost={id:string;facility:string;project:string;period:string;type:string;source:string;sourceRef:string;amount:number;capitalized:number;expensed:number;status:string;policy:string;journal:string;gl:string;preparedBy:string};
export const financeCosts:FinanceCost[]=[
{id:"BC-2026-0091",facility:"FAC-2026-001",project:"Horizon Residences",period:"Sep 2026",type:"Interest",source:"Lender notice",sourceRef:"ENB-INT-0926",amount:412_000,capitalized:0,expensed:0,status:"Pending Approval",policy:"POL-BC-001 v2",journal:"—",gl:"Not posted",preparedBy:"Maya Joseph"},
{id:"BC-2026-0090",facility:"FAC-2026-002",project:"Green Park",period:"Sep 2026",type:"Interest",source:"Bank statement",sourceRef:"GCB-STM-0926",amount:208_000,capitalized:0,expensed:0,status:"Under Review",policy:"POL-BC-001 v2",journal:"—",gl:"Not posted",preparedBy:"Maya Joseph"},
{id:"BC-2026-0089",facility:"FAC-2026-003",project:"Multiple (3)",period:"Sep 2026",type:"Commitment fee",source:"Lender notice",sourceRef:"ADTB-FEE-09",amount:46_000,capitalized:0,expensed:0,status:"Draft",policy:"POL-BC-002 v1",journal:"—",gl:"Not posted",preparedBy:"Omar Haddad"},
{id:"BC-2026-0084",facility:"FAC-2026-001",project:"Horizon Residences",period:"Aug 2026",type:"Interest",source:"Lender notice",sourceRef:"ENB-INT-0826",amount:398_000,capitalized:398_000,expensed:0,status:"Capitalized",policy:"POL-BC-001 v2",journal:"JE-2026-04312",gl:"Posted",preparedBy:"Maya Joseph"},
{id:"BC-2026-0083",facility:"FAC-2026-003",project:"Multiple (3)",period:"Aug 2026",type:"Interest",source:"Interest accrual",sourceRef:"ACR-0826-14",amount:182_000,capitalized:118_000,expensed:64_000,status:"Partially Capitalized",policy:"POL-BC-002 v1",journal:"JE-2026-04318",gl:"Posted",preparedBy:"Omar Haddad"},
{id:"BC-2026-0081",facility:"FAC-2026-004",project:"Creek Vista",period:"Aug 2026",type:"Interest",source:"Bank statement",sourceRef:"ENB-STM-0826",amount:96_000,capitalized:0,expensed:96_000,status:"Expensed",policy:"POL-BC-001 v2",journal:"JE-2026-04320",gl:"Posted",preparedBy:"Maya Joseph"},
{id:"BC-2026-0077",facility:"FAC-2026-002",project:"Green Park",period:"Jul 2026",type:"Arrangement fee",source:"Payables invoice",sourceRef:"AP-INV-22871",amount:275_000,capitalized:275_000,expensed:0,status:"Closed",policy:"POL-BC-001 v1",journal:"JE-2026-03988",gl:"Posted",preparedBy:"Maya Joseph"},
];

export const projectFinancing=[
{project:"Horizon Residences",facility:"FAC-2026-001",cost:3_800_000,cap:3_100_000,exp:700_000,pending:412_000,policy:"POL-BC-001 v2",status:"Active",units:124},
{project:"Green Park",facility:"FAC-2026-002",cost:2_900_000,cap:2_300_000,exp:600_000,pending:208_000,policy:"POL-BC-001 v2",status:"Partially Capitalized",units:98},
{project:"Creek Vista",facility:"FAC-2026-004",cost:1_700_000,cap:700_000,exp:1_000_000,pending:0,policy:"POL-BC-001 v2",status:"On Hold",units:41},
];
export const bcFor=(project:string)=>projectFinancing.find(p=>p.project===project);

export type BcPolicy={id:string;name:string;version:string;scope:string;effective:string;status:"Draft"|"Active"|"Archived";eligibility:string;start:string;suspension:string;end:string;rate:string;allocation:string;cap:string;exp:string};
export const bcPolicies:BcPolicy[]=[
{id:"POL-BC-001",name:"Specific project borrowing",version:"v2",scope:"Horizon Residences, Green Park, Creek Vista",effective:"01 Jan 2026",status:"Active",eligibility:"Finance assesses whether the project is a qualifying asset",start:"Date set by Finance per project",suspension:"Finance-flagged inactive development periods",end:"Date set by Finance per project",rate:"Actual facility cost less investment income",allocation:"Saleable area (sq ft)",cap:"1720 Capitalized borrowing cost (WIP)",exp:"7110 Finance cost"},
{id:"POL-BC-001",name:"Specific project borrowing",version:"v1",scope:"Horizon Residences, Green Park",effective:"01 Jan 2025",status:"Archived",eligibility:"Finance assessment",start:"Set per project",suspension:"Finance-flagged",end:"Set per project",rate:"Actual facility cost",allocation:"Unit sales value",cap:"1720",exp:"7110"},
{id:"POL-BC-002",name:"General borrowing pool",version:"v1",scope:"Corporate facilities",effective:"01 Jul 2025",status:"Active",eligibility:"Finance assessment per period",start:"Set per project",suspension:"Finance-flagged",end:"Set per project",rate:"Weighted average rate configured by Finance",allocation:"Construction cost share",cap:"1720",exp:"7110"},
];

export const unitAllocations=[
["A-1204","Tower A","2 BR","1,280 sq ft","0.62%","AED 19,220","Handed over","Original snapshot kept"],
["A-1506","Tower A","3 BR","1,940 sq ft","0.94%","AED 29,140","Sold","—"],
["B-0802","Tower B","1 BR","820 sq ft","0.40%","AED 12,400","Sold","—"],
["B-1101","Tower B","2 BR","1,310 sq ft","0.63%","AED 19,530","Handed over","Adjusted version v2"],
["C-TH-04","Block C","Townhouse","2,860 sq ft","1.38%","AED 42,780","Available","Held in inventory"],
];
export const bcAudit=[
["25 Sep · 10:41 AM","Maya Joseph","BC-2026-0091","Submitted for capitalization approval","Under Review","Pending Approval"],
["24 Sep · 4:12 PM","Layla Noor","POL-BC-001","Policy v2 approved","Draft","Active"],
["02 Sep · 9:20 AM","Omar Haddad","BC-2026-0083","Split approved 65% capitalized / 35% expensed","Pending Approval","Partially Capitalized"],
["01 Sep · 6:05 PM","System","JE-2026-04312","Journal posted from BC-2026-0084","Not posted","Posted"],
["28 Aug · 2:30 PM","Layla Noor","FAC-2026-004","Capitalization suspended — development paused","Active","On Hold"],
];
export const bcReports=[
["Borrowing cost summary","Total, capitalized, expensed and pending by period"],
["Project borrowing cost report","Finance cost by project, facility and policy"],
["Capitalization report","Capitalized amounts, decisions, approvers and journals"],
["Expensed finance cost report","Non-capitalized finance cost posted to P&L"],
["Facility report","Facilities, lenders, amounts and project linkage"],
["Unit allocation report","Allocated borrowing cost per unit and basis"],
["Project cost impact report","Capitalized borrowing cost added to project cost"],
];
