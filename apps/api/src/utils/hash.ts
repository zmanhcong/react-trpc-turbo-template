import bcrypt from 'bcrypt';

export async function hashPassword(password: string) {
    const saltRounds = 10;
    return bcrypt.hash(password, saltRounds);
}

export async function comparePassword(password: string, hashedPassword: string){
    return bcrypt.compare(password, hashedPassword);
}
