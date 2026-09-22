"use strict";

let running = false;

module.exports = {
	config: {
		name: "siir",
		aliases: ["stop"],
		author: "Neoaz 🐊",
		category: "fun",
		cooldown: 2,
		role: 0,
		noPrefix: true,
		description: {
			en: "Repeat a replied sticker unlimited until stop"
		},
		usage: {
			en: "Reply to a sticker and type siir / stop to stop"
		}
	},

	onStart: async function ({ message, event, invokedAs }) {

		// أمر الإيقاف
		if (invokedAs === "stop") {
			running = false;
			return message.reply("🛑 تم إيقاف الأمر.");
		}

		const reply = event.messageReply;

		if (!reply?.attachments?.length) {
			return message.reply("❌ ردّ على ستيكر واكتب siir");
		}

		const attachment = reply.attachments[0];
		
		// إلا كان خدام من قبل ما يعودش يخدم
		if (running) {
			return message.reply("⚠️ راه خدام أصلا، كتب stop باش تحبسو");
		}

		running = true;

		// لا محدود حتى تكتب stop
		while (running) {
			await message.send({
				attachment: attachment
			});

			// تسنا ثانية باش ما يتباناش الكونط
			await new Promise(resolve => setTimeout(resolve, 1000));
		}

		running = false;
	}
};
