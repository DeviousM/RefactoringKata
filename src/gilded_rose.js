class Item {
  constructor(name, sellIn, quality){
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

const MAX_QUALITY = 50;
const MIN_QUALITY = 0;

/** 
 * @param {Item} item
 * @returns {boolean}
 * Returns true if `item.sellIn < 0`
 */
const hasSellTimePassed = (item) => (item.sellIn < 0);

/** 
 * @param {Item} item
 * @returns {boolean}
 * Returns true if name includes "Sulfuras"
 */
const isLegendaryItem = (item) => item.name.includes('Sulfuras');

/** 
 * @param {Item} item
 * @returns {boolean}
 * Returns true if name includes "Conjured"
 */
const isConjuredItem = (item) => item.name.includes('Conjured');

/** 
 * @param {Item} item
 * @returns {boolean}
 * Returns true if name includes "Backstage passes"
 */
const isBackstagePass = (item) => item.name.includes('Backstage passes');

/** 
 * @param {Item} item
 * @returns {boolean}
 * Returns true if name includes "Aged Brie"
 */
const isAgedBrie = (item) => item.name.includes('Aged Brie');

/**
 * @param {number} quality
 * @returns {number}
 * Returns normalized quality.
 * Normal item's quality is always between 0 and 50.
 */
const normalizeQuality = (quality) => {
  if (quality > MAX_QUALITY) return MAX_QUALITY;
  if (quality < MIN_QUALITY) return MIN_QUALITY;
  return quality;
}

/**
 * @param {Item} item
 * @returns {number}
 * Returns computed quality degredation based on whether 
 * item is conjured and if the sellIn date have passed.
 */
function computeQualityDegradationMultiplier(item) {
  const sellDateMultiplier = !hasSellTimePassed(item) ? 1 : 2;
  const conjuredMultiplier = !isConjuredItem(item) ? 1 : 2;
  return sellDateMultiplier * conjuredMultiplier;
};

/**
 * @param {Item} item
 * @returns {number}
 * Computes backstage pass quality based on sellIn days remaining.
 */
function computeBackstagePassQuality(item) {
  const { sellIn, quality } = item;
  const multiplier = computeQualityDegradationMultiplier(item);

  if (hasSellTimePassed(item))
    return MIN_QUALITY;
  if (sellIn <= 5)
    return quality + 3 * multiplier;
  if (sellIn <= 10)
    return quality + 2 * multiplier;
  return quality + 1 * multiplier;
}

/* 
  Has this been Typescript I'd have made all of Shop's internal 
  methods private instead of putting an underscore.
*/
class Shop {
  constructor(items = []) {
    this.items = items;
  }

  /** 
   * @param {Item} item
   * @returns {number}
   * Computes new item quality based on specific requirements
   * Read more about requirements here: https://github.com/NotMyself/GildedRose
   */
  _computeNewQuality(item) {
    if (isLegendaryItem(item)) return 80; // If item is legendary just return 80.

    let { quality } = item;
    const multiplier = computeQualityDegradationMultiplier(item);

    if (isBackstagePass(item)) {
      quality = computeBackstagePassQuality(item);
    } else {
      const sign = !isAgedBrie(item) ? -1 : 1;
      quality = quality + sign * multiplier;
    }

    return normalizeQuality(quality);
  }

  /** 
   * @param {Item} item
   * @returns {number}
   * Computes new sellIn time based on whether item is Legendary or not.
   */
  _computeNewSellInTime = (item) => !isLegendaryItem(item) ? item.sellIn - 1 : item.sellIn;

  /**
   * @param {Item} item
   * Updates singular item
   */
  _updateItem = (item) => {
    item.sellIn = this._computeNewSellInTime(item);
    item.quality = this._computeNewQuality(item);
  }

  /**
   * Method triggered at the end of the day.
   * Updates all of the items in the shop.
   */
  updateQuality() {
    this.items.forEach(this._updateItem);

    return this.items;
  }
}
