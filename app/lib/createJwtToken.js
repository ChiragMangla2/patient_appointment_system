import jwt from 'jsonwebtoken';

const secretKey = process.env.JWT_SECRET_KEY || 'mysecretkey';

// Function to generate JWT token
export const generateToken = async (id) => {
    console.log("id => ", id);
    const token = await jwt.sign({ id: id }, secretKey, { expiresIn: '1h' });
    console.log("token => ", token);
    return token;
};

// Function to verify JWT token
export const verifyToken = async (token) => {
    try {
        const decoded = jwt.verify(token, secretKey);
        return { valid: true, decoded };
    } catch (error) {
        return { valid: false, message: 'Invalid token' };
    }
};
// const data = await jwt.verify(token, secretKey);
// return data.id;