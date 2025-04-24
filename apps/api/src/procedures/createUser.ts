import { publicProcedure } from '@api/trpc';
import { z } from 'zod';

const createUserSchema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
});

// Export the `createUser` procedure directly
export const createUser = publicProcedure
    .input(createUserSchema)
    .mutation(async ({ input }) => {
        const { name, email, password } = input;

        // Simulate saving the user to the database
        const newUser = {
        id: Date.now().toString(),
        name,
        email,
        password: "hashed_" + password, // Simulated hashed password
        };

        // In a real implementation, save `newUser` to a database here

        return {
        success: true,
        user: {
            id: newUser.id,
            name: newUser.name,
            email: newUser.email,
        },
        };
});
