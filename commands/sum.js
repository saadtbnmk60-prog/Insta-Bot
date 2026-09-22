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
			en: "Send 3 images per second until stopped"
		},
		usage: {
			en: "Reply to an image and type siir / stop"
		}
	},

	onStart: async function ({ message, event, invokedAs }) {

		if (invokedAs === "stop") {
			running = false;
			return message.reply("🛑 تم إيقاف السبام.");
		}

		if (running) {
			return message.reply("⚠️ كاين سبام خدام دابا، كتب stop باش تحبسو.");
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
				  attachment.imageUrl ||
				  attachment.payload?.url;

		if (!imageURL || typeof imageURL!== "string") {
			return message.reply("❌ ماقدرتش نجي
