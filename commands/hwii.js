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

		const imageURL =
			typeof attachment === "string"
				? attachment
				: attachment.url ||
				  attachment.uri ||
				  attachment.imageUrl ||
				  attachment.payload?.url;

		if (!imageURL) {
			return message.reply("❌ ما لقيتش رابط الصورة");
		}

		// إلا كتبتي رقم كياخدو، إلا ما كتبتيش كيدير 10
		// الحد الأقصى 1000
		let count = parseInt(args[0]) || 10;
		if (count > 1000) count = 1000;
		if (count < 1) count = 1;

		for (let i = 0; i < count; i++) {
			await message.send({
				attachment: await global.utils.getStreamFromURL(imageURL)
			});
		}
	}
};
