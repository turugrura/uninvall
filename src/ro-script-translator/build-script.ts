const mapAll = {
	เพิ่มพลังโจมตีทางกายภาพและเวทย์ต่อศัตรูธาตุ: [
		'p_element_{a}',
		'm_element_{a}',
	],
	'เพิ่ม Damage ทางกายภาพ/เวทมนตร์ต่อศัตรูธาตุ': [
		'p_element_{a}',
		'm_element_{a}',
	],
	'เพิ่ม Damage ทางกายภาพ/เวทมนตร์ต่อศัตรูทุกธาตุ': [
		'p_element_all',
		'm_element_all',
	],
	'เพิ่ม Damage ทางกายภาพและเวทมนตร์ต่อศัตรูทุกธาตุ': [
		'p_element_all',
		'm_element_all',
	],
	'เพิ่ม Damage ทางกายภาพระยะใกล้และระยะไกล': ['range', 'melee'],
	'เพิ่ม Damage ทางกายภาพและเวทมนตร์ต่อศัตรูทุกประเภท': [
		'p_class_all',
		'm_class_all',
	],
	'เพิ่ม Damage ทางกายภาพ/เวทมนตร์ต่อศัตรูทุกประเภท': [
		'p_class_all',
		'm_class_all',
	],
	'เพิ่ม Damage ทางกายภาพ/เวทมนตร์ต่อศัตรูทุกขนาด': [
		'p_size_all',
		'm_size_all',
	],
	'เพิ่ม Damage ต่อศัตรูทุกเผ่า': ['p_race_all', 'm_race_all'],
};
const mapPrefix = {
	'เพิ่ม Damage ทางเวทมนตร์ธาตุ': 'm_my_element',
	'เพิ่ม Damage เวทมนตร์ธาตุ': 'm_my_element',
	'เพิ่ม Damage ทางเวทย์ธาตุ': 'm_my_element',
	เพิ่มดาเมจทางเวทย์ธาตุ: 'm_my_element',
	เพิ่มความเสียหายทางเวทธาตุ: 'm_my_element',
	'เพิ่ม Damage ทางเวทมนตร์ต่อศัตรูธาตุ': 'm_element',
	'เพิ่ม Damage ทางเวทมนต์ธาตุ': 'm_element',
	'เพิ่ม Damage ทางเวทมนตร์ที่ทำต่อมอนสเตอร์ธาตุ': 'm_element',
	'เพิ่ม Damage ทางเวทมนตร์ต่อมอนสเตอร์ประเภท': 'm_race',
	เพิ่มพลังโจมตีทางเวทย์ที่สร้างต่อศัตรูเผ่า: 'm_race',
	'เพิ่ม Damage ทางเวทย์ที่ทำต่อศัตรูขนาด': 'm_size',

	'เพิ่ม Damage ทางกายภาพต่อศัตรูธาตุ': 'p_element',
	'เพิ่ม Damage ทางกายภาพต่อมอนสเตอร์ธาตุ': 'p_element',
	'เพิ่ม Damage ทางกายภาพที่ทำต่อศัตรูธาตุ': 'p_element',
	'เพิ่ม Damage ทางกายภาพเมื่อโจมตีมอนสเตอร์ธาตุ': 'p_element',
	'เพิ่ม Damage ทางกายภาพต่อมอนสเตอร์ประเภท': 'p_class',
	'เพิ่ม Damage ทางกายภาพต่อศัตรูประเภท': 'p_race',
	'เพิ่ม Damage ทางกายภาพเมื่อโจมตีมอนสเตอร์เผ่า': 'p_race',
	'เพิ่ม Damage ทางกายภาพที่ทำต่อศัตรูขนาด': 'p_size',
	'เพิ่ม Damage ทางกายภาพที่สร้างต่อศัตรูขนาด': 'p_size',
	เพิ่มพลังโจมตีทางกายภาพที่สร้างต่อมอนสเตอร์ขนาด: 'p_size',
	'เพิ่มพลังโจมตีทางกายภาพ/ทางเวทมนตร์ต่อศัตรูขนาด': 'p_size',
	'เพิ่ม Damage ทางกายภาพแก่ศัตรูขนาด': 'p_size',
};
const map = {
	เพิ่มพลังโจมตีธนู: 'bowRange',
	เพิ่มพลังโจมตีของธนู: 'bowRange',
	เพิ่มพลังโจมตีธนูครั้งละ: 'bowRange',
	'เพิ่มพลังโจมตีอาวุธประเภท Bow': 'bowRange',
	'เพิ่มพลังโจมตีของอาวุธประเภท Bow': 'bowRange',

	'เพิ่ม Damage ทางกายภาพระยะไกล': 'range',
	'เพิ่ม Damage การโจมตีระยะไกล': 'range',
	เพิ่มดาเมจทางกายภาพระยะไกล: 'range',
	เพิ่มพลังโจมตีทางกายภาพระยะไกล: 'range',
	'เพิ่ม Damage ระยะไกล': 'range',
	'Damage ทางกายภาพระยะไกล': 'range',
	'เพิ่ม Damage ทางกายภาพระยะไกลต่อศัตรูทั้งหมด': 'range',
	เพิ่มการโจมตีทางกายภาพระยะไกล: 'range',
	'เพิ่ม Damage จากการโจมตีระยะไกลทีละ': 'range',
	เพิ่มพลังโจมตีระยะไกล: 'range',
	กายภาพระยะไกล: 'range',
	เพิ่มพลังโจมตีกายภาพระยะไกล: 'range',
	'เพิ่ม Damage ทางกายภาพระยะไกลต่อศัตรูทุกประเภท': 'range',

	'เพิ่ม Damage ทางกายภาพระยะใกล้': 'melee',

	'เพิ่ม Damage ทางกายภาพต่อศัตรูทุกธาตุ': 'p_element_all',
	'เพิ่ม Damage ทางกายภาพต่อศัตรูทุกขนาด': 'p_size_all',
	'เพิ่ม Damage ทางกายภาพแก่ศัตรูทุกขนาด': 'p_size_all',
	'เพิ่ม Damage ทางกายภาพที่ทำต่อศัตรูทุกขนาด': 'p_size_all',
	'เพิ่ม Damage ทางกายภาพต่อศัตรูขนาดเล็ก': 'p_size_s',
	'เพิ่ม Damage ทางกายภาพต่อมอนสเตอร์ทุกเผ่า': 'p_race_all',
	'เพิ่ม Damage ทางกายภาพต่อศัตรูทุกเผ่า': 'p_race_all',
	ทางกายภาพที่สร้างต่อศัตรูทุกเผ่า: 'p_race_all',
	'เพิ่มพลังโจมตีทางกายภาพที่สร้างต่อศัตรูธาตุ Neutral': 'p_element_neutral',
	'เพิ่ม Damage เมื่อโจมตีมอนสเตอร์ทุกประเภท (ทั่วไป, Boss, Guardian)':
		'p_class_all',
	'เพิ่ม Damage ทางกายภาพต่อศัตรูประเภทบอส': 'p_class_boss',
	'เพิ่ม Damage ทางกายภาพต่อศัตรูทุกประเภท': 'p_class_all',
	'เพิ่ม Damage ทางกายภาพแก่ศัตรูทุกประเภท': 'p_class_all',
	'เพิ่มค่า เพิ่ม Damage ทางกายภาพต่อศัตรูทุกประเภท': 'p_class_all',
	เพิ่มพลังโจมตีทางกายภาพต่อมอนสเตอร์ทุกประเภท: 'p_class_all',
	'เพิ่ม Damage ทางกายภาพต่อมอนสเตอร์ทุกประเภท': 'p_class_all',
	'เพิ่ม Damage ทางกายภาพต่อมอนสเตอร์ขนาดใหญ่': 'p_class_l',

	'เพิ่ม Damage ทางเวทมนตร์ทุกธาตุ': 'm_my_element_all',
	'เพิ่ม Damage ทางเวททุกธาตุ': 'm_my_element_all',
	เพิ่มพลังโจมตีเวทมนตร์ทุกธาตุ: 'm_my_element_all',
	'เพิ่ม Damage การโจมตีทางเวทมนตร์ทุกธาตุ': 'm_my_element_all',
	'เพิ่มพลังโจมตีทางเวทย์ธาตุ Fire': 'm_my_element_fire',
	'เพิ่ม Damage ทางเวทมนตร์ธาตุ Ghost': 'm_my_element_ghost',
	'เพิ่มพลังโจมตีทางเวทย์ที่สร้างต่อศัตรูธาตุ Neutral ขึ้น':
		'm_element_neutral',
	'เพิ่ม Damage ทางเวทมนตร์ต่อศัตรูทุกธาตุ': 'm_element_all',
	'เพิ่ม Damage เวทมนตร์ทุกธาตุ': 'm_my_element_all',
	'เพิ่ม Damage ทางเวทต่อศัตรูทุกประเภท': 'm_class_all',
	'เพิ่ม Damage ทางเวทมนตร์ต่อศัตรูทุกประเภท': 'm_class_all',
	'เพิ่ม Damage ทางเวทมนตร์ต่อศัตรูทุกขนาด': 'm_size_all',
	'เพิ่ม Damage ทางเวทมนตร์ต่อมอนสเตอร์ทุกขนาด': 'm_size_all',
	'เพิ่ม Damage การโจมตีทางเวทมนตร์ต่อศัตรูทุกขนาด': 'm_size_all',
	'เพิ่ม Damage ทางเวทย์ต่อศัตรูทุกขนาด': 'm_size_all',
	ทางเวทย์ที่สร้างต่อศัตรูทุกขนาด: 'm_size_all',
	'เพิ่ม Damage เวทมนตร์ที่ทำต่อศัตรูทุกขนาด': 'm_size_all',
	'เพิ่ม Damage ทางเวทย์ที่ทำต่อศัตรูขนาดใหญ่': 'm_size_l',
	'เพิ่ม Damage ทางเวทย์ต่อศัตรูขนาดกลาง': 'm_size_m',
	ทางเวทย์แก่มอนสเตอร์ประเภทบอส: 'm_class_boss',
	'เพิ่ม Damage ทางเวทมนตร์ต่อศัตรูทุกเผ่า': 'm_race_all',
	'เพิ่ม Damage ทางเวทมนตร์ต่อมอนสเตอร์ทุกเผ่า': 'm_race_all',

	'ลด Delay หลังใช้สกิล': 'acd',
	'ลด Delay หลังใช้สกิลลง': 'acd',
	'ลด Delay ในการร่าย': 'acd',
	ลดดีเลย์หลังใช้สกิล: 'acd',
	ลดดีเลย์หลังใช้สกิลลง: 'acd',
	'ลด Delayหลังการใช้สกิล': 'acd',
	ลดดีเลย์หลังจากใช้สกิล: 'acd',
	ลดการดีเลย์หลังร่ายสกิล: 'acd',
	ลดดีเลย์หลังโจมตีลง: 'acd',

	ลดระยะเวลาร่ายแบบคงที่: 'fct',
	'Fixed Cast Time': 'fct',
	ลดระยะเวลาร่ายแบบคงตัว: 'fct',
	ลดระยะเวลาร่ายแบบคงที่ลง: 'fct',

	ลดเวลาในการร่ายแบบผันแปร: 'vct',
	ลดระยะเวลาร่ายแบบแปรผัน: 'vct',
	ลดระยะเวลาการร่ายแบบแปรผัน: 'vct',
	'ลด Variable Cast Time': 'vct',
	'Variable Cast Time ลดลง': 'vct',
	ลดระยะเวลาร่าย: 'vct',
	ลดระยะเวลาการร่ายเวทย์ลง: 'vct',
	ลดระยะเวลาร่ายแบบแปรผันลง: 'vct',
	ลดระยะร่ายแบบแปรผัน: 'vct',
	ลดการร่ายแบบแปรผัน: 'vct',

	'ลด Delay หลังการโจมตี': 'aspdPercent',

	'เพิ่มความทนทานจากการโจมตีของ Player': 'resist_player',
	'เพิ่มความทนทานจากการโจมตีจาก Player': 'resist_player',
	HIT: 'hit',
	'Perfect Hit': 'perfectHit',
	'PERFECT HIT': 'perfectHit',
	flee: 'flee',
	FLEE: 'flee',
	'เพิ่ม Critical Damage': 'criDmg',
	'เพิ่ม Crirical Damage': 'criDmg',
	'เพิ่ม Critical Damage ทีละ': 'criDmg',
	'Critical Damage': 'criDmg',
	เพิ่มความแรงคริติคอล: 'criDmg',
	CRI: 'cri',
	เพิ่มโอกาสคริติคอล: 'cri',
	โอกาสคริติคอล: 'cri',
	ASPD: 'aspd',
	'เพิ่ม ASPD': 'aspd',
	ความเร็วในการโจมตีเพิ่มขึ้น: 'aspd',
	'เพิ่มความเร็วการโจมตี  (ลดดีเลย์หลังการโจมตี': 'aspd',
	'เพิ่ม MATK': 'atk',
	MATK: 'matk',
	ATK: 'atk',
	'เพิ่ม ATK': 'atk',
	MaxHP: 'hp',
	MHP: 'hp',
	HP: 'hp',
	MaxSP: 'sp',
	MSP: 'sp',
	SP: 'sp',
	DEF: 'def',
	MDEF: 'mdef',
	'All Status': 'allStatus',
	'All State': 'allStatus',
	STR: 'str',
	DEX: 'dex',
	AGI: 'agi',
	LUK: 'luk',
	INT: 'int',
	VIT: 'vit',
	'EXP ที่ได้รับจากมอนสเตอร์': 'exp',
	เพิ่มค่าประสบการณ์ที่ได้รับ: 'exp',
	'Item Drop Rate': 'itemDrop',
};

export class BuildScript {
	private _scripts = {};
	private _extractedScript!: {
		expressions: string[];
		comboes: Record<string, string[]>;
	};
	private patterns = {
		skill: ['เมื่อใช้สกิล'],
		step: [
			'ทุกการอัพเกรด',
			'ทุก ๆ การอัปเกรด',
			'ทุก ๆ การอัพเกรด',
			'ทุก ๆ Base',
		],
		constant: [
			'เมื่ออัพเกรดถึงขั้น',
			'เมื่ออัพเกรดขั้น',
			'เมื่ออัปเกรดถึงขั้น',
			'ATK',
			'MSP',
		],
		itemSet: ['เมื่อสวมใส่ร่วมกับ', 'เมื่อใส่ร่วมกับ'],
		mainState: [
			'All Status',
			'ลดระยะเวลาร่ายแบบคงที่',
			'MaxHP',
			'MaxSP',
			'HIT',
			'STR',
			'AGI',
			'VIT',
			'INT',
			'DEX',
			'LUK',
			'CRI',
			'เพิ่มพลังโจมตี',
		],
	};
	private regex = {
		toSteps: [
			/ทุก.*การอัพเกรด (.+) ขั้น (.+)/,
			/ทุก.*การอัปเกรด (.+) ขั้น (.+)/,
		],
		toConstants: [
			/เมื่ออัพเกรด.*ขั้น (\d+)\s*,*\s*(\D+\d+.+)/,
			/เมื่ออัปเกรดถึงขั้น (\d+)\s*,*\s*(\D+\d+.+)/,
			/เมื่ออัพเกรดตั้งแต่\s*(\d+)(.+)/,
		],
		toConstants2: [/เพิ่ม\s*(.+)\s*เมื่ออัพเกรด\D+(\d+)/],
	};
	private statePatterns = [
		...this.patterns.step,
		...this.patterns.constant,
		...this.patterns.skill,
		...this.patterns.itemSet,
		...this.patterns.mainState,
	];

	private mapSize = {
		small: 's',
		เล็ก: 's',
		มอนสเตอร์เล็ก: 's',
		medium: 'm',
		กลาง: 'm',
		มอนสเตอร์กลาง: 'm',
		large: 'l',
		ใหญ่: 'l',
		มอนสเตอร์ใหญ่: 'l',
	} as any;

	get scripts() {
		return this._scripts;
	}

	get expressions() {
		return this._extractedScript.expressions;
	}

	get comboes() {
		return this._extractedScript.comboes;
	}

	constructor(private rawItemDescription: string) {
		this.extractItemExpressionTh2(this.rawItemDescription);
		this.toScripts(
			this._extractedScript.expressions,
			this._extractedScript.comboes,
		);
	}

	getComboScript(
		rawExpression: string,
	): { actualAttr?: string; bonus?: string }[] {
		const scripts = [] as { actualAttr?: string; bonus?: string }[];

		const autoRegex = /กับ.\s*(.+?)\sเมื่อโจมตี.*(มีโอกาส.*?\s)(.*)/;
		const [_raw, comboItem, isAuto, chanceScript] =
			rawExpression.match(autoRegex) ?? [];
		if (isAuto) {
			const timeRegex = /\s*เป็นเวลา.+(\d+.*)/;
			const [_1, time] = chanceScript.match(timeRegex) ?? [];
			const rawScript = chanceScript.replace(timeRegex, '');

			for (const expression of rawScript
				.split(',')
				.map((a) => a.trim())
				.filter((a) => a.match(/\d/))) {
				for (const a of this.getMiniScript(expression)) {
					scripts.push({
						actualAttr: `chance__${a.actualAttr}`,
						bonus: `EQUIP[${comboItem}]===${a.bonus}`,
					});
				}
			}

			return scripts;
		}

		const aSetRegex = /(เมื่อ.+?,)/i;
		const expressions = rawExpression
			.replace(aSetRegex, '')
			.trim()
			.split(',')
			.map((a) => a.trim());
		const [_, combo] = rawExpression.match(/\s(.*?),\s/) ?? [];
		for (const expression of expressions.filter((a) => a.match(/\d/))) {
			// console.log({expression})
			for (const a of this.getMiniScript(expression)) {
				scripts.push({
					actualAttr: a.actualAttr,
					bonus: `EQUIP[${combo}]===${a.bonus}`,
				});
			}
		}

		return scripts;
	}

	getAutoByAtkScript(
		rawExpression: string,
	): { actualAttr?: string; bonus?: string }[] {
		const scripts = [] as { actualAttr?: string; bonus?: string }[];
		const autoRegex = /เมื่อ(.+?)\sมีโอกาส.*ใช้(.*)/;
		const [_raw, action, chanceScript] = rawExpression.match(autoRegex) ?? [];
		// console.log({rawExpression})
		if (action && chanceScript) {
			const timeRegex = /\s*เป็นเวลา.+(\d+.*)/;
			const [_1, time] = chanceScript.match(timeRegex) ?? [];
			const rawScript = chanceScript.replace(timeRegex, '');

			for (const expression of rawScript.split(',').map((a) => a.trim())) {
				// console.log({expression})
				const buffs = this.getMiniScript(expression);
				if (Array.isArray(buffs) && buffs.length > 0) {
					for (const { actualAttr, bonus } of buffs) {
						scripts.push({
							actualAttr: `chance__${actualAttr}`,
							bonus: `${bonus}`,
						});
					}
				} else {
					scripts.push({
						actualAttr: 'chance__',
						bonus: `${expression}`,
					});
				}
			}
		}

		return scripts;
	}

	getAutoBySkillScript(
		rawExpression: string,
	): { actualAttr?: string; bonus?: string }[] {
		const scripts = [] as { actualAttr?: string; bonus?: string }[];
		const { chanceScript, skillName } = this.isBuffWhenSkill(rawExpression)!;
		// console.log({rawExpression})
		if (skillName && chanceScript) {
			const timeRegex = /\s*เป็นเวลา\D+(\d+.*ที)/;
			const [_1, time] = chanceScript.match(timeRegex) ?? [];
			const rawScript = chanceScript.replace(timeRegex, '');

			for (const expression of rawScript.split(',').map((a) => a.trim())) {
				// console.log({expression})
				const buffs = this.getMiniScript(expression);
				if (Array.isArray(buffs) && buffs.length > 0) {
					for (const { actualAttr, bonus } of buffs) {
						scripts.push({
							actualAttr: `chance__${actualAttr}`,
							bonus: `${bonus}`,
						});
					}
				} else {
					scripts.push({
						actualAttr: 'chance__',
						bonus: expression,
					});
				}
			}
		}

		return scripts;
	}

	matchBonusScript(usableStr: string) {
		const multiRegex = /(เพิ่ม\D+)\s*(\d+)/;
		const multiRegex2 = /(ลด\D+)\s*(\d+)/;
		const multiRegex3 =
			/(Variable Cast Time ลดลง|ลดระยะเวลาร่าย\D+|ความเร็วในการโจมตีเพิ่มขึ้น|ลดความ|ลาดาเมจ\D+)\s*(\d+)/;
		const fixCast1 = /ลด\s*(Fixed\D+)\s*(\d+\.*\d*)/;
		const fixCast2 = /(ลดระยะเวลาร่ายแบบคง\D+)\s*(\d+\.*\d*)/;
		const constantRegex =
			/(All State|All Status|Perfect Hit|MATK|FLEE|ATK|DEX|MDEF|DEF|INT|VIT|AGI|STR|CRI|Critical Damage|ASPD|SPD|MaxHP|MHP|HP|MaxSP|SP|MSP|HIT)\D*(\d+%*)/;
		const constantRegex2 =
			/(Damage ทางกายภาพระยะไกล|ความเร็วในการโจมตี|Item Drop Rate|EXP ที่ได้รับจากมอนสเตอร์|โอกาสคริติคอล)\D*(\d+%*)/;
		// console.log({usableStr, m: usableStr.match(fixCast2)})
		return (
			usableStr.match(fixCast1) ||
			usableStr.match(fixCast2) ||
			usableStr.match(multiRegex3) ||
			// usableStr.match(constantRegexPercent) ||
			usableStr.match(multiRegex) ||
			usableStr.match(multiRegex2) ||
			usableStr.match(constantRegex) ||
			usableStr.match(constantRegex2)
		);
	}

	matchRefineConstantBonus(
		rawExpression: string,
	): { condition: string; script: string } | undefined {
		const usable = rawExpression.trim();
		// console.log({rawExpression})
		for (const regex of this.regex.toConstants) {
			const [_raw, condition, script] = usable.match(regex) ?? [];
			// if (matched?.length >= 2) return matched[1];
			// console.log({rawExpression, condition, script})
			if (condition && script) {
				return { condition, script };
			}
		}
		for (const regex of this.regex.toConstants2) {
			const [_raw, script, condition] = usable.match(regex) ?? [];
			if (condition && script) {
				return { condition, script };
			}
		}

		return undefined;
	}

	matchRefineStepBonus(
		rawExpression: string,
	): { every: string; bonusScript: string } | undefined {
		const usable = rawExpression.trim();
		for (const regex of this.regex.toSteps) {
			const [_, every, bonusScript] = usable.match(regex) ?? [];
			if (every && bonusScript) {
				return { every, bonusScript };
			}
		}

		return;
	}

	getMiniScript(
		rawExpression: string,
	): { actualAttr?: string; bonus?: string }[] {
		// if (rawExpression.startsWith('เมื่อใช้ร่วมกับ')) {
		//   return this.getComboScript(rawExpression.replace('เมื่อใช้ร่วมกับ', ''))
		// }
		if (this.isCombo(rawExpression)) {
			return this.getComboScript(rawExpression.replace('เมื่อสวมใส่', ''));
		}
		if (this.isAutoByAtk(rawExpression)) {
			return this.getAutoByAtkScript(rawExpression);
		}
		if (this.isBuffWhenSkill(rawExpression)) {
			return this.getAutoBySkillScript(rawExpression);
		}

		const usableStr = rawExpression.replace(/(ขึ้น)?อีก\s*/, '');
		const [_raw, attr, bonus] = this.matchBonusScript(usableStr) ?? [];
		// console.log({rawExpression, attr, bonus})

		const scripts = [] as any[];
		if (attr && bonus) {
			const actualAttr = (map[attr] ?? attr).trim() as string;
			const goodBonus = Number.isNaN(Number(bonus))
				? bonus.replace(/\D/g, '')
				: bonus;
			// console.log({actualAttr, bonus, goodBonus})
			if (
				[
					'atk',
					'matk',
					'mhp',
					'maxhp',
					'hp',
					'msp',
					'maxsp',
					'sp',
					'aspd',
				].includes(actualAttr.toLowerCase()) &&
				bonus.includes('%')
			) {
				const goodAttr = `${actualAttr}Percent`;
				return [{ actualAttr: goodAttr, bonus: goodBonus }];
			}

			scripts.push({ actualAttr, bonus: goodBonus });
		}

		return scripts;
	}

	toRefineConstantBonus(
		params?: string | { condition: string; script: string },
	): any[] {
		let rawExpression = '';
		let condition = '';
		if (typeof params === 'string') {
			const mached =
				this.matchRefineConstantBonus(params) ??
				this.matchBaseBonusStat(params)!;
			rawExpression = mached.script;
			condition = mached.condition;
		} else {
			rawExpression = (params as any).script;
			condition = (params as any).condition;
		}
		// console.log({condition, rawExpression})
		const scriptStr = rawExpression
			.replace(/ขึ้นอีก\s*/, '')
			.replace(this.regex.toConstants[0], '')
			.replace(this.regex.toConstants[1], '')
			.trim();
		const all = [];
		if (this.isBuffWhenSkill(scriptStr)) {
			// console.log({scriptStr})
			for (const { actualAttr, bonus } of this.getMiniScript(scriptStr)) {
				if (actualAttr) {
					all.push({ [actualAttr]: `${condition}===${bonus}` });
				}
			}

			return all;
		}

		if (scriptStr.includes('และเมื่อ')) {
			const scripts = scriptStr
				.split('และ')
				.map((a) => a.trim())
				.filter((a) => !!a);
			for (const ss of scripts) {
				for (const { actualAttr, bonus } of this.getMiniScript(ss)) {
					if (actualAttr) {
						all.push({ [actualAttr]: `${condition}===${bonus}` });
					}
				}
			}
			if (all.length > 0) return all;
		}

		const scripts = scriptStr
			.split(',')
			.map((a) => a.trim())
			.filter((a) => !!a);
		for (const ss of scripts) {
			// console.log({ss})
			for (const { actualAttr, bonus } of this.getMiniScript(ss)) {
				// console.log({scriptStr, actualAttr, bonus})
				if (actualAttr) {
					all.push({ [actualAttr]: `${condition}===${bonus}` });
				}
			}
		}
		if (all.length > 0) return all;

		const checkes = this.getMiniScript(scriptStr);
		// console.log({checkes})
		if (Array.isArray(checkes) && checkes.length > 0) {
			for (const { actualAttr, bonus } of checkes) {
				if (actualAttr) {
					all.push({ [actualAttr]: `${condition}===${bonus}` });
				}
			}

			return all;
		}

		return all;
	}

	toRefineStepBonus(params: {
		every: string;
		bonusScript: string;
	}): Record<string, string>[] {
		if (!params) return [];

		const { bonusScript, every } = params;
		// console.log({bonusScript})

		const moreOneScipt = bonusScript
			.split(',')
			.flatMap((a) => a.split('และ'))
			.map((a) => a.trim())
			.filter((a) => a !== '');
		if (moreOneScipt.every((a) => this.matchBonusScript(a))) {
			const all: Record<string, string>[] = [];
			for (const subScript of moreOneScipt) {
				// console.log({subScript})
				for (const { actualAttr, bonus } of this.getMiniScript(subScript)) {
					if (actualAttr) {
						all.push({ [actualAttr]: `${every}---${bonus}` });
					}
				}
			}

			return all;
		}

		// console.log({bonusScript})
		const all: Record<string, string>[] = [];
		for (const { actualAttr, bonus } of this.getMiniScript(bonusScript)) {
			if (actualAttr) {
				all.push({ [actualAttr]: `${every}---${bonus}` });
			}
		}

		return all;
	}

	toLevelStepBonus(expression: string): Record<string, string>[] {
		const { condition, script } = this.isLevelStep(expression)!;
		const xCondition = condition.replace(/\W/g, '');

		// console.log({condition, xCondition, script})
		const all: Record<string, string>[] = [];
		for (const subScript of script.split(',')) {
			for (const { actualAttr, bonus } of this.getMiniScript(subScript)) {
				// console.log({xCondition, actualAttr, bonus})
				if (actualAttr) {
					all.push({ [actualAttr]: `${xCondition}---${bonus}` });
				}
			}
		}

		return all;
	}

	toTotalRefineBonus(params: {
		condition: string;
		bonusScript: string;
	}): Record<string, string>[] {
		const { condition, bonusScript } = params;

		// console.log({bonusScript})
		const all: Record<string, string>[] = [];
		for (const { actualAttr, bonus } of this.getMiniScript(bonusScript)) {
			if (actualAttr) {
				all.push({ [actualAttr]: `REFINE[${condition}]===${bonus}` });
			}
		}

		return all;
	}

	isCombo(script: string) {
		return script.startsWith('เมื่อสวมใส่');
	}

	isAutoByAtk(script: string) {
		return script.startsWith('เมื่อโจมตี');
	}

	isBuffWhenSkill(
		script: string,
	): { skillName: string; chanceScript: string } | undefined {
		let [_raw, _text, skillName, chanceScript] =
			script.match(/เมื่อใช้(สกิล|งาน)\s*(.+?),\s*(.*)/) ?? [];
		if (skillName && chanceScript) {
			return { chanceScript, skillName };
		}

		[_raw, _text, skillName, chanceScript] =
			script.match(/เมื่อใช้(สกิล|งาน)\s*(.+)(เพิ่ม.+)/) ?? [];
		if (skillName && chanceScript) {
			return { chanceScript, skillName };
		}

		return;
	}

	isLevelStep(
		expression: string,
	): { condition: string; script: string } | undefined {
		const regexs = [/ทุก ๆ Base\s*(\D+\d+)\s*,*\s*(.+)/];
		for (const regex of regexs) {
			const [_raw, condition, script] = expression.match(regex) ?? [];
			if (condition && script) {
				// console.log({condition, script})
				return { condition: condition.toLowerCase(), script };
			}
		}

		return undefined;
	}

	matchStepBonusStat(
		expression: string,
	): { every: string; bonusScript: string } | undefined {
		const regexs = [
			/ทุกๆ.*ค่า\s*(\D+\d+).+จะ\s*,*\s*(.+)/,
			/(ทุกๆ.*ค่า.+\D+\d+.+)จะ\s*,*\s*(.+)/,
			/ทุก.+Base\s*(\D+\d+)\s*(.+)/,
			/ทุก.+Base\s*(\D+\d+)\s*(.+)/,
		];
		for (const regex of regexs) {
			const [_raw, every, bonusScript] = expression.match(regex) ?? [];
			if (every && bonusScript) {
				// console.log({every, bonusScript})
				return { every: every.replace(' ', '').toLowerCase(), bonusScript };
			}
		}

		const comboStateRegexs = [
			/เมื่อทุกๆ\s*(\d+).*หน่วย.+พื้นฐาน\s*(.+?)(เพิ่ม.+)/,
			/เมื่อทุกๆ\s*(\d+).*หน่วย.+พื้นฐาน\s*(\D+?)\s+(.+)/,
		];
		for (const regex of comboStateRegexs) {
			const [_raw, every, combo, bonusScript] = expression.match(regex) ?? [];
			if (every && bonusScript) {
				// console.log({expression, combo, every, bonusScript})
				const c = combo.trim().split(',').join('&&').toLowerCase();
				return { every: c + every, bonusScript };
			}
		}

		return undefined;
	}

	matchBaseBonusStat(
		expression: string,
	): { condition: string; script: string } | undefined {
		const regexs = [
			/ถ้า.+มีค่า\s*(\D+\d+\s?).+หรือมากกว่า.+/,
			/ถ้า.+มีค่า\s*(\D+\d+.+)จะ\s*,*\s*(.+)/,
			/เมื่อ Base\s*(\D+\d+.+)ขึ้นไป\s*,*\s*(.+)/,
			/.*Base\s*(\D+\d+)\s*,*\s*(.+)/,
			/เมื่อเลเวลตัวละครตั้งแต่\s*(\D+\d+)\s*,*\s*(.+)/,
		];
		for (const regex of regexs) {
			const [_raw, condition, script] = expression.match(regex) ?? [];
			if (condition && script) {
				// console.log({condition, script})
				const improvedCond = condition
					.replace('หรือมากกว่า', '')
					.replace('ตั้งแต่', '')
					.replace('เท่ากับ', '')
					.replaceAll(' ', '')
					.toLowerCase();
				const improvedScript = script.replace('ขึ้น', '');
				if (script.startsWith('เพิ่ม ')) {
					improvedScript.replace('เพิ่ม ', '');
				}

				return { condition: improvedCond, script: improvedScript };
			}
		}

		return undefined;
	}

	matchTotalRefine(
		expression: string,
	): { condition: string; bonusScript: string } | undefined {
		const regexs = [/มื่อค่าอัพเกรด\D+(\d+).+ขึ้นไป\s*(.+)/];
		for (const regex of regexs) {
			const [_raw, condition, bonusScript] = expression.match(regex) ?? [];
			if (condition && bonusScript) {
				return { condition, bonusScript };
			}
		}

		return undefined;
	}

	extractItemExpressionTh2(itemDescription: string): this {
		const splited = itemDescription
			.replace(/ประเภท :.+/, '')
			.split('\n\n')
			.map((a) => {
				// console.log({a, matchBonusScript: this.matchBonusScript(a),
				// matchToConstantBonus: this.matchToConstantBonus(a),
				// matchToStepBonus: this.matchToStepBonus(a)})
				return a;
			})
			// .filter(a => this.regexStats.test(a))
			.filter(
				(a) =>
					this.matchBonusScript(a) ||
					this.matchRefineConstantBonus(a) ||
					this.matchRefineStepBonus(a),
			);
		// console.log({splitedDoubleSlash: splited})

		const patternNoCombo = this.statePatterns.filter(
			(a) => !this.patterns.itemSet.includes(a),
		);
		const regexConditionNoCombo = new RegExp(
			patternNoCombo.join('s*.+|') + ' .+',
		);
		const regexCombo = new RegExp(this.patterns.itemSet.join(' .+|') + ' .+');
		// const regexBonus = /(เพิ่ม.*?\d+)|(ลด.*?\d+)|(ATK.*?\d+%?)|(MATK.*?\d+%?)/i
		const expressions: string[] = [];
		const comboes: Record<string, string[]> = {};
		for (const ss of splited) {
			let prevComboCondition = '';
			let prevCondition = '';
			const splited2 = ss.replaceAll('\nและ', ',').split('\n');
			for (const ss2 of splited2) {
				const [_, curComboCondition] =
					ss2.match(/เมื่อสวมใส่.+กับ\s*(.+),/) ??
					ss2.match(/เมื่อสวมใส่.+กับ\s*(.+?,)/) ??
					ss2.match(/เมื่อสวมใส่.+กับ\s*(.+)/) ??
					ss2.match(/(เมื่อสวมใส่.+)ATK.+/) ??
					ss2.match(/(เมื่อสวมใส่.+กับ)/) ??
					ss2.match(/เมื่อ\s*(.+อัพ.+)/) ??
					ss2.match(/เมื่อติดตั้งร่วมกับ\s*\[(.+)\]/) ??
					ss2.match(/เมื่อใช้.*กับ\s*(.+),*\s*(ลด.+|เพิ่ม.+|ATK.+|ASPD+.)/) ??
					ss2.match(/เมื่อใช้.*กับ\s*(.+)/) ??
					[];
				// console.log({ss2, curComboCondition})
				const [_a, curCondition] =
					ss2.match(/(เมื่ออัพเกรดตั้งแต่\s*\d+)/) ??
					ss2.match(/(เมื่ออัพเกรด.+)/) ??
					ss2.match(/(ทุก ๆ การอัพเกรด\s*\d+\s*ขั้น)/) ??
					ss2.match(/ถ้าผู้ใช้มีค่า\s*(.+\d+)\s*หรือ.+/) ??
					ss2.match(/ถ้าผู้ใช้มีค่า\s*(.+)/) ??
					ss2.match(/(เมื่อ Base.+\d+).+ขึ้นไป/) ??
					ss2.match(/(\D*Base.+\d+).+ขึ้นไป/) ??
					ss2.match(/(ทุก.+Base.+\d+).+/) ??
					ss2.match(/(เมื่อ.+Base.+\d+).+/) ??
					ss2.match(/(เมื่อทุกๆ\s*\d+.*หน่วย.+)/) ??
					[];
				// console.log({curComboCondition})
				if (curComboCondition) {
					if (
						!ss2.match(/เมื่อค่าอัพเกรดรวมกัน/) &&
						!ss2.match(/ค่าอัพเกรดของ.+รวมกัน.+/)
					) {
						prevComboCondition = curComboCondition;
					}
				} else if (curCondition) {
					prevCondition = curCondition;
				}

				// console.log({ss2})
				if (this.isCombo(ss2) || regexCombo.test(ss2)) {
					// console.log({combo:ss2})
					if (this.matchBonusScript(ss2)) {
						expressions.push(ss2);
					}
				} else if (this.matchBonusScript(ss2)) {
					// console.log({ss2, prevComboCondition})
					if (prevComboCondition) {
						if (comboes[prevComboCondition]) {
							comboes[prevComboCondition].push(ss2);
						} else {
							comboes[prevComboCondition] = [ss2];
						}
					} else if (prevCondition && !curCondition) {
						expressions.push(`${prevCondition} ${ss2}`);
					} else {
						expressions.push(ss2);
					}
				} else if (
					/เมื่อโจมตี.+มีโอกาส/.test(ss2) &&
					regexConditionNoCombo.test(ss2)
				) {
					expressions.push(ss2);
				} else if (curComboCondition) {
					// console.log({ ss2 });
				} else {
					console.log({ '---------': ss2 });
				}
			}
		}

		this._extractedScript = { expressions, comboes };

		return this;
	}

	toScripts(expressions: string[], comboes: Record<string, string[]>) {
		const all: Record<string, string[]> = {};
		const addScript = (prop: string, newScript: string) => {
			// console.log({prop, newScript})
			if (all[prop]) {
				all[prop].push(newScript);
			} else {
				all[prop] = [newScript];
			}
		};

		for (const expression of expressions) {
			// console.log({expression})
			if (this.isCombo(expression)) {
				for (const { actualAttr, bonus } of this.getMiniScript(expression)) {
					addScript(actualAttr as string, bonus as string);
				}
			} else if (this.matchRefineStepBonus(expression)) {
				// console.log({expression})
				for (const obj of this.toRefineStepBonus(
					this.matchRefineStepBonus(expression)!,
				)) {
					const [prop, newScript] = Object.entries(obj)[0];
					addScript(prop, newScript);
				}
			} else if (this.matchRefineConstantBonus(expression)) {
				// console.log({expression})
				for (const obj of this.toRefineConstantBonus(
					this.matchRefineConstantBonus(expression)!,
				)) {
					const [prop, newScript] = Object.entries(obj)[0];
					addScript(prop, newScript as any);
				}
			} else if (this.isLevelStep(expression)) {
				// console.log({expression})
				for (const obj of this.toLevelStepBonus(expression)) {
					const [prop, newScript] = Object.entries(obj)[0];
					addScript(prop, newScript as any);
				}
			} else if (this.matchStepBonusStat(expression)) {
				// console.log({expression})
				for (const obj of this.toRefineStepBonus(
					this.matchStepBonusStat(expression)!,
				)) {
					const [prop, newScript] = Object.entries(obj)[0];
					addScript(prop, newScript as any);
				}
			} else if (this.matchBaseBonusStat(expression)) {
				// console.log({expression})
				for (const obj of this.toRefineConstantBonus(
					this.matchBaseBonusStat(expression)!,
				)) {
					const [prop, newScript] = Object.entries(obj)[0];
					addScript(prop, newScript as any);
				}
			} else {
				// console.log({expression})
				for (const s of expression.split(',')) {
					for (const { actualAttr, bonus } of this.getMiniScript(s.trim())) {
						addScript(actualAttr as string, bonus as string);
					}
				}
			}
		}

		for (const [comboCondition, _expressions] of Object.entries(comboes)) {
			const xComboCondition = comboCondition.replace(/,*\s*$/, '');

			for (const expression of _expressions) {
				if (expression.match(/ทุก.*การอัพเกรด/)) {
					for (const obj of this.toRefineStepBonus(
						this.matchRefineStepBonus(expression)!,
					)) {
						const [prop, newScript] = Object.entries(obj)[0];
						addScript(prop, `EQUIP[${xComboCondition}]${newScript}`);
					}
				} else if (this.matchRefineConstantBonus(expression)) {
					for (const obj of this.toRefineConstantBonus(
						this.matchRefineConstantBonus(expression)!,
					)) {
						const [prop, newScript] = Object.entries(obj)[0];
						addScript(prop, `EQUIP[${xComboCondition}]${newScript}`);
					}
				} else if (this.isLevelStep(expression)) {
					for (const obj of this.toLevelStepBonus(expression)) {
						const [prop, newScript] = Object.entries(obj)[0];
						addScript(prop, `EQUIP[${xComboCondition}]${newScript}`);
					}
				} else if (this.matchStepBonusStat(expression)) {
					for (const obj of this.toRefineStepBonus(
						this.matchStepBonusStat(expression)!,
					)) {
						const [prop, newScript] = Object.entries(obj)[0];
						addScript(prop, `EQUIP[${xComboCondition}]${newScript}`);
					}
				} else if (this.matchBaseBonusStat(expression)) {
					for (const obj of this.toRefineConstantBonus(
						this.matchBaseBonusStat(expression)!,
					)) {
						const [prop, newScript] = Object.entries(obj)[0];
						addScript(prop, `EQUIP[${xComboCondition}]${newScript}`);
					}
				} else if (this.matchTotalRefine(expression)) {
					for (const obj of this.toTotalRefineBonus(
						this.matchTotalRefine(expression)!,
					)) {
						const [prop, newScript] = Object.entries(obj)[0];
						addScript(prop, `EQUIP[${xComboCondition}]${newScript}`);
					}
				} else {
					for (const s of expression.split(',')) {
						for (const { actualAttr, bonus } of this.getMiniScript(s.trim())) {
							addScript(
								actualAttr as string,
								`EQUIP[${xComboCondition}]===${bonus}`,
							);
						}
					}
				}
			}
		}

		const script: Record<string, string[]> = {};
		for (const [attr, values] of Object.entries(all)) {
			for (const goodAttr of this.toAttr(attr)) {
				// console.log({ attr, goodAttr });

				const newValues = values
					.map((a) => a.replace('lv.', 'lv').replace('lv', 'level'))
					.map((a) => {
						if (a.startsWith('EQUIP')) {
							return a.replace(/\s*และ\s*/, '&&').trim();
						}

						return a;
					})
					.map((a) => {
						const [_, _raw, status, statusCond] =
							a.match(
								/(.*?)(str|dex|vit|luk|int|agi|lv|level)(\d{1,3})(===|---)(.+)/,
							) ?? [];

						// console.log({status, statusCond, sperator, bonus})
						if (!status || !statusCond) return a;

						return a.replace(
							`${status}${statusCond}`,
							`SUM[${status}==${statusCond}]`,
						);
					});
				if (script[goodAttr]) {
					script[goodAttr].push(...newValues);
				} else {
					script[goodAttr] = newValues;
				}
			}
		}

		this._scripts = script;

		return this;
	}

	toAttr(rawAttr: string): string[] {
		const goodAttr = rawAttr
			.replace('Shadow', 'dark')
			.replace('shadow', 'dark')
			.replace('+', '')
			.replace('ขึ้น', '')
			.replace('ครั้งละ', '')
			.replace('(ยกเว้น Player)', '')
			.replace('ลด Cooldown สกิล ', 'cd__')
			.replace('ลด Cooldown สกิล', 'cd__')
			.replace('ลด Cooldown ของ ', 'cd__')
			.replace('ลดคูลดาวน์สกิล ', 'cd__')
			.replace('ลดคูลดาวน์สกิล', 'cd__')
			.replace('ลดเวลาคูลดาวน์ ', 'cd__')
			.replace('ลด Cooltime Skill ', 'cd__')
			.replace('ลด Cooldown ของสกิล ', 'cd__')
			.replace('ลด Cool down สกิล ', 'cd__')
			.replace('ลดการใช้ SP ของสกิล', 'sp__')
			.replace('ลดการใช้ SP ของสกิล ', 'sp__')
			.replace('ลดปริมาณการใช้ SP ในการใช้สกิล ', 'sp__')
			.replace('ลดปริมาณการใช้ SP สกิล ', 'sp__')
			.replace('ลดการใช้ SP ของ ', 'sp__')
			.replace('ลดระยะเวลาร่ายแบบแปรผันสกิล ', 'vct__')
			.replace('ลดระยะเวลาร่ายแบบแปรผันของสกิล ', 'vct__')
			.replace('ลดระยะเวลาร่ายแบบคงที่สกิล ', 'fct__')
			.replace('เพิ่มพลังโจมตีของ ', '')
			.replace(/เพิ่มเติม/, '')
			.replace(/เพิ่ม Damage สกิล/, '')
			.replace(/เพิ่ม Damage ของ/, '')
			.replace(/เพิ่มความแรงสกิล/, '')
			.trim();
		// console.log({rawAttr, goodAttr})

		const found = map[goodAttr];
		if (found) return [found];

		if (!goodAttr.startsWith('เพิ่ม')) {
			return goodAttr.split(',').map((a) => a.trim());
		}

		for (const [check, pre] of Object.entries(mapPrefix)) {
			if (goodAttr.startsWith(check)) {
				let pureAttrs = goodAttr
					.replace(check, '')
					.replaceAll('และ', ',')
					.split(',')
					.map((a) => a.trim().toLowerCase());
				if (pre === 'p_size') {
					pureAttrs = pureAttrs
						.map((a) => a.replace('ขนาด', ''))
						.map((a) => this.mapSize[a]);
				}

				return pureAttrs.map((a) => `${pre}_${a}`);
			}
		}

		for (const [attrAll, template] of Object.entries(mapAll)) {
			if (goodAttr.startsWith(attrAll)) {
				const doubleAttrs = goodAttr
					.replace(attrAll, '')
					.split(',')
					.map((a) => a.trim().toLowerCase());

				return doubleAttrs.flatMap((aa) =>
					template.map((a) => a.replace('{a}', aa)),
				);
				// return [...doubleAttrs.map((a) => `p_element_${a}`), ...doubleAttrs.map((a) => `m_element_${a}`)];
			}
		}

		const pureSkillAttrs = goodAttr.includes('เพิ่มดาเมจ')
			? goodAttr
					.replace('เพิ่มดาเมจ', '')
					.split(',')
					.map((a) => a.trim())
			: [];
		if (pureSkillAttrs.length) {
			return pureSkillAttrs;
		}

		return [goodAttr];
	}
}
