export type KycStatus="Not started"|"In progress"|"Missing documents"|"Pending verification"|"Verified"|"Pending approval"|"Approved"|"Rejected"|"Returned for correction";
export type DocumentStatus="Missing"|"Uploaded"|"Pending review"|"Verified"|"Rejected"|"Expired"|"Expiring soon";
export type KycRecord={id:string;customerId:string;customer:string;type:"Individual"|"Company";project:string;unit:string;salesperson:string;broker:string;status:KycStatus;documents:string;verification:string;approval:string;updated:string;missing:string[]};
export const kycRecords:KycRecord[]=[
{id:"KYC-2026-00482",customerId:"CU-2026-00482",customer:"Sarah Ahmed",type:"Individual",project:"Horizon Residences",unit:"A-1204",salesperson:"Omar Khan",broker:"Direct",status:"Pending verification",documents:"4 / 4",verification:"Pending",approval:"Not ready",updated:"Today",missing:[]},
{id:"KYC-2026-00472",customerId:"CU-2026-00472",customer:"Blue Crest Holdings LLC",type:"Company",project:"Green Park",unit:"B-0806",salesperson:"Ahmed Malik",broker:"Prime Gate Realty",status:"Missing documents",documents:"5 / 7",verification:"Pending",approval:"Not ready",updated:"Yesterday",missing:["Authorized signatory document","Emirates ID of signatory"]},
{id:"KYC-2026-00479",customerId:"CU-2026-00479",customer:"Aisha Rahman",type:"Individual",project:"Horizon Residences",unit:"A-1402",salesperson:"Layla Noor",broker:"Direct",status:"Pending approval",documents:"3 / 3",verification:"Verified",approval:"Pending approval",updated:"24 Sep",missing:[]},
{id:"KYC-2026-00465",customerId:"CU-2026-00465",customer:"Mohammed Al Farsi",type:"Individual",project:"Green Park",unit:"B-0806",salesperson:"Omar Khan",broker:"Hassan Ali · Elite Properties",status:"Approved",documents:"4 / 4",verification:"Verified",approval:"Approved",updated:"23 Sep",missing:[]},
];
export const individualDocuments=[
{name:"Passport",required:true,file:"Sarah-Ahmed-Passport.pdf",issue:"12 Feb 2023",expiry:"12 Feb 2028",status:"Verified" as DocumentStatus,uploaded:"Omar Khan · 22 Sep"},
{name:"Emirates ID",required:true,file:"Sarah-Ahmed-EID.pdf",issue:"22 Jun 2025",expiry:"22 Jun 2027",status:"Pending review" as DocumentStatus,uploaded:"Sarah Ahmed · 23 Sep"},
{name:"Proof of address",required:false,file:"Utility-Bill-Sep.pdf",issue:"01 Sep 2026",expiry:"—",status:"Uploaded" as DocumentStatus,uploaded:"Omar Khan · 23 Sep"},
];
export const companyDocuments=[
{name:"Trade License",required:true,file:"Blue-Crest-Trade-License.pdf",issue:"23 Nov 2024",expiry:"23 Nov 2026",status:"Expiring soon" as DocumentStatus,uploaded:"Daniel Thomas · 12 Sep"},
{name:"MOA / AOA",required:true,file:"Blue-Crest-MOA-AOA.pdf",issue:"10 Mar 2020",expiry:"—",status:"Pending review" as DocumentStatus,uploaded:"Ahmed Malik · 12 Sep"},
{name:"Authorized signatory document",required:true,file:"—",issue:"—",expiry:"—",status:"Missing" as DocumentStatus,uploaded:"—"},
{name:"Passport of authorized signatory",required:true,file:"Daniel-Thomas-Passport.pdf",issue:"04 Apr 2022",expiry:"04 Apr 2027",status:"Verified" as DocumentStatus,uploaded:"Daniel Thomas · 14 Sep"},
{name:"Emirates ID of signatory",required:true,file:"—",issue:"—",expiry:"—",status:"Missing" as DocumentStatus,uploaded:"—"},
];
export const kycAudit=[["24 Sep · 11:20 AM","Compliance Team","Verification status","Pending","Verified","Passport verified; Emirates ID under review"],["23 Sep · 4:10 PM","Sarah Ahmed","Document uploaded","Missing","Emirates-ID.pdf","Customer upload"],["22 Sep · 3:20 PM","Omar Khan","Document uploaded","—","Passport.pdf","Identity collection"],["22 Sep · 2:45 PM","Omar Khan","KYC created","—","Pending verification","From customer CU-2026-00482"]];
