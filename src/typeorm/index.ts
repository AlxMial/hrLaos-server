import { SessionEntity } from './Session';
import { tbUser } from './tbUser';
import { tbRegister } from './tbRegister';
import { tbOrg } from './tbOrg';
import { tbOrgAddress } from './tbOrgAddress';
import { tbEmployee } from './tbEmployee';
import { tbEmpAddress } from './tbEmpAddress';
import { tbCompany } from './tbCompany';
import { tbDepartment } from './tbDepartment';
import { tbPosition } from './tbPosition';
import { tbEmpEmployment } from './tbEmpEmployment';
import { tbEnum } from './tbEnum';
import { tbCompanyAddress } from './tbCompanyAddress';
import { tbCompanyHoliday } from './tbCompanyHoliday';
import { tbCompanyWorkingDay } from './tbCompanyWorkingDay';
import { tbShift } from './tbShift';
import { tbShiftDetail } from './tbShiftDetail';

const entities = [
  tbUser,
  SessionEntity,
  tbRegister,
  tbOrg,
  tbOrgAddress,
  tbEmployee,
  tbEmpAddress,
  tbEmpEmployment,
  tbCompany,
  tbDepartment,
  tbPosition,
  tbEnum,
  tbCompanyAddress,
  tbCompanyHoliday,
  tbCompanyWorkingDay,
  tbShift,
  tbShiftDetail
];

export { tbUser };
export { SessionEntity };
export { tbRegister };
export { tbOrg };
export { tbOrgAddress };
export { tbEmployee };
export { tbEmpAddress };
export { tbEmpEmployment };
export { tbCompany };
export { tbDepartment };
export { tbPosition };
export { tbEnum };
export { tbCompanyAddress };
export { tbCompanyHoliday };
export { tbCompanyWorkingDay };
export { tbShift };
export { tbShiftDetail };

export default entities;
