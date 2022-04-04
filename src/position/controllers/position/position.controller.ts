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
    ) { }

    @UseGuards(JwtAuthGuard)
    @Get('/getList/:companyId/:viewBy/:searchText')
    async get(
        @Param('companyId', ParseIntPipe) companyId: number,
        @Param('viewBy') viewBy: string,
        @Param('searchText') searchText: string,) {
        return this.positionService.getPositionAll({ companyId, viewBy, searchText });
    }

    @UseGuards(JwtAuthGuard)
    @Get('/getByCompanyId/:companyId')
    getPositionByCompanyId(@Param('companyId', ParseIntPipe) id: number) {
        return this.positionService.getPositionByCompanyId(id);
    }

    @UseGuards(JwtAuthGuard)
    @Get('/getById/:id/:companyId')
    getById(
        @Param('id', ParseIntPipe) id: number,
        @Param('companyId', ParseIntPipe) companyId: number,
    ) {
        return this.positionService.getPositionByEmpId(id, companyId);
    }

    @UseGuards(JwtAuthGuard)
    @Post('create')
    @UsePipes(ValidationPipe)
    createPosition(@Body() createPosition: positionDto) {
        return this.positionService.createPosition(createPosition);
    }

    @UseGuards(JwtAuthGuard)
    @Put('update')
    @UsePipes(ValidationPipe)
    updatePosition(@Body() updatePosition: positionDto) {
        return this.positionService.updatePosition(updatePosition);
    }

    @UseGuards(JwtAuthGuard)
    @Delete('delete')
    @UsePipes(ValidationPipe)
    deleteEmp(@Body() deletePosition: deleteDto) {
        return this.positionService.delete(deletePosition);
    }
}
