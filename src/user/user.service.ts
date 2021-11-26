import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm/repository/Repository';

@Injectable()
export class UserService {
	constructor(
		@InjectRepository(User)
		private userRepo: Repository<User>
	){}

	async signUp(u_i: User) {		
		if(u_i.id && u_i.password && u_i.name && u_i.email && u_i.department && u_i.std_num)
			await this.userRepo.insert(u_i)
	}

	async checkEmailValidation(email:string) {
		if(await this.userRepo.findOne({email: email}))
			return "true"
		return "false"
	}
}
