"use strict";

const games = new Map();

const EMOJIS = [
	// 😀 الوجوه
	"😀","😃","😄","😁","😆","😅","😂","🤣","😊","😇",
	"🙂","🙃","😉","😌","😍","🥰","😘","😗","😙","😚",
	"😋","😛","😝","😜","🤪","🤨","🧐","🤓","😎","🤩",
	"🥳","😏","😒","😞","😔","😟","😕","🙁","☹️","😣",
	"😖","😫","😩","🥺","😢","😭","😤","😠","😡","🤬",
	"🤯","😳","🥵","🥶","😱","😨","😰","😥","😓","🤗",
	"🤔","🤭","🤫","🤥","😶","😐","😑","😬","🙄","😯",
	"😦","😧","😮","😲","🥱","😴","🤤","😪","😵","🤐",
	"🥴","🤢","🤮","🤧","😷","🤒","🤕","🤑","🤠","👻",
	"💀","☠️","👽","🤖","🎃","😈","👿",

	// 🐾 الحيوانات
	"🐶","🐱","🐭","🐹","🐰","🦊","🐻","🐼","🐨","🐯",
	"🦁","🐮","🐷","🐽","🐸","🐵","🙈","🙉","🙊","🐒",
	"🐔","🐧","🐦","🐤","🐣","🐥","🦆","🦅","🦉","🦇",
	"🐺","🐗","🐴","🦄","🐝","🪱","🐛","🦋","🐌","🐞",
	"🐜","🪰","🪲","🪳","🦟","🦗","🕷️","🦂","🐢","🐍",
	"🦎","🦖","🦕","🐙","🦑","🦀","🦞","🦐","🐠","🐟",
	"🐡","🦈","🐬","🐳","🐋","🦭","🐊","🦧","🦍","🐘",
	"🦏","🦛","🐪","🐫","🦒","🦘","🦬","🐃","🐂","🐄",
	"🐎","🐖","🐏","🐑","🦙","🐐","🦌","🐕","🐩","🦮",
	"🐕‍🦺","🐈","🐈‍⬛","🐓","🦃","🦚","🦜","🦢","🦩",
	"🕊️","🐇","🦔","🦥","🦦","🦨","🦡","🐿️","🦫",

	// 🍎 الفواكه
	"🍏","🍎","🍐","🍊","🍋","🍋‍🟩","🍌","🍉","🍇","🍓",
	"🫐","🍈","🍒","🍑","🍍","🥭","🥝","🥥","🍅","🫒",

	// 🥕 الخضر
	"🥑","🥒","🥬","🥦","🥕","🌽","🌶️","🫑","🧄","🧅",
	"🥔","🍠","🫛","🫘","🍄","🥜","🌰","🎃",

	// 🌳 الطبيعة والنباتات
	"🌱","🌿","☘️","🍀","🎍","🪴","🌵","🌴","🌳","🌲",
	"🌾","🌷","🌹","🥀","🌺","🌸","🌼","🌻","💐","🪻",
	"🌞","🌝","🌛","🌜","⭐","🌟","✨","⚡","🔥","🌈",
	"☀️","🌤️","⛅","🌧️","⛈️","🌩️","❄️","☃️","⛄",
	"🌊","💧","💦","🌙",

	// 🍔 الأكل
	"🍞","🥐","🥖","🫓","🥨","🥯","🥞","🧇","🧀","🍖",
	"🍗","🥩","🥓","🍔","🍟","🍕","🌭","🌮","🌯","🥙",
	"🧆","🥚","🍳","🥘","🍲","🥣","🥗","🍿","🧈","🍜",
	"🍝","🍣","🍤","🍱","🍚","🍙","🍘","🍥","🥮","🍡",
	"🍧","🍨","🍦","🥧","🧁","🍰","🎂","🍪","🍩","🍫",
	"🍬","🍭","🍮","🍯","☕","🍵","🧃","🥤","🧋","🍹",

	// ⚽ الرياضة والألعاب
	"⚽","🏀","🏈","⚾","🥎","🎾","🏐","🏉","🥏","🎱",
	"🏓","🏸","🏒","🏑","🥍","🏏","🥊","🥋","⛳","🏹",
	"🎣","🤿","🏆","🥇","🥈","🥉","🎮","🕹️","🎲","🧩",
	"♟️","🎯","🎳","🎨","🎭","🎸","🎹","🥁","🎺",

	// 🚗 المواصلات
	"🚗","🚕","🚙","🚌","🚎","🏎️","🚓","🚑","🚒","🚐",
	"🛻","🚚","🚛","🚜","🏍️","🛵","🚲","🛴","✈️","🚀",
	"🚁","🚢","⛵","🚤","🚂","🚆","🚇","🚉","🚦","🛑",

	// 💎 الأشياء
	"⌚","📱","💻","⌨️","🖥️","🖨️","📷","📺","📻","💡",
	"🔦","📚","📖","✏️","🖊️","🔑","🔒","🔓","🔨","🪓",
	"⚙️","🧲","💎","💰","💵","🎁","🎈","🎉","🎊","👑",
	"💍","🕶️","🎩","👒","☂️","🧸","🪀","🪁","🛒",

	// ❤️ القلوب والرموز
	"❤️","🧡","💛","💚","💙","💜","🖤","🤍","🤎","💔",
	"❣️","💕","💞","💓","💗","💖","💘","💝","💟","❤️‍🔥",
	"❤️‍🩹","💯","💥","💫","💤","❗","❓","‼️","⁉️",
	"✅","❌","⭕","🔴","🟠","🟡","🟢","🔵","🟣","⚫",
	"⚪","🟤"
];

function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

function randomEmoji() {
	return EMOJIS[Math.floor(Math.random() * EMOJIS.length)];
}

const commands = module.exports = {
	config: {
		name: "emoji",
		aliases: ["emojigame", "لعبة"],
		author: "Neoaz 🐊",
		category: "fun",
		cooldown: 3,
		role: 0,
		noPrefix: true,
		description: {
			en: "Emoji battle game"
		},
		usage: {
			en: "emoji"
		}
	},

	onStart: async function ({ message, event }) {
		const threadID = String(event.threadID);

		if (games.has(threadID)) {
			return message.reply(
				"🎮🔥 اللعبة راه خدامة!\n" +
				"👥 كتب `join` باش تدخل."
			);
		}

		const game = {
			players: new Map(),
			started: false,
			round: 0,
			answer: null,
			waiting: false
		};

		games.set(threadID, game);

		await message.reply(
			"🎮🔥 **EMOJI BATTLE** 🔥🎮\n\n" +
			"👥 بغيتي تدخل؟ كتب:\n" +
			"`join`\n\n" +
			"❤️ كل لاعب يبدأ بـ 5 قلوب.\n" +
			"⏰ عندكم 20 ثانية للدخول!"
		);

		await sleep(20000);

		if (!games.has(threadID)) return;

		if (game.players.size < 2) {
			games.delete(threadID);

			return message.reply(
				"❌ خاص على الأقل جوج لاعبين باش تبدأ اللعبة."
			);
		}

		game.started = true;

		await message.reply(
			"🔥🎮 **بدأت اللعبة!** 🎮🔥\n\n" +
			`👥 اللاعبين: ${game.players.size}\n` +
			"❤️ كل واحد عندو 5 قلوب.\n\n" +
			"استعدوا! 😈"
		);

		await sleep(2000);

		playRound(threadID, message);
	},

	onChat: async function ({ message, event }) {
		const threadID = String(event.threadID);
		const game = games.get(threadID);

		if (!game) return;

		const text = String(event.body || "").trim();
		const senderID = String(event.senderID);

		// الانضمام
		if (!game.started && text.toLowerCase() === "join") {

			if (game.players.has(senderID)) {
				return message.reply("😂 راك داخل أصلاً!");
			}

			game.players.set(senderID, {
				id: senderID,
				name: event.senderName || "Player",
				hearts: 5
			});

			return message.reply(
				`🎮✅ دخلتي للعبة!\n` +
				`👤 ${event.senderName || "Player"}\n` +
				`❤️❤️❤️❤️❤️`
			);
		}

		if (!game.started || !game.waiting) return;

		const player = game.players.get(senderID);

		// غير اللاعبين مايدخلوش فالجولة
		if (!player) return;

		// الجواب الصحيح
		if (text === game.answer) {

			game.waiting = false;

			player.hearts++;

			await message.reply(
				`🏆🔥 **أول واحد جاوب صحيح!** 🔥🏆\n\n` +
				`👑 ${player.name}\n` +
				`🎯 الإيموجي: ${game.answer}\n` +
				`❤️ +1 قلب\n` +
				`💖 عندك دابا ${player.hearts} قلوب!`
			);

			return;
		}
	}
};

async function playRound(threadID, message) {

	const game = games.get(threadID);

	if (!game) return;

	const alive = [...game.players.values()]
		.filter(player => player.hearts > 0);

	if (alive.length <= 1) {

		if (alive.length === 1) {
			await message.reply(
				"🏆👑 **الفائز!** 👑🏆\n\n" +
				`🥇 ${alive[0].name}\n` +
				`❤️ القلوب: ${alive[0].hearts}\n\n` +
				"🎉 مبروك! 🎉"
			);
		}

		games.delete(threadID);
		return;
	}

	game.round++;

	const emoji = randomEmoji();

	game.answer = emoji;
	game.waiting = true;

	await message.reply(
		"━━━━━━━━━━━━━━━━━━\n" +
		`🎮🔥 الجولة ${game.round} 🔥🎮\n` +
		"━━━━━━━━━━━━━━━━━━\n\n" +
		"🔢 1️⃣\n" +
		"🔢 2️⃣\n" +
		"🔢 3️⃣\n\n" +
		`👀 **الإيموجي:** ${emoji}\n\n` +
		"⚡ أول واحد يرسل نفس الإيموجي يربح!\n" +
		"⏰ عندكم 10 ثواني!\n\n" +
		"❤️ اللاعبين:\n" +
		alive
			.map(p => `${p.name}: ${"❤️".repeat(p.hearts)}`)
			.join("\n")
	);

	await sleep(10000);

	if (!games.has(threadID)) return;

	// إذا ماجاوب حتى واحد
	if (game.waiting) {

		game.waiting = false;

		for (const player of alive) {
			player.hearts--;
		}

		await message.reply(
			"⏰💀 **سالا الوقت!**\n\n" +
			"❌ حتى واحد ماجاوبش.\n" +
			"💔 كل اللاعبين نقصات ليهم قلب."
		);
	}

	// إزالة اللاعبين اللي سالاو القلوب
	const eliminated = [];

	for (const [id, player] of game.players) {

		if (player.hearts <= 0) {
			eliminated.push(player);
			game.players.delete(id);
		}
	}

	for (const player of eliminated) {

		await message.reply(
			"━━━━━━━━━━━━━━━━━━\n" +
			"🚫💔 **تمت الإزالة!**\n" +
			"━━━━━━━━━━━━━━━━━━\n\n" +
			`👤 ${player.name}\n` +
			"❤️ القلوب: 0\n\n" +
			"😢 خرج من اللعبة!"
		);
	}

	await sleep(1500);

	playRound(threadID, message);
}
