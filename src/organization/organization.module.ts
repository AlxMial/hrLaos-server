import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrganizationController } from './controllers/organization/organization.controller';
import { OrganizationService } from './service/organization/organization.service';
import { tbOrg, tbOrgAddress } from 'src/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([tbOrg, tbOrgAddress])],
  controllers: [OrganizationController],
  providers: [
    {
      provide: 'ORGANIZATION_SERVICE',
      useClass: OrganizationService,
    },
  ],
})
export class OrganizationModule {}
