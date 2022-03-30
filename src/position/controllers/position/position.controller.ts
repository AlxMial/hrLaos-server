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

@Controller('position')
export class PositionController {
    constructor(
        @Inject('POSITION_SERVICE')
        private readonly positionService: PositionService,
    ) { }

    @UseGuards(JwtAuthGuard)
    @Get('')
    getPositionAll() {
        return this.positionService.getPositionAll();
    }

    @UseGuards(JwtAuthGuard)
    @Get('/:companyId')
    getPositionByCompanyId(@Param('companyId', ParseIntPipe) id: number) {
        return this.positionService.getPositionByCompanyId(id);
    }

    @UseGuards(JwtAuthGuard)
    @Get('getById/:id/:companyId')
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
    deleteEmp(@Body() deletePosition: positionDto) {
        return this.positionService.delete(deletePosition);
    }
}
