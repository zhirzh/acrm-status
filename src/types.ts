export type Tenant = {
  id: string;
  name: string;
  domain: string;
  authToken?: string;
};

export type Service = {
  id: string;
  name: string;
  healthCheck?: string;
  apis?: ServiceApi[];
};

export type ServiceApi = {
  id: string;
  url: string;
};
