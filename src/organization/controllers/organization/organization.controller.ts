import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Inject,
  Post,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthenticatedGuard } from 'src/auth/utils/LocalGuard';
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

  @UseGuards(AuthenticatedGuard)
  @Get('')
  getUsers() {
    return this.orgService.getOrgAll();
  }
}
