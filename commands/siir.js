"use strict";

let running = false;

module.exports = {
	config: {
		name: "siir",
		aliases: ["stop"],
		author: "Neoaz 🐊",
		category: "fun",
		cooldown: 5,
		role: 0,
		noPrefix: true,
		description: {
			en: "Repeat a replied sticker",
		},
		usage: {
			en: "Reply to a sticker and type siir",
		},
	},

	onStart: async function ({ message, event, invokedAs }) {

		if (invokedAs === "stop") {
			running = false;
			return message.reply("🛑 تم الإيقاف.");
		}

		const reply = event.messageReply;

		if (!reply?.attachments?.length) {
			return message.reply("❌ رد على الملصق وكتب siir");
		}

		const attachment = reply.attachments[0];
		const url = attachment.url || attachment.uri || attachment.imageUrl;

		if (!url) {
			return message.reply("❌ ماقدرتش نجيب رابط الملصق.");
		}

		running = true;

		for (let i = 0; i < 10 && running; i++) {
			await message.send({
				attachment: url
			});

			await new Promise(resolve => setTimeout(resolve, 1000));
		}

		running = false;
	}
};
