import { Controller, Post, Patch, Param, Body, UseGuards, Get, Query } from '@nestjs/common';
import { AuthGuard } from './../guards/auth.guard';
import { AdminGuard } from './../guards/admin.guard';
import { CreateReportDto } from './dtos/create-report.dto';
import { ReportsService } from './reports.service';
import { CurrentUser } from './../users/decorators/current-user.decorator';
import { User } from './../users/user.entity';
import { ReportDto } from './dtos/report.dto';
import { ApproveReportDto } from './dtos/approve-report.dto';
import { Serialize } from './../interceptors/serialize.interceptor';
import { GetEstimateDto } from './dtos/get-estimate.dto';

@Controller('reports')
export class ReportsController {
    constructor(private reportsService: ReportsService){}

    @UseGuards(AuthGuard)
    @Post()
    @Serialize(ReportDto)
    createReport(@Body() body: CreateReportDto, @CurrentUser() user: User){
        return this.reportsService.create(body, user);
    }

    @Patch('/:id')
    @UseGuards(AdminGuard)
    approveReport(@Param('id') id: string, @Body() body: ApproveReportDto ){
        return this.reportsService.changeApproval(id, body.approved)
    }

    @Get()
    getEstimate(@Query() query: GetEstimateDto){
        return this.reportsService.createEstimate(query);
    }
}
