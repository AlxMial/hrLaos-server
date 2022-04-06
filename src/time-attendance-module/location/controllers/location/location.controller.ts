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
import { locationDto } from 'src/time-attendance-module/location/dtos/locationDto.dto';
import { LocationService } from 'src/time-attendance-module/location/services/location/location.service';
import { deleteDto } from 'src/typeorm/dtos/deleteDto.dto';

@Controller('location')
export class LocationController {
    constructor(
        @Inject('LOCATION_SERVICE')
        private readonly locationService: LocationService,
    ) { }

    @UseGuards(JwtAuthGuard)
    @Get('/getList/:companyId/:viewBy/:searchText')
    async getList(
        @Param('companyId', ParseIntPipe) companyId: number,
        @Param('viewBy') viewBy: string,
        @Param('searchText') searchText: string,) {
        return this.locationService.getList({ companyId, viewBy, searchText });
    }

    @UseGuards(JwtAuthGuard)
    @Get('/getByCompanyId/:companyId')
    getByCompanyId(@Param('companyId', ParseIntPipe) id: number) {
        return this.locationService.getByCompanyId(id);
    }

    @UseGuards(JwtAuthGuard)
    @Get('/getById/:id/:companyId')
    getById(
        @Param('id', ParseIntPipe) id: number,
        @Param('companyId', ParseIntPipe) companyId: number,
    ) {
        return this.locationService.getById(id, companyId);
    }

    @UseGuards(JwtAuthGuard)
    @Post('create')
    @UsePipes(ValidationPipe)
    create(@Body() createLocation: locationDto) {
        return this.locationService.create(createLocation);
    }

    @UseGuards(JwtAuthGuard)
    @Put('update')
    @UsePipes(ValidationPipe)
    update(@Body() updateLocation: locationDto) {
        return this.locationService.update(updateLocation);
    }

    @UseGuards(JwtAuthGuard)
    @Delete('delete')
    // @UsePipes(ValidationPipe)
    delete(@Body() deleteLocation: deleteDto) {
        return this.locationService.delete(deleteLocation);
    }
}
