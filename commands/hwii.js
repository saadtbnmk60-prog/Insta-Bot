"use strict";

let spam = {};

module.exports = {
	config: {
		name: "hwii",
		aliases: ["hwiii", "hwi"],
		author: "Neoaz 🐊",
		category: "fun",
		cooldown: 5,
		role: 0,
		noPrefix: true,
		description: {
			en: "Repeat a replied image or sticker unlimited"
		},
		usage: {
			en: "Reply to an image/sticker and type hwii [number] or hwii stop"
		}
	},

	onStart: async function ({ message, event, args }) {

		// أمر الإيقاف
		if (args[0] && args[0].toLowerCase() === "stop") {
			spam[event.threadID] = false;
			return message.reply("🛑 تم إيقاف السبام.");
		}

		const reply = event.messageReply;

		if (!reply ||!reply.attachments ||!reply.attachments.length) {
			return message.reply("❌ ردّ على صورة أو ستيكر واكتب hwii");
		}

		const attachment = reply.attachments[0];
		
		const imageURL =
			typeof attachment === "string"
				? attachment
				: attachment.url ||
				  attachment.uri ||
				  attachment.imageUrl ||
				  attachment.payload?.url;

		// إلا كتبتي رقم كياخدو، إلا ما كتبتيش كيدير 10
		// الحد الأقصى 1000
		let count = parseInt(args[0]) || 10;
		if (count > 1000) count = 1000;
		if (count < 1) count = 1;

		spam[event.threadID] = true;

		for (let i = 0; i < count; i++) {

			// إلا تعطات أمر stop يوقف مباشرة
			if (!spam[event.threadID]) break;

			try {
				await message.send({
					attachment: await global.utils.getStreamFromURL(imageURL)
				});
			} catch (e) {
				console.error(e);
				break;
			}
		}

		spam[event.threadID] = false;
	}
};
