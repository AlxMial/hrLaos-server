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
import { CreateEmpAddress } from 'src/employee/dtos/CreateEmpAddress.dto';
import { CreateEmployee } from 'src/employee/dtos/CreateEmployee.dto';
import { EmployeeService } from 'src/employee/services/employee/employee.service';
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
    return this.employeeService.getEmployeeByCompanyId(id);
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
    return this.employeeService.getEmployeeByEmpId(id, companyId);
  }

  @UseGuards(JwtAuthGuard)
  @Post('create')
  @UsePipes(ValidationPipe)
  createEmp(@Body() createEmp: CreateEmployee) {
    return this.employeeService.createEmp(createEmp);
  }

  @UseGuards(JwtAuthGuard)
  @Put('update')
  @UsePipes(ValidationPipe)
  updateEmp(@Body() updateEmp: CreateEmployee) {
    return this.employeeService.updateEmp(updateEmp);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('delete')
  async deleteEmp(@Body() deleteEmp: deleteDto) {
    const del = await this.employeeService.CheckEmp(deleteEmp);
    return del;
  }
}
