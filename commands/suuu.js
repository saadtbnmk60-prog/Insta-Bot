"use strict";

module.exports = {
	config: {
		name: "suuu",
		aliases: ["suu"],
		author: "Neoaz 🐊",
		category: "fun",
		cooldown: 5,
		role: 0,
		noPrefix: true,
		description: {
			en: "Repeat a replied image or sticker"
		},
		usage: {
			en: "Reply to an image/sticker and type suuu"
		}
	},

	onStart: async function ({ message, event }) {
		const reply = event.messageReply;

		if (!reply || !reply.attachments || !reply.attachments.length) {
			return message.reply("❌ ردّ على صورة أو ستيكر واكتب suuu");
		}

		const attachment = reply.attachments[0];

		// عدد التكرارات
		const count = 5;

		for (let i = 0; i < count; i++) {
			await message.send({
				attachment: attachment
			});
		}
	}
};
