export interface employee {
  id: number;
  image: Buffer;
  empCode: string;
  title: number;
  firstName: string;
  lastName: string;
  nickName: string;
  titleEn: number;
  firstNameEng: string;
  lastNameEng: string;
  nickNameEng: string;
  gender: number;
  birthDate: Date;
  religion: number;
  nationality: number;
  identificationNo: string;
  identityExpire: Date;
  passportNo: string;
  passportExpire: Date;
  maritalStatus: number;
  isOver65: boolean;
  maritalDate: Date;
  militaryStatus: number;
  exemptReason: string;
  orgId: number;
  companyId: number;
  createdBy: number;
  createdDate: Date;
  modifiedBy: number;
  modifiedDate: Date;
  isDeleted: boolean;
}

export interface address {
  id: number;
  empId: number;
  addressType: string;
  addressDetail: string;
  district: string;
  amphur: string;
  province: string;
  postalCode: string;
  country: string;
  phone: string;
  email: string;
  latitude: number;
  longitude: number;
  companyId: number;
  createdBy: number;
  createdDate: Date;
  modifiedBy: number;
  modifiedDate: Date;
  isDeleted: boolean;
}
