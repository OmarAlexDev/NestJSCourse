import { Injectable, NotFoundException } from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm'
import {Repository} from 'typeorm';
import { CreateReportDto } from './dtos/create-report.dto';
import { Report } from './report.entity';
import { User } from 'src/users/user.entity';
import { GetEstimateDto } from './dtos/get-estimate.dto';

@Injectable()
export class ReportsService {
    constructor(@InjectRepository(Report) private repo: Repository<Report>){}

    createEstimate({make, model, year, lng, lat, mileage}: GetEstimateDto){
        return this.repo.createQueryBuilder()
        .select('AVG(price)', 'price')
        .where('make= :make AND model= :model',{make, model})
        .andWhere('lng - :lng BETWEEN -5 AND 5',{lng})
        .andWhere('lat - :lat BETWEEN -5 AND 5',{lat})
        .andWhere('year - :year BETWEEN -3 AND 3',{year})
        .andWhere('approved IS TRUE')
        .orderBy(`ABS(mileage - ${mileage})`, 'DESC')
        .limit(3)
        .getRawOne()
    }

    async create(reportDto: CreateReportDto, user: User){
        const report = await this.repo.create(reportDto);
        report.user= user;

        return this.repo.save(report);
    }

    async changeApproval(id: string, approved: boolean) {
        const report = await this.repo.findOne({ where: { id: id } });
        if (!report){
            throw new NotFoundException('report not found');
        }

        report.approved = approved;
        return this.repo.save(report);
    }
}
