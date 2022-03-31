import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeeService } from 'src/employee/services/employee/employee.service';
import { tbDepartment, tbEmpAddress, tbEmployee, tbPosition, tbUser, tbEmpEmployment } from 'src/typeorm';
import { UsersService } from 'src/users/services/users/users.service';
import { AuthController } from './controllers/auth/auth.controller';
import { AuthService } from './services/auth/auth.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from './strategies/jwt.strategy';
import { jwtConstants } from 'src/utils/constants';
import { LocalStrategy } from './strategies/local.strategy';
import { PositionService } from 'src/position/services/position/position.service';
import { DepartmentService } from 'src/department/services/department/department.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([tbUser, tbEmployee, tbEmpAddress, tbPosition, tbDepartment, tbEmpEmployment]),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  // controllers: [AuthService],
  // providers: [AuthService, JwtStrategy, JwtAuthGuard],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtStrategy,
    LocalStrategy,
    {
      provide: 'AUTH_SERVICE',
      useClass: AuthService,
    },
    {
      provide: 'USER_SERVICE',
      useClass: UsersService,
    },
    {
      provide: 'EMPLOYEE_SERVICE',
      useClass: EmployeeService,
    },
    {
      provide: 'POSITION_SERVICE',
      useClass: PositionService,
    },
    {
      provide: 'DEPARTMENT_SERVICE',
      useClass: DepartmentService,
    },
  ],
  // providers: [
  //   {
  //     provide: 'AUTH_SERVICE',
  //     useClass: AuthService,
  //   },
  //   {
  //     provide: 'USER_SERVICE',
  //     useClass: UsersService,
  //   },

  //   LocalStrategy,
  //   SessionSerializer,
  // ],
})
export class AuthModule { }
