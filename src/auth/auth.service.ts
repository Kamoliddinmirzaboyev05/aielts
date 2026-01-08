import { Injectable, UnauthorizedException } from "@nestjs/common"
import { JwtService } from "@nestjs/jwt"
import { UsersService } from "../users/users.service"
import { CreateUserDto } from "../users/dto/create-user.dto"
import * as bcrypt from "bcrypt"

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async register(createUserDto: CreateUserDto) {
    const user = await this.usersService.create(createUserDto)
    const token = this.jwtService.sign({ sub: user.id, email: user.email, role: user.role })
    
    // Don't return password in response
    const { password: _, ...userWithoutPassword } = user
    
    return { user: userWithoutPassword, token }
  }

  async login(email: string, password: string) {
    const user = await this.usersService.findByEmail(email)
    if (!user) {
      throw new UnauthorizedException("Invalid credentials")
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) {
      throw new UnauthorizedException("Invalid credentials")
    }

    const token = this.jwtService.sign({ sub: user.id, email: user.email, role: user.role })
    
    // Don't return password in response
    const { password: _, ...userWithoutPassword } = user
    
    return { 
      user: userWithoutPassword, 
      token 
    }
  }

  async validateUser(payload: any) {
    return await this.usersService.findById(payload.sub)
  }
}
