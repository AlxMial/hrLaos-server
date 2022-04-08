import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { locationDto } from 'src/time-attendance-module/location/dtos/locationDto.dto';
import { tbEmpEmployment, tbEmployee, tbLocation } from 'src/typeorm';
import { deleteDto } from 'src/typeorm/dtos/deleteDto.dto';
import { getDto } from 'src/typeorm/dtos/getDto.dto';
import { stampAudit } from 'src/utils/stamp-audit';
import { StatusMessage } from 'src/utils/StatusMessage';
import { Repository, Connection, In } from 'typeorm';

@Injectable()
export class LocationService {
    constructor(
        @InjectRepository(tbLocation)
        private readonly locationRepository: Repository<tbLocation>,
        @InjectRepository(tbEmpEmployment)
        private readonly employmentRepository: Repository<tbEmpEmployment>,
        @InjectRepository(tbEmployee)
        private readonly employeeRepository: Repository<tbEmployee>,
        private readonly connection: Connection,
    ) { }

    async getList(params: getDto) {
        const location = this.locationRepository;
        try {
            const depart = await this.locationRepository.find({ isDeleted: false, companyId: params.companyId });
            return StatusMessage(true, null, depart);
        } catch (e) {
            return StatusMessage(false, (e as Error).message, location);
        }
    }

    async getByCompanyId(id: any) {
        const location = this.locationRepository;
        try {
            const depart = await this.locationRepository.find({ isDeleted: false, id: id });
            return StatusMessage(true, null, depart);
        } catch (e) {
            return StatusMessage(false, (e as Error).message, location);
        }
    }

    async getById(id: number, companyId: number) {
        try {
            const location = await this.locationRepository.findOne({
                isDeleted: false,
                id: id,
                companyId: companyId,
            });


            const employementLocation = await this.employmentRepository.find({
                companyId: companyId,
                isDeleted: false,
                locationId: id,
            });

            // พนักงานทั้งหมดใน company [สำหรับ dropdown]
            const allEmpLocation = await this.employeeRepository.find({
                where: {
                    companyId: companyId,
                    isDeleted: false,
                },
                select: [
                    'id',
                    'empCode',
                    'title',
                    'titleEn',
                    'lastName',
                    'firstName',
                    'nickName',
                    'firstNameEn',
                    'lastNameEn',
                    'nickNameEn',
                ],
            });

            // พนักงานที่อยู่ในสถานที่นี้
            const empLocation = allEmpLocation.filter(e => employementLocation.some(employ => employ.empId === e.id))

            return { location, allEmpLocation, empLocation };
        } catch (e) {
            return { message: (e as Error).message };
        }
    }

    async create(createLocation: locationDto) {
        const location = this.locationRepository;
        try {
            stampAudit(createLocation);
            const newLocation = this.locationRepository.create(createLocation);
            const SaveLocation = await this.locationRepository.save(newLocation);
            return StatusMessage(true, null, SaveLocation);
        } catch (e) {
            return StatusMessage(false, (e as Error).message, location);
        }
    }

    async update(updateLocation: locationDto) {
        const location = this.locationRepository;
        try {
            // updateLocation = stampAudit(updateLocation, 'update');
            let data = await this.locationRepository.findOne({ isDeleted: false, id: updateLocation.id, companyId: updateLocation.companyId });
            data.locationCode = updateLocation.locationCode;
            data.locationName = updateLocation.locationName;
            data.locationNameEn = updateLocation.locationNameEn;
            data.latitude = updateLocation.latitude;
            data.longitude = updateLocation.longitude;
            data.radius = updateLocation.radius;
            stampAudit(data, updateLocation, 'update');
            return StatusMessage(
                true,
                null,
                await this.locationRepository.save(data),
            );
        } catch (e) {
            return StatusMessage(false, (e as Error).message, location);
        }
    }

    async delete(data: deleteDto) {
        const location = this.locationRepository;
        // try {
        for (let i = 0; i < data.id.length; i++) {
            const result = await this.connection.query(
                "up_selectAllUse @SearchStr='" + data.id[i] + "',@Column='locationId', @exceptTable='tbLocation', @companyId='" + data.companyId + "'",
            );
            if (result && result.length > 0) {
                return StatusMessage(false, 'data is used', location);
            } else {
                const deleteLocation = await this.locationRepository.findOne({ isDeleted: false, id: data.id[i], companyId: data.companyId });
                if (deleteLocation) {
                    stampAudit(deleteLocation, data, 'delete', true);
                    return StatusMessage(
                        true,
                        null,
                        await this.locationRepository.save(deleteLocation),
                    );
                } else {
                    return StatusMessage(false, null, location);
                }
            }
        }
        // } catch (e) {
        //   return StatusMessage(false, (e as Error).message, location);
        // }
    }
}
function tbEmployment(tbEmployment: any) {
    throw new Error('Function not implemented.');
}

