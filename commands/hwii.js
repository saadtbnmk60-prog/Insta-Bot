"use strict";

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
			en: "Reply to an image/sticker and type hwii [number]"
		}
	},

	onStart: async function ({ message, event, args }) {
		const reply = event.messageReply;

		if (!reply ||!reply.attachments ||!reply.attachments.length) {
			return message.reply("❌ ردّ على صورة أو ستيكر واكتب hwii");
		}

		const attachment = reply.attachments[0];

		// إلا كتبتي رقم كياخدو، إلا ما كتبتيش كيدير 10
		// درت ليه حد أقصى 50 باش ما يتباناش
		let count = parseInt(args[0]) || 10;
		if (count > 50) count = 50;

		for (let i = 0; i < count; i++) {
			await message.send({
				attachment: attachment
			});
		}
	}
};
