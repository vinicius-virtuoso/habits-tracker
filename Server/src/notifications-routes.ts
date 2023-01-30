import { FastifyInstance } from "fastify";
import WebPush from "web-push";
import { z } from "zod";

const publicKey =
  "BNsqZU1S21NYYTJR-_JMEeFlBIyPK2eInkp9LZSDU50suB6p07Swemm-HODKnJW_0WOU1ZHdhCycskjFBYP7o6E";

const privateKey = "uV98ZKmdKXajLcRp4Qc6P1eGY3robTQ0NUEWTIY_SRU";

WebPush.setVapidDetails("http://localhost:3333", publicKey, privateKey);

export async function notificationRoutes(app: FastifyInstance) {
  app.get("/push/public_key", () => {
    return { publicKey };
  });

  app.post("/push/register", (req, reply) => {
    console.log(req.body);

    return reply.status(201).send();
  });

  app.post("/push/send", async (req, reply) => {
    const sendPushBody = z.object({
      subscription: z.object({
        endpoint: z.string(),
        expirationTime: z.null(),
        keys: z.object({
          p256dh: z.string(),
          auth: z.string(),
        }),
      }),
    });

    const { subscription } = sendPushBody.parse(req.body);

    WebPush.sendNotification(subscription, "Hello ewew");

    return reply.status(201).send();
  });
}
