import { prisma } from "../db";
import { ResponseError } from "../error/response-error";
import { CreateUserRequest,  toUserResponse, UserResponse } from "../model/user-model";
import { UserValidation } from "../validation/user-validation";
import { Validation } from "../validation/validation";
import bcrypt from "bcrypt"

export class UserService {
    static async register(request:CreateUserRequest): Promise<UserResponse>{
        const registerRequest = Validation.validate(UserValidation.REGISTER, request)

        const totalUserWithSameUsername = await prisma.user.count({
            where: {
                username: registerRequest.username
            }
        })

        if (totalUserWithSameUsername != 0) {
            throw new ResponseError(400, "Username already exist")
        }

        registerRequest.password = await bcrypt.hash(registerRequest.password, 10)

        const user = await prisma.user.create({
            data: registerRequest
        })

        return toUserResponse(user)

    }
}