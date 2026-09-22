"use strict";

module.exports = {
	config: {
		name: "spam",
		aliases: ["sp"],
		author: "Neoaz 🐊",
		category: "fun",
		cooldown: 5,
		role: 0,
		noPrefix: true,
		description: {
			en: "Send a message a limited number of times"
		}
	},

	onStart: async function ({ api, event, args }) {
		const { threadID } = event;

		const amount = parseInt(args[0]);

		if (!amount || amount <= 0) {
			return api.sendMessage(
				"❌ الاستعمال:\nspam [العدد] [الرسالة]\n\nمثال:\nspam 10 سلام عليكم",
				threadID
			);
		}

		const message = args.slice(1).join(" ");

		if (!message) {
			return api.sendMessage(
				"❌ خاصك تكتب الرسالة.\n\nمثال:\nspam 10 سلام عليكم",
				threadID
			);
		}

		let sent = 0;

		const sendBatch = async () => {
			for (let i = 0; i < 3 && sent < amount; i++) {
				sent++;
				await api.sendMessage(message, threadID);
			}

			if (sent >= amount) {
				clearInterval(timer);
			}
		};

		await sendBatch();

		if (sent < amount) {
			var timer = setInterval(sendBatch, 1000);
		}
	}
};
