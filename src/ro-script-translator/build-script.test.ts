import * as fs from 'fs';
import { BuildScript } from './build-script';
import { testTable } from './test-table';

describe('RO read item descript', () => {
  const itemMap = new Map<number, string>();

  beforeEach(() => {
    const path = process.env.RO_BASE_ITEM_FILE_PATH;
    const fileContent = fs.readFileSync(path, { encoding: 'utf8' });
    const currentData = JSON.parse(fileContent) as Record<string, { id: number; description: string }>;
    for (const itemId of Object.keys(testTable)) {
      itemMap.set(Number(itemId), currentData[itemId].description);
    }
  });

  it('should match all', () => {
    for (const [itemId, expectedScripts] of Object.entries(testTable)) {
      const description = itemMap.get(Number(itemId));
      const scripts = new BuildScript(description).scripts;
      console.log('last check', itemId);
      expect(scripts).toEqual(expectedScripts);
    }

    expect.assertions(itemMap.size);
  });
});
