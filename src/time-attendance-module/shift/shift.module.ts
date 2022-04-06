import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { tbShift } from 'src/typeorm/tbShift';
import { tbShiftDetail } from 'src/typeorm/tbShiftDetail';
import { ShiftController } from './controllers/shift/shift.controller';
import { ShiftService } from './services/shift/shift.service';

@Module({
    imports: [TypeOrmModule.forFeature([tbShift, tbShiftDetail])],
    controllers: [ShiftController],
    providers: [
        {
            provide: 'SHIFT_SERVICE',
            useClass: ShiftService,
        },
    ],
})
export class ShiftModule { }
