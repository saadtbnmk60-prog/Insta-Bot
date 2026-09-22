"use strict";

const activeSpams = new Map();

module.exports = {
	config: {
		name: "suur",
		aliases: ["suuur", "sur"],
		author: "Neoaz 🐊",
		category: "fun",
		cooldown: 1,
		role: 0,
		noPrefix: true,
		description: {
			en: "Repeat a replied image or sticker unlimited until stop"
		},
		usage: {
			en: "Reply to an image/sticker and type suur | suur stop"
		}
	},

	onStart: async function ({ message, event, args }) {
		const threadID = event.threadID;

		// أمر الإيقاف
		if (args[0] && args[0].toLowerCase() === "stop") {
			if (!activeSpams.has(threadID)) {
				return message.reply("❌ ما كاين حتى سبام خدام دابا.");
			}

			activeSpams.set(threadID, false);
			return message.reply("🛑 تم إيقاف السبام.");
		}

		const reply = event.messageReply;

		if (!reply ||!reply.attachments ||!reply.attachments.length) {
			return message.reply("❌ ردّ على صورة أو ستيكر واكتب suur");
		}

		if (activeSpams.get(threadID)) {
			return message.reply("⚠️ كاين سبام خدام بالفعل، استعمل: suur stop");
		}

		const attachment = reply.attachments[0];

		const imageURL =
			typeof attachment === "string"
				? attachment
				: attachment.url ||
				  attachment.uri ||
				  attachment.imageUrl ||
				  attachment.payload?.url;

		if (!imageURL) {
			return message.reply("❌ ماقدرتش نجيب رابط الصورة.");
		}

		activeSpams.set(threadID, true);

		try {
			// لا محدود حتى تكتب suur stop
			while (activeSpams.get(threadID)) {
				await message.send({
					attachment: await global.utils.getStreamFromURL(imageURL)
				});

				// تسنا ثانية باش ما يتباناش
				await new Promise(resolve => setTimeout(resolve, 1000));
			}
		} catch (err) {
			console.error(err);
		} finally {
			activeSpams.delete(threadID);
		}
	}
};
