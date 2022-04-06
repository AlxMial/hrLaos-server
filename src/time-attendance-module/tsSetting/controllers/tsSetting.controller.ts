import { Body, Controller, Delete, Get, Inject, Param, ParseIntPipe, Post, Put, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { deleteDto } from 'src/typeorm/dtos/deleteDto.dto';
import { tsSettingDtDto } from '../dtos/tsSettingDtDto.dto';
import { tsSettingDto } from '../dtos/tsSettingDto.dto';
import { TSSettingService } from '../services/tsSetting.service';

@Controller('tsSetting')
export class TSSettingController {
    constructor(
        @Inject('TSSETTING_SERVICE')
        private readonly tsSettingService: TSSettingService,
    ) { }

    @UseGuards(JwtAuthGuard)
    @Get('/getById/:id/:companyId')
    getById(
        @Param('id', ParseIntPipe) id: number,
        @Param('companyId', ParseIntPipe) companyId: number,
    ) {
        return this.tsSettingService.getById(id, companyId);
    }

    @UseGuards(JwtAuthGuard)
    @Post('create')
    @UsePipes(ValidationPipe)
    create(@Body() data: tsSettingDto) {
        return this.tsSettingService.create(data);
    }

    @UseGuards(JwtAuthGuard)
    @Put('update')
    @UsePipes(ValidationPipe)
    update(@Body() data: tsSettingDto) {
        return this.tsSettingService.update(data);
    }

    @Delete('delete')
    @UsePipes(ValidationPipe)
    delete(@Body() data: deleteDto) {
        return this.tsSettingService.delete(data);
    }
}
