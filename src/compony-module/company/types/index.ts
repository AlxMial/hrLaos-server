export interface Company {
  id: number;
  companyCode: string;
  companyName: string;
  companyNameEn: string;
  companyType: string;
  businessType: string;
  programStartDate: Date;
  image: string;
  taxNo: string;
  taxBranchNo: string;
  registerId: number;
  createdBy: number;
  createdDate: Date;
  modifiedBy: number;
  modifiedDate: Date;
  isDeleted: boolean;
}
