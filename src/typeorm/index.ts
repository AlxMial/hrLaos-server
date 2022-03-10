import { SessionEntity } from './Session';
import { tbUser } from './tbUser';
import { tbRegister } from './tbRegister';
import { tbOrg } from './tbOrg';
import { tbOrgAddress } from './tbOrgAddress';
import { tbEmployee } from './tbEmployee';
import { tbEmpAddress } from './tbEmpAddress';

const entities = [
  tbUser,
  SessionEntity,
  tbRegister,
  tbOrg,
  tbOrgAddress,
  tbEmployee,
  tbEmpAddress,
];

export { tbUser };

export { SessionEntity };

export { tbRegister };

export { tbOrg };

export { tbOrgAddress };

export { tbEmployee };

export { tbEmpAddress };

export default entities;
