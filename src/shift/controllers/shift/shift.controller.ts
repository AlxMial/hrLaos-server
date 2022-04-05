import { Body, Controller, Delete, Get, Inject, Param, ParseIntPipe, Post, Put, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { shiftDto } from 'src/shift/dtos/shiftDto.dto';
import { ShiftService } from 'src/shift/services/shift/shift.service';
import { deleteDto } from 'src/typeorm/dtos/deleteDto.dto';

@Controller('shift')
export class ShiftController {
    constructor(
        @Inject('SHIFT_SERVICE')
        private readonly shiftService: ShiftService,
    ) { }

    @UseGuards(JwtAuthGuard)
    @Get('/getList/:companyId/:viewBy/:searchText')
    async get(
        @Param('companyId', ParseIntPipe) companyId: number,
        @Param('viewBy') viewBy: string,
        @Param('searchText') searchText: string,) {
        return this.shiftService.getList({ companyId, viewBy, searchText });
    }

    @UseGuards(JwtAuthGuard)
    @Get('/getById/:id/:companyId')
    getById(
        @Param('id', ParseIntPipe) id: number,
        @Param('companyId', ParseIntPipe) companyId: number,
    ) {
        return this.shiftService.getById(id, companyId);
    }

    @UseGuards(JwtAuthGuard)
    @Post('create')
    @UsePipes(ValidationPipe)
    create(@Body() createShift: shiftDto) {
        return this.shiftService.create(createShift);
    }

    @UseGuards(JwtAuthGuard)
    @Put('update')
    @UsePipes(ValidationPipe)
    update(@Body() updateShift: shiftDto) {
        return this.shiftService.update(updateShift);
    }

    @Delete('delete')
    @UsePipes(ValidationPipe)
    delete(@Body() data: deleteDto) {
        return this.shiftService.delete(data);
    }
}
