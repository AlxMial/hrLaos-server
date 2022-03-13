import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Inject,
  Post,
  Put,
  Res,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthenticatedGuard } from 'src/auth/utils/LocalGuard';
import { CreateOrg } from 'src/organization/dtos/CreateOrg.dto';
import { OrganizationService } from 'src/organization/service/organization/organization.service';
import { Request, Response } from 'express';
import { deleteDto } from 'src/typeorm/dtos/deleteDto.dto';

@Controller('organization')
export class OrganizationController {
  constructor(
    @Inject('ORGANIZATION_SERVICE')
    private readonly orgService: OrganizationService,
  ) {}

  @UseGuards(AuthenticatedGuard)
  @Get('')
  getUsers() {
    return this.orgService.getOrgAll();
  }

  @UseGuards(AuthenticatedGuard)
  @Post('create')
  @UsePipes(ValidationPipe)
  createOrg(@Body() createOrg: CreateOrg) {
    return this.orgService.createOrg(createOrg);
  }

  @UseGuards(AuthenticatedGuard)
  @Put('update')
  @UsePipes(ValidationPipe)
  updateOrg(@Body() updateOrg: CreateOrg) {
    return this.orgService.updateOrg(updateOrg);
  }

  @UseGuards(AuthenticatedGuard)
  @Delete('delete')
  @UsePipes(ValidationPipe)
  deleteOrg(@Body() data: deleteDto) {
    return this.orgService.deleteOrg(data);
  }
}
