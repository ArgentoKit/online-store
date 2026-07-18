import { PrismaService } from '@/prisma.service'
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common'
import { hash } from 'argon2'
import { Prisma } from 'generated/prisma/client'
import { returnUserObject } from './return-user.object'
import { UserDto } from './user.dto'

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async byId(id: string, selectObject: Prisma.UserSelect = {}) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      select: {
        ...returnUserObject,
        favorites: {
          select: {
            id: true,
            name: true,
            price: true,
            images: true,
            slug: true,
          },
        },
        ...selectObject,
      },
    })

    if (!user) throw new NotFoundException('User not found')

    return user
  }

  async updateProfile(id: string, dto: UserDto) {
    const isSameUser = await this.prisma.user.findUnique({
      where: { email: dto.email },
    })

    if (isSameUser && isSameUser.id !== id) throw new BadRequestException('Email is already taken')

    const user = await this.byId(id)

    return this.prisma.user.update({
      where: { id },
      data: {
        email: dto.email,
        name: dto.name,
        avatarPath: dto.avatarPath,
        phone: dto.phone,
        password: dto.password ? await hash(dto.password) : user.password,
      },
    })
  }

  async toggleFavorite(userId: string, productId: string) {
    const user = await this.byId(userId)

    if (!user) throw new NotFoundException('User not found')

    const isExist = user.favorites.some((product) => product.id === productId)

    await this.prisma.user.update({
      where: { id: userId },
      data: {
        favorites: {
          [isExist ? 'disconnect' : 'connect']: { id: productId },
        },
      },
    })

    return { message: isExist ? 'Product removed from favorites' : 'Product added to favorites' }
  }

  async deleteUser(id: string) {
    await this.byId(id)

    return this.prisma.$transaction(async (tx) => {
      await tx.user.update({
        where: { id },
        data: {
          favorites: { set: [] },
        },
      })

      await tx.orderItem.deleteMany({
        where: {
          order: { userId: id },
        },
      })

      await tx.review.deleteMany({
        where: { userId: id },
      })

      await tx.order.deleteMany({
        where: { userId: id },
      })

      await tx.product.updateMany({
        where: { userId: id },
        data: { userId: null },
      })

      return tx.user.delete({ where: { id } })
    })
  }
}
