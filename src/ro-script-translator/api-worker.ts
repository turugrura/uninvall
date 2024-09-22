import { HttpService } from "@nestjs/axios";
import { firstValueFrom, retry } from "rxjs";

export class ApiWorker {
  private _itemIds: number[] = []
  private _baseDbAPI = ''
  private _baseDbAPIKey = ''
  private _url = ''
  private readonly TOTAL_WORKER = 10;

  constructor(private readonly http: HttpService) { }

  async getItems(itemIds: number[], isThServer: boolean) {
    this._itemIds = [...itemIds]

    for (let i = 0; i <= this.TOTAL_WORKER; i++) {
      this.callAPI(isThServer)
    }
  }

  async callAPI(isThServer: boolean) {
    const itemId = this._itemIds.pop()
    if (!itemId) return;

    let url = `${this._baseDbAPI}/Item/${itemId}?apiKey=${this._baseDbAPIKey}`;
    isThServer ? (url += '&server=thROG') : (url += '&server=dpRO');

    await firstValueFrom(this.http
      .get(this._url, { timeout: 1000 * 5 })
      .pipe(retry({ count: 20, delay: 3000 })))

    return this.callAPI(isThServer)
  }
}