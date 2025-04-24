import { publicProcedure } from "@api/trpc";
import { hashPassword } from "@api/utils/hash";
import { prisma } from "@repo/database/src/db";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

const RegisterSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    name: z.string().optional(),
})

export const registerRouter = publicProcedure
    .input(RegisterSchema)
    .mutation(async({input}) => {
        const { email, password, name } = input;

        const existingUser = await prisma.user.findUnique({where: { email }});
        if(existingUser){
            throw new TRPCError({
                code: 'CONFLICT',
                message: 'Email already registered',
            })
        }

        const hashed = await hashPassword(password)
        const user = await prisma.user.create({
            data: {
                email,
                name,
                password: hashed
            }
        })

        return {
            success: true,
            user: {
                id: user.id,
                email: user.email,
                name: user.name
            }
        }
    })
