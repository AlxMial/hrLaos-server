export interface tbOrg {
  id: number;
  orgCode: string;
  orgName: string;
  orgNameEng: string;
  orgType: string;
  businessType: number;
  beginProgram: string;
  image: Buffer;
  taxNo: string;
  taxBranchNo: string;
  isFiscalYear: boolean;
  isCalLeaveFiscalYear: boolean;
  dateStartYear: Date;
  monthStartYear: number;
  yearCount: number;
  hourPerDay: string;
  dayPerMonth: string;
  companyId: number;
  createdBy: number;
  createdDate: Date;
  modifiedBy: number;
  modifiedDate: Date;
  isDeleted: boolean;
}

export interface tbOrgAddress {
  id: number;
  orgId: number;
  addressDetail: string;
  district: string;
  amphur: string;
  province: string;
  postalCode: string;
  country: string;
  phone: string;
  email: string;
  fax: string;
  website: string;
  latitude: number;
  longitude: number;
  companyId: number;
  createdBy: number;
  createdDate: Date;
  modifiedBy: number;
  modifiedDate: Date;
  isDeleted: boolean;
}
