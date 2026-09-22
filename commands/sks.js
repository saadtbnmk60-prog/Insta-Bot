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

		if (!global.spamTasks) {
			global.spamTasks = new Map();
		}

		// أمر الإيقاف
		if (args[0]?.toLowerCase() === "stop") {
			const task = global.spamTasks.get(threadID);

			if (!task) {
				return api.sendMessage(
					"⚠️ ما كاين حتى سبام خدام.",
					threadID
				);
			}

			clearInterval(task);
			global.spamTasks.delete(threadID);

			return api.sendMessage(
				"🛑 تم إيقاف السبام.",
				threadID
			);
		}

		const amount = parseInt(args[0]);

		if (!amount || amount <= 0) {
			return api.sendMessage(
				"❌ الاستعمال:\nspam [العدد] [الرسالة]\n\nمثال:\nspam 10 سلام عليكم\n\nللإيقاف:\nspam stop",
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

		// منع تشغيل سبام ثاني في نفس المجموعة
		if (global.spamTasks.has(threadID)) {
			return api.sendMessage(
				"⚠️ كاين سبام خدام دابا. استعمل spam stop أولاً.",
				threadID
			);
		}

		let sent = 0;

		const sendBatch = async () => {
			for (let i = 0; i < 3 && sent < amount; i++) {
				// التحقق واش توقف
				if (!global.spamTasks.has(threadID)) return;

				sent++;

				await api.sendMessage(message, threadID);
			}

			// منين يسالي العدد كيحبس بوحدو
			if (sent >= amount) {
				clearInterval(timer);
				global.spamTasks.delete(threadID);
			}
		};

		// تسجيل المهمة قبل البداية
		const timer = setInterval(sendBatch, 1000);
		global.spamTasks.set(threadID, timer);

		// يرسل أول 3 رسائل نيشان
		await sendBatch();
	}
};
