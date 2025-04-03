import crypto from 'crypto';

export const hashPassword = (password, salt) => {
    const hashing = crypto.createHash('sha512');
    return hashing.update(salt + password).digest("base64url");
};

export const getSalt = () => {
    return crypto.randomBytes(16).toString('base64url').slice(0, process.env.SALT_SIZE);
};