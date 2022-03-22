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
import { departmentDto } from 'src/department/dtos/department.dto';
import { DepartmentService } from 'src/department/services/department/department.service';

@Controller('department')
export class DepartmentController {
  constructor(
    @Inject('DEPARTMENT_SERVICE')
    private readonly departmentService: DepartmentService,
  ) {}

  //@UseGuards(AuthenticatedGuard)
  @Get('')
  getDepartmentAll() {
    return this.departmentService.getDepartmentAll();
  }

  //@UseGuards(AuthenticatedGuard)
  @Get('/:companyId')
  getDepartmentByCompanyId(@Param('companyId', ParseIntPipe) id: number) {
    return this.departmentService.getDepartmentByCompanyId(id);
  }

  //@UseGuards(AuthenticatedGuard)
  @Post('create')
  @UsePipes(ValidationPipe)
  createDepartment(@Body() createDepartment: departmentDto) {
    return this.departmentService.createDepartment(createDepartment);
  }

  //@UseGuards(AuthenticatedGuard)
  @Put('update')
  @UsePipes(ValidationPipe)
  updateDepartment(@Body() updateDepartment: departmentDto) {
    return this.departmentService.updateDepartment(updateDepartment);
  }

  //@UseGuards(AuthenticatedGuard)
  @Delete('delete')
  @UsePipes(ValidationPipe)
  deleteEmp(@Body() deleteDepartment: departmentDto) {
    return this.departmentService.delete(deleteDepartment);
  }
}
