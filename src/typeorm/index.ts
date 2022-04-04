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

export default entities;
