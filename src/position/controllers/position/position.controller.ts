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
import { positionDto } from 'src/position/dtos/position.dto';
import { PositionService } from 'src/position/services/position/position.service';
import { deleteDto } from 'src/typeorm/dtos/deleteDto.dto';

@Controller('position')
export class PositionController {
  constructor(
    @Inject('POSITION_SERVICE')
    private readonly positionService: PositionService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get('/getList/:companyId/:viewBy/:searchText')
  async getList(
    @Param('companyId', ParseIntPipe) companyId: number,
    @Param('viewBy') viewBy: string,
    @Param('searchText') searchText: string,
  ) {
    return this.positionService.getList({ companyId, viewBy, searchText });
  }

  @UseGuards(JwtAuthGuard)
  @Get('/getByCompanyId/:companyId')
  getByCompanyId(@Param('companyId', ParseIntPipe) id: number) {
    return this.positionService.getByCompanyId(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/getById/:id/:companyId')
  getById(
    @Param('id', ParseIntPipe) id: number,
    @Param('companyId', ParseIntPipe) companyId: number,
  ) {
    return this.positionService.getById(id, companyId);
  }

  @UseGuards(JwtAuthGuard)
  @Post('create')
  @UsePipes(ValidationPipe)
  create(@Body() createPosition: positionDto) {
    return this.positionService.create(createPosition);
  }

  @UseGuards(JwtAuthGuard)
  @Put('update')
  @UsePipes(ValidationPipe)
  update(@Body() updatePosition: positionDto) {
    return this.positionService.update(updatePosition);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('delete')
  @UsePipes(ValidationPipe)
  delete(@Body() deletePosition: deleteDto) {
    return this.positionService.delete(deletePosition);
  }
}
