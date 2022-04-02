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
import { deleteDto } from 'src/typeorm/dtos/deleteDto.dto';

@Controller('department')
export class DepartmentController {
  constructor(
    @Inject('DEPARTMENT_SERVICE')
    private readonly departmentService: DepartmentService,
  ) { }

  @UseGuards(JwtAuthGuard)
  @Get('/:companyId/:viewBy/:searchText')
  async get(
    @Param('companyId', ParseIntPipe) companyId: number,
    @Param('viewBy') viewBy: string,
    @Param('searchText') searchText: string,) {
    return this.departmentService.getDepartmentAll({ companyId, viewBy, searchText });
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:companyId')
  getDepartmentByCompanyId(@Param('companyId', ParseIntPipe) id: number) {
    return this.departmentService.getDepartmentByCompanyId(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:id/:companyId')
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
  // @UsePipes(ValidationPipe)
  deleteEmp(@Body() deleteDepartment: deleteDto) {
    return this.departmentService.delete(deleteDepartment);
  }
}
