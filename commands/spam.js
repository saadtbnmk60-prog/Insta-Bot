"use strict";

let spam = {};

module.exports = {
	config: {
		name: "spam",
		aliases: ["spamm"],
		author: "Neoaz 🐊",
		category: "fun",
		cooldown: 5,
		role: 0,
		noPrefix: true,
		description: {
			en: "Repeat a replied image or sticker"
		},
		usage: {
			en: "Reply to an image/sticker and type spam [number] or spam stop"
		}
	},

	onStart: async function ({ message, event, args }) {

		// أمر الإيقاف
		if (args[0] && args[0].toLowerCase() === "stop") {
			spam[event.threadID] = false;
			return message.reply("🛑 تم إيقاف السبام.");
		}

		const reply = event.messageReply;

		if (!reply || !reply.attachments || !reply.attachments.length) {
			return message.reply("❌ ردّ على صورة أو ستيكر واكتب spam");
		}

		const attachment = reply.attachments[0];

		// إلا كتبتي رقم كياخدو، إلا ما كتبتيش كيدير 10
		// الحد الأقصى 50
		let count = parseInt(args[0]) || 100;
		if (count > 50) count = 1000;

		spam[event.threadID] = true;

		for (let i = 0; i < count; i++) {

			// إلا تعطات أمر stop يوقف مباشرة
			if (!spam[event.threadID]) break;

			await message.send({
				attachment: attachment
			});
		}

		spam[event.threadID] = false;
	}
};

دابا:

- "spam 10" → يرسل 100 مرات
- "spam 50" → يرسل 1000 مرة
- "spam stop" → يوقف السبام 🛑
