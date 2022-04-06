import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  ParseArrayPipe,
  ParseIntPipe,
  Post,
  Put,
  Req,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
// import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
// import { AuthenticatedGuard } from 'src/auth/utils/LocalGuard';
import { CreateEmpAddress } from 'src/employee-module/employee/dtos/CreateEmpAddress.dto';
import { CreateEmployee } from 'src/employee-module/employee/dtos/CreateEmployee.dto';
import { EmployeeService } from 'src/employee-module/employee/services/employee/employee.service';
import { deleteDto } from 'src/typeorm/dtos/deleteDto.dto';

@Controller('employee')
export class EmployeeController {
  constructor(
    @Inject('EMPLOYEE_SERVICE')
    private readonly employeeService: EmployeeService, // private jwtService: JwtService,
  ) { }

  @UseGuards(JwtAuthGuard)
  @Get('getList/:companyId/:viewBy/:searchText')
  async get(
    @Param('companyId', ParseIntPipe) companyId: number,
    @Param('viewBy') viewBy: string,
    @Param('searchText') searchText: string,) {
    return this.employeeService.getList({ companyId, viewBy, searchText });
  }

  @UseGuards(JwtAuthGuard)
  @Get('getByCompanyId/:companyId')
  getByCompanyId(@Param('companyId', ParseIntPipe) id: number) {
    return this.employeeService.getByCompanyId(id);
  }

  @Get('getEnum/:type')
  async getEnum(@Param('type', ParseArrayPipe) type: string[]) {
    return this.employeeService.getEnum(type);
  }


  @UseGuards(JwtAuthGuard)
  @Get('getById/:id/:companyId')
  getById(
    @Param('id', ParseIntPipe) id: number,
    @Param('companyId', ParseIntPipe) companyId: number) {
    return this.employeeService.getById(id, companyId);
  }

  @UseGuards(JwtAuthGuard)
  @Post('create')
  @UsePipes(ValidationPipe)
  create(@Body() createEmp: CreateEmployee) {
    return this.employeeService.create(createEmp);
  }

  @UseGuards(JwtAuthGuard)
  @Put('update')
  @UsePipes(ValidationPipe)
  update(@Body() updateEmp: CreateEmployee) {
    return this.employeeService.update(updateEmp);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('delete')
  async delete(@Body() deleteEmp: deleteDto) {
    const del = await this.employeeService.delete(deleteEmp);
    return del;
  }
}
