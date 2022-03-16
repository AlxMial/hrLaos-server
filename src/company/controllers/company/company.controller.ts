import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Post,
  Put,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthenticatedGuard } from 'src/auth/utils/LocalGuard';
import { CreateCompany } from 'src/company/dtos/CreateCompany.dto';
import { CompanyService } from 'src/company/services/company/company.service';

@Controller('company')
export class CompanyController {
  constructor(
    @Inject('COMPANY_SERVICE')
    private readonly companyService: CompanyService,
  ) {}

  @UseGuards(AuthenticatedGuard)
  @Get('')
  getUsers() {
    return this.companyService.getOrgAll();
  }

  @UseGuards(AuthenticatedGuard)
  @Post('create')
  @UsePipes(ValidationPipe)
  createOrg(@Body() createOrg: CreateCompany) {
    return this.companyService.createCompany(createOrg);
  }

  @UseGuards(AuthenticatedGuard)
  @Put('update')
  @UsePipes(ValidationPipe)
  updateOrg(@Body() updateCompany: CreateCompany) {
    return this.companyService.updateCompany(updateCompany);
  }

  @Delete('delete')
  @UsePipes(ValidationPipe)
  deleteOrg(@Body() data: CreateCompany) {
    return this.companyService.deleteCompany(data);
  }
}
