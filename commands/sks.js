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
			en: "Send a limited number of messages"
		}
	},

	onStart: async function ({ api, event, args }) {
		const { threadID } = event;

		// ==============================
		// ⚙️ إعدادات السبام
		// ==============================

		const MAX_MESSAGES = 30; // 🔴 الحد الأقصى للرسائل
		const MESSAGES_PER_SECOND = 3; // 🟢 3 رسائل فالثانية

		// ==============================

		if (!global.spamTasks) {
			global.spamTasks = new Map();
		}

		// 🛑 أمر الإيقاف
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
				`❌ الاستعمال:
spam [العدد] [الرسالة]

مثال:
spam 20 سلام عليكم

🟢 السرعة: ${MESSAGES_PER_SECOND} رسائل/الثانية
🔴 الحد الأقصى: ${MAX_MESSAGES} رسالة

🛑 للإيقاف:
spam stop`,
				threadID
			);
		}

		// 🔴 منع تجاوز الحد الأقصى
		if (amount > MAX_MESSAGES) {
			return api.sendMessage(
				`❌ العدد كبير بزاف.

🔴 الحد الأقصى المسموح: ${MAX_MESSAGES} رسالة
📌 أنت طلبت: ${amount} رسالة`,
				threadID
			);
		}

		const message = args.slice(1).join(" ");

		if (!message) {
			return api.sendMessage(
				"❌ خاصك تكتب الرسالة.\n\nمثال:\nspam 20 سلام عليكم",
				threadID
			);
		}

		// منع سبام ثاني
		if (global.spamTasks.has(threadID)) {
			return api.sendMessage(
				"⚠️ كاين سبام خدام دابا.\nاستعمل: spam stop",
				threadID
			);
		}

		let sent = 0;
		let timer;

		const sendBatch = async () => {
			for (
				let i = 0;
				i < MESSAGES_PER_SECOND && sent < amount;
				i++
			) {
				if (!global.spamTasks.has(threadID)) return;

				sent++;

				await api.sendMessage(
					message,
					threadID
				);
			}

			// ✅ منين يكمل العدد كيحبس بوحدو
			if (sent >= amount) {
				clearInterval(timer);
				global.spamTasks.delete(threadID);
			}
		};

		// تسجيل المهمة
		timer = setInterval(sendBatch, 1000);
		global.spamTasks.set(threadID, timer);

		// إرسال أول دفعة نيشان
		await sendBatch();
	}
};
