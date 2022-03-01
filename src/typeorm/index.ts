import { SessionEntity } from './Session';
import { tbUser } from './tbUser';
import { tbRegister } from './tbRegister';

const entities = [tbUser, SessionEntity, tbRegister];

export { tbUser };

export { SessionEntity };

export { tbRegister };

export default entities;
