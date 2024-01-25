import { calculateAuctionOutcome } from "..";

describe('calculateAuctionOutcome', () => {
  it('should return the correct winner and second highest bid', () => {
    // the test example
    const bids = [
      { bidderName: 'A', amount: 110 },
      { bidderName: 'C', amount: 125 },
      { bidderName: 'A', amount: 130 },
      { bidderName: 'E', amount: 135 },
      { bidderName: 'D', amount: 105 },
      { bidderName: 'D', amount: 90 },
      { bidderName: 'E', amount: 132 },
      { bidderName: 'D', amount: 115 },
      { bidderName: 'E', amount: 140 }
    ];

    const reservePrice = 100;
    const result = calculateAuctionOutcome(bids, reservePrice);
    expect(result).toEqual({ winner: 'E', secondHighestBid: 130 });
  });

  it('should return reserve price as second highest bid when there are no other valid bids', () => {
    const bids = [{ bidderName: 'A', amount: 150 }];
    const reservePrice = 100;
    const result = calculateAuctionOutcome(bids, reservePrice);
    expect(result).toEqual({ winner: 'A', secondHighestBid: 100 });
  });

  it('should return empty winner and reserve price when no bids meet the reserve price', () => {
    const bids = [
      { bidderName: 'A', amount: 90 },
      { bidderName: 'B', amount: 85 },
      { bidderName: 'A', amount: 40 },
    ];
    const reservePrice = 100;
    const result = calculateAuctionOutcome(bids, reservePrice);
    expect(result).toEqual({ winner: '', secondHighestBid: 100 });
  });

  it('should update the second highest bid when a higher non-winning bid is found', () => {
    const bids = [
      { bidderName: 'A', amount: 120 },
      { bidderName: 'B', amount: 110 },
      { bidderName: 'B', amount: 105 },
      { bidderName: 'C', amount: 115 },
      { bidderName: 'B', amount: 90 }
    ];
    const reservePrice = 100;

    const result = calculateAuctionOutcome(bids, reservePrice);
    expect(result).toEqual({ winner: 'A', secondHighestBid: 115 });
  });
});
