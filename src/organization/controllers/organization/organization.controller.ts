import {
  Body,
  Controller,
  Inject,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateOrg } from 'src/organization/dtos/CreateOrg.dto';
import { OrganizationService } from 'src/organization/service/organization/organization.service';

@Controller('organization')
export class OrganizationController {
  constructor(
    @Inject('ORGANIZATION_SERVICE')
    private readonly orgService: OrganizationService,
  ) {}

  @Post('create')
  @UsePipes(ValidationPipe)
  createOrg(@Body() createOrg: CreateOrg) {
    return this.orgService.createOrg(createOrg);
  }
}
