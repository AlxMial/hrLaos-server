import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { shiftDto } from 'src/time-attendance-module/shift/dtos/shiftDto.dto';
import { shiftDetailDto } from 'src/time-attendance-module/shift/dtos/shiftDetailDto.dto';
import { getDto } from 'src/typeorm/dtos/getDto.dto';
import { tbShift } from 'src/typeorm/tbShift';
import { tbShiftDetail } from 'src/typeorm/tbShiftDetail';
import { numberToTime } from 'src/utils/default.service';
import { stampAudit } from 'src/utils/stamp-audit';
import { Connection, Repository } from 'typeorm';
import { deleteDto } from 'src/typeorm/dtos/deleteDto.dto';
import { StatusMessage } from 'src/utils/StatusMessage';

@Injectable()
export class ShiftService {
    constructor(
        @InjectRepository(tbShift)
        private readonly shiftRepository: Repository<tbShift>,
        @InjectRepository(tbShiftDetail)
        private readonly shiftDetailRepository: Repository<tbShiftDetail>,
        private readonly connection: Connection,
    ) { }

    async getList(params: getDto) {
        const shift = await this.shiftRepository.find({ isDeleted: false, companyId: params.companyId });
        if (shift.length > 0) {
            for (let i = 0; i < shift.length; i++) {
                const shiftDetail = await this.shiftDetailRepository.find({ isDeleted: false, shiftId: shift[i].id });
                if (shiftDetail) {
                    shift[i].periodTimes = numberToTime(shiftDetail[0].in1) + ' - '
                        + (shiftDetail[0].timesStamp === 2 ? numberToTime(shiftDetail[0].out1) : numberToTime(shiftDetail[0].out2))
                        + '; ' + shiftDetail[0].timesStamp + ' times stamp';
                }
            }
        }
        return shift;
    }

    async getById(id: number, companyId: number) {
        try {
            const shift = await this.shiftRepository.findOne({
                isDeleted: false,
                id: id,
                companyId: companyId,
            });
            //shift detail
            const shiftDetail = await this.shiftDetailRepository.findOne({
                isDeleted: false,
                shiftId: id,
                companyId: companyId
            });
            return { shift, shiftDetail };
        } catch (e) {
            return { message: (e as Error).message };
        }
    }

    async create(createShift: shiftDto) {
        stampAudit(createShift);
        const newShift = this.shiftRepository.create(createShift);
        const saveShift = await this.shiftRepository.save(newShift);

        //shift detail
        if (createShift.shiftDetail !== undefined && saveShift) {
            await this.setShiftDetail(createShift, saveShift);
        }
        return saveShift;
    }

    // set shift detail
    async setShiftDetail(createShift: shiftDto, saveShift: tbShift) {
        createShift.shiftDetail.forEach(async (data: shiftDetailDto) => {
            data.shiftId = saveShift.id;
            data.companyId = saveShift.companyId;
            const dataShiftDetail = await this.shiftDetailRepository.findOne({
                isDeleted: false,
                shiftId: saveShift.id,
                companyId: saveShift.companyId,
            });
            if (dataShiftDetail === undefined && data) {
                // New case
                stampAudit(data, saveShift);
                return await this.shiftDetailRepository.save(data);
            } else {
                dataShiftDetail.in1 = data.in1;
                dataShiftDetail.out1 = data.out1;
                dataShiftDetail.breakStart = data.breakStart;
                dataShiftDetail.breakEnd = data.breakEnd;
                dataShiftDetail.in2 = data.in2;
                dataShiftDetail.out2 = data.out2;
                dataShiftDetail.breakHour = data.breakHour;
                dataShiftDetail.workHour = data.workHour;
                dataShiftDetail.timesStamp = data.timesStamp;
                stampAudit(dataShiftDetail, saveShift, 'update');
                return await this.shiftDetailRepository.save(dataShiftDetail);
            }
        });
    }

    async update(updateShift: shiftDto) {
        try {
            const data = await this.shiftRepository.findOne({
                isDeleted: false,
                id: updateShift.id,
                companyId: updateShift.companyId
            });
            data.shiftCode = updateShift.shiftCode;
            data.shiftName = updateShift.shiftName;
            stampAudit(data, updateShift, 'update');
            const saveShift = await this.shiftRepository.save(data);
            //shift detail
            await this.setShiftDetail(updateShift, saveShift);
            return saveShift;
        } catch (e) {
            return { message: (e as Error).message };
        }
    }

    async delete(data: deleteDto) {
        const message = this.shiftRepository;
        for (let i = 0; i < data.id.length; i++) {
            const result = await this.connection.query(
                "up_selectAllUse @SearchStr='" +
                data.id[i] +
                "',@Column='shiftId', @exceptTable='tbShiftDetail', @companyId='" + data.companyId + "'",
            );
            if (result && result.length > 0) {
                return StatusMessage(
                    false,
                    'Data is used',
                    message,
                );
            } else {
                await this.deleteShiftDetail(data.id[i], data);
                return StatusMessage(
                    true,
                    'Sucessfully',
                    await this.deleteShift(data.id[i], data),
                );
            }
        }
        return message;
    }

    async deleteShiftDetail(shiftId: any, dataDelete: any) {
        const deleteShiftDetail = await this.shiftDetailRepository.findOne({
            isDeleted: false,
            shiftId: shiftId,
            companyId: dataDelete.companyId
        });
        if (deleteShiftDetail) {
            stampAudit(deleteShiftDetail, dataDelete, 'update', true);
            const success = await this.shiftDetailRepository.save(deleteShiftDetail);
            return success;
        }
        return this.shiftDetailRepository;
    }


    async deleteShift(shiftId: any, dataDelete: any) {
        const deleteShift = await this.shiftRepository.findOne({
            isDeleted: false,
            id: shiftId,
            companyId: dataDelete.companyId
        });
        if (deleteShift) {
            stampAudit(deleteShift, dataDelete, 'delete', true);
            const success = await this.shiftRepository.save(deleteShift);
            return success;
        }
        return this.shiftRepository;
    }
}
