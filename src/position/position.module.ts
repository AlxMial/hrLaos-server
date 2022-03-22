import { Module } from '@nestjs/common';
import { PositionService } from './services/position/position.service';
import { PositionController } from './controllers/position/position.controller';

@Module({
  providers: [PositionService],
  controllers: [PositionController],
})
export class PositionModule {}
