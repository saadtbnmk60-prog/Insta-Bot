"use strict";

let running = false;

module.exports = {
	config: {
		name: "spamimage",
		aliases: ["stopspam"],
		author: "Neoaz 🐊",
		category: "fun",
		cooldown: 5,
		role: 0,
		noPrefix: true,
		description: {
			en: "Send a replied image every second for testing"
		},
		usage: {
			en: "Reply to an image and type spamimage"
		}
	},

	onStart: async function ({ message, event, invokedAs }) {

		if (invokedAs === "stopspam") {
			running = false;
			return message.reply("🛑 تم إيقاف السبام.");
		}

		if (running) {
			return message.reply("⚠️ كاين سبام خدام دابا.");
		}

		const reply = event.messageReply;

		if (!reply?.attachments?.length) {
			return message.reply("❌ رد على صورة وكتب spamimage");
		}

		const attachment = reply.attachments[0];

		const imageURL =
			typeof attachment === "string"
				? attachment
				: attachment.url ||
				  attachment.uri ||
				  attachment.imageUrl;

		if (!imageURL || typeof imageURL !== "string") {
			return message.reply("❌ ماقدرتش نجيب رابط الصورة.");
		}

		running = true;

		try {
			for (let i = 0; i < 10 && running; i++) {

				await message.send({
					attachment: imageURL
				});

				await new Promise(resolve =>
					setTimeout(resolve, 1000)
				);
			}
		} catch (error) {
			console.error("spamimage:", error);
			message.reply("❌ وقع خطأ أثناء إرسال الصورة.");
		} finally {
			running = false;
		}
	}
};
