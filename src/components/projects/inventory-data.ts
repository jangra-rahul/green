export type InventoryStatus = "Available" | "On Hold" | "Blocked" | "Reserved" | "Sold";

export type InventoryProject = {
  id: string; name: string; code: string; location: string; developer: string;
  launchDate: string; completion: string; status: string; buildings: number;
  floors: number; units: number; available: number; reserved: number; sold: number;
  onHold: number; blocked: number; salesValue: string; inventoryValue: string;
};

export type InventoryUnit = {
  id: string; number: string; projectId: string; project: string; buildingId: string;
  building: string; floor: number; propertyType: string; subtype: string; bedrooms: number;
  bathrooms: number; size: number; balcony: boolean; balconyArea: number; parking: number;
  view: string; orientation: string; furnishing: string; basePrice: number;
  approvedPrice: number; paymentPlan: string; eligiblePlans: string[]; status: InventoryStatus;
  customer?: string; customerId?: string; salesperson?: string; broker?: string;
  reservationRef?: string; activeEoi?: string; activeOffer?: string; lastUpdated: string;
};

export const projects: InventoryProject[] = [
  {id:"PRJ-001",name:"Horizon Residences",code:"HR-DXB",location:"Dubai",developer:"Green Horizon Developments",launchDate:"15 Jan 2025",completion:"Q4 2027",status:"Active sales",buildings:2,floors:36,units:180,available:62,reserved:28,sold:82,onHold:8,blocked:0,salesValue:"AED 96.4M",inventoryValue:"AED 148.6M"},
  {id:"PRJ-002",name:"Green Park",code:"GP-DXB",location:"Dubai",developer:"Green Horizon Developments",launchDate:"08 Mar 2025",completion:"Q2 2028",status:"Active sales",buildings:3,floors:42,units:140,available:48,reserved:21,sold:65,onHold:6,blocked:0,salesValue:"AED 72.8M",inventoryValue:"AED 112.4M"},
  {id:"PRJ-003",name:"Creek Vista",code:"CV-DXB",location:"Dubai Creek Harbour",developer:"Green Horizon Developments",launchDate:"12 Jun 2026",completion:"Q1 2029",status:"Pre-launch",buildings:2,floors:30,units:96,available:42,reserved:9,sold:39,onHold:6,blocked:0,salesValue:"AED 48.1M",inventoryValue:"AED 86.2M"},
  {id:"PRJ-004",name:"Palm Court",code:"PC-DXB",location:"Dubai Hills",developer:"Green Horizon Developments",launchDate:"03 Sep 2024",completion:"Q3 2026",status:"Near completion",buildings:2,floors:18,units:64,available:28,reserved:6,sold:26,onHold:4,blocked:0,salesValue:"AED 31.6M",inventoryValue:"AED 55.8M"},
];

export const buildings = [
  {id:"BLD-A",projectId:"PRJ-001",name:"Tower A",code:"HR-A",floors:20,units:100,available:36,reserved:18,sold:42,onHold:4},
  {id:"BLD-B",projectId:"PRJ-001",name:"Tower B",code:"HR-B",floors:16,units:80,available:26,reserved:10,sold:40,onHold:4},
  {id:"BLD-1",projectId:"PRJ-002",name:"Building 1",code:"GP-1",floors:14,units:48,available:18,reserved:8,sold:20,onHold:2},
  {id:"BLD-2",projectId:"PRJ-002",name:"Building 2",code:"GP-2",floors:14,units:48,available:16,reserved:7,sold:23,onHold:2},
  {id:"BLD-3",projectId:"PRJ-002",name:"Building 3",code:"GP-3",floors:14,units:44,available:14,reserved:6,sold:22,onHold:2},
];

const seedUnits: InventoryUnit[] = [
  {id:"UNT-HR-A-1204",number:"A-1204",projectId:"PRJ-001",project:"Horizon Residences",buildingId:"BLD-A",building:"Tower A",floor:12,propertyType:"Apartment",subtype:"2 Bedroom",bedrooms:2,bathrooms:2,size:1184,balcony:true,balconyArea:96,parking:1,view:"Community / Pool",orientation:"North",furnishing:"Unfurnished",basePrice:1250000,approvedPrice:1225000,paymentPlan:"Standard 20 / 40 / 40",eligiblePlans:["Standard 20 / 40 / 40","Investor 30 / 30 / 40","Quick Pay 40 / 30 / 30"],status:"Available",activeEoi:"EOI-2026-00184",activeOffer:"SO-2026-00482",lastUpdated:"24 Sep 2026 · 2:30 PM"},
  {id:"UNT-HR-A-1402",number:"A-1402",projectId:"PRJ-001",project:"Horizon Residences",buildingId:"BLD-A",building:"Tower A",floor:14,propertyType:"Apartment",subtype:"2 Bedroom",bedrooms:2,bathrooms:2,size:1210,balcony:true,balconyArea:102,parking:1,view:"Skyline",orientation:"East",furnishing:"Unfurnished",basePrice:1420000,approvedPrice:1420000,paymentPlan:"Standard 20 / 40 / 40",eligiblePlans:["Standard 20 / 40 / 40","Investor 30 / 30 / 40"],status:"Available",activeEoi:"EOI-2026-00179",lastUpdated:"24 Sep 2026 · 1:48 PM"},
  {id:"UNT-GP-B-0806",number:"B-0806",projectId:"PRJ-002",project:"Green Park",buildingId:"BLD-2",building:"Building 2",floor:8,propertyType:"Apartment",subtype:"1 Bedroom",bedrooms:1,bathrooms:2,size:812,balcony:true,balconyArea:64,parking:1,view:"Park",orientation:"West",furnishing:"Unfurnished",basePrice:980000,approvedPrice:980000,paymentPlan:"Investor 30 / 30 / 40",eligiblePlans:["Standard 20 / 40 / 40","Investor 30 / 30 / 40"],status:"Reserved",customer:"Omar Khalid",customerId:"CU-2026-00481",salesperson:"Layla Noor",broker:"Ahmed Raza · Prime Gate Realty",reservationRef:"RSV-2026-00182",activeEoi:"EOI-2026-00183",activeOffer:"SO-2026-00481",lastUpdated:"24 Sep 2026 · 1:20 PM"},
  {id:"UNT-CV-C-1510",number:"C-1510",projectId:"PRJ-003",project:"Creek Vista",buildingId:"BLD-C",building:"Tower C",floor:15,propertyType:"Apartment",subtype:"3 Bedroom",bedrooms:3,bathrooms:4,size:1680,balcony:true,balconyArea:148,parking:2,view:"Creek",orientation:"North East",furnishing:"Unfurnished",basePrice:1860000,approvedPrice:1804000,paymentPlan:"Quick Pay 40 / 30 / 30",eligiblePlans:["Standard 20 / 40 / 40","Quick Pay 40 / 30 / 30"],status:"On Hold",customer:"Blue Crest Holdings LLC",customerId:"CU-2026-00472",salesperson:"Ahmed Malik",broker:"Layla Hassan · Urban Key Real Estate",activeEoi:"EOI-2026-00172",activeOffer:"SO-2026-00461",lastUpdated:"24 Sep 2026 · 11:00 AM"},
  {id:"UNT-HR-A-1201",number:"A-1201",projectId:"PRJ-001",project:"Horizon Residences",buildingId:"BLD-A",building:"Tower A",floor:12,propertyType:"Apartment",subtype:"1 Bedroom",bedrooms:1,bathrooms:2,size:790,balcony:true,balconyArea:58,parking:1,view:"Community",orientation:"South",furnishing:"Unfurnished",basePrice:890000,approvedPrice:890000,paymentPlan:"Standard 20 / 40 / 40",eligiblePlans:["Standard 20 / 40 / 40"],status:"Available",lastUpdated:"23 Sep 2026 · 4:12 PM"},
  {id:"UNT-HR-A-1202",number:"A-1202",projectId:"PRJ-001",project:"Horizon Residences",buildingId:"BLD-A",building:"Tower A",floor:12,propertyType:"Apartment",subtype:"2 Bedroom",bedrooms:2,bathrooms:2,size:1138,balcony:true,balconyArea:90,parking:1,view:"Pool",orientation:"West",furnishing:"Unfurnished",basePrice:1200000,approvedPrice:1200000,paymentPlan:"Standard 20 / 40 / 40",eligiblePlans:["Standard 20 / 40 / 40"],status:"Sold",customer:"Fatima Noor",customerId:"CU-2026-00458",salesperson:"Omar Khan",broker:"Hassan Ali · Elite Properties",reservationRef:"SPA-2026-00126",lastUpdated:"22 Sep 2026 · 3:42 PM"},
  {id:"UNT-HR-A-1203",number:"A-1203",projectId:"PRJ-001",project:"Horizon Residences",buildingId:"BLD-A",building:"Tower A",floor:12,propertyType:"Apartment",subtype:"2 Bedroom",bedrooms:2,bathrooms:3,size:1196,balcony:true,balconyArea:94,parking:1,view:"Pool",orientation:"West",furnishing:"Unfurnished",basePrice:1250000,approvedPrice:1250000,paymentPlan:"Standard 20 / 40 / 40",eligiblePlans:["Standard 20 / 40 / 40"],status:"Reserved",customer:"Sarah Ahmed",customerId:"CU-2026-00482",salesperson:"Omar Khan",reservationRef:"RSV-2026-00181",lastUpdated:"24 Sep 2026 · 10:18 AM"},
  {id:"UNT-HR-A-0903",number:"A-0903",projectId:"PRJ-001",project:"Horizon Residences",buildingId:"BLD-A",building:"Tower A",floor:9,propertyType:"Apartment",subtype:"Studio",bedrooms:0,bathrooms:1,size:528,balcony:false,balconyArea:0,parking:1,view:"Community",orientation:"South",furnishing:"Unfurnished",basePrice:685000,approvedPrice:675000,paymentPlan:"Quick Pay 40 / 30 / 30",eligiblePlans:["Standard 20 / 40 / 40","Quick Pay 40 / 30 / 30"],status:"Blocked",lastUpdated:"23 Sep 2026 · 9:05 AM"},
];

let unitState = seedUnits;
const listeners = new Set<() => void>();
export function getInventoryUnits(){ return unitState; }
export function getInventoryServerUnits(){ return seedUnits; }
export function subscribeInventory(listener:()=>void){ listeners.add(listener); return ()=>listeners.delete(listener); }
export function updateUnitStatus(id:string,status:InventoryStatus){ unitState=unitState.map(unit=>unit.id===id?{...unit,status,lastUpdated:"24 Sep 2026 · just now"}:unit); listeners.forEach(listener=>listener()); }
export function getUnit(id:string){ const unit=unitState.find(item=>item.id===id || item.number===id); if(unit)return unit; const fallback=unitState[0]; if(!fallback)throw new Error("Inventory unit not found"); return fallback; }
export function formatAed(value:number){ return `AED ${value.toLocaleString("en-AE")}`; }

export const priceHistory = [
  ["01 Sep 2026","AED 1,250,000","AED 1,225,000","−2%","Ahmed Malik","September campaign pricing"],
  ["15 Jun 2026","AED 1,250,000","AED 1,250,000","—","Nadia Rahman","Initial approved pricing"],
];
export const statusHistory = [
  ["24 Sep · 11:00 AM","Customer hold created","Sarah Ahmed","LD-2026-01248","On Hold","Omar Khan"],
  ["23 Sep · 4:18 PM","Hold released","Mohammed Al Farsi","LD-2026-01192","Available","Layla Noor"],
  ["22 Sep · 9:30 AM","Unit created","—","UNT-HR-A-1204","Available","Ahmed Malik"],
];