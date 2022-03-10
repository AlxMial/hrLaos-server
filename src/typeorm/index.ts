import { SessionEntity } from './Session';
import { tbUser } from './tbUser';
import { tbRegister } from './tbRegister';
import { tbOrganization } from './tbOrganization';

const entities = [tbUser, SessionEntity, tbRegister, tbOrganization];

export { tbUser };

export { SessionEntity };

export { tbRegister };

export { tbOrganization };

export default entities;
