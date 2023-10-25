import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import { catchError, of, retry } from 'rxjs';
import { BuildScript } from './build-script';
import { ItemAPIModel } from './item-api.model';

enum CardPosition {
	Weapon = 0,
	Head = 769,
	Shield = 32,
	Armor = 16,
	Garment = 4,
	Boot = 64,
	Acc = 136,
	AccL = 128,
	AccR = 8,
}

enum ItemTypeId {
	WEAPON = 1,
	ARMOR = 2,
	CONSUMABLE = 3,
	AMMO = 4,
	ETC = 5,
	CARD = 6,
	SHADOW = 10,
}

enum ItemSubTypeId {
	Gatling_Gun = 275,
	Upper = 512,
	Shield = 514,
	Armor = 513,
	Garment = 515,
	Boot = 516,
	Acc = 517,
	Acc_R = 510,
	Acc_L = 511,
	Special = 768,
	Pet = 518,
	Enchant = 0,

	ShadowEnhUpper = 71,
	ShadowEnhMiddle = 72,
	ShadowEnhLower = 73,
	ShadowEnhGarment = 74,

	ShadowShield = 527,
	ShadowBoot = 528,
	ShadowEarning = 529,
	ShadowPendant = 530,
	ShadowWeapon = 280,
}

interface ItemModel {
	id: number;
	aegisName: string;
	name: string;
	unidName: string;
	resName: string;
	description: string;
	slots: number;
	itemTypeId: number;
	itemSubTypeId: number;
	itemLevel: any;
	attack: any;
	propertyAtk: any;
	defense: any;
	weight: number;
	requiredLevel: any;
	location: any;
	compositionPos: number;
	enchants: [null, string[], string[], string[]];
	script?: any;
}

const UsedWordingMap = {
	ทุกอาชีพ: 'all',
} as const;

export interface MonsterModel {
	id: number;
	dbname: string;
	name: string;
	spawn: string;
	stats: Stats;
}

export interface Stats {
	attackRange: number;
	level: number;
	health: number;
	sp: number;
	str: number;
	int: number;
	vit: number;
	dex: number;
	agi: number;
	luk: number;
	rechargeTime: number;
	atk1: number;
	atk2: number;
	attack: Attack;
	magicAttack: MagicAttack;
	defense: number;
	baseExperience: number;
	jobExperience: number;
	aggroRange: number;
	escapeRange: number;
	movementSpeed: number;
	attackSpeed: number;
	attackedSpeed: number;
	element: number;
	elementName: string;
	elementShortName: string;
	scale: number;
	scaleName: string;
	race: number;
	raceName: string;
	magicDefense: number;
	hit: number;
	flee: number;
	ai: string;
	mvp: number;
	class: number;
	attr: number;
	res: number;
	mres: number;
}

export interface Attack {
	minimum: number;
	maximum: number;
}

export interface MagicAttack {
	minimum: number;
	maximum: number;
}

const mapRace = [
	'Formless',
	'Undead',
	'Brute',
	'Plant',
	'Insect',
	'Fish',
	'Demon',
	'DemiHuman',
	'Angel',
	'Dragon',
];
const mapScale = ['Small', 'Medium', 'Large'];
const mapElement = [
	'Neutral',
	'Water',
	'Earth',
	'Fire',
	'Wind',
	'Poison',
	'Holy',
	'Dark',
	'Ghost',
	'Undead',
];
const mapClass = ['Normal', 'Boss'];

@Injectable()
export class RoScriptTranslatorService {
	private readonly baseDbAPI = process.env.RO_DB_API;
	private readonly baseDbAPIKey = process.env.RO_DB_API_KEY;
	private readonly baseDbImgAPI = process.env.RO_DB_IMG_API;

	private readonly baseItemFilePath = process.env.RO_BASE_ITEM_FILE_PATH;
	private readonly usingItemFilePath = process.env.RO_USING_ITEM_FILE_PATH;
	private readonly baseMonsterFilePath = process.env.RO_BASE_MONSTER_FILE_PATH;
	private readonly usingMonsterFilePath =
		process.env.RO_USING_MONSTER_FILE_PATH;
	private readonly baseAssetFilePath = process.env.RO_ASSET_FILE_PATH;

	constructor(private http: HttpService) {}

	async loadMonster(monsterIds: number[]) {
		const path = this.baseMonsterFilePath;
		const fileContent = fs.readFileSync(path, { encoding: 'utf8' });
		const currentData = JSON.parse(fileContent) as Record<string, MonsterModel>;
		for (const id of monsterIds) {
			const url = `${this.baseDbAPI}/Monster/${id}?apiKey=${this.baseDbAPIKey}&server=thROG`;
			try {
				const { data } = await this.http.get<MonsterModel>(url).toPromise();
				const { id, dbname, name, stats, spawn } = data;
				const [doublePropLevel, position] = stats.element
					.toString()
					.split('')
					.map(Number);
				const elementName = mapElement[position] + ' ' + doublePropLevel / 2;
				const scaleName = mapScale[stats.scale];
				const raceName = mapRace[stats.race];
				const elementShortName = elementName.replace(/\s+\d+/, '');

				const sp = Array.isArray(spawn)
					? [...new Set(spawn.map((a) => a.mapname))].join(',')
					: String(spawn);

				currentData[id] = {
					id,
					dbname,
					name,
					spawn: sp,
					stats: {
						...stats,
						elementName,
						elementShortName,
						scaleName,
						raceName,
					},
				};
			} catch (error) {
				console.error({ url, msg: error?.response?.statusText });
			}
		}
		// for (const [id, data] of Object.entries(currentData)) {
		//   data.stats.raceName = mapRace[data.stats.race];
		// }

		const s = JSON.stringify(currentData, undefined, 2);
		fs.writeFileSync(path, s);
		fs.writeFileSync(this.usingMonsterFilePath, s);
		return { status: 'ok' };
	}

	syncAll() {
		const path = this.baseItemFilePath;
		const fileContent = fs.readFileSync(path, { encoding: 'utf8' });
		const currentData = JSON.parse(fileContent) as Record<string, ItemModel>;
		for (const item of Object.values(currentData)) {
			// currentData[item.id] = this.addExtra(item as any);

			// if (item.itemTypeId === 1) {
			currentData[item.id] = this.addExtra(item as any) as any;
			if (!item.script) {
				console.log({ 'item.id': item.id });
				currentData[item.id].script = new BuildScript(
					currentData[item.id].description,
				).scripts;
			}
		}
		const s = JSON.stringify(currentData, undefined, 2);

		fs.writeFileSync(this.usingItemFilePath, s);
		fs.writeFileSync(path, s);

		return { status: 'ok' };
	}

	sync<T extends { id: number } & ItemModel>(updatedItems: T[]) {
		const path = this.baseItemFilePath;
		const fileContent = fs.readFileSync(path, { encoding: 'utf8' });
		const currentData = JSON.parse(fileContent);
		for (const updatedItem of updatedItems) {
			currentData[updatedItem.id] = {
				...(currentData[updatedItem.id] ?? {}),
				...this.addExtra(updatedItem as any),
			};

			if (!currentData[updatedItem.id]?.script && !updatedItem.script) {
				currentData[updatedItem.id].script = new BuildScript(
					currentData[updatedItem.id].description,
				).scripts;
			} else if (currentData[updatedItem.id]?.script) {
				const bk = currentData[updatedItem.id].script;
				delete currentData[updatedItem.id].script;
				currentData[updatedItem.id].script = bk;
			}
		}
		const s = JSON.stringify(currentData, undefined, 2);
		fs.writeFileSync(path, s);
		fs.writeFileSync(this.usingItemFilePath, s);
	}

	async loadItems(rawItemIds: number[]) {
		const itemIds: number[] = [
			...new Set(
				(rawItemIds as any[]).map(Number).filter((x) => !Number.isNaN(x)),
			),
		];
		const updatedItems: any[] = [];

		await Promise.all(
			itemIds.map(async (itemId) => {
				const url = `${this.baseDbAPI}/Item/${itemId}?apiKey=${this.baseDbAPIKey}&server=thROG`;
				try {
					const { data } = await this.http
						.get<ItemAPIModel>(url, { timeout: 1000 * 5 })
						.pipe(retry({ count: 10, delay: 3000 }))
						.toPromise();
					const {
						id,
						aegisName,
						name,
						unidName,
						resName,
						description,
						slots,
						itemTypeId,
						itemSubTypeId,
						itemLevel,
						attack,
						defense,
						weight,
						requiredLevel,
						location,
						compositionPos,
						attribute,
						cardPrefix,
					} = data;
					updatedItems.push({
						id,
						aegisName,
						name,
						unidName,
						resName,
						description,
						slots,
						itemTypeId,
						itemSubTypeId,
						itemLevel,
						attack,
						propertyAtk: attribute ? mapElement[attribute] : undefined,
						defense,
						weight,
						requiredLevel,
						location,
						compositionPos,
						cardPrefix: cardPrefix || undefined,
					});

					this.loadImage([itemId]);
				} catch (error) {
					console.error({
						itemId,
						msg:
							error?.response?.statusText || error?.response || error?.message,
					});
				}
			}),
		);

		this.sync(updatedItems);
		const successIdSet = new Set(updatedItems.map((a) => a.id));

		return {
			message: 'OK',
			rawItemIds,
			unsuccessList: rawItemIds.filter((a) => !successIdSet.has(a)),
		};
	}

	private addExtra(
		item: ItemAPIModel & {
			x?: Partial<ItemAPIModel>;
			enchants: any[];
			usableClass: string[];
		},
	) {
		const {
			itemTypeId,
			aegisName,
			name,
			description,
			compositionPos,
			requiredLevel,
		} = item;
		// const x: Partial<ItemAPIModel> = {};

		if (itemTypeId === 1 && item.itemLevel == null) {
			const itemLv =
				Number(description.split('เลเวลอาวุธ : ^777777')[1]?.charAt(0)) ||
				Number(this.getTextBetween(description, 'เลเวลของอาวุธ : ^777777')) ||
				Number(this.getTextBetween(description, 'Lv ของอาวุธ : ^777777'));
			if (Number.isInteger(itemLv)) {
				item.itemLevel = itemLv;
			} else {
				const [, wLevel] = description.match(/\^777777(\d)\^000000/) ?? [];
				item.itemLevel = Number(wLevel);
			}
		}
		if (itemTypeId === 1 && item.itemLevel == null) {
			const itemLv = Number(
				description.split('เลเวลของอาวุธ : ^777777')[1]?.charAt(0),
			);
			if (Number.isInteger(itemLv)) {
				item.itemLevel = itemLv;
			}
		}

		if (
			(aegisName?.endsWith('_Card') || name.endsWith(' Card')) &&
			compositionPos == null
		) {
			item.itemTypeId = 6;
			item.itemSubTypeId = 0;

			if (description.includes('กับ : ^777777Armor')) {
				item.compositionPos = CardPosition.Armor;
			} else if (description.includes('กับ : ^777777Shoes')) {
				item.compositionPos = CardPosition.Boot;
			} else if (description.includes('กับ : ^777777Accessory')) {
				item.compositionPos = CardPosition.Acc;
			}
		}

		if (itemTypeId === 0) {
			if (description.includes('ประเภท : ^777777Accessory (Left)')) {
				item.itemTypeId = 2;
				item.itemSubTypeId = ItemSubTypeId.Acc_L;
			} else if (description.includes('ประเภท : ^777777Accessory (Right)')) {
				item.itemTypeId = 2;
				item.itemSubTypeId = ItemSubTypeId.Acc_R;
			} else if (description.includes('ตำแหน่ง : ^777777Middle')) {
				item.itemTypeId = 2;
				item.itemSubTypeId = ItemSubTypeId.Upper;
				item.location = 'Middle';
			} else if (description.includes('ตำแหน่ง : ^777777Lower')) {
				item.itemTypeId = 2;
				item.itemSubTypeId = ItemSubTypeId.Upper;
				item.location = 'Lower';
			} else if (description.includes('ประเภท : ^777777Shoes')) {
				item.itemTypeId = 2;
				item.itemSubTypeId = ItemSubTypeId.Boot;
			} else if (description.includes('ประเภท : ^777777Armor')) {
				item.itemTypeId = 2;
				item.itemSubTypeId = ItemSubTypeId.Armor;
			} else if (description.includes('ประเภท : ^777777Garment')) {
				item.itemTypeId = 2;
				item.itemSubTypeId = ItemSubTypeId.Garment;
			} else if (description.includes('ประเภท : ^777777Accessory')) {
				item.itemTypeId = 2;
				item.itemSubTypeId = ItemSubTypeId.Acc;
			}
		}
		if (
			requiredLevel === null &&
			description.includes('เลเวลที่ต้องการ : ^777777')
		) {
			item.requiredLevel = Number(
				this.getTextBetween(description, 'เลเวลที่ต้องการ : ^777777'),
			);
		}

		const lowerName = name.toLowerCase();
		if (itemTypeId === 6 && item.itemSubTypeId === 0) {
			if (lowerName.endsWith('stone (upper)')) {
				item.itemSubTypeId = ItemSubTypeId.ShadowEnhUpper;
			} else if (lowerName.endsWith('stone (middle)')) {
				item.itemSubTypeId = ItemSubTypeId.ShadowEnhMiddle;
			} else if (lowerName.endsWith('stone (lower)')) {
				item.itemSubTypeId = ItemSubTypeId.ShadowEnhLower;
			} else if (lowerName.endsWith('stone (garment)')) {
				item.itemSubTypeId = ItemSubTypeId.ShadowEnhGarment;
			}
		}

		if (
			!item.usableClass &&
			(item.itemTypeId === ItemTypeId.WEAPON ||
				item.itemTypeId === ItemTypeId.AMMO ||
				item.itemTypeId === ItemTypeId.ARMOR ||
				item.itemTypeId === ItemTypeId.SHADOW)
		) {
			const wording =
				this.getTextBetween(description, 'อาชีพที่ใส่ได้ : ^777777') ||
				this.getTextBetween(description, 'อาชีพ : ^777777');

			item.usableClass = [
				UsedWordingMap[wording] || wording || UsedWordingMap.ทุกอาชีพ,
			];
		}

		// item.enchants = getEnchants(aegisName ?? name);

		return item;
	}

	private getTextBetween(description: string, searchString: string) {
		const a1 = description.split(searchString)[1];
		if (!a1 || typeof a1 !== 'string') return '';

		return a1.substring(0, a1.indexOf('^') ?? a1.indexOf('^0'));
	}

	loadImage(itemIds: number[]) {
		const roImagePath = this.baseAssetFilePath;
		for (const itemId of itemIds) {
			this.http
				// .get(`https://www.divine-pride.net/img/items/collection/thROG/${itemId}`, {
				// .get(`https://static.divine-pride.net/images/items/item/${itemId}.png`, {
				.get(`${this.baseDbImgAPI}/${itemId}`, {
					responseType: 'stream',
				})
				.pipe(
					catchError((error) => {
						console.error({ [itemId]: error });
						return of(null);
					}),
				)
				.subscribe((res) => {
					res.data
						.pipe(fs.createWriteStream(`${roImagePath}\\${itemId}.png`))
						.on('error', (error) => console.error({ [itemId]: error }))
						.once('close', () => console.log({ [itemId]: 'OK' }));
				});
		}
	}

	private isCard(itemTypeId: number, compositionPos: number) {
		if (itemTypeId === ItemTypeId.CARD) {
			switch (compositionPos) {
				case CardPosition.Weapon:
				case CardPosition.Head:
				case CardPosition.Shield:
				case CardPosition.Armor:
				case CardPosition.Garment:
				case CardPosition.Boot:
				case CardPosition.AccL:
				case CardPosition.AccR:
				case CardPosition.Acc:
					return true;
			}
		}

		false;
	}
}
