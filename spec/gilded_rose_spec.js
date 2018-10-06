describe("Gilded Rose", function() {

  describe("item's name should not change", function() {
    const gildedRose = new Shop([new Item('+ 5 Dexterity Vest', 10, 20)]);
    const items = gildedRose.updateQuality();

    it("+ 5 Dexteriety Vest name did not change", function () {
      expect(items[0].name).toEqual('+ 5 Dexterity Vest');
    });
  });

  describe('should have natural degradation for regular item', function() {
    const gildedRose = new Shop([new Item('+ 5 Dexterity Vest', 10, 20)]);
    const items = gildedRose.updateQuality();
    
    it("+ 5 Dexteriety Vest should have sellIn as 9 and quality as 19", function() {
      expect(items[0].sellIn).toEqual(9);
      expect(items[0].quality).toEqual(19);
    });
  });

  describe("should have twice as fast degredation for expired items", function() {
    const gildedRose = new Shop([new Item('+ 5 Dexterity Vest', -1, 20)]);
    const items = gildedRose.updateQuality();

    it("+ 5 Dexteriety Vest should have sellIn as -2 and quality as 18", function () {
      expect(items[0].sellIn).toEqual(-2);
      expect(items[0].quality).toEqual(18);
    });
  });
  
  describe("should have twice as fast degredation for Conjured items", function() {
    const gildedRose = new Shop([new Item('Conjured + 5 Dexterity Vest', 2, 20)]);
    const items = gildedRose.updateQuality();

    it("Conjured + 5 Dexteriety Vest should have sellIn as 1 and quality as 18", function () {
      expect(items[0].sellIn).toEqual(1);
      expect(items[0].quality).toEqual(18);
    });
  });

  describe("should have quadruple as fast degredation for Conjured expired items", function() {
    const gildedRose = new Shop([new Item('Conjured + 5 Dexterity Vest', -1, 20)]);
    const items = gildedRose.updateQuality();

    it("Conjured + 5 Dexteriety Vest should have sellIn as -2 and quality as 16", function () {
      expect(items[0].sellIn).toEqual(-2);
      expect(items[0].quality).toEqual(16);
    });
  });
  
  describe("item's quality cannot fall below 0", function() {
    const gildedRose = new Shop([
      new Item('+ 5 Dexterity Vest', -1, 0)
    ]);
    const items = gildedRose.updateQuality();

    it("+ 5 Dexteriety Vest should have sellIn as -2 and quality as 0", function () {
      expect(items[0].sellIn).toEqual(-2);
      expect(items[0].quality).toEqual(0);
    });
  });
  
  describe("item's quality cannot rise above 50", function() {
    const gildedRose = new Shop([
      new Item('Aged Brie', 3, 50)
    ]);
    const items = gildedRose.updateQuality();

    it("Aged Brie should have sellIn as 2 and quality as 50", function () {
      expect(items[0].sellIn).toEqual(2);
      expect(items[0].quality).toEqual(50);
    });
  });
  
  describe("Aged Brie should increase in quality with time", function() {
    const gildedRose = new Shop([
      new Item('Aged Brie', 2, 2),
      new Item('Aged Brie', -1, 2)
    ]);
    const items = gildedRose.updateQuality();

    it("Aged Brie should have sellIn as 1 and quality as 3", function () {
      expect(items[0].sellIn).toEqual(1);
      expect(items[0].quality).toEqual(3);
    });
    
    it("Aged Brie should have sellIn as -2 and quality as 4 (sellIn < 0 = double quality increase)", function () {
      expect(items[1].sellIn).toEqual(-2);
      expect(items[1].quality).toEqual(4);
    });
  });
  
  describe("Legendary item should not change (quality should stay at 80)", function() {
    const gildedRose = new Shop([
      new Item('Sulfuras, Hand of Ragnaros', 0, 80),
      new Item('Sulfuras, Hand of Ragnaros', -1, 80)
    ]);
    const items = gildedRose.updateQuality();

    it("Sulfuras, Hand of Ragnaros should have sellIn as 0 and quality as 80", function () {
      expect(items[0].sellIn).toEqual(0);
      expect(items[0].quality).toEqual(80);
    });
    
    it("Sulfuras, Hand of Ragnaros should have sellIn as -1 and quality as 80", function () {
      expect(items[1].sellIn).toEqual(-1);
      expect(items[1].quality).toEqual(80);
    });
  });
  
  describe("Backstage Passes should increase in quality with time until expired", function() {
    const gildedRose = new Shop([
      new Item('Backstage passes to a TAFKAL80ETC concert', 15, 20),
      new Item('Backstage passes to a TAFKAL80ETC concert', 10, 43),
      new Item('Backstage passes to a TAFKAL80ETC concert', 5, 44),
      new Item('Backstage passes to a TAFKAL80ETC concert', -1, 40)
    ]);
    const items = gildedRose.updateQuality();

    it("Backstage passes to a TAFKAL80ETC concert should have sellIn as 14 and quality as 21", function () {
      expect(items[0].sellIn).toEqual(14);
      expect(items[0].quality).toEqual(21);
    });
    
    it("Backstage passes to a TAFKAL80ETC concert should have sellIn as 9 and quality as 45", function () {
      expect(items[1].sellIn).toEqual(9);
      expect(items[1].quality).toEqual(45);
    });
    
    it("Backstage passes to a TAFKAL80ETC concert should have sellIn as 4 and quality as 47", function () {
      expect(items[2].sellIn).toEqual(4);
      expect(items[2].quality).toEqual(47);
    });

    it("Backstage passes to a TAFKAL80ETC concert should have sellIn as -2 and quality as 0", function () {
      expect(items[3].sellIn).toEqual(-2);
      expect(items[3].quality).toEqual(0);
    });
  });
  
  describe("Conjured Backstage Passes should increase in quality with time until expired", function() {
    const gildedRose = new Shop([
      new Item('Conjured Backstage passes to a TAFKAL80ETC concert', 15, 19),
      new Item('Conjured Backstage passes to a TAFKAL80ETC concert', 10, 41),
      new Item('Conjured Backstage passes to a TAFKAL80ETC concert', 5, 41),
      new Item('Conjured Backstage passes to a TAFKAL80ETC concert', -1, 40)
    ]);
    const items = gildedRose.updateQuality();

    it("Conjured Backstage passes to a TAFKAL80ETC concert should have sellIn as 14 and quality as 21", function () {
      expect(items[0].sellIn).toEqual(14);
      expect(items[0].quality).toEqual(21);
    });
    
    it("Conjured Backstage passes to a TAFKAL80ETC concert should have sellIn as 9 and quality as 45", function () {
      expect(items[1].sellIn).toEqual(9);
      expect(items[1].quality).toEqual(45);
    });
    
    it("Conjured Backstage passes to a TAFKAL80ETC concert should have sellIn as 4 and quality as 47", function () {
      expect(items[2].sellIn).toEqual(4);
      expect(items[2].quality).toEqual(47);
    });

    it("Conjured Backstage passes to a TAFKAL80ETC concert should have sellIn as -2 and quality as 0", function () {
      expect(items[3].sellIn).toEqual(-2);
      expect(items[3].quality).toEqual(0);
    });
  });

  describe("should support multiple items", function() {
    const multipleItems = [
      new Item('Aged Brie', 2, 0),
      new Item('Elixir of the Mongoose', 5, 7),
      new Item('Sulfuras, Hand of Ragnaros', 0, 80)
    ];

    const gildedRose = new Shop(multipleItems);
    const items = gildedRose.updateQuality();

    it("should have Aged Brie sellIn as 1 and quality as 1", function () {
      expect(items[0].name).toEqual('Aged Brie');
      expect(items[0].sellIn).toEqual(1);
      expect(items[0].quality).toEqual(1);
    });

    it("should have Elixir of the Mongoose sellIn as 4 and quality as 6", function () {
      expect(items[1].name).toEqual('Elixir of the Mongoose');
      expect(items[1].sellIn).toEqual(4);
      expect(items[1].quality).toEqual(6);
    });

    it("should have Sulfuras, Hand of Ragnaros sellIn as 0 and quality as 80", function () {
      expect(items[2].name).toEqual('Sulfuras, Hand of Ragnaros');
      expect(items[2].sellIn).toEqual(0);
      expect(items[2].quality).toEqual(80);
    });
  });

  describe('helper Functions', function () {
    const gildedRose = new Shop([
      new Item('Conjured Aged Brie', -1, 0),
      new Item('Sulfuras, Hand of Ragnaros', 2, 80),
      new Item('Backstage passes to a TAFKAL80ETC concert', 5, 44),
      new Item('Elixir of the Mongoose', -1, 0),
      new Item('Backstage passes to a TAFKAL80ETC concert', 15, 19),
      new Item('Backstage passes to a TAFKAL80ETC concert', 10, 41),
      new Item('Backstage passes to a TAFKAL80ETC concert', 5, 41),
      new Item('Backstage passes to a TAFKAL80ETC concert', -1, 40),
      new Item('Conjured Backstage passes to a TAFKAL80ETC concert', 15, 19),
      new Item('Conjured Backstage passes to a TAFKAL80ETC concert', 10, 41),
      new Item('Conjured Backstage passes to a TAFKAL80ETC concert', 5, 28),
      new Item('Conjured Backstage passes to a TAFKAL80ETC concert', -1, 40)
    ]);
    const items = gildedRose.updateQuality();

    it('hasSellTimePassed is true when sellIn < 0', function () {
      expect(hasSellTimePassed(items[0])).toEqual(true);
    });

    it('hasSellTimePassed is false when sellIn > 0', function () {
      expect(hasSellTimePassed(items[1])).toEqual(false);
    });

    it('isLegendaryItem is true if name contains "Sulfuras"', function () {
      expect(isLegendaryItem(items[1])).toEqual(true);
    });

    it('isLegendaryItem is false if name does not contain "Sulfuras"', function () {
      expect(isLegendaryItem(items[0])).toEqual(false);
    });

    it('isAgedBrie is true if Aged Brie', function () {
      expect(isAgedBrie(items[0])).toEqual(true);
    });

    it('isAgedBrie is false if not Aged Brie', function () {
      expect(isAgedBrie(items[1])).toEqual(false);
    });

    it('isConjuredItem is true if name contains "Conjured"', function () {
      expect(isConjuredItem(items[0])).toEqual(true);
    });

    it('isConjuredItem is false if name does not contain "Conjured"', function () {
      expect(isConjuredItem(items[1])).toEqual(false);
    });

    it('isBackstagePass is true if name contains "Backstage passes"', function () {
      expect(isBackstagePass(items[2])).toEqual(true);
    });

    it('isBackstagePass is false if name does not contain "Backstage passes"', function () {
      expect(isBackstagePass(items[0])).toEqual(false);
    });

    it('computeQualityDegradationMultiplier returns 1 if item sellIn > 0 and is not conjured', function () {
      expect(computeQualityDegradationMultiplier(items[2])).toEqual(1);
    });
    
    it('computeQualityDegradationMultiplier returns 2 if item sellIn < 0', function () {
      expect(computeQualityDegradationMultiplier(items[3])).toEqual(2);
    });

    it('computeQualityDegradationMultiplier returns 4 if item sellIn < 0 and is conjured', function () {
      expect(computeQualityDegradationMultiplier(items[0])).toEqual(4);
    });

    it('normalizeQuality returns 0 if supplided value < 0', function () {
      expect(normalizeQuality(-3)).toEqual(0);
    });

    it('normalizeQuality returns 50 if supplided value > 50', function () {
      expect(normalizeQuality(60)).toEqual(50);
    });

    it('normalizeQuality returns value if supplided value > 0 and value < 50 ', function () {
      expect(normalizeQuality(36)).toEqual(36);
    });

     /* 
      these tests below return the updated value, 
      that's why it seems that it runs twice 
    */
    it("computeBackstagePassQuality returns value increased by 1 if sellIn > 10", function () {
      expect(computeBackstagePassQuality(items[4])).toEqual(21);
    });
    
    it("computeBackstagePassQuality returns value increased by 2 if sellIn < 10 and sellIn > 5", function () {
      expect(computeBackstagePassQuality(items[5])).toEqual(45);
    });
    
    it("computeBackstagePassQuality returns value increased by 3 if sellIn < 5 and sellIn > 0", function () {
      expect(computeBackstagePassQuality(items[6])).toEqual(47);
    });
    
    it("computeBackstagePassQuality returns 0 if  sellIn < 0", function () {
      expect(computeBackstagePassQuality(items[7])).toEqual(0);
    });

    it("computeBackstagePassQuality returns value increased by 2 if sellIn > 10", function () {
      expect(computeBackstagePassQuality(items[8])).toEqual(23);
    });
    
    it("computeBackstagePassQuality returns value increased by 4 if sellIn < 10 and sellIn > 5", function () {
      expect(computeBackstagePassQuality(items[9])).toEqual(49);
    });
    
    it("computeBackstagePassQuality returns value increased by 6 if sellIn < 5 and sellIn > 0", function () {
      expect(computeBackstagePassQuality(items[10])).toEqual(40); 
    });
    
    it("computeBackstagePassQuality returns 0 if  sellIn < 0", function () {
      expect(computeBackstagePassQuality(items[11])).toEqual(0);
    });
  });
});