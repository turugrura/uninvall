export interface ItemAPIModel {
  classNum: number;
  sets: SetAPI[];
  soldBy: any[];
  id: number;
  aegisName: string;
  name: string;
  unidName: string;
  resName: string;
  unidResName: string;
  description: string;
  unidDescription: string;
  slots: number;
  setname: any;
  itemTypeId: number;
  itemSubTypeId: number;
  itemSummonInfoContainedIn: ItemSummonInfoContainedInAPI[];
  itemSummonInfoContains: any[];
  attack: number;
  defense: any;
  weight: number;
  requiredLevel: number;
  limitLevel: any;
  itemLevel: any;
  job: number;
  compositionPos: any;
  attribute: number;
  location: any;
  locationId: number;
  accessory: any;
  price: any;
  range: any;
  matk: any;
  gender: any;
  refinable: boolean;
  indestructible: any;
  itemMoveInfo: ItemMoveInfoAPI;
  rewardForAchievement: any[];
  cardPrefix: any;
  pets: any[];
  hasScript: boolean;
}

export interface SetAPI {
  name: string;
  items: ItemAPI[];
}

export interface ItemAPI {
  itemId: number;
  name: string;
}

export interface ItemSummonInfoContainedInAPI {
  internalType: string;
  Type: number;
  sourceId: number;
  sourceName: string;
  targetId: number;
  targetName: string;
  count: number;
  totalOfSource: number;
  summonType: string;
  chance: number;
}

export interface ItemMoveInfoAPI {
  drop: boolean;
  trade: boolean;
  store: boolean;
  cart: boolean;
  sell: boolean;
  mail: boolean;
  auction: boolean;
  guildStore: boolean;
}
