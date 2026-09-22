"use strict";

module.exports = {
	config: {
		name: "welcome",
		author: "Neoaz 🐊",
		category: "events"
	},

	onStart: async function ({ event, message }) {
		if (event.logMessageType !== "log:subscribe") return;

		const participants = event.logMessageData?.addedParticipants;
		if (!participants || participants.length === 0) return;

		const threadName = event.threadName || "مجموعتنا";

		for (const user of participants) {
			const userName = user.fullName || "صديقنا";

			const text = `
مرحبا بك يا ${userName} ❤️‍🔥
نورتينا فـ ${threadName} ✨

╔════════════════════╗
      🦋 مرحبا بك في مجموعتنا 🦋
╚════════════════════╝

سعداء بانضمامك إلى عائلتنا.

┌────────────────────┐
│
│ الرجاء أن تكون عضوا محترما 🦋
│
└────────────────────

ـــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــ

نتمنى لك وقتًا جميلًا معنا.
احترم الجميع واستمتع بوقتك 🌿

ـــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــ

¦ 𓆩⃝𝐁𝐨҉𝐭⌯★𝐿 .⃪ ─⃝ ͟𝙆𝙄𝙉𝙂 𝐒𝐇𝐓𝐎𝐓 ¦¦

ــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــ
`;

			await message.reply(text);
		}
	}
};
