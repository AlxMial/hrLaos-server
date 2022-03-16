import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomersModule } from './customers/customers.module';
import entities from './typeorm';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { PassportModule } from '@nestjs/passport';
import { PaymentsModule } from './payments/payments.module';
import { RegisterModule } from './register/register.module';
import { ConfigModule } from '@nestjs/config';
import { EmployeeModule } from './employee/employee.module';
import { OrganizationModule } from './organization/organization.module';
import { CompanyModule } from './company/company.module';

@Module({
  imports: [
    CustomersModule,
    UsersModule,
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
    OrganizationModule,
    CompanyModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
