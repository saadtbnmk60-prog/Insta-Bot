"use strict";

module.exports = {
	config: {
		name: "تعريف",
		aliases: ["me", "info"],
		author: "Neoaz 🐊",
		category: "info",
		cooldown: 2,
		role: 0,
		noPrefix: true,
		description: {
			en: "Show my social media accounts"
		},
		usage: {
			en: "{p}تعريف"
		}
	},

	onStart: async function ({ message }) {
		const text = `
👤 معلوماتي

📸 Instagram: @smlihi
📘 Facebook: shtot

✨ تابعوني على حساباتي ❤️
`;

		return message.reply(text);
	}
};
