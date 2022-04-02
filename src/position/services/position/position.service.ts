import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { positionDto } from 'src/position/dtos/position.dto';
import { tbPosition } from 'src/typeorm';
import { deleteDto } from 'src/typeorm/dtos/deleteDto.dto';
import { getDto } from 'src/typeorm/dtos/getDto.dto';
import { stampAudit } from 'src/utils/stamp-audit';
import { StatusMessage } from 'src/utils/StatusMessage';
import { Repository, Connection } from 'typeorm';

@Injectable()
export class PositionService {
    constructor(
        @InjectRepository(tbPosition)
        private readonly positionRepository: Repository<tbPosition>,
        private readonly connection: Connection,
    ) { }

    async getPositionAll(params: getDto) {
        const position = this.positionRepository;
        try {
            const pos = await this.positionRepository.find({ isDeleted: false, companyId: params.companyId });
            return StatusMessage(true, null, pos);
        } catch (e) {
            return StatusMessage(false, (e as Error).message, position);
        }
    }

    async getPositionByCompanyId(id: any) {
        const position = this.positionRepository;
        try {
            const data = await this.positionRepository.find({ id: id });
            return StatusMessage(true, null, data);
        } catch (e) {
            return StatusMessage(false, (e as Error).message, position);
        }
    }

    async getPositionByEmpId(id: number, companyId: number) {
        try {
            const data = await this.positionRepository.findOne({
                id: id,
                companyId: companyId,
            });
            return StatusMessage(true, null, data);;
        } catch (e) {
            return { message: (e as Error).message };
        }
    }

    async createPosition(createPosition: positionDto) {
        const position = this.positionRepository;
        try {
            stampAudit(createPosition);
            const newPosition = this.positionRepository.create(createPosition);
            const SavePosition = await this.positionRepository.save(newPosition);
            return StatusMessage(true, null, SavePosition);
        } catch (e) {
            return StatusMessage(false, (e as Error).message, position);
        }
    }

    async updatePosition(updatePosition: positionDto) {
        const position = this.positionRepository;
        try {
            const data = await this.positionRepository.findOne(updatePosition.id);
            data.positionCode = updatePosition.positionCode;
            data.positionName = updatePosition.positionName;
            data.positionNameEn = updatePosition.positionNameEn;
            data.mainPositionId = updatePosition.mainPositionId;
            data.description = updatePosition.description;
            stampAudit(data, updatePosition, 'update');
            return StatusMessage(
                true,
                null,
                await this.positionRepository.save(data),
            );
        } catch (e) {
            return StatusMessage(false, (e as Error).message, position);
        }
    }

    async delete(data: deleteDto) {
        const position = this.positionRepository;
        try {
            for (let i = 0; i < data.id.length; i++) {
                const result = await this.connection.query(
                    "up_selectAllUse @SearchStr='" + data.id[i] + "',@Column='empId', @companyId='" + data.companyId + "'",
                );
                if (result && result.length > 0) {
                    return { message: 'Data is used' };
                } else {
                    const deletePosition = await this.positionRepository.findOne({ id: data.id[i], companyId: data.companyId });
                    if (deletePosition) {
                        stampAudit(deletePosition, data, 'update', true);
                        return StatusMessage(
                            true,
                            null,
                            await this.positionRepository.save(deletePosition),
                        );
                    }
                }
            }
        } catch (e) {
            return StatusMessage(false, (e as Error).message, position);
        }
    }
}
