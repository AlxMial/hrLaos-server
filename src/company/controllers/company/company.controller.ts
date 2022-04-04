import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthenticatedGuard } from 'src/auth/utils/LocalGuard';
import { CreateCompany } from 'src/company/dtos/CreateCompany.dto';
import { CompanyService } from 'src/company/services/company/company.service';
import { deleteDto } from 'src/typeorm/dtos/deleteDto.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('company')
export class CompanyController {
  constructor(
    @Inject('COMPANY_SERVICE')
    private readonly companyService: CompanyService,
  ) { }

  @UseGuards(JwtAuthGuard)
  @Get('/getList/:companyId/:viewBy/:searchText')
  async get(
    @Param('companyId', ParseIntPipe) companyId: number,
    @Param('viewBy') viewBy: string,
    @Param('searchText') searchText: string,) {
    return this.companyService.getList({ companyId, viewBy, searchText });
  }

  @UseGuards(JwtAuthGuard)
  @Get('/getById/:id/:companyId')
  getById(
    @Param('id', ParseIntPipe) id: number,
    @Param('companyId', ParseIntPipe) companyId: number,
  ) {
    return this.companyService.getById(id, companyId);
  }

  @UseGuards(JwtAuthGuard)
  @Post('create')
  @UsePipes(ValidationPipe)
  createOrg(@Body() createOrg: CreateCompany) {
    return this.companyService.createCompany(createOrg);
  }

  @UseGuards(JwtAuthGuard)
  @Put('update')
  @UsePipes(ValidationPipe)
  updateOrg(@Body() updateCompany: CreateCompany) {
    return this.companyService.updateCompany(updateCompany);
  }

  @Delete('delete')
  @UsePipes(ValidationPipe)
  deleteOrg(@Body() data: deleteDto) {
    return this.companyService.deleteCompany(data);
  }
}
