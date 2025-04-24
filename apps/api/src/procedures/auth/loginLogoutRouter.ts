import { publicProcedure, router } from '@api/trpc';
import { comparePassword } from '@api/utils/hash';
import { prisma } from '@repo/database/src/db';
import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import jwt from 'jsonwebtoken';

const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(1),
});

export const authRouter = router({
    login: publicProcedure
        .input(loginSchema)
        .mutation(async ({ input, ctx }) => {
            const { email, password } = input;
            const user = await prisma.user.findUnique({ where: { email } });
            if(!user){
                throw new TRPCError({
                    code: 'UNAUTHORIZED',
                    message: 'Invalid credentials'
                })
            }

            const isValid = await comparePassword(password, user.password);
            if(!isValid){
                throw new TRPCError({code: 'UNAUTHORIZED', message: 'Invalid user or password'})
            }

            const token = jwt.sign(
                { userId: user.id },
                process.env.JWT_SECRET!,
                { expiresIn: '1h' },
            );

            ctx.res.cookie('token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                maxAge: 1000 * 60 * 60 // 1hour
            })

            return {
                message: 'Login successful',
                tuser: {
                    id: user.id,
                    email: user.email,
                    name: user.name,
                },
            };
    }),

    logout: publicProcedure.mutation(({ ctx }) => {
        ctx.res.clearCookie('token');
        return {
            message: 'Logged out'
        }
    })

})