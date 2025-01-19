import { prisma } from "../db";
import { CreateUserRequest, UserResponse } from "../model/user-model";
import { UserValidation } from "../validation/user-validation";
import { Validation } from "../validation/validation";

export class UserService {
    static async register(request:CreateUserRequest): Promise<UserResponse>{
        const registerRequest = Validation.validate(UserValidation.REGISTER, request)

        const totalUserWithSameUsername = await prisma.user.count({
            where: {
                username: registerRequest.username
            }
        })

        if (totalUserWithSameUsername != 0) {
            throw n
        }
    }
}