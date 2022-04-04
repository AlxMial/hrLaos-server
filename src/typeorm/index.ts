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

export default entities;
