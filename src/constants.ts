import { Service, Tenant } from "./types";

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
  { id: "tech", name: "Tech", domain: "anarock.tech" },
  { id: "kw", name: "KW", domain: "kwgroup.net" },
  { id: "acp", name: "ACP", domain: "ddp.anarock.com" },
];

export const services: Service[] = [
  // { id: "test", name: "TEST" },
  { id: "acl", name: "ACL" },
  { id: "calling", name: "Calling" },
  { id: "dashboard", name: "Dashboard" },
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
  { id: "registration", name: "Registration" },
  { id: "sms", name: "SMS" },
  { id: "triton", name: "Triton" },
];
