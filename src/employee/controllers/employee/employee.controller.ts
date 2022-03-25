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
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthenticatedGuard } from 'src/auth/utils/LocalGuard';
import { CreateEmpAddress } from 'src/employee/dtos/CreateEmpAddress.dto';
import { CreateEmployee } from 'src/employee/dtos/CreateEmployee.dto';
import { EmployeeService } from 'src/employee/services/employee/employee.service';
import { deleteDto } from 'src/typeorm/dtos/deleteDto.dto';

@Controller('employee')
export class EmployeeController {
  constructor(
    @Inject('EMPLOYEE_SERVICE')
    private readonly employeeService: EmployeeService,
  ) { }

  //@UseGuards(AuthenticatedGuard)
  @Get('')
  getUsers() {
    return this.employeeService.getEmployeeAll();
  }

  //@UseGuards(AuthenticatedGuard)
  @Get('/:companyId')
  getUsersByCompanyId(@Param('companyId', ParseIntPipe) id: number) {
    return this.employeeService.getEmployeeByCompanyId(id);
  }

  //@UseGuards(AuthenticatedGuard)
  @Get('getById/:empId/:companyId')
  getById(
    @Param('empId', ParseIntPipe) id: number,
    @Param('companyId', ParseIntPipe) companyId: number) {
    return this.employeeService.getEmployeeByEmpId(id, companyId);
  }

  // @UseGuards(AuthenticatedGuard)
  @Post('create')
  @UsePipes(ValidationPipe)
  createEmp(@Body() createEmp: CreateEmployee) {
    return this.employeeService.createEmp(createEmp);
  }

  //@UseGuards(AuthenticatedGuard)
  @Put('update')
  @UsePipes(ValidationPipe)
  updateEmp(@Body() updateEmp: CreateEmployee) {
    return this.employeeService.updateEmp(updateEmp);
  }

  //@UseGuards(AuthenticatedGuard)
  @Delete('delete')
  async deleteEmp(@Body() deleteEmp: deleteDto) {
    const del = await this.employeeService.CheckEmp(deleteEmp);
    return del;
  }
}
