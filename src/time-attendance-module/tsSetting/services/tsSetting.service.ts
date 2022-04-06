import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getDto } from 'src/typeorm/dtos/getDto.dto';
import { tbShift } from 'src/typeorm/tbShift';
import { tbShiftDetail } from 'src/typeorm/tbShiftDetail';
import { numberToTime } from 'src/utils/default.service';
import { stampAudit } from 'src/utils/stamp-audit';
import { Connection, Repository } from 'typeorm';
import { deleteDto } from 'src/typeorm/dtos/deleteDto.dto';
import { StatusMessage } from 'src/utils/StatusMessage';
import { tsSettingDto } from '../dtos/tsSettingDto.dto';
import { tsSettingDtDto } from '../dtos/tsSettingDtDto.dto';
import { tbSetTimeStamp, tbSetTimeStampDt } from 'src/typeorm';

@Injectable()
export class TSSettingService {
    constructor(
        @InjectRepository(tbSetTimeStamp)
        private readonly tsSettingRepository: Repository<tbSetTimeStamp>,
        @InjectRepository(tbSetTimeStampDt)
        private readonly tsSettingDtRepository: Repository<tbSetTimeStampDt>,
        private readonly connection: Connection,
    ) { }

    async getById(id: number, companyId: number) {
        try {
            const tsSetting = await this.tsSettingRepository.findOne({
                companyId: companyId,
            });
            //tsSetting detail
            const tsSettingDetail = await this.tsSettingDtRepository.findOne({
                setTimeStampId: id,
                isDeleted: false,
                companyId: companyId
            });
            return { tsSetting, tsSettingDetail };
        } catch (e) {
            return { message: (e as Error).message };
        }
    }

    async create(createSetting: tsSettingDto) {
        stampAudit(createSetting);
        const newSetting = this.tsSettingRepository.create(createSetting);
        const saveSetting = await this.tsSettingRepository.save(newSetting);

        //tsSetting detail
        if (createSetting.tsSettingDtDto !== undefined && saveSetting) {
            await this.setSettingDt(createSetting, createSetting);
        }
        return saveSetting;
    }

    // set tsSetting detail
    async setSettingDt(createSetting: tsSettingDto, saveSetting: tbSetTimeStamp) {
        createSetting.tsSettingDtDto.forEach(async (data: tsSettingDtDto) => {
            data.setTimeStampId = saveSetting.id;
            data.companyId = saveSetting.companyId;
            const dataSettingDt = await this.tsSettingDtRepository.findOne({
                isDeleted: false,
                setTimeStampId: saveSetting.id,
                companyId: saveSetting.companyId,
            });
            if (dataSettingDt === undefined && data) {
                // New case
                stampAudit(data, saveSetting);
                return await this.tsSettingDtRepository.save(data);
            } else {
                dataSettingDt.placeName = data.placeName;
                dataSettingDt.latitude = data.latitude;
                dataSettingDt.longitude = data.longitude;
                dataSettingDt.radius = data.radius;
                dataSettingDt.description = data.description;
                dataSettingDt.isActive = data.isActive;
                stampAudit(dataSettingDt, saveSetting, 'update');
                return await this.tsSettingDtRepository.save(dataSettingDt);
            }
        });
    }

    async update(updateSetting: tsSettingDto) {
        try {
            const data = await this.tsSettingRepository.findOne({
                isDeleted: false,
                id: updateSetting.id,
                companyId: updateSetting.companyId
            });
            data.isAllowTimeStamp = updateSetting.isAllowTimeStamp;
            data.isAllowInside = updateSetting.isAllowInside;
            data.isAllowOutside = updateSetting.isAllowOutside;
            data.isCompany = updateSetting.isCompany;
            data.companyRadius = updateSetting.companyRadius;
            data.isAllCompany = updateSetting.isAllCompany;
            data.allCompanyRadius = updateSetting.allCompanyRadius;
            data.isAnywhere = updateSetting.isAnywhere;
            data.isSetPlace = updateSetting.isSetPlace;
            data.isAllowCurrentAddress = updateSetting.isAllowCurrentAddress;
            data.isPhoto = updateSetting.isPhoto;

            stampAudit(data, updateSetting, 'update');
            const saveSetting = await this.tsSettingRepository.save(data);
            //tsSetting detail
            await this.setSettingDt(updateSetting, saveSetting);
            return saveSetting;
        } catch (e) {
            return { message: (e as Error).message };
        }
    }

    async delete(data: deleteDto) {
        const message = this.tsSettingRepository;
        for (let i = 0; i < data.id.length; i++) {
            const result = await this.connection.query(
                "up_selectAllUse @SearchStr='" +
                data.id[i] +
                "',@Column='setTimeStampId', @exceptTable='tbSetTimeStampDt', @companyId='" + data.companyId + "'",
            );
            if (result && result.length > 0) {
                return StatusMessage(
                    false,
                    'Data is used',
                    message,
                );
            } else {
                await this.deleteSettingDt(data.id[i], data);
                return StatusMessage(
                    true,
                    'Sucessfully',
                    await this.deleteSetting(data.id[i], data),
                );
            }
        }
        return message;
    }

    async deleteSettingDt(setTimeStampId: any, dataDelete: any) {
        const deleteSettingDt = await this.tsSettingDtRepository.findOne({
            isDeleted: false,
            setTimeStampId: setTimeStampId,
            companyId: dataDelete.companyId
        });
        if (deleteSettingDt) {
            stampAudit(deleteSettingDt, dataDelete, 'update', true);
            const success = await this.tsSettingDtRepository.save(deleteSettingDt);
            return success;
        }
        return this.tsSettingDtRepository;
    }


    async deleteSetting(setTimeStampId: any, dataDelete: any) {
        const deleteSetting = await this.tsSettingRepository.findOne({
            isDeleted: false,
            id: setTimeStampId,
            companyId: dataDelete.companyId
        });
        if (deleteSetting) {
            stampAudit(deleteSetting, dataDelete, 'update', true);
            const success = await this.tsSettingRepository.save(deleteSetting);
            return success;
        }
        return this.tsSettingRepository;
    }
}
