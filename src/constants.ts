import { Service, Tenant } from "@/types";

export const acpTenants: Tenant[] = [
  { id: "acp", name: "ACP", domain: "ddp.anarock.com" },
  { id: "acp-staging", name: "ACP Staging", domain: "staging.ddp.anarock.com" },
];

export const tenants: Tenant[] = [
  {
    id: "staging",
    name: "Staging",
    domain: "beta.staging.anarock.com",
    authToken: "acrm.status.auth",
  },
  {
    id: "anarock",
    name: "Anarock",
    domain: "anarock.com",
    authToken: "acrm.status.auth",
  },
  {
    id: "ddp",
    name: "DDP",
    domain: "ddp.anarock.com",
  },
  ...acpTenants,
];

export const acrmServices: Service[] = [
  // { id: "test", name: "TEST" },
  { id: "acl", name: "ACL" },
  { id: "calling", name: "Calling" },
  {
    id: "dashboard",
    name: "Dashboard",
    healthCheck: "/api/health-check",
  },
  {
    id: "data",
    name: "Data",
    apis: [
      //
      { id: "assignments", url: "v1/assignments" },
    ],
  },
  {
    id: "employee",
    name: "Employee",
    apis: [
      //
      { id: "auth", url: "v0/authenticate-token" },
    ],
  },
  { id: "forms", name: "Forms" },
  {
    id: "insightq",
    name: "Insight IQ",
    apis: [
      //
      { id: "assignments", url: "v0/assignments" },
    ],
  },
  {
    id: "lead",
    name: "Lead",
    apis: [
      //
      { id: "metadata", url: "v0/metadata" },
      { id: "sync", url: "v0/leads/sync" },
    ],
  },
  { id: "mail", name: "Mail" },
  { id: "meta", name: "Meta" },
  { id: "plutus", name: "Plutus" },
  {
    id: "registration",
    name: "Registration",
    healthCheck: "/api/health-check",
  },
  { id: "sms", name: "SMS" },
  { id: "triton", name: "Triton" },
];

export const acpServices: Service[] = [
  { id: "auth", name: "Auth", healthCheck: "/docs" },
  { id: "cp", name: "CP", healthCheck: "/docs" },
  { id: "projects", name: "Projects", healthCheck: "/docs" },
  { id: "ddp-crm", name: "CRM", healthCheck: "/docs" },
  { id: "masters", name: "Masters", healthCheck: "/docs" },
  { id: "marketing", name: "Marketing", healthCheck: "/docs" },
  { id: "cms", name: "Commission Management", healthCheck: "/docs" },
];
