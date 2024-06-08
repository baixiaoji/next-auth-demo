import jwt from 'jsonwebtoken';


const DEFAULT_OPTIONS = {
    expiresIn: '1h',
};


export function generateJwt(payload, options = DEFAULT_OPTIONS) {
    return jwt.sign(payload, process.env.JWT_SECRET, options);
}

export function verifyJwt(token) {
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        return decoded;
        // return {
        //     valid: true,
        //     expired: false,
        //     decoded,
        // };
    } catch (e) {
        // return {
        //     valid: false,
        //     expired: e.message === 'jwt expired',
        //     decoded: null,
        // };

        return null
    }
}