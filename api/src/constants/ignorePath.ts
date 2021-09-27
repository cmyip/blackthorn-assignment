import CONFIG from "../config";

const base = CONFIG.BASE_API;
export default {
    authorizationIgnorePath: [
        `${base}/user/auth/login`,
        `${base}/user/auth/register`,
    ],
};
