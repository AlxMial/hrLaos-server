import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthenticatedGuard } from 'src/auth/utils/LocalGuard';
import { CreateEmpAddress } from 'src/employee/dtos/CreateEmpAddress.dto';
import { CreateEmployee } from 'src/employee/dtos/CreateEmployee.dto';
import { EmployeeService } from 'src/employee/services/employee/employee.service';

@Controller('employee')
export class EmployeeController {
  constructor(
    @Inject('EMPLOYEE_SERVICE')
    private readonly employeeService: EmployeeService,
  ) {}

  @UseGuards(AuthenticatedGuard)
  @Get('')
  getUsers() {
    return this.employeeService.getEmployeeAll();
  }

  @UseGuards(AuthenticatedGuard)
  @Get('/:companyId')
  getUsersByCompanyId(@Param('companyId', ParseIntPipe) id: number) {
    return this.employeeService.getEmployeeByCompanyId(id);
  }

  @Post('create')
  @UsePipes(ValidationPipe)
  createOrg(@Body() createEmp: CreateEmployee) {
    return this.employeeService.createEmp(createEmp);
  }
}
