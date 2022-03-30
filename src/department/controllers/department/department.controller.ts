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
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { departmentDto } from 'src/department/dtos/department.dto';
import { DepartmentService } from 'src/department/services/department/department.service';

@Controller('department')
export class DepartmentController {
  constructor(
    @Inject('DEPARTMENT_SERVICE')
    private readonly departmentService: DepartmentService,
  ) { }

  @UseGuards(JwtAuthGuard)
  @Get('')
  getDepartmentAll() {
    return this.departmentService.getDepartmentAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:companyId')
  getDepartmentByCompanyId(@Param('companyId', ParseIntPipe) id: number) {
    return this.departmentService.getDepartmentByCompanyId(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('getById/:id/:companyId')
  getById(
    @Param('id', ParseIntPipe) id: number,
    @Param('companyId', ParseIntPipe) companyId: number,
  ) {
    return this.departmentService.getDepartmentByEmpId(id, companyId);
  }

  @UseGuards(JwtAuthGuard)
  @Post('create')
  @UsePipes(ValidationPipe)
  createDepartment(@Body() createDepartment: departmentDto) {
    return this.departmentService.createDepartment(createDepartment);
  }

  @UseGuards(JwtAuthGuard)
  @Put('update')
  @UsePipes(ValidationPipe)
  updateDepartment(@Body() updateDepartment: departmentDto) {
    return this.departmentService.updateDepartment(updateDepartment);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('delete')
  @UsePipes(ValidationPipe)
  deleteEmp(@Body() deleteDepartment: departmentDto) {
    return this.departmentService.delete(deleteDepartment);
  }
}
