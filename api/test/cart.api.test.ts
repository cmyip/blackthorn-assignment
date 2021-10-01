// eslint-disable-next-line @typescript-eslint/no-var-requires
const request = require("supertest");
// eslint-disable-next-line @typescript-eslint/no-var-requires
const dotenv = require("dotenv");
dotenv.config();

import createApp from "../src/app";


describe("GET /carts", () => {
    it("should return 200 OK", async () => {
        const app = await createApp();

        return request(app).get("/api/v1/carts")
            .expect(200);
    }, 20000);
});
