"use strict";

module.exports = {
	config: {
		name: "nick",
		aliases: ["nickname", "كنية"],
		author: "Neoaz 🐊",
		category: "admin",
		cooldown: 2,
		role: 1,
		noPrefix: true,
		description: {
			en: "Change the nickname of a replied member"
		},
		usage: {
			en: "Reply to a member and use: nick [nickname]"
		}
	},

	onStart: async function ({ message, args, event, api }) {
		if (!event.messageReply) {
			return message.reply("❌ رد على رسالة العضو أولاً.");
		}

		const nickname = args.join(" ").trim();

		if (!nickname) {
			return message.reply(
				"❌ كتب الكنية الجديدة.\nمثال: nick SHTOT"
			);
		}

		const targetID = event.messageReply.senderID;

		try {
			await api.changeNickname(
				nickname,
				event.threadID,
				targetID
			);

			return message.reply(
				`✅ تبدلات الكنية بنجاح.\n\n👤 العضو: ${targetID}\n📝 الكنية: ${nickname}`
			);
		} catch (error) {
			console.error(error);
			return message.reply(
				"❌ مقدرتش نبدل الكنية. تأكد أن API ديال البوت كتدعم تغيير الكنيات."
			);
		}
	}
};
