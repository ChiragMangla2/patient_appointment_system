import jwt, { JwtPayload } from 'jsonwebtoken';

const secretKey:string = JSON.stringify(process.env.JWT_SECRET_KEY);
// const secretKey = process.env.JWT_SECRET_KEY || 'mysecretkey';

// Define the structure of the decoded JWT payload
interface DecodedToken extends JwtPayload {
    id: string;
}

// Function to generate JWT token
export const generateToken = (id: string): string => {
    const token = jwt.sign({ id }, secretKey, { expiresIn: '1h' });
    return token;
};

// Define the type of the return value for verifyToken
interface VerifyTokenResult {
    valid: boolean;
    decoded: DecodedToken | undefined;
    message?: string;
}

// Function to verify JWT token
export const verifyToken = (token: string): VerifyTokenResult => {
    try {
        const decoded = jwt.verify(token, secretKey) as DecodedToken;
        return { valid: true, decoded };
    } catch (error) {
        let message = 'Invalid token';
        if (error instanceof jwt.TokenExpiredError) {
            message = 'Token expired';
        } else if (error instanceof jwt.JsonWebTokenError) {
            message = 'Token malformed';
        }
        return { valid: false, decoded:undefined, message };
    }
};
