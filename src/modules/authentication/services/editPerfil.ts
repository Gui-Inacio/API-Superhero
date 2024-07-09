import { inject, injectable } from 'tsyringe';

//import { ResetPasswordData } from '../dtos/ResetPasswordDTO';

import { IUserRepository } from '@/modules/user/repositories/IUserRepository';
import { FindUserByIdService } from '@/modules/user/services/FindByIdService';
import Conflict from '@/shared/errors/conflict';

@injectable()
export class EditProfileService {
  constructor(
    @inject('UserRepository')
    private readonly userRepository: IUserRepository,
    private readonly findByIdService: FindUserByIdService,
  ) {}

  async execute( data: UpdateUser ) {
    const user await this.findByIdService.execute(data.id);

    //checar se email existe e se nao é o do proprio usuario\
    const checkEmailExists = await this.userRepository.findByEmailAndNotId(data.email, user.id,)

    if(checkEmailExists){
      throw new Conflict('Email já está sendo usado!');
    }

    const cpfAlreadyExists = await this.userRepository.findByCpf(data.cpf);

    if(cpfAlreadyExists){
      throw new Conflict('CPF já existe!');
    }

    await this.userRepository.update({id:user.id, name:data.name, password: data.password, cpf: data.cpf, email: data.email})
  }
}
