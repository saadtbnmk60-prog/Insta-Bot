"use strict";

const log = require("../src/logger");

// رسالة الترحيب الافتراضية
const DEFAULT_WELCOME = `مرحبا بك يا {userName} ❤️‍🔥
نورتينا فـ {threadName} ✨
 
╔════════════════════╗
      🦋 مرحبا بك في مجموعتنا 🦋
╚════════════════════╝


سعداء بانضمامك إلى عائلتنا.

┌────────────────────┐ 
│ 
│ الرجاء أن تكون عضوا محترما🦋
│ 
│
└────────────────────
ـــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــ|
نتمنى لك وقتًا جميلًا معنا.
احترم الجميع واستمتع بوقتك 🌿
ـــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــ|
    
 ¦ 𓆩⃝𝐁𝐨҉𝐭⌯★𝐿 .⃪  ─⃝ ͟𝙆𝙄𝙉𝙂 𝐒𝐇𝐓𝐎𝐓 ¦¦ 
ــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــ`;

module.exports = {
	config: {
		name: "onJoin",
		category: "system",
		eventType: "join",
		description: {
			en: "Welcome new members when they join a group"
		}
	},

	onEvent: async function ({
		api,
		event,
		message,
		config,
		threadsData
	}) {
		try {
			const welcome = config.welcome || {};

			// إذا كان الترحيب متوقف
			if (welcome.enable === false) return;

			const threadID = event.threadID;
			if (!threadID) return;

			// =========================
			// الحصول على اسم المجموعة
			// =========================
			let threadName = "المجموعة";

			try {
				const thread = threadsData.get(threadID) || {};

				if (thread.name) {
					threadName = thread.name;
				} else {
					const info = await new Promise((resolve) => {
						api.getThreadInfo(threadID, (err, result) => {
							if (err) return resolve(null);
							resolve(result);
						});
					});

					if (info && (info.name || info.threadName)) {
						threadName = info.name || info.threadName;

						try {
							threadsData.update(threadID, {
								name: threadName
							});
						} catch (_) {}
					}
				}
			} catch (error) {
				log.warn("JOIN", "Could not get thread name");
			}

			// =========================
			// استخراج العضو الجديد
			// =========================
			const members = [];

			// usernames
			if (Array.isArray(event.usernames)) {
				for (const username of event.usernames) {
					if (username) {
						members.push({
							username: String(username)
						});
					}
				}
			}

			// userIDs
			if (Array.isArray(event.userIDs)) {
				for (const userID of event.userIDs) {
					if (userID) {
						members.push({
							userID: String(userID)
						});
					}
				}
			}

			// participantID
			if (event.participantID) {
				members.push({
					userID: String(event.participantID)
				});
			}

			// addedParticipants
			const added =
				event.logMessageData &&
				(
					event.logMessageData.addedParticipants ||
					event.logMessageData.addedParticipantIDs
				);

			if (Array.isArray(added)) {
				for (const user of added) {
					if (typeof user === "object") {
						members.push({
							userID:
								user.userFbId ||
								user.userID ||
								user.id,
							username: user.username,
							name:
								user.fullName ||
								user.name
						});
					} else if (user) {
						members.push({
							userID: String(user)
						});
					}
				}
			}

			if (!members.length) {
				log.warn(
					"JOIN",
					"No joined member found in event"
				);
				return;
			}

			// =========================
			// إزالة التكرار
			// =========================
			const uniqueMembers = [];
			const seen = new Set();

			for (const member of members) {
				const key =
					member.userID ||
					member.username ||
					member.name;

				if (!key) continue;

				if (seen.has(String(key))) continue;

				seen.add(String(key));
				uniqueMembers.push(member);
			}

			// =========================
			// رسالة الترحيب
			// =========================
			// إذا كانت عندك رسالة في config تستعملها،
			// وإذا ما كانتش موجودة يستعمل الرسالة المدمجة هنا.
			const template =
				welcome.message || DEFAULT_WELCOME;

			// =========================
			// إرسال الترحيب
			// =========================
			for (const member of uniqueMembers) {
				let userName =
					member.username ||
					member.name ||
					null;

				// إذا عندنا ID نجيبو username/name
				if (!userName && member.userID) {
					try {
						const info = await new Promise((resolve) => {
							api.getUserInfo(
								member.userID,
								(err, result) => {
									if (err) {
										return resolve(null);
									}

									resolve(result);
								}
							);
						});

						const profile =
							info && info[member.userID];

						if (profile) {
							userName =
								profile.vanity ||
								profile.username ||
								profile.name ||
								profile.firstName;
						}
					} catch (error) {
						log.warn(
							"JOIN",
							"Could not get user information"
						);
					}
				}

				if (!userName) {
					userName = "عضو جديد";
				}

				// إضافة @ إذا كان username
				if (
					member.username &&
					!String(userName).startsWith("@")
				) {
					userName = "@" + userName;
				}

				// =========================
				// استبدال المتغيرات
				// =========================
				const text = String(template)
					.replace(
						/\{userName\}/gi,
						String(userName)
					)
					.replace(
						/\{threadName\}/gi,
						String(threadName)
					)
					// دعم الطريقة القديمة كذلك
					.replace(
						/%1/g,
						String(userName)
					)
					.replace(
						/%2/g,
						String(threadName)
					);

				// إرسال الرسالة
				await message.send(text);
			}

		} catch (error) {
			log.error(
				"JOIN",
				`Welcome error: ${error.stack || error.message}`
			);
		}
	}
};
