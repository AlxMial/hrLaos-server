export interface employee {
  id: number;
  image: string;
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
  subDistrict: string;
  district: string;
  province: string;
  postalCode: string;
  country: string;
  phone: string;
  email: string;
  latitude: number;
  longitude: number;
  createdBy: number;
  createdDate: Date;
  modifiedBy: number;
  modifiedDate: Date;
  isDeleted: boolean;
}
