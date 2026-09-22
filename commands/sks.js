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
			en: "Send a message unlimited until stop"
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
				return api.sendMessage("⚠️ ما كاين حتى سبام خدام.", threadID);
			}

			clearInterval(task);
			global.spamTasks.delete(threadID);

			return api.sendMessage("🛑 تم إيقاف السبام.", threadID);
		}

		// منع تشغيل سبام ثاني في نفس المجموعة
		if (global.spamTasks.has(threadID)) {
			return api.sendMessage("⚠️ كاين سبام خدام دابا. استعمل spam stop أولاً.", threadID);
		}

		// إلا كتبتي رقم كياخدو كعدد، إلا لا كيولي لا محدود
		let amount = parseInt(args[0]);
		let message;

		if (!isNaN(amount) && amount > 0) {
			// spam 10 سلام
			message = args.slice(1).join(" ");
			if (amount > 1000) amount = 1000; // تقدر تحيد هاد السطر إلا بغيتي لا محدود بالصح
		} else {
			// spam سلام -> لا محدود
			amount = Infinity;
			message = args.join(" ");
		}

		if (!message) {
			return api.sendMessage(
				"❌ الاستعمال:\nspam [الرسالة] -> لا محدود\nspam [العدد] [الرسالة] -> محدود\n\nمثال:\nspam سلام عليكم\nspam 10 سلام\n\nللإيقاف:\nspam stop",
				threadID
			);
		}

		let sent = 0;

		const sendBatch = async () => {
			for (let i = 0; i < 3; i++) {
				if (!global.spamTasks.has(threadID)) return;
				
				// إلا كان محدود وسالا كيحبس
				if (sent >= amount) {
					clearInterval(timer);
					global.spamTasks.delete(threadID
