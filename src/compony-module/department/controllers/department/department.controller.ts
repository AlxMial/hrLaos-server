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
import { departmentDto } from 'src/compony-module/department/dtos/department.dto';
import { DepartmentService } from 'src/compony-module/department/services/department/department.service';
import { deleteDto } from 'src/typeorm/dtos/deleteDto.dto';

@Controller('department')
export class DepartmentController {
  constructor(
    @Inject('DEPARTMENT_SERVICE')
    private readonly departmentService: DepartmentService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get('/getList/:companyId/:viewBy/:searchText')
  async getList(
    @Param('companyId', ParseIntPipe) companyId: number,
    @Param('viewBy') viewBy: string,
    @Param('searchText') searchText: string,) {
    return this.departmentService.getList({ companyId, viewBy, searchText });
  }

  @UseGuards(JwtAuthGuard)
  @Get('/getByCompanyId/:companyId')
  getByCompanyId(@Param('companyId', ParseIntPipe) id: number) {
    return this.departmentService.getByCompanyId(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/getById/:id/:companyId')
  getById(
    @Param('id', ParseIntPipe) id: number,
    @Param('companyId', ParseIntPipe) companyId: number,
  ) {
    return this.departmentService.getById(id, companyId);
  }

  @UseGuards(JwtAuthGuard)
  @Post('create')
  @UsePipes(ValidationPipe)
  create(@Body() createDepartment: departmentDto) {
    return this.departmentService.create(createDepartment);
  }

  @UseGuards(JwtAuthGuard)
  @Put('update')
  @UsePipes(ValidationPipe)
  update(@Body() updateDepartment: departmentDto) {
    return this.departmentService.update(updateDepartment);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('delete')
  // @UsePipes(ValidationPipe)
  delete(@Body() deleteDepartment: deleteDto) {
    return this.departmentService.delete(deleteDepartment);
  }
}
