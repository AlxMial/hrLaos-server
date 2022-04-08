import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { tbEmpEmployment, tbEmployee, tbLocation } from 'src/typeorm';
import { LocationController } from './controllers/location/location.controller';
import { LocationService } from './services/location/location.service';

@Module({
    imports: [TypeOrmModule.forFeature([tbLocation, tbEmpEmployment, tbEmployee])],
    controllers: [LocationController],
    providers: [
        {
            provide: 'LOCATION_SERVICE',
            useClass: LocationService,
        },
    ],
})
export class LocationModule { }
