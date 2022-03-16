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

@Controller('employee')
export class EmployeeController {
  constructor(
    @Inject('EMPLOYEE_SERVICE')
    private readonly employeeService: EmployeeService,
  ) {}

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

  // @UseGuards(AuthenticatedGuard)
  @Post('create')
  @UsePipes(ValidationPipe)
  createEmp(@Body() createEmp: CreateEmployee) {
    return this.employeeService.createEmp(createEmp);
  }

  @UseGuards(AuthenticatedGuard)
  @Put('update')
  @UsePipes(ValidationPipe)
  updateEmp(@Body() createEmp: CreateEmployee) {
    return this.employeeService.updateEmp(createEmp);
  }

  @UseGuards(AuthenticatedGuard)
  @Delete('delete')
  @UsePipes(ValidationPipe)
  deleteEmp(@Body() createEmp: CreateEmployee) {
    return this.employeeService.deleteEmp(createEmp);
  }
}
