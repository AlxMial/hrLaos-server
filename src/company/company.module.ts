import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { tbCompany } from 'src/typeorm/tbCompany';
import { CompanyController } from './controllers/company/company.controller';
import { CompanyService } from './services/company/company.service';

@Module({
  imports: [TypeOrmModule.forFeature([tbCompany])],
  controllers: [CompanyController],
  providers: [
    {
      provide: 'COMPANY_SERVICE',
      useClass: CompanyService,
    },
  ],
})
export class CompanyModule {}
