interface IIdentity {
  providerId: string;
  fullName: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
}

export interface ISessionObject {
  id: string;
  url: number;
  identity: IIdentity;
  scope: string;
}
