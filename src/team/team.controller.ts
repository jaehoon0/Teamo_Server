import { Controller, Delete, Get, Param, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { TeamService } from './team.service';

@Controller('team')
export class TeamController {
	constructor(
		private readonly teamService: TeamService
	){}

	@UseGuards(JwtAuthGuard)
	@Get('request/:teamId')
	async joinToTeam(@Request() req, @Param('teamId') teamId) {
		await this.teamService.joinToTeam(req.user.userId, teamId)
	}

	@UseGuards(JwtAuthGuard)
	@Get('approval/:teamId')
	async approve(@Request() req, @Param('teamId') teamId) {
		await this.teamService.approve(req.user.userId, teamId)
	}

	@UseGuards(JwtAuthGuard)
	@Get('rejection/:teamId')
	async reject(@Request() req, @Param('teamId') teamId) {
		await this.teamService.reject(req.user.userId, teamId)
	}

	@Get('/member/:team_id')
	async getMembers(@Param('team_id') team_id) {
		await this.teamService.getMembers(team_id)
	}

	@Delete('/:team_id/:member_id')
	async delete(@Param('team_id') team_id, @Param('member_id') member_id) {
		await this.teamService.delete(team_id, member_id)
	}
}
