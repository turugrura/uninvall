import { Logger } from "@nestjs/common";

const resetLogger = new Logger('-=-=-');
const logger = new Logger('what_is_context');

interface TranslateScriptResult {
	actualAttr?: string;
	bonus?: string;
	isFinalBonus?: true;
}

const MAP_TO_MULTI_BONUS = {
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
	'เพิ่ม Damage ทางกายภาพระยะใกล้/ไกล': ['melee', 'range'],
	'เพิ่ม Damage ทางกายภาพระยะใกล้andไกล': ['melee', 'range'],
	'เพิกเฉยต่อพลังป้องกันทางกายภาพandเวทมนตร์ของศัตรูทุกเผ่า': ['p_pene_race_all', 'm_pene_race_all'],
	'เพิกเฉยต่อพลังต้านทานทางกายภาพandเวทมนตร์ของศัตรูทุกเผ่า': ['pene_res', 'pene_mres'],
	'P.ATKandS.MATK': ['pAtk', 'sMatk'],
	'MHPandMSP': ['hpPercent', 'spPercent'],
};
const MAP_PREFIX = {
	'เพิ่ม Damage ทางเวทมนตร์ธาตุ': 'm_my_element',
	'เพิ่ม Damage เวทมนตร์ธาตุ': 'm_my_element',
	'เพิ่ม Damage ทางเวทย์ธาตุ': 'm_my_element',
	เพิ่มดาเมจทางเวทย์ธาตุ: 'm_my_element',
	เพิ่มความเสียหายทางเวทธาตุ: 'm_my_element',
	'เพิ่ม Damage ทางเวทมนตร์ต่อศัตรูธาตุ': 'm_element',
	'เพิ่ม Damage ทางเวทมนต์ธาตุ': 'm_element',
	'เพิ่ม Damage ทางเวทมนตร์ที่ทำต่อมอนสเตอร์ธาตุ': 'm_element',
	'เพิ่ม Damage ทางเวทมนตร์ต่อมอนสเตอร์ประเภท': 'm_class',
	เพิ่มพลังโจมตีทางเวทย์ที่สร้างต่อศัตรูเผ่า: 'm_race',
	'เพิ่ม Damage ทางเวทย์ที่ทำต่อศัตรูขนาด': 'm_size',

	'เพิ่ม Damage ทางกายภาพต่อศัตรูธาตุ': 'p_element',
	'เพิ่ม Damage ทางกายภาพต่อมอนสเตอร์ธาตุ': 'p_element',
	'เพิ่ม Damage ทางกายภาพที่ทำต่อศัตรูธาตุ': 'p_element',
	'เพิ่ม Damage ทางกายภาพเมื่อโจมตีมอนสเตอร์ธาตุ': 'p_element',
	'เพิ่ม Damage ทางกายภาพต่อมอนสเตอร์ประเภท': 'p_class',
	'เพิ่ม Damage ทางกายภาพต่อศัตรูประเภท': 'p_class',
	'เพิ่ม Damage ทางกายภาพเมื่อโจมตีมอนสเตอร์เผ่า': 'p_race',
	'เพิ่ม Damage ทางกายภาพที่ทำต่อศัตรูขนาด': 'p_size',
	'เพิ่ม Damage ทางกายภาพที่สร้างต่อศัตรูขนาด': 'p_size',
	เพิ่มพลังโจมตีทางกายภาพที่สร้างต่อมอนสเตอร์ขนาด: 'p_size',
	'เพิ่มพลังโจมตีทางกายภาพ/ทางเวทมนตร์ต่อศัตรูขนาด': 'p_size',
	'เพิ่ม Damage ทางกายภาพแก่ศัตรูขนาด': 'p_size',
};
const MAP_ATTR = {
	เพิ่มพลังโจมตีธนู: 'bowRange',
	เพิ่มพลังโจมตีของธนู: 'bowRange',
	เพิ่มพลังโจมตีธนูครั้งละ: 'bowRange',
	'เพิ่มพลังโจมตีอาวุธประเภท Bow': 'bowRange',
	'เพิ่มพลังโจมตีของอาวุธประเภท Bow': 'bowRange',
	'bow': 'bowRange',
	'Bow': 'bowRange',
	'BOW': 'bowRange',

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
	'long ranged physical': 'range',
	'long ranged physical damage': 'range',
	'long range': 'range',
	'long ranged': 'range',
	'long range physical': 'range',
	'longed ranged physical': 'range',
	'longed physical damage': 'range',

	'เพิ่ม Damage ทางกายภาพระยะใกล้': 'melee',
	'melee physical': 'melee',
	'Melee physical': 'melee',
	'melee physical damage': 'melee',

	'เพิ่ม Damage ทางกายภาพต่อศัตรูทุกธาตุ': 'p_element_all',
	'physical damage against all property enemies': 'p_element_all',
	'physical damage against all property': 'p_element_all',
	'เพิ่มพลังโจมตีทางกายภาพที่สร้างต่อศัตรูธาตุ Neutral': 'p_element_neutral',

	'physical damage against normal monsters by': 'p_class_normal',
	'physical damage against normal enemies': 'p_class_normal',
	'physical damage against boss enemies': 'p_class_boss',
	'physical damage against boss monsters by': 'p_class_boss',

	'เพิ่ม Damage ทางกายภาพต่อศัตรูทุกขนาด': 'p_size_all',
	เพิ่มโจมตีกายภาพต่อมอนสเตอร์ทุกขนาด: 'p_size_all',
	'เพิ่ม Damage ทางกายภาพแก่ศัตรูทุกขนาด': 'p_size_all',
	'เพิ่ม Damage ทางกายภาพที่ทำต่อศัตรูทุกขนาด': 'p_size_all',
	'physical damage against all size': 'p_size_all',
	'เพิ่ม Damage ทางกายภาพต่อศัตรูขนาดเล็ก': 'p_size_s',

	'physical damage against small': 'p_size_s',
	'physical damage against small size': 'p_size_s',
	'physical damage against medium': 'p_size_m',
	'physical damage against medium size': 'p_size_m',
	'physical damage against large': 'p_size_l',
	'physical damage against large size': 'p_size_l',

	'เพิ่ม Damage ทางกายภาพต่อมอนสเตอร์ทุกเผ่า': 'p_race_all',
	'เพิ่ม Damage ทางกายภาพต่อศัตรูทุกเผ่า': 'p_race_all',
	ทางกายภาพที่สร้างต่อศัตรูทุกเผ่า: 'p_race_all',
	'physical damage against all race': 'p_race_all',
	'physical damage to against all race monsters': 'p_race_all',
	'physical damage against formless': 'p_race_formless',
	'physical damage against undead': 'p_race_undead',
	'physical damage against brute': 'p_race_brute',
	'physical damage against plant': 'p_race_plant',
	'physical damage against insect': 'p_race_insect',
	'physical damage against fish': 'p_race_fish',
	'physical damage against demon': 'p_race_demon',
	'physical damage against demihuman': 'p_race_demihuman',
	'physical damage against angel': 'p_race_angel',
	'physical damage against dragon': 'p_race_dragon',

	'physical damage against formless race': 'p_race_formless',
	'physical damage against undead race': 'p_race_undead',
	'physical damage against brute race': 'p_race_brute',
	'physical damage against plant race': 'p_race_plant',
	'physical damage against insect race': 'p_race_insect',
	'physical damage against fish race': 'p_race_fish',
	'physical damage against demon race': 'p_race_demon',
	'physical damage against demihuman race': 'p_race_demihuman',
	'physical damage against angel race': 'p_race_angel',
	'physical damage against dragon race': 'p_race_dragon',

	'physical damage against neutral property': 'p_element_neutral',
	'physical damage against neutral': 'p_element_neutral',
	'physical damage against fire property': 'p_element_fire',
	'physical damage against fire': 'p_element_fire',
	'physical damage against water property': 'p_element_water',
	'physical damage against water': 'p_element_water',
	'physical damage against wind property': 'p_element_wind',
	'physical damage against wind': 'p_element_wind',
	'physical damage against earth property': 'p_element_earth',
	'physical damage against earth': 'p_element_earth',
	'physical damage against poison property': 'p_element_poison',
	'physical damage against poison': 'p_element_poison',
	'physical damage against holy property': 'p_element_holy',
	'physical damage against holy': 'p_element_holy',
	'physical damage against dark property': 'p_element_dark',
	'physical damage against dark': 'p_element_dark',
	'physical damage against undead property': 'p_element_undead',
	'physical damage against ghost': 'p_element_ghost',
	'physical damage against ghost property': 'p_element_ghost',

	'เพิ่ม Damage เมื่อโจมตีมอนสเตอร์ทุกประเภท (ทั่วไป, Boss, Guardian)':
		'p_class_all',
	'เพิ่ม Damage ทางกายภาพต่อศัตรูประเภทบอส': 'p_class_boss',
	'physical damage against boss': 'p_class_boss',
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
	'all property magical damage': 'm_my_element_all',
	'all property magical': 'm_my_element_all',
	'magical damage against all property': 'm_element_all',

	'เพิ่มพลังโจมตีทางเวทย์ธาตุ Fire': 'm_my_element_fire',
	'เพิ่ม Damage ทางเวทมนตร์ธาตุ Ghost': 'm_my_element_ghost',
	'เพิ่มพลังโจมตีทางเวทย์ที่สร้างต่อศัตรูธาตุ Neutral ขึ้น':
		'm_element_neutral',
	'เพิ่ม Damage ทางเวทมนตร์ต่อศัตรูทุกธาตุ': 'm_element_all',
	'เพิ่ม Damage เวทมนตร์ทุกธาตุ': 'm_my_element_all',
	'เพิ่ม Damage ทางเวทต่อศัตรูทุกประเภท': 'm_class_all',
	'เพิ่ม Damage ทางเวทมนตร์ต่อศัตรูทุกประเภท': 'm_class_all',

	'magical damage against normal monsters by': 'm_class_normal',
	'magical damage against normal enemies': 'm_class_normal',
	'magical damage against boss enemies': 'm_class_boss',
	'magical damage against boss monsters by': 'm_class_boss',
	'magical damage against boss': 'm_class_boss',

	'เพิ่ม Damage ทางเวทมนตร์ต่อศัตรูทุกขนาด': 'm_size_all',
	'เพิ่ม Damage ทางเวทมนตร์ต่อมอนสเตอร์ทุกขนาด': 'm_size_all',
	'เพิ่ม Damage การโจมตีทางเวทมนตร์ต่อศัตรูทุกขนาด': 'm_size_all',
	'เพิ่ม Damage ทางเวทย์ต่อศัตรูทุกขนาด': 'm_size_all',
	ทางเวทย์ที่สร้างต่อศัตรูทุกขนาด: 'm_size_all',
	'magical damage against all size enemies': 'm_size_all',
	'magical damage against all size': 'm_size_all',
	'เพิ่ม Damage เวทมนตร์ที่ทำต่อศัตรูทุกขนาด': 'm_size_all',
	'เพิ่ม Damage ทางเวทมนตร์ที่ทำต่อศัตรูทุกขนาด': 'm_size_all',
	'เพิ่ม Damage ทางเวทย์ที่ทำต่อศัตรูขนาดใหญ่': 'm_size_l',
	'เพิ่ม Damage ทางเวทย์ต่อศัตรูขนาดกลาง': 'm_size_m',

	'magical damage against small': 'm_size_s',
	'magical damage against small size': 'm_size_s',
	'magical damage against medium': 'm_size_m',
	'magical damage against medium size': 'm_size_m',
	'magical damage against large': 'm_size_l',
	'magical damage against large size': 'm_size_l',

	'magical damage to against all race': 'm_race_all',
	'magical damage against formless race': 'm_race_formless',
	'magical damage against formless': 'm_race_formless',
	'magical damage against undead race': 'm_race_undead',
	'magical damage against undead': 'm_race_undead',
	'magical damage against brute race': 'm_race_brute',
	'magical damage against brute': 'm_race_brute',
	'magical damage against plant race': 'm_race_plant',
	'magical damage against plant': 'm_race_plant',
	'magical damage against insect race': 'm_race_insect',
	'magical damage against insect': 'm_race_insect',
	'magical damage against fish race': 'm_race_fish',
	'magical damage against fish': 'm_race_fish',
	'magical damage against demon race': 'm_race_demon',
	'magical damage against demon': 'm_race_demon',
	'magical damage against demihuman race': 'm_race_demihuman',
	'magical damage against demihuman': 'm_race_demihuman',
	'magical damage against angel race': 'm_race_angel',
	'magical damage against angel': 'm_race_angel',
	'magical damage against dragon race': 'm_race_dragon',
	'magical damage against dragon': 'm_race_dragon',

	ทางเวทย์แก่มอนสเตอร์ประเภทบอส: 'm_class_boss',
	'เพิ่ม Damage ทางเวทมนตร์ต่อศัตรูทุกเผ่า': 'm_race_all',
	'เพิ่ม Damage ทางเวทมนตร์ต่อมอนสเตอร์ทุกเผ่า': 'm_race_all',
	'magical damage against all race': 'm_race_all',

	'neutral property magical': 'm_my_element_neutral',
	'fire property magical': 'm_my_element_fire',
	'water property magical': 'm_my_element_water',
	'wind property magical': 'm_my_element_wind',
	'earth property magical': 'm_my_element_earth',
	'poison property magical': 'm_my_element_poison',
	'holy property magical': 'm_my_element_holy',
	'dark property magical': 'm_my_element_dark',
	'undead property magical': 'm_my_element_undead',
	'ghost property magical': 'm_my_element_ghost',

	'neutral': 'm_my_element_neutral',
	'fire': 'm_my_element_fire',
	'water': 'm_my_element_water',
	'wind': 'm_my_element_wind',
	'earth': 'm_my_element_earth',
	'poison': 'm_my_element_poison',
	'holy': 'm_my_element_holy',
	'dark': 'm_my_element_dark',
	'undead': 'm_my_element_undead',
	'ghost': 'm_my_element_ghost',

	'magical damage against neutral property': 'm_element_neutral',
	'magical damage against neutral': 'm_element_neutral',
	'magical damage against fire property': 'm_element_fire',
	'magical damage against fire': 'm_element_fire',
	'magical damage against water property': 'm_element_water',
	'magical damage against water': 'm_element_water',
	'magical damage against wind property': 'm_element_wind',
	'magical damage against wind': 'm_element_wind',
	'magical damage against earth property': 'm_element_earth',
	'magical damage against earth': 'm_element_earth',
	'magical damage against poison property': 'm_element_poison',
	'magical damage against poison': 'm_element_poison',
	'magical damage against holy property': 'm_element_holy',
	'magical damage against holy': 'm_element_holy',
	'magical damage against dark property': 'm_element_dark',
	'magical damage against dark': 'm_element_dark',
	'magical damage against undead property': 'm_element_undead',
	'magical damage against ghost': 'm_element_ghost',
	'magical damage against ghost property': 'm_element_ghost',

	'ลด Delay หลังใช้สกิล': 'acd',
	'ลด Delay หลังใช้สกิลลง': 'acd',
	'ลด Delay ในการร่าย': 'acd',
	ลดดีเลย์หลังใช้สกิล: 'acd',
	ลดดีเลย์หลังใช้สกิลลง: 'acd',
	'ลด Delayหลังการใช้สกิล': 'acd',
	ลดดีเลย์หลังจากใช้สกิล: 'acd',
	ลดการดีเลย์หลังร่ายสกิล: 'acd',
	ลดดีเลย์หลังโจมตีลง: 'acd',
	'global cooldown': 'acd',
	'reduces global cooldown': 'acd',
	'Reduces global cooldown': 'acd',

	ลดระยะเวลาร่ายแบบคงที่: 'fct',
	'Fixed Cast Time': 'fct',
	'fixed casting time': 'fct',
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
	'reduces variable casting time': 'vct',
	'Reduces variable casting time': 'vct',

	'ลด Delay หลังการโจมตี': 'aspdPercent',
	'increases attack speed': 'aspdPercent',
	'Increases attack speed': 'aspdPercent',
	'increases attack speed (reduces delay after attack by': 'aspdPercent',
	'Increases attack speed (reduces delay after attack by': 'aspdPercent',
	'reduces delay after attack by': 'aspdPercent',

	'เพิ่มความทนทานจากการโจมตีของ Player': 'resist_player',
	'เพิ่มความทนทานจากการโจมตีจาก Player': 'resist_player',
	HIT: 'hit',
	Hit: 'hit',
	'Perfect Hit': 'perfectHit',
	'PERFECT HIT': 'perfectHit',
	flee: 'flee',
	FLEE: 'flee',
	'เพิ่ม Critical Damage': 'criDmg',
	'เพิ่ม Crirical Damage': 'criDmg',
	'เพิ่ม Critical Damage ทีละ': 'criDmg',
	'Critical Damage': 'criDmg',
	'critical Damage': 'criDmg',
	'critical damage': 'criDmg',
	critical: 'criDmg',
	Critical: 'criDmg',
	เพิ่มความแรงคริติคอล: 'criDmg',
	เพิ่มคริติคอลดาเมจ: 'criDmg',
	CRI: 'cri',
	Cri: 'cri',
	เพิ่มโอกาสคริติคอล: 'cri',
	โอกาสคริติคอล: 'cri',
	ASPD: 'aspd',
	'เพิ่ม ASPD': 'aspd',
	ความเร็วในการโจมตีเพิ่มขึ้น: 'aspd',
	'เพิ่มความเร็วการโจมตี  (ลดดีเลย์หลังการโจมตี': 'aspd',
	'เพิ่ม MATK': 'matk',
	MATK: 'matk',
	Matk: 'matk',
	ATK: 'atk',
	Atk: 'atk',
	'P.ATK': 'pAtk',
	'p.atk': 'pAtk',
	'P.Atk': 'pAtk',
	'S.MATK': 'sMatk',
	'S.Matk': 'sMatk',
	's Matk': 'sMatk',
	's.matk': 'sMatk',
	'เพิ่ม ATK': 'atk',
	maxhp: 'hp',
	MaxHP: 'hp',
	MHP: 'hp',
	HP: 'hp',
	maxspPercent: 'spPercent',
	MaxSP: 'sp',
	maxsp: 'sp',
	MSP: 'sp',
	SP: 'sp',
	DEF: 'def',
	Def: 'def',
	MDEF: 'mdef',
	Mdef: 'mdef',
	Flee: 'flee',
	'C.RATE': 'cRate',
	'C.Rate': 'cRate',
	Res: 'res',
	RES: 'res',
	MRes: 'mres',
	Mres: 'mres',
	MRES: 'mres',
	'H.Plus': 'hplus',
	'h.plus': 'hplus',
	'All Status': 'allStatus',
	'All State': 'allStatus',
	'all basic status': 'allStatus',
	'all triat status': 'allTrait',
	'All Talent Stat': 'allTrait',
	'All Trait Status': 'allTrait',
	STR: 'str',
	Str: 'str',
	DEX: 'dex',
	Dex: 'dex',
	AGI: 'agi',
	Agi: 'agi',
	LUK: 'luk',
	Luk: 'luk',
	INT: 'int',
	Int: 'int',
	VIT: 'vit',
	Vit: 'vit',

	POW: 'pow',
	Pow: 'pow',
	STA: 'sta',
	Sta: 'sta',
	WIS: 'wis',
	Wis: 'wis',
	SPL: 'spl',
	Spl: 'spl',
	CON: 'con',
	Con: 'con',
	CRT: 'crt',
	Crt: 'crt',
	'EXP ที่ได้รับจากมอนสเตอร์': 'exp',
	เพิ่มค่าประสบการณ์ที่ได้รับ: 'exp',
	'Item Drop Rate': 'itemDrop',

	'Dragon Breath - Water': 'Dragon Breath - WATER',
	'Overbrand': 'Over Brand',
	'Vanishing Point': 'Banishing Point',
	'Crazy Vines': 'Crazy Weed',
	'cd__Crazy Vines': 'cd__Crazy Weed',
	'Fatal Menace': 'Fatal Manace',
	'Prominence Kick': 'Blaze Kick',
	'Solar Burst': 'Solar Explosion',
	'Hammer of God': "God's Hammer",
	'cd__Hammer of God': "cd__God's Hammer",
	'Metallic Sound': 'Metalic Sound',
	'cd__Metallic Sound': 'cd__Metalic Sound',
	'Falling Star': 'Falling Stars',
	'Hack and Slash': 'Hack and Slasher',
	'Grenades Dropping': 'Grenade Dropping',
	'Gates of Hell': 'Hell Gate',
	'Shattering Storm': 'Shatter Storm',
	'Second Judge': 'Second Judgement',
	'dark Flash': 'Shadow Flash',
	'dark Dance': 'Shadow Dance',
	'dark Stab': 'Shadow Stab',
	"Lightning Bolt": 'Lightening Bolt',
};

const validItemPositions = ['weapon', 'headUpper', 'armor', 'shield', 'garment', 'boot', 'acc'];

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
			'Atk',
			'P.Atk',
			'S.Matk',
			'MSP',
		],
		itemSet: ['เมื่อสวมใส่ร่วมกับ', 'เมื่อใส่ร่วมกับ', 'When equipped with'],
		mainState: [
			'All Status',
			'All Trait Status',
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
			'Cri',
			'POW',
			'STA',
			'WIS',
			'SPL',
			'CON',
			'CRT',
			'เพิ่มพลังโจมตี',
		],

	};
	private regex = {
		toSteps: [
			/ทุก.*การอัพเกรด (.+) ขั้น (.+)/,
			/ทุก.*การอัปเกรด (.+) ขั้น (.+)/,
			/ทุก.*?อัพเกรด.*?(\d+?).*?ขั้น,?\s?(.+)/,
			/(Every \d+ refine rate),*\s*(.+)/i, //Every 2 refine rate, Atk + 10.
			/every (\d+ refine rate of \D+),(.+)/i, //every 2 refine rate of garment, increases physical damage against all race monsters (except players) by additional 3%.\r
			/(.+) per (\d+ refine rate of weapon)+/i, //increases Cart Cannon damage by 10% per 2 refine rate of weapon.
			/(.+) per (\d+) refine rate.+/i,
		],
		stepOnOther: [
			/(\d+).*?(\b\w+\b)$/i, //2 refine rate of weapon
		],
		isGrades: [
			/If the enchanted equipment is grade (\D{1}),*\s*(.+)/i, //If the enchanted equipment is grade D, additional P.Atk + 1 per 20 base POW
			/If grade is (\D+) or higher, (.+)/, // If grade is B or higher, the damage is increases by an additional 5%.
			/If grade of enchanted equipment is (\D{1}) or higher, (.+)/i, // If grade of enchanted equipment is D or higher, Atk + 2%.
			/If grade of (\D+) is (\D{1}) or higher, (.+)/i, //if grade of armor is A or higher, every 2 refine rate of armor, increases critical damage by 3%.
			/\[Grade (\D)\]\s*(.+)/i,
		],
		matchGrades: [
			/if grade of (\D+) is (\D+) or higher, (.+)/i,
		],
		matchGradeOfBaseItems: [
			/\[Grade (\D+)\] or higher, (.+)/i,
		],
		toConstants: [
			/เมื่ออัพเกรด.*ขั้น (\d+)\s*,*\s*(\D+\d+.+)/,
			/เมื่ออัปเกรดถึงขั้น (\d+)\s*,*\s*(\D+\d+.+)/,
			/เมื่ออัพเกรดตั้งแต่\s*(\d+)(.+)/,
			/(เมื่อค่าอัพเกรดรวมกันตั้งแต่\s*\d+)\s*ขึ้นไป(.+)/,
			/If refine rate is (\d+) or higher, (.+)/i,
			/if the sum of refine rate of set is\s*\d+\s*or higher, (.+)/i,
		],
		toConstants2: [/เพิ่ม\s*(.+)\s*เมื่ออัพเกรด\D+(\d+)/],
		toConstantsOfOther: [/If refine rate of (.+) is (\d+) or higher, (.+)/i], // If refine rate of Madogum-LT is 10 or higher, increases all property magical damage by 10%
		toEveryBonus: [
			/(\d+) base (\D+)/i
		],
		toMultiBonusKey: [
			/(.+) damage against (.+)/i,
		],
		matchBonustStep: [
			/ทุกๆ.*ค่า\s*(\D+\d+).+จะ\s*,*\s*(.+)/,
			/(ทุกๆ.*ค่า.+\D+\d+.+)จะ\s*,*\s*(.+)/,
			/ทุก.+Base\s*(\D+\d+)\s*(.+)/,
			/ทุก.+Base\s*(\D+\d+)\s*(.+)/,
			/Every (\d+ base \D+), (.+)/i,
			/(.+) per (\d+ base [\D]{3})/i, //POW + 1 per 25 base Str of the user.\r
		]
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

	private isEnchant = false;

	constructor(private rawItemDescription: string, private itemType: string) {
		this.isEnchant = this.itemType === 'enchant';
		this.extractItemExpressionTh2(this.rawItemDescription);
		this.toScripts(
			this._extractedScript.expressions,
			this._extractedScript.comboes,
		);
	}

	extractItemExpressionTh2(itemDescription: string): this {
		const splited = itemDescription
			.replace(/ประเภท :.+/, '')
			.replaceAll('oncreases', 'Increases')
			.replaceAll('by an', 'by')
			.replaceAll('the damage is increases', 'increases')
			.replaceAll('(the sum of refine rate)', '(the sum of refine rate x 1)')
			.split('\n\n')
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
			let prevCondition2 = '';
			let isClearPrevCond2 = true;
			const splited2 = ss
				.replaceAll('\r\n', '\n')
				.replaceAll('\nและ', ',')
				.replaceAll('/', 'and')
				.replaceAll('an additional ', '')
				.split('\n').map(a => a.replace(' additional', '').replace('againt', 'against'))
				.map(a => a.trim())
				.filter(a => !!a);

			for (const ss2 of splited2) {
				if (ss2.startsWith('Class:')) break;

				const [_, curComboCondition] =
					ss2.match(/เมื่อสวมใส่.+กับ\s*(.+),/) ??
					ss2.match(/เมื่อสวมใส่.+กับ\s*(.+?,)/) ??
					ss2.match(/เมื่อสวมใส่.+กับ\s*(.+)/) ??
					ss2.match(/(เมื่อสวมใส่.+)ATK.+/) ??
					ss2.match(/(เมื่อสวมใส่.+กับ)/) ??
					// ss2.match(/เมื่อ\s*(.+อัพ.+)/) ??
					ss2.match(/เมื่อติดตั้งร่วมกับ\s*\[(.+)\]/) ??
					ss2.match(/เมื่อใช้.*กับ\s*(.+),*\s*(ลด.+|เพิ่ม.+|ATK.+|ASPD+.)/) ??
					ss2.match(/เมื่อใช้.*กับ\s*(.+)/) ??
					ss2.match(/When equipped with\s*(.+?),/i) ??
					ss2.match(/If equipped with (.+)/i) ??
					ss2.match(/If the enchanted equipment is (grade \D{1}).+/i) ?? // If the enchanted equipment is grade D, additional P.Atk + 1 per 20 base POW
					ss2.match(/(Bonus by grade)/i) ??
					// ss2.match(/\[Grade (.+)/) ??
					[];
				// console.log({ss2, curComboCondition})
				const [_a, curCondition] =
					ss2.match(/(เมื่อขั้นอัพเกรดตั้งแต่ \d+) ขึ้นไป, (.+)/) ??
					ss2.match(/(เมื่ออัพเกรดตั้งแต่\s*\d+)/) ??
					ss2.match(/(เมื่อค่าอัพเกรดรวมกันตั้งแต่ \d+) ขึ้นไป, (.+)/) ??
					ss2.match(/(เมื่ออัพเกรด.+)/) ??
					ss2.match(/(ทุก ๆ การอัพเกรด\s*\d+\s*ขั้น)/) ??
					ss2.match(/ถ้าผู้ใช้มีค่า\s*(.+\d+)\s*หรือ.+/) ??
					ss2.match(/ถ้าผู้ใช้มีค่า\s*(.+)/) ??
					ss2.match(/(เมื่อ Base.+\d+).+ขึ้นไป/) ??
					ss2.match(/(\D*Base.+\d+).+ขึ้นไป/) ??
					ss2.match(/(ทุก.+Base.+\d+).+/) ??
					ss2.match(/(เมื่อ.+Base.+\d+).+/) ??
					ss2.match(/(เมื่อทุกๆ\s*\d+.*หน่วย.+)/) ??
					ss2.match(/(If refine rate is\s*\d+\s*or higher)/i) ??
					ss2.match(/(If refine rate is.+)/i) ??
					ss2.match(/(If grade is.+)/i) ??
					ss2.match(/(\[Grade.+\])/i) ??
					[];


				// console.log({ ss2, curComboCondition, prevComboCondition });
				if (curComboCondition) {
					if (
						!ss2.match(/เมื่อค่าอัพเกรดรวมกัน/) &&
						!ss2.match(/ค่าอัพเกรดของ.+รวมกัน.+/) &&
						!ss2.match(/if the sum of refine rate of set is/)
					) {
						prevComboCondition = curComboCondition;
					}
				} else if (curCondition) {
					prevCondition = curCondition;
				}

				const [__, condNeedToMergeLast, newBonus] = ss2.match(/(.+), increases by (\d+\.?\d?)/i) || []; // If grade is B or higher, increases by 5%.
				isClearPrevCond2 = true;

				console.log('00_read_line_by_line', { ss2, curComboCondition, prevComboCondition });
				if (this.isCombo(ss2) || regexCombo.test(ss2)) {
					// console.log({combo:ss2})
					if (this.matchBonusScript(ss2)) {
						expressions.push(ss2);
					}
				} else if (this.matchBonusScript(ss2)) {
					console.log('01_matchBonusScript', { ss2, prevComboCondition });
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
				} else if (prevCondition2 && condNeedToMergeLast && newBonus) {
					expressions.push(`${condNeedToMergeLast}, ${prevCondition2} by ${newBonus}`);
					isClearPrevCond2 = false;
				} else {
					console.log({ '- NOTHING MATCH -': ss2 });
				}

				if (isClearPrevCond2) {
					const [_, pureCondition, _bonus] = ss2.match(/(.+) by (\d+\.?\d?)/i) || []; // Increases physical / magical damage against formless race monsters by 5%.
					prevCondition2 = pureCondition;
				}
			}
		}

		this._extractedScript = { expressions, comboes };

		return this;
	}

	toScripts(expressions: string[], comboes: Record<string, string[]>) {
		const all: Record<string, string[]> = {};
		// let currentGrade = ''
		const addScript = (prop: string, newScript: string) => {
			// console.log({ prop, newScript });

			const props = this.toManyKey(prop);
			const gradeScript = '';
			for (const oneProp of props) {
				if (all[oneProp]) {
					all[oneProp].push(`${gradeScript}${newScript}`);
				} else {
					all[oneProp] = [`${gradeScript}${newScript}`];
				}
			}
		};

		resetLogger.warn('--- start ---');
		console.log({ expressions, comboes });

		for (const _expression of expressions) {
			let expression = _expression;
			let currentGrade = '';
			for (const isGradeRegex of this.regex.isGrades) {
				const [_, grade, restExpr] = expression.match(isGradeRegex) || [];
				if (grade && restExpr) {
					currentGrade = grade;
					expression = restExpr;
					break;
				}
			}

			if (this.isCombo(expression)) {
				for (const { actualAttr, bonus } of this.getMiniScript(expression)) {
					addScript(actualAttr as string, bonus as string);
				}
			} else if (this.matchRefineStepBonus(expression)) {
				for (const obj of this.toRefineStepBonus(
					this.matchRefineStepBonus(expression)!,
				)) {
					console.log('matchRefineStepBonus123123', { obj });
					const [prop, newScript] = Object.entries(obj)[0];
					addScript(prop, newScript);
				}
			} else if (this.matchRefineConstantBonus(expression)) {
				console.log('matchRefineConstant123123', { expression });
				for (const obj of this.toRefineConstantBonus(
					this.matchRefineConstantBonus(expression)!,
				)) {
					const [prop, newScript] = Object.entries(obj)[0];
					addScript(prop, newScript as any);
				}
			} else if (this.isLevelStep(expression)) {
				console.log('isLevelStep123123', { expression });
				for (const obj of this.toLevelStepBonus(expression)) {
					const [prop, newScript] = Object.entries(obj)[0];
					addScript(prop, newScript as any);
				}
			} else if (this.matchStepBonusStat(expression)) {
				console.log('matchStepBonusStat123', { expression });
				for (const obj of this.toRefineStepBonus(
					this.matchStepBonusStat(expression)!,
				)) {
					const [prop, newScript] = Object.entries(obj)[0];
					addScript(prop, newScript as any);
				}
			} else if (this.matchBaseBonusStat(expression)) {
				console.log('matchBaseBonusStat123', { expression });
				for (const obj of this.toRefineConstantBonus(
					this.matchBaseBonusStat(expression)!,
				)) {
					const [prop, newScript] = Object.entries(obj)[0];
					addScript(prop, newScript as any);
				}
			}
			// else if (this.matchGradeOfBaseItem(expression)) { //if grade of weapon is C or higher, 
			// 	console.log('matchGradeOfBaseItem231', { expression })
			// 	for (const obj of this.matchGrade(expression)) {
			// 		// console.log('matchGradeOfBaseItem98456', { obj })
			// 		const [prop, newScript] = Object.entries(obj)[0];
			// 		addScript(prop, newScript as any);
			// 	}
			// } 
			else {
				console.log('default_match', { expression });
				for (const s of this.toManyBonus(expression)) {
					for (const { actualAttr, bonus } of this.getMiniScript(s.trim())) {
						const { skillName, skillLv } =
							this.getLearnedSkillStepCondition(s.trim()) ?? {};
						let newBonus = bonus;
						if (skillName) {
							newBonus = `LEARN_SKILL[${skillName}==${skillLv}]---${Number(newBonus)}`;
						}
						if (currentGrade) {
							addScript(actualAttr, `GRADE[me==${currentGrade}]===${newBonus}`);
							continue;
						}

						addScript(actualAttr as string, newBonus);
					}
				}
			}
		}

		const refineComboRegexs = [
			/if the sum of refine rate of set is\s*(\d+)\s*or higher, (.+)/,
		];
		// comboCondition: 'Thanos Sword-AD',
		// _expressions: [
		// 	'increases Cart Cannon damage by 10% per 2 refine rate of weapon.'
		// ],
		// xComboCondition: 'Thanos Sword-AD'
		logger.debug('--- start combo ---');
		for (const [comboCondition, _expressions] of Object.entries(comboes)) {
			let xComboCondition = comboCondition.replace(/,*\s*$/, '').replaceAll(' or ', '||').replaceAll(' and ', '&&');
			let prefix = `EQUIP[${xComboCondition}]`;
			// console.log({ comboCondition, _expressions, xComboCondition });

			for (let _expression of _expressions) {
				let refineCombo = 0;

				for (let i = 0; i <= this.regex.isGrades.length; i++) {
					const isGradeRegex = this.regex.isGrades[i];
					const [_, grade, restExpr, rest2] = _expression.match(isGradeRegex) || [];
					const itemType = this.itemType === 'enchant' ? 'weapon' : 'me';
					if (grade && restExpr && rest2) {
						const newGrade = validItemPositions.includes(grade) ? itemType : 'weapon';
						prefix += `GRADE[${newGrade}==${restExpr}]`;
						_expression = rest2;
					} else if (grade && restExpr) {
						if (i === 0) {
							prefix = `GRADE[me==${grade}]`;
						} else {
							prefix = `GRADE[${itemType}==${grade}]`;
						}
						break;
					}
				}

				const expression = _expression.replace(/(^\[GRADE\D+] )?/i, '');

				for (const regex of refineComboRegexs) {
					const [_, refine] = expression.match(regex) ?? [];
					if (refine) {
						refineCombo = Number(refine);
						break;
					}
				}
				const refineScript =
					refineCombo > 0 ? `REFINE[xxx==${refineCombo}]` : '';

				// console.log({ expression });
				if (expression.includes('Class:')) break;

				if (this.matchRefineStepBonus(expression)) {
					console.log('combomatchRefineStep231', { expression });
					for (const obj of this.toRefineStepBonus(
						this.matchRefineStepBonus(expression)!,
					)) {
						// console.log('matchRefineStep98456', { obj })
						const [prop, newScript] = Object.entries(obj)[0];
						addScript(
							prop,
							`${prefix}${refineScript}${newScript}`,
						);
					}
				} else if (this.matchRefineConstantBonus(expression)) {
					console.log('combomatchRefineConstant231', { expression });
					for (const obj of this.toRefineConstantBonus(
						this.matchRefineConstantBonus(expression)!,
					)) {
						// console.log('matchRefineConstant98456', { obj })
						const [prop, newScript] = Object.entries(obj)[0];
						addScript(
							prop,
							`${prefix}${refineScript}${newScript}`,
						);
					}
				} else if (this.matchGrade(expression)) { //if grade of weapon is C or higher, 
					console.log('combomatchGra231', { expression });
					for (const obj of this.matchGrade(expression)) {
						// console.log('matchGra98456', { obj })
						const [prop, condition] = Object.entries(obj)[0];
						addScript(
							prop,
							`${prefix}${refineScript}${condition}`,
						);
					}
				} else if (this.isLevelStep(expression)) {
					for (const obj of this.toLevelStepBonus(expression)) {
						const [prop, newScript] = Object.entries(obj)[0];
						addScript(
							prop,
							`${prefix}${refineScript}${newScript}`,
						);
					}
				} else if (this.matchStepBonusStat(expression)) {
					for (const obj of this.toRefineStepBonus(
						this.matchStepBonusStat(expression)!,
					)) {
						const [prop, newScript] = Object.entries(obj)[0];
						addScript(
							prop,
							`${prefix}${refineScript}${newScript}`,
						);
					}
				} else if (this.matchBaseBonusStat(expression)) {
					for (const obj of this.toRefineConstantBonus(
						this.matchBaseBonusStat(expression)!,
					)) {
						const [prop, newScript] = Object.entries(obj)[0];
						addScript(
							prop,
							`${prefix}${refineScript}${newScript}`,
						);
					}
				} else if (this.matchTotalRefine(expression)) {
					for (const obj of this.toTotalRefineBonus(
						this.matchTotalRefine(expression)!,
					)) {
						const [prop, newScript] = Object.entries(obj)[0];
						addScript(
							prop,
							`${prefix}${refineScript}${newScript}`,
						);
					}
				} else {
					console.log('default_combo', { expression });
					for (const s of this.toManyBonus(expression)) {
						for (const { actualAttr, bonus, isFinalBonus } of this.getMiniScript(s.trim())) {
							console.log('default_combo_b', { actualAttr, bonus });
							if (isFinalBonus) {
								addScript(
									actualAttr as string,
									`${prefix}${refineScript}${bonus}`,
								);
								continue;
							}

							addScript(
								actualAttr as string,
								`${prefix}${refineScript}===${Number(bonus)}`,
							);
						}
					}
				}
			}
		}

		const script: Record<string, string[]> = {};
		for (const [attr, values] of Object.entries(all)) {
			// console.log({ attr })
			for (const goodAttr of attr.split(/\sand\s/gi).map(a => a.trim()).filter(Boolean).flatMap(this.toAttr)) {
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
								/(.*?)(str|dex|vit|luk|int|agi|pow|sta|wis|spl|con|crt|lv|level)(\d{1,3})(===|---)(.+)/i,
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

	private pushFinalScript(scripts: any[], attr: string, txtScript: string) {
		scripts.push({ [attr]: txtScript });
	}

	getComboScript(rawExpression: string): TranslateScriptResult[] {
		const scripts = [] as TranslateScriptResult[];

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
						bonus: `EQUIP[${comboItem.replace(' and ', '&&').replace(' or ', '||')}]===${Number(a.bonus)}`,
					});
				}
			}

			return scripts;
		}

		const [_, combo] =
			rawExpression.match(/When equipped with\s*(.+?),/i) ??
			rawExpression.match(/\s(.*?),\s/) ??
			rawExpression.match(/\[Grade (.*?)\]/) ??
			[];
		const aSetRegex = /(เมื่อ.+?,)/i;
		const expressions = rawExpression
			.replace(combo, '')
			.replace(aSetRegex, '')
			.trim()
			.split(',')
			.map((a) => a.trim())
			.filter(a => !!a);
		console.log('combo_final_expressios', expressions);

		for (const expression of expressions.filter((a) => a.match(/\d/))) {
			console.log('combo_final_expression', expression);
			for (const a of this.getMiniScript(expression)) {
				const comboCondition = `EQUIP[${combo.replace(' and ', '&&').replace(' or ', '||')}]`;
				if (a.isFinalBonus) {
					scripts.push({
						actualAttr: a.actualAttr,
						bonus: `${comboCondition}${a.bonus}`,
						isFinalBonus: true,
					});
					continue;
				}

				scripts.push({
					actualAttr: a.actualAttr,
					bonus: `${comboCondition}===${Number(a.bonus)}`,
				});
			}
		}

		return scripts;
	}

	getAutoByAtkScript(rawExpression: string): TranslateScriptResult[] {
		const scripts = [] as TranslateScriptResult[];
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
	): TranslateScriptResult[] {
		const scripts = [] as TranslateScriptResult[];
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
			/(Variable Cast Time ลดลง|ลดระยะเวลาร่าย\D+|ความเร็วในการโจมตีเพิ่มขึ้น|ลดความ|ลาดาเมจ\D+)\s*(\d+)/i;
		const fixCast1 = /ลด\s*(Fixed\D+)\s*(\d+\.*\d*)/;
		const fixCast2 = /(ลดระยะเวลาร่ายแบบคง\D+)\s*(\d+\.*\d*)/;
		const pene1 = /(เพิกเฉย.*?ทุกเผ่า).*?(\d+)/i;
		const baseStatRegex =
			/(Critical Damage.+|All Talent Stat|All Trait Status|all basic status|all triat status|All State|All Status|P.Atk\/S.Matk|POW\/SPL|P.Atk|S.Matk|C.Rate|MATK|FLEE|ATK|DEX|MDEF|DEF|Def|Mres|Res|H.Plus|INT|VIT|AGI|STR|CRI|LUK|POW|STA|WIS|SPL|CON|CRT|Cri|ASPD|SPD|MaxHP|MHP|HP|MaxSP|SP|MSP|HIT)\D*(\d+%*)/i;
		const constantRegex2 =
			/(Damage ทางกายภาพระยะไกล|ความเร็วในการโจมตี|Item Drop Rate|EXP ที่ได้รับจากมอนสเตอร์|โอกาสคริติคอล)\D*(\d+)%*/;
		const engConstantRex1 = /(reduces variable casting time|reduces variable casting time and global cooldown|Global Cooldown) by (-*\d+)/i;
		const engConstantRex2 = /increases(\D+)damage\D+(\d+)%*/i;
		const engSkill = /[increases ]*?(\D+)damage\D+(\d+)%*/i;
		const engConstantRex5 = /reduces skill (cooldown of \D+)by\D+(\d+\.*\d*)%*/i;
		const engConstantRex3 =
			/(increases attack speed \(reduces delay after attack by|Reduce after cast delay|increases attack speed|reduces delay after attack by|reduces global cooldown|reduces global cooldown by|Reduces global cooldown by|Perfect Hit|Hit|Cri)\D+(\d+\.*\d*)%*/i;
		const engConstantRex4 = /(P.ATKandS.MATK|S.Matk|P.Atk|Matk|Atk)\D*(\d+%*)/i;
		const engConstantRex6 = /(Dex|Int|Vit|Agi|Str|Luk|POW|STA|WIS|SPL|CON|CRT|Flee)\D*(\d+%*)/i;
		const engConstantRex7 = /(melee|long ranged[ physical damage]*)\D*(\d+%*)/i;
		const engConstantRex8 =
			/(magical damage against all property|magical damage to against all race|physical damage against all property|physical damage to against all race monsters|physical damage against all race|all property magical damage|magical damage against all race|critical damage|magical damage against all size|physical damage against all size)\D*(\d+%*)/i;
		const engConstantRex8_specific = /(physical damage against normal and boss|magical physical damage against normal and boss|damage against \D+|physical damage against \D+|magical damage against \D+)\D*(\d+%*)/i;
		const bothBonus = /(physical and magical damage against all property|physical and magical damage against all size|magical damage against boss|physical damage against boss)\D+(\d+%*)/i;
		const engConstantRex9 = /(fixed casting time)\D*(\d\.*\d*)/i;
		const crimsonSkill = /(Crimson Rock.+?|Crimson Arrow.+?)(?:damage by)? (\d+)%/i;
		const inCreasesPercentage = /increases (.+?)(?:damage)? by \((the sum of refine rate x \d+)/i; // increases Explosive Powder damage by (the sum of refine rate x 1)%. // increases Dawn Break damage by (the sum of refine rate x 2)%.
		const multi = /(melee and long range|critical damage and long ranged|critical damage and melee|long ranged physical damage and all property magical damage|melee physical damage and all property magical)\D*(\d+%*)/i;

		// console.log({usableStr, m: usableStr.match(engConstantRex3)})
		const result = (
			usableStr.match(multi) ||
			usableStr.match(inCreasesPercentage) ||
			usableStr.match(fixCast1) ||
			usableStr.match(fixCast2) ||
			usableStr.match(multiRegex3) ||
			usableStr.match(pene1) ||
			// usableStr.match(constantRegexPercent) ||
			usableStr.match(multiRegex) ||
			usableStr.match(multiRegex2) ||
			usableStr.match(constantRegex2) ||
			usableStr.match(engConstantRex1) ||
			usableStr.match(bothBonus) ||
			usableStr.match(engConstantRex8) ||
			usableStr.match(engConstantRex8_specific) ||
			usableStr.match(engConstantRex9) ||
			usableStr.match(engConstantRex3) ||
			usableStr.match(engConstantRex2) ||
			usableStr.match(engConstantRex7) ||
			usableStr.match(engConstantRex4) ||
			usableStr.match(engConstantRex5) ||
			usableStr.match(engSkill) ||
			usableStr.match(crimsonSkill) ||
			usableStr.match(baseStatRegex) ||
			usableStr.match(engConstantRex6)
		);

		// console.log({ usableStr, result })

		return result;
	}

	matchRefineConstantBonus(
		rawExpression: string,
	): { condition: string; script: string; } | undefined {
		const usable = rawExpression.trim();
		// console.log('matchRefineConstan154', { rawExpression }) // If refine rate is 9 or higher, increases Arrow Storm damage by 40% and Focused Arrow Strike damage by 20%.
		for (const regex of this.regex.toConstants) {
			const [_raw, condition, script] = usable.match(regex) ?? [];
			// if (matched?.length >= 2) return matched[1];
			// console.log({rawExpression, condition, script}) // script = increases Arrow Storm damage by 40% and Focused Arrow Strike damage by 20%.
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
		for (const regex of this.regex.toConstantsOfOther) {
			const [_raw, itemName, refineCondition, bonus] = usable.match(regex) ?? [];
			if (itemName && refineCondition && bonus) {
				return { condition: `REFINE[weapon==${refineCondition}]`, script: bonus };
			}
		}

		return undefined;
	}

	matchGrade(
		rawExpression: string,
	): Record<string, string>[] | undefined {
		for (const isGradeRegex of this.regex.matchGrades) {
			const [_, itemPosition, grade, restExpr] = rawExpression.match(isGradeRegex) || [];
			if (itemPosition && grade && restExpr) { // weapon, C
				const all = [];

				for (const { actualAttr, bonus } of this.getMiniScript(restExpr)) {
					this.pushFinalScript(all, actualAttr, `GRADE[${itemPosition.toLowerCase()}==${grade.toUpperCase()}]===${Number(bonus)}`);
				}

				return all;
			}
		}

		return undefined;
	}

	matchGradeOfBaseItem(
		rawExpression: string,
	): Record<string, string>[] | undefined {
		for (const isGradeRegex of this.regex.matchGradeOfBaseItems) {
			const [_, grade, restExpr] = rawExpression.match(isGradeRegex) || [];
			if (grade && restExpr) { // weapon, C
				const all = [];

				for (const { actualAttr, bonus } of this.getMiniScript(restExpr)) {
					this.pushFinalScript(all, actualAttr, `GRADE[me==${grade.toUpperCase()}]===${Number(bonus)}`);
				}

				return all;
			}
		}

		return undefined;
	}

	matchRefineStepBonus(
		rawExpression: string,
	): { every: string; bonusScript: string; } | undefined {
		const usable = rawExpression.trim();
		for (let i = 0; i < this.regex.toSteps.length; i++) {
			const regex = this.regex.toSteps[i];
			const [_, every, bonusScript] = usable.match(regex) ?? [];

			// console.log({rawExpression, every, bonusScript})
			const isRevertBonus = i >= 3;

			if (isRevertBonus) {
				if (every && bonusScript) {
					return { every: bonusScript, bonusScript: every };
				}
			} else {
				if (every && bonusScript) {
					return { every, bonusScript };
				}
			}
		}

		return;
	}

	getLearnedSkillStepCondition(rawExpression: string): {
		skillName: string;
		skillLv: number;
	} {
		const regexs = [
			/(\d+) level(s*) of (.+) user learned/i,
			/(each) level(s*) of (.+) user learned/i,
		];

		for (const regex of regexs) {
			const [_, _rawSkillLv, _1, skillName] = rawExpression.match(regex) ?? [];
			if (skillName) {
				console.log({ _rawSkillLv, skillName });
				const skillLv =
					_rawSkillLv?.toLowerCase()?.trim() === 'each'
						? 1
						: Number(_rawSkillLv);
				return { skillName, skillLv };
			}
		}

		return;
	}

	getMiniScript(rawExpression: string,): TranslateScriptResult[] {
		if (this.isCombo(rawExpression)) {
			return this.getComboScript(rawExpression.replace(/เมื่อสวมใส่|When equipped with/i, ''));
		}

		const usableStr = rawExpression.replace(/(ขึ้น)?อีก\s*/, '');
		const [_raw, attr, bonus] = this.matchBonusScript(usableStr) ?? [];
		// console.log('getMiniScript954656', { rawExpression, attr, bonus })

		const sumOfRefineRateWord = 'the sum of refine rate x ';
		if (bonus?.startsWith(sumOfRefineRateWord)) {
			const b = Number(bonus.replace(sumOfRefineRateWord, ''));
			return [{ actualAttr: attr, bonus: `REFINE[==1]---${b}`, isFinalBonus: true }];
		}

		const scripts = [] as any[];
		if (attr && bonus) {
			const actualAttr = (MAP_ATTR[attr] ?? attr).trim() as string;
			const goodBonus = Number.isNaN(Number(bonus))
				? bonus.replace(/\D/g, '')
				: bonus;
			// console.log({ attr, actualAttr, bonus, goodBonus });
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
				return [{ actualAttr: goodAttr, bonus: String(Number(goodBonus)) }];
			}

			scripts.push({ actualAttr, bonus: Number(goodBonus) });
		}

		return scripts;
	}

	toRefineConstantBonus(
		params?: string | { condition: string; script: string; },
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
			rawExpression = (params as any).script; // increases Arrow Storm damage by 40% and Focused Arrow Strike damage by 20%.
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
				// console.log('x123', {actualAttr, condition, bonus})
				this.pushFinalScript(all, actualAttr, `${condition}===${bonus}`);
			}

			return all;
		}

		if (scriptStr.includes('และเมื่อ')) {
			const scripts = scriptStr
				.split(/และ|and/)
				.map((a) => a.trim())
				.filter((a) => !!a);
			for (const ss of scripts) {
				for (const { actualAttr, bonus } of this.getMiniScript(ss)) {
					// console.log('x1234', {actualAttr, condition, bonus})
					this.pushFinalScript(all, actualAttr, `${condition}===${bonus}`);
				}
			}
			if (all.length > 0) return all;
		}

		const scripts = scriptStr.split(/(\D+\d+\.*\d*%*)/g).filter(a => a.match(/\d+/));
		for (const ss of scripts) {
			// console.log({ss})
			for (const { actualAttr, bonus } of this.getMiniScript(ss)) {
				console.log('x12345', { ss, actualAttr, condition, bonus });
				if (condition.startsWith('levelis')) {
					const lvCondition = condition.replace('levelis', '');
					this.pushFinalScript(all, actualAttr, `SUM[level==${lvCondition}]===${bonus}`);
				} else if (condition.includes('รวมกัน')) {
					const [_, numCondition] = condition.match(/(\d+)/) || [];
					this.pushFinalScript(all, actualAttr, `REFINE[==${numCondition}]===${bonus}`);
				} else {
					this.pushFinalScript(all, actualAttr, `${condition}===${bonus}`);
				}
			}
		}
		if (all.length > 0) return all;

		const checkes = this.getMiniScript(scriptStr);
		// console.log({checkes})
		if (Array.isArray(checkes) && checkes.length > 0) {
			for (const { actualAttr, bonus } of checkes) {
				this.pushFinalScript(all, actualAttr, `${condition}===${bonus}`);
			}

			return all;
		}

		return all;
	}

	toEveryBaseStat(everyStr: string) {
		for (const regex of this.regex.toEveryBonus) {
			const [_, every, status] = everyStr.match(regex) || [];
			// console.log({everyStr, every, status})
			if (every && status) {
				return `SUM[${status.toLowerCase()}==${every}]`;
			}
		}

		return everyStr;
	}

	addStepBonus(p: { all: any[], every: string, actualAttr: string, bonus: string; }) {
		const { actualAttr, all, bonus: _bonus, every } = p;
		let wasSetBonus = false;
		const bonus = Number(_bonus);
		for (const rx of this.regex.stepOnOther) {
			const [_, everyRefine, equipmentPostion] = every.match(rx) || [];
			// console.log({ every, everyRefine, equipmentPostion, actualAttr, bonus });
			if (everyRefine && equipmentPostion) {
				const prefix = this.patterns.mainState.includes(equipmentPostion.toUpperCase()) ? 'SUM' : 'REFINE';

				if (equipmentPostion === 'rate' && prefix === 'REFINE') {
					this.pushFinalScript(all, actualAttr, `${everyRefine}---${bonus}`);
				} else {
					this.pushFinalScript(all, actualAttr, `${prefix}[${equipmentPostion.toLowerCase()}==${everyRefine}]---${bonus}`);
				}

				wasSetBonus = true;
				break;
			}
		}
		if (!wasSetBonus) this.pushFinalScript(all, actualAttr, `${this.toEveryBaseStat(every)}---${bonus}`);
	}

	toRefineStepBonus(params: {
		every: string;
		bonusScript: string;
	}): Record<string, string>[] {
		if (!params) return [];

		const { bonusScript, every } = params;
		// 	every: '2 refine rate of weapon',
		// 	bonusScript: 'increases Cart Cannon damage by 10%'
		// console.log({ every, bonusScript });

		const moreOneBonusScipts = this.toManyBonus(bonusScript); //P.Atk + 2, increases melee and long ranged physical damage by 2%.
		// console.log({every, bonusScript, moreOneBonusScipts})
		if (moreOneBonusScipts.every((a) => this.matchBonusScript(a))) {
			const all: Record<string, string>[] = [];
			for (const _bonusscript of moreOneBonusScipts) {
				// console.log({_bonusscript})
				for (const { actualAttr, bonus } of this.getMiniScript(_bonusscript)) {
					// console.log({_bonusscript, actualAttr, bonus, every})
					this.addStepBonus({ actualAttr, all, bonus, every });
				}
			}

			return all;
		}

		const moreOneBonusScipts2 = bonusScript.match(/\D+\d+/gi).map(a => a.trim()).filter(a => !!a);
		// console.log({bonusScript, moreOneBonusScipts})
		if (moreOneBonusScipts2.every((a) => this.matchBonusScript(a))) {
			const all: Record<string, string>[] = [];
			for (const _bonusscript of moreOneBonusScipts2) {
				// console.log({_bonusscript})
				for (const { actualAttr, bonus } of this.getMiniScript(_bonusscript)) {
					// console.log({_bonusscript, actualAttr, bonus})
					this.addStepBonus({ actualAttr, all, bonus, every });
				}
			}

			return all;
		}

		// console.log({bonusScript})
		const all: Record<string, string>[] = [];
		for (const { actualAttr, bonus } of this.getMiniScript(bonusScript)) {
			this.addStepBonus({ actualAttr, all, bonus, every });
		}

		return all;
	}

	toLevelStepBonus(expression: string): Record<string, string>[] {
		const { condition, script } = this.isLevelStep(expression)!;
		const xCondition = condition.replace(/\W/g, '');

		// console.log({condition, xCondition, script})
		const all: Record<string, string>[] = [];
		for (const subScript of script.split(',').flatMap(a => a.split('/').map(b => b.trim()))) {
			for (const { actualAttr, bonus } of this.getMiniScript(subScript)) {
				// console.log({xCondition, actualAttr, bonus})
				this.addStepBonus({ actualAttr, all, bonus, every: xCondition });
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
			if (!actualAttr) continue;

			all.push({ [actualAttr]: `REFINE[${condition}]===${bonus}` });
		}

		return all;
	}

	isCombo(script: string) {
		return (
			script.startsWith('เมื่อสวมใส่') ||
			script.startsWith('When equipped with')
		);
	}

	isAutoByAtk(script: string) {
		return script.startsWith('เมื่อโจมตี');
	}

	isBuffWhenSkill(
		script: string,
	): { skillName: string; chanceScript: string; } | undefined {
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
	): { condition: string; script: string; } | undefined {
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
	): { every: string; bonusScript: string; } | undefined {
		for (const [i, regex] of this.regex.matchBonustStep.entries()) {
			const [_raw, every, bonusScript] = expression.match(regex) ?? [];
			// console.log({expression, every, bonusScript})

			const isRevertBonus = i >= 5;
			// if (isRevertBonus) console.log({expression, every, bonusScript})

			if (every && bonusScript) {
				if (isRevertBonus) return { every: bonusScript, bonusScript: every.replace(' ', '').toLowerCase() };
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
				const c = combo.trim().split(',').join(',').toLowerCase();
				return { every: c + every, bonusScript };
			}
		}

		return undefined;
	}

	matchBaseBonusStat(
		expression: string,
	): { condition: string; script: string; } | undefined {
		const regexs = [
			/ถ้า.+มีค่า\s*(\D+\d+\s?).+หรือมากกว่า.+/,
			/ถ้า.+มีค่า\s*(\D+\d+.+)จะ\s*,*\s*(.+)/,
			/เมื่อ Base\s*(\D+\d+.+)ขึ้นไป\s*,*\s*(.+)/,
			/.*Base\s*(\D+\d+)\s*,*\s*(.+)/i,
			/เมื่อเลเวลตัวละครตั้งแต่\s*(\D+\d+)\s*,*\s*(.+)/,
			/If[\D]*base level is (\d+)\s*[or higher]*,\s*(.+)/i, // If the user's base level is 210 or higher, SPL + 2, S.Matk + 1.
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
	): { condition: string; bonusScript: string; } | undefined {
		const regexs = [/มื่อค่าอัพเกรด\D+(\d+).+ขึ้นไป\s*(.+)/];
		for (const regex of regexs) {
			const [_raw, condition, bonusScript] = expression.match(regex) ?? [];
			if (condition && bonusScript) {
				return { condition, bonusScript };
			}
		}

		return undefined;
	}

	toManyKey(_prop: string) {
		console.log({ _prop });
		const [_, ph, mag, bonus] = _prop.replaceAll(' monsters by', '').match(/(physical) and (magical) (.+)/i) || [];
		if (ph && mag && bonus) {
			return [ph, mag].map(a => `${a} ${bonus}`);
		}

		return _prop.split(',')
			.flatMap((a) => a.split(/\/|และ| and /gi))
			.map((a) => a.replace(' monsters by', '').trim().replace(/^and/i, ''))
			.filter((a) => a !== '');
	}

	toManyBonus(_prop: string) {
		const regexes = [
			/(.+) [race]+ [monsters|enemies] by (.+)/i,
			/(.+) [monsters|enemies]+ by (\d+)/i,
			/(.+) property enemies by (\d+)/i,
		];

		const prop = _prop.startsWith('damage against') ? `physical and magical ${_prop}` : _prop;
		const [_, dmgType, x] = prop.match(/(.+) damage against (.+)/i) || [];
		console.log({ prop, dmgType, x });
		if (dmgType && x) {
			return dmgType
				.split(/ and /i)
				.flatMap(s => {
					for (const rx of regexes) {
						const [_, monsterTypes, bonusValue] = x.match(rx) || [];
						console.log({ s, monsterTypes, bonusValue });
						if (monsterTypes && bonusValue) {
							return monsterTypes.split('and').filter(a => a!!.trim()).map(race => `${s} damage against ${race.trim()} ${bonusValue}`);
						}
						// else if (monsterTypes) { // physical and magical damage against all size enemies by
						// 	return monsterTypes.split('and').filter(a => a!!.trim()).map(type => `${s} damage against ${type.trim()}`)
						// }
					}

					return `${s} damage against ${x}`;
				})
				.map(a => a.toLowerCase().trim());
		}

		// const basic = prop.split(',')
		// 	.flatMap((a) => a.split(/และ|(\D+\d+%*)/gi))
		// 	.map((a) => a.trim().replace(/^and/i, ''))
		// 	.filter((a) => a !== '');

		//Increases Exploding Dragon, Snow Flake Draft and First Wind damage by 15%.'
		const basic = prop.split(/(\D+\d+\.*\d*%*)/gi)
			.map((a) => a.trim().replace(/^and/i, '').trim())
			.filter((a) => a !== '' && a.match(/(\D+\d+%*)/i));

		// [Grade B] P.Atk, S.Matk + 1.
		const xs = [];
		// for (const b of basic) {
		// 	const [_, key, bonus] = b.match(/(\D+?)(?:\+)*\s*(\d+\.*\d*%*)/i)
		// 	const s = key.split(/and|,/).map(a => a.trim())
		// 	if (s.length <= 1) continue;

		// 	const suffix = (b.includes('damage by ')) ? ' damage by' : '';
		// 	const prefix = b.includes('Increases ') ? 'Increases ' : ''

		// 	xs.push(...s.map(a => `${prefix}${a.replace('Increases ', '').replace('damage by', '')}${suffix} ${bonus}`))
		// }

		console.log('00_basic', { basic });

		if (xs.length) return xs;

		return basic;
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
			.replace('cooldown of  ', 'cd__')
			.replace('cooldown of ', 'cd__')
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
		console.log('00_to_multi_bonus', { rawAttr, goodAttr });

		const found = MAP_ATTR[goodAttr];
		if (found) return [found];

		for (const [attrAll, template] of Object.entries(MAP_TO_MULTI_BONUS)) {
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

		if (!goodAttr.startsWith('เพิ่ม')) {
			return goodAttr.split(',').map((a) => a.trim());
		}

		for (const [check, pre] of Object.entries(MAP_PREFIX)) {
			if (goodAttr.startsWith(check)) {
				let pureAttrs = goodAttr
					.replace(check, '')
					.replaceAll('และ', ',')
					.replaceAll('and', ',')
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
