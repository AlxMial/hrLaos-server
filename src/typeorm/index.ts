import { SessionEntity } from './Session';
import { tbUser } from './tbUser';
import { tbRegister } from './tbRegister';
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
import { tbLocation } from './tbLocation';
import { tbSetTimeStamp } from './tbSetTimeStamp';
import { tbSetTimeStampDt } from './tbSetTimeStampDt';

const entities = [
  tbUser,
  SessionEntity,
  tbRegister,
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
  tbShiftDetail,
  tbLocation,
  tbSetTimeStamp,
  tbSetTimeStampDt
];

export { tbUser };
export { SessionEntity };
export { tbRegister };
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
export { tbLocation };
export { tbSetTimeStamp };
export { tbSetTimeStampDt };

export default entities;
