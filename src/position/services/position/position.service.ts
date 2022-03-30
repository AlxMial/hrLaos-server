import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { positionDto } from 'src/position/dtos/position.dto';
import { tbPosition } from 'src/typeorm';
import { StatusMessage } from 'src/utils/StatusMessage';
import { Repository, Connection } from 'typeorm';

@Injectable()
export class PositionService {
    constructor(
        @InjectRepository(tbPosition)
        private readonly positionRepository: Repository<tbPosition>,
        private readonly connection: Connection,
    ) { }

    async getPositionAll() {
        const position = this.positionRepository;
        try {
            const depart = await this.positionRepository.find({ isDeleted: false });
            return StatusMessage(true, null, depart);
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
            data.modifiedBy = updatePosition.userId;
            data.modifiedDate = new Date();
            data.isDeleted = false;
            return StatusMessage(
                true,
                null,
                await this.positionRepository.save(data),
            );
        } catch (e) {
            return StatusMessage(false, (e as Error).message, position);
        }
    }

    async delete(data: positionDto) {
        const position = this.positionRepository;
        try {
            const result = await this.connection.query(
                "up_selectAllUse @SearchStr='" + data.id + "',@Column='empId'",
            );
            if (result) {
                return StatusMessage(false, 'data is used', position);
            } else {
                const deleteEmp = await this.positionRepository.findOne(data.id);
                deleteEmp.isDeleted = true;
                deleteEmp.modifiedBy = data.userId;
                deleteEmp.modifiedDate = new Date();
                return StatusMessage(
                    true,
                    null,
                    await this.positionRepository.save(deleteEmp),
                );
            }
        } catch (e) {
            return StatusMessage(false, (e as Error).message, position);
        }
    }
}
