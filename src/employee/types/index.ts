export interface employee {
  EmpID: number;
  Image: Buffer;
  EmpCode: string;
  Title: number;
  FirstName: string;
  LastName: string;
  NickName: string;
  FirstNameEng: string;
  LastNameEng: string;
  NickNameEng: string;
  Gender: number;
  BirthDate: Date;
  Religion: number;
  Nationality: number;
  IdentificationNo: string;
  IdentityExpire: Date;
  PassportNo: string;
  PassportExpire: Date;
  MaritalStatus: number;
  IsOver65: boolean;
  MaritalDate: Date;
  MilitaryStatus: number;
  ExemptReason: string;
  OrgID: number;
  CompanyID: number;
  CreatedBy: number;
  CreatedDate: Date;
  ModifiedBy: number;
  ModifiedDate: Date;
  IsDeleted: boolean;
}

export interface address {
  EmpAddressID: number;
  EmpID: number;
  AddressType: string;
  AddressDetail: string;
  District: string;
  Amphur: string;
  Province: string;
  PostalCode: string;
  Country: string;
  Phone: string;
  Email: string;
  Latitude: number;
  Longitude: number;
  CompanyID: number;
  CreatedBy: number;
  CreatedDate: Date;
  ModifiedBy: number;
  ModifiedDate: Date;
  IsDeleted: boolean;
}
