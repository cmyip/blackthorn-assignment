import jwt, {SignOptions} from "jsonwebtoken";
import CONFIG from "../config";

const generateToken = (payload: string | any | Buffer, options: SignOptions) => new Promise((resolve, reject) => {
    jwt.sign(payload, CONFIG.SECRET, options || { noTimestamp: true }, (err, token) => {
        if (err) {
            reject(err);
        } else {
            resolve(token);
        }
    });
});

const verifyToken = (token: string) => new Promise(((resolve, reject) => {
    jwt.verify(token, CONFIG.SECRET, (err: Error, decoded: any) => {
        if (err) {
            reject(err);
        } else {
            resolve(decoded);
        }
    });
}));
export {
    generateToken,
    verifyToken
};
