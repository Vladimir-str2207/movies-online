import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { INFO_MESSAGE, MESSAGE } from 'src/constants/constants';
import { MailService } from 'src/mail/mail.service';
import { User, UserDocument } from 'src/user/user.schema';
import { Permissions, Role, RolePermissions } from './role.enum';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateAuthDto } from './dto/create-auth.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtService: JwtService,
    private configService: ConfigService,
    private userService: UserService,
    private mailService: MailService,
  ) {}

  async signIn(createAuthDto: CreateAuthDto) {
    const user = await this.userModel.findOne({ email: createAuthDto.email });
    if (!user) {
      throw new NotFoundException(MESSAGE.NOT_FOUND);
    } 
    
    const isValidPassword = user.password !== createAuthDto.password;
    if (isValidPassword)
      throw new UnauthorizedException(MESSAGE.ACCESS_DENIED);
    return user;
  }

  generateToken(id: string, email: string, roles: Role[]) {
    const secret = this.configService.get('JWT_SECRET');
    return this.jwtService.sign({ id, email, roles }, { secret });
  }

  async sendMagicLink(email: string) {
    const user = (await this.userService.findByEmail(email)) as UserDocument;
    if (!user) {
      throw new NotFoundException(MESSAGE.NOT_FOUND);
    }
    const clientUrl = this.configService.get('CLIENT_URL');
    const token = this.generateToken(
      user.id,
      user.email,
      user.roles,
    );
    const link = `${clientUrl}/auth/${token}`;
    const html = `<p><a href="${link}"> ${INFO_MESSAGE.LOG_ACCOUNT} </a></p>`;
    this.mailService.sendMessage({
      email: user.email,
      subject: INFO_MESSAGE.MAGIC_LINK,
      html,
    });
    return html;
  }

  checkPermissions(user: UserDocument, permission: Permissions) {
    const result = user.roles.some((role) =>
      RolePermissions[role].includes(permission),
    );
    if (!result) {
      throw new UnauthorizedException(MESSAGE.ACCESS_DENIED)
    };
    return result;
  }
}
