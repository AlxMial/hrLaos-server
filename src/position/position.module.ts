import { Module } from '@nestjs/common';
import { PositionService } from './services/position/position.service';
import { PositionController } from './controllers/position/position.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { tbPosition } from 'src/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([tbPosition])],
  controllers: [PositionController],
  providers: [
    {
      provide: 'POSITION_SERVICE',
      useClass: PositionService,
    },
  ],
})
export class PositionModule { }
