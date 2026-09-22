"use strict";

let running = false;

module.exports = {
  config: {
    name: "سبام",
    version: "1.0",
    author: "Saad",
    description: "تكرار المرفق الموجود في الرسالة المردود عليها",
    category: "fun"
  },

  async onStart({ api, event, args }) {
    if (running) {
      return api.sendMessage("❌ كاين سبام خدام دابا. استعمل -وقف أولاً.", event.threadID);
    }

    const count = Math.min(Math.max(parseInt(args[0]) || 5, 1), 20);

    const reply = event.messageReply;

    if (!reply) {
      return api.sendMessage(
        "❌ خاصك تدير Reply على الصورة أو الستيكير وتكتب:\n-سبام 5",
        event.threadID
      );
    }

    // نحاول نلقاو المرفق
    const attachment =
      reply.attachments?.[0] ||
      reply.attachment ||
      reply.media;

    if (!attachment) {
      return api.sendMessage(
        "❌ ما لقيتش صورة/Sticker فالميساج اللي رديتي عليه.",
        event.threadID
      );
    }

    running = true;

    try {
      for (let i = 0; i < count && running; i++) {
        await api.sendMessage(
          {
            attachment: attachment
          },
          event.threadID
        );

        await new Promise(resolve => setTimeout(resolve, 800));
      }
    } catch (error) {
      console.error("SPAM ERROR:", error);
      await api.sendMessage("❌ وقع خطأ أثناء السبام.", event.threadID);
    }

    running = false;
  }
};
