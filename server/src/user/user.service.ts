import { Injectable } from '@nestjs/common'
import { Request } from 'express'
import { hash } from 'argon2';
import { AuthDto } from 'src/auth/dto/auth.dto';
import { PrismaService } from 'src/prisma.service';
import { UpdateUserDto } from './user.dto';
import { NotFoundException, BadRequestException } from '@nestjs/common/exceptions';
import { SearchQuery, UniqueValuesQuery } from 'src/interface/user.interface';
import { Prisma } from '@prisma/client';
import { DefaultAvatar } from 'src/enums/defaultAvatar';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

 async getById(id: string) {
    const res = await this.prisma.user.findUnique({
      where: {
        id: id,
      },
      include: {
        following: {
          select: {
            followedById: true
          }
        },
        followedBy: {
          select: {
            followingId: true
          }
        }
      },
      
    })
   return res
  }

 async getByEmail(email: string) {
    return await this.prisma.user.findUnique({
      where: {
        email
      },
      include: {
        followedBy: {
          select: {
            followingId: true,
          }
        },
        following: {
          select: {
            followedById: true,
          }
        }
      }
    })
  }

  async create(dto: AuthDto) {

		const user = {
			email: dto.email,
			username: dto.username,
      usertype: dto.usertype,
      profilePic: DefaultAvatar.AVATAR,
			password: await hash(dto.password)
		}
    try{
		 return this.prisma.user.create({
			data: user,
		})
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === 'P2002') {
          throw new BadRequestException('This name already exist')
        }
      }
      throw new BadRequestException('An unexpected error occurred');
    }
  
	}

  async update(id: string, dto: UpdateUserDto) {
		let data = dto
    try{
		return await this.prisma.user.update({
			where: {
				id
			},
			data,
		})
    } catch(e){
      console.log(e.message)
    }
	}

  async search(query: string, id: string) {
    
    const users = await this.prisma.user.findMany({
      where: {
        username: {contains: query, mode: 'insensitive'},
            id: {
              not: id,
            },
          },
    });
  
    if(!users) throw new NotFoundException('Users not found');
    return users
  }

   async follow(followingId: string, userId: string) {
    
    const existingFollow = await this.prisma.follows.findUnique({
      where: {
        followingId_followedById: {
          followedById: userId,
          followingId,
        },
      },
    });

    if (existingFollow) {
      throw new Error('Already following this user')
    }

    return await this.prisma.follows.create({
      data: {
        followedById: userId,
        followingId,
      },
    });
    

  }

  async unfollow(followingId: string, userId: string) {
     const result = await this.prisma.follows.delete({
      where: {
        followingId_followedById: {
          followingId,
          followedById: userId,
        },
      },
    });

    if(result) return {status: "success"}
  }

  async getFollowing(id: string) {
    const res =  await this.prisma.user.findUnique({
      where: {
        id: id, // замените на id нужного пользователя
      },
      select: {
        followedBy: {
          select: {
            following: {
              select: {
                id: true,
                profilePic: true,
                username: true,
              }
            }
          }
        }
        }
      }
    );
      console.log(res.followedBy.map(f => f.following))
      return res.followedBy.map(f => f.following)
  }

  async getFollowers(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: id },
      select: {
        following: {
          select: {
            followedBy: true
          },
        },
      },
    });
    return user.following.map(f => f.followedBy)
  }

  async uniqueValues() {
      const uniqueCitiesResult = await this.prisma.user.groupBy({
        by: ['city'],
        _count: {
          city: true,
        },
      });
      const uniqueCities = uniqueCitiesResult.map(result => result.city);
  
      
      const uniqueCountriesResult = await this.prisma.user.groupBy({
        by: ['country'],
        _count: {
          country: true,
        },
      });
      const uniqueCountries = uniqueCountriesResult.map(result => result.country);
  
      const uniqueValues = {
        cities: uniqueCities,
        countries: uniqueCountries,
      };
      return uniqueValues
  }

  async uniqueValuesType2(body: UniqueValuesQuery){
    const {userType1, userType} = body
  
      // Perform the query with Prisma
      const filteredUsers = await this.prisma.user.findMany({
        where: {
          AND: [
            {usertype: userType},
            {type1: userType1},
          ]
        },
        distinct: ['type2'],
        select: {
          type2: true,
        }
      });
      return filteredUsers
      
    }
  async searchByFilter(body: SearchQuery) {
    
      const { type, city, country } = body;
  
      const filter: { usertype?: string; city?: string; country?: string } = {};
    if (type) filter.usertype = type;
    if (city) filter.city = city;
    if (country) filter.country = country;
  
      
    const users = await this.prisma.user.findMany({
      where: filter,
      select: {
        username: true,
        city: true,
        id: true, // Используйте `id`, как правильно указано
        profilePic: true,
        following: {
          select: {
            followedById: true,
          },
        },
        followedBy: {
          select: {
            followingId: true,
          },
        },
      },
    });
      return users
    }

}