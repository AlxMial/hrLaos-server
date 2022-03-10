export interface tbOrg {
  OrgID: number;
  OrgCode: string;
  OrgName: string;
  OrgNameEng: string;
  OrgType: string;
  BusinessType: number;
  BeginProgram: string;
  Image: Buffer;
  TaxNo: string;
  TaxBranchNo: string;
  IsFiscalYear: boolean;
  IsCalLeaveFiscalYear: boolean;
  DateStartYear: Date;
  MonthStartYear: number;
  YearCount: number;
  HourPerDay: string;
  DayPerMonth: string;
  CompanyID: number;
  CreatedBy: number;
  CreatedDate: Date;
  ModifiedBy: number;
  ModifiedDate: Date;
  IsDeleted: boolean;
}

export interface tbOrgAddress {
  OrgAddressID: number;
  OrgID: number;
  AddressDetail: string;
  District: string;
  Amphur: string;
  Province: string;
  PostalCode: string;
  Country: string;
  Phone: string;
  Email: string;
  Fax: string;
  Website: string;
  Latitude: number;
  Longitude: number;
  CompanyID: number;
  CreatedBy: number;
  CreatedDate: Date;
  ModifiedBy: number;
  ModifiedDate: Date;
  IsDeleted: boolean;
}
