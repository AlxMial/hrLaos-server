import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import entities from './typeorm';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { PassportModule } from '@nestjs/passport';
import { PaymentsModule } from './payments/payments.module';
import { RegisterModule } from './register/register.module';
import { ConfigModule } from '@nestjs/config';
import { EmployeeModule } from './employee-module/employee/employee.module';
import { CompanyModule } from './compony-module/company/company.module';
import { PositionModule } from './compony-module/position/position.module';
import { DepartmentModule } from './compony-module/department/department.module';
import { ShiftModule } from './time-attendance-module/shift/shift.module';
import { LocationModule } from './time-attendance-module/location/location.module';
import { TSSettingModule } from './time-attendance-module/tsSetting/tsSetting.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mssql',
      host: `undefined.ddns.net\\sql2019`,
      port: 1433,
      username: 'sa',
      password: 'undefined@12345',
      database: 'hrLaos',
      entities,
      synchronize: false,
      options: { encrypt: false },
    }),
    AuthModule,
    PassportModule.register({
      session: true,
    }),
    PaymentsModule,
    RegisterModule,
    ConfigModule.forRoot({
      isGlobal: true, // no need to import into other modules
    }),
    EmployeeModule,
    UsersModule,
    // OrganizationModule,
    CompanyModule,
    PositionModule,
    DepartmentModule,
    ShiftModule,
    LocationModule,
    TSSettingModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
