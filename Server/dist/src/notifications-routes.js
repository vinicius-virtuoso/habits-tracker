"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.notificationRoutes = void 0;
const web_push_1 = __importDefault(require("web-push"));
const zod_1 = require("zod");
const publicKey = "BNsqZU1S21NYYTJR-_JMEeFlBIyPK2eInkp9LZSDU50suB6p07Swemm-HODKnJW_0WOU1ZHdhCycskjFBYP7o6E";
const privateKey = "uV98ZKmdKXajLcRp4Qc6P1eGY3robTQ0NUEWTIY_SRU";
web_push_1.default.setVapidDetails("http://localhost:3333", publicKey, privateKey);
async function notificationRoutes(app) {
    app.get("/push/public_key", () => {
        return { publicKey };
    });
    app.post("/push/register", (req, reply) => {
        console.log(req.body);
        return reply.status(201).send();
    });
    app.post("/push/send", async (req, reply) => {
        const sendPushBody = zod_1.z.object({
            subscription: zod_1.z.object({
                endpoint: zod_1.z.string(),
                expirationTime: zod_1.z.null(),
                keys: zod_1.z.object({
                    p256dh: zod_1.z.string(),
                    auth: zod_1.z.string(),
                }),
            }),
        });
        const { subscription } = sendPushBody.parse(req.body);
        web_push_1.default.sendNotification(subscription, "Hello ewew");
        return reply.status(201).send();
    });
}
exports.notificationRoutes = notificationRoutes;
