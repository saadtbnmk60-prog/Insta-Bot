"use strict";

let running = false;

module.exports = {
	config: {
		name: "siir",
		aliases: ["stopspam"],
		author: "Neoaz 🐊",
		category: "fun",
		cooldown: 5,
		role: 0,
		noPrefix: true,
		description: {
			en: "Send 3 replied images per second for testing"
		},
		usage: {
			en: "Reply to an image and type siir"
		}
	},

	onStart: async function ({ message, event, invokedAs }) {

		// إيقاف السبام
		if (invokedAs === "stopspam") {
			running = false;
			return message.reply("🛑 تم إيقاف إرسال الصور.");
		}

		if (running) {
			return message.reply("⚠️ كاين اختبار خدام دابا.");
		}

		const reply = event.messageReply;

		if (!reply?.attachments?.length) {
			return message.reply("❌ رد على صورة وكتب siir");
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
			// 10 دورات × 3 صور = 30 صورة
			for (let i = 0; i < 10 && running; i++) {

				// 3 صور في كل ثانية
				for (let j = 0; j < 3 && running; j++) {
					await message.send({
						attachment: imageURL
					});
				}

				if (running) {
				
