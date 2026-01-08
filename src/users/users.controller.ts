import { Controller, Get, UseGuards, Req } from "@nestjs/common"
import { UsersService } from "./users.service"
import { JwtAuthGuard } from "../auth/jwt-auth.guard"

@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get("profile")
  async getProfile(@Req() req: any) {
    const userId = req.user.sub || req.user.id
    const user = await this.usersService.findById(userId)
    
    if (!user) {
      throw new Error('User not found')
    }
    
    // Don't return password
    const { password: _, ...userWithoutPassword } = user
    return userWithoutPassword
  }
}
