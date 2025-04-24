import { protectedProcedure } from '@api/trpc';
import { prisma } from '@repo/database/src/db';
import { TRPCError } from '@trpc/server';

export const getUsers = protectedProcedure.query(async ({ctx}) => {
        console.log("⛳️ log ~ getUsers log ~ ctx.userId: ", ctx.userId)
    if(!ctx.userId){
        throw new TRPCError({ code: 'NOT_FOUND', message: 'Please login first' });
    }
    try {
        const user = await prisma.user.findUnique({where: {id: ctx.userId}});
        if (!user) {
            throw new TRPCError({ code: 'NOT_FOUND', message: 'User not found' });
        }
        return { success: true, user };
    } catch (error) {
        console.error('Error fetching users:', error);
        return { success: false, error: 'Failed to fetch users' };
    }
});
