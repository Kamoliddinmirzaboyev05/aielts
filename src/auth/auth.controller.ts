import { Controller, Post, Body, HttpException, HttpStatus } from "@nestjs/common"
import { AuthService } from "./auth.service"
import { CreateUserDto } from "../users/dto/create-user.dto"

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("register")
  async register(@Body() createUserDto: CreateUserDto) {
    try {
      return await this.authService.register(createUserDto)
    } catch (error) {
      throw new HttpException((error as any).message || "Registration failed", HttpStatus.BAD_REQUEST)
    }
  }

  @Post("login")
  async login(@Body() loginDto: { email: string; password: string }) {
    return await this.authService.login(loginDto.email, loginDto.password)
  }
}
