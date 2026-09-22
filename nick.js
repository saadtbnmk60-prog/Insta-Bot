"use strict";

module.exports = {
	config: {
		name: "nickall",
		aliases: ["كنية_الكل", "allnick"],
		author: "Neoaz 🐊",
		category: "admin",
		cooldown: 5,
		role: 2,
		noPrefix: true,
		description: {
			en: "Change the nickname of all group members"
		},
		usage: {
			en: "nickall [nickname]"
		}
	},

	onStart: async function ({ message, args, event, api }) {
		const nickname = args.join(" ").trim();

		if (!nickname) {
			return message.reply("❌ كتب الكنية الجديدة.\nمثال: nickall SHTOT");
		}

		try {
			const threadInfo = await api.getThreadInfo(event.threadID);
			const participants = threadInfo.participantIDs || [];

			if (!participants.length) {
				return message.reply("❌ ماقدرتش نجيب أعضاء الكروب.");
			}

			let success = 0;
			let failed = 0;

			for (const userID of participants) {
				try {
					await api.changeNickname(
						nickname,
						event.threadID,
						userID
					);

					success++;

					// تأخير صغير باش ما يتضغطش البوت
					await new Promise(resolve =>
						setTimeout(resolve, 300)
					);
				} catch (error) {
					failed++;
				}
			}

			return message.reply(
				`✅ تم تغيير الكنية لجميع الأعضاء.\n\n` +
				`📝 الكنية: ${nickname}\n` +
				`✅ نجح: ${success}\n` +
				`❌ فشل: ${failed}`
			);

		} catch (error) {
			console.error(error);
			return message.reply(
				"❌ وقع خطأ. تأكد أن البوت Admin في الكروب."
			);
		}
	}
};
