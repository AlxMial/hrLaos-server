import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { locationDto } from 'src/location/dtos/locationDto.dto';
import { tbEmpEmployment, tbLocation } from 'src/typeorm';
import { deleteDto } from 'src/typeorm/dtos/deleteDto.dto';
import { getDto } from 'src/typeorm/dtos/getDto.dto';
import { stampAudit } from 'src/utils/stamp-audit';
import { StatusMessage } from 'src/utils/StatusMessage';
import { Repository, Connection } from 'typeorm';

@Injectable()
export class LocationService {
    constructor(
        @InjectRepository(tbLocation)
        private readonly locationRepository: Repository<tbLocation>,
        @InjectRepository(tbEmpEmployment)
        private readonly employmentRepository: Repository<tbEmpEmployment>,
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
            const depart = await this.locationRepository.find({ id: id });
            return StatusMessage(true, null, depart);
        } catch (e) {
            return StatusMessage(false, (e as Error).message, location);
        }
    }

    async getById(id: number, companyId: number) {
        try {
            const location = await this.locationRepository.findOne({
                id: id,
                companyId: companyId,
            });

            const empLocation = await this.employmentRepository.find({
                locationId: id,
                companyId: companyId,
                isDeleted: false,
            });

            return { location, empLocation };
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
            let data = await this.locationRepository.findOne({ id: updateLocation.id, companyId: updateLocation.companyId });
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
                const deleteLocation = await this.locationRepository.findOne({ id: data.id[i], companyId: data.companyId });
                if (deleteLocation) {
                    stampAudit(deleteLocation, data, 'update', true);
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

