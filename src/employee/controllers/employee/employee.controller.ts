import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
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

  //@UseGuards(AuthenticatedGuard)
  @UseGuards(JwtAuthGuard)
  @Get('')
  async get(@Req() request: Request) {
    // const cookie = request.cookies['jwt'];
    // const data = await this.jwtService.verifyAsync(cookie);
    return this.employeeService.getEmployeeAll();
  }

  // @UseGuards(AuthenticatedGuard)
  @UseGuards(JwtAuthGuard)
  @Get('/:companyId')
  getByCompanyId(@Param('companyId', ParseIntPipe) id: number) {
    return this.employeeService.getEmployeeByCompanyId(id);
  }

  // @UseGuards(AuthenticatedGuard)
  @UseGuards(JwtAuthGuard)
  @Get('getById/:empId/:companyId')
  getById(
    @Param('empId', ParseIntPipe) id: number,
    @Param('companyId', ParseIntPipe) companyId: number,
  ) {
    return this.employeeService.getEmployeeByEmpId(id, companyId);
  }

  // @UseGuards(AuthenticatedGuard)
  @UseGuards(JwtAuthGuard)
  @Post('create')
  @UsePipes(ValidationPipe)
  createEmp(@Body() createEmp: CreateEmployee) {
    return this.employeeService.createEmp(createEmp);
  }

  // @UseGuards(AuthenticatedGuard)
  @UseGuards(JwtAuthGuard)
  @Put('update')
  @UsePipes(ValidationPipe)
  updateEmp(@Body() updateEmp: CreateEmployee) {
    return this.employeeService.updateEmp(updateEmp);
  }

  // @UseGuards(AuthenticatedGuard)
  @UseGuards(JwtAuthGuard)
  @Delete('delete')
  async deleteEmp(@Body() deleteEmp: deleteDto) {
    const del = await this.employeeService.CheckEmp(deleteEmp);
    return del;
  }
}
