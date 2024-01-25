import { AuctionOutcome, Bid } from "./types";

/**
 * Determines the winner of a sealed-bid second-price auction.
 *
 * The auction determines the winner by the highest bid that is equal to or exceeds
 * the reserve price. The winning price is set to the second-highest bid if it is 
 * greater than the reserve price, otherwise, the reserve price is returned.
 *
 * @param {Bid[]} bids - An array of objects, where each object represents a bid
 *                       and contains the `bidderName` and the `amount` of the bid.
 *                       It's a data structure for less code time complexity
 * @param {number} reservePrice - The reserve price set for the auction
 * 
 * @returns {Object} An object containing `winner` as a string and `secondHighestBid` as a number.
 *
 * @example
 * const bids = [
 *   { bidderName: 'A', amount: 110 },
 *   { bidderName: 'C', amount: 125 },
 *   { bidderName: 'A', amount: 130 },
 *   { bidderName: 'D', amount: 105 },
 *   // ... other bids ...
 * ];
 * const reservePrice = 100;
 * const {winner, secondHighestBid} = calculateAuctionOutcome(bids, reservePrice);
 *
 */
export function calculateAuctionOutcome(bids: Bid[], reservePrice: number): AuctionOutcome{
  let winner = '';
  let highestBid = 0;
  let secondHighestBid = 0;

  // we loop once on the bids list: code complexity is O(n)
  for (const bid of bids) {
    if (bid.amount >= highestBid) {
      // Current bid is higher than the highest bid
      if (highestBid >= reservePrice && winner !== bid.bidderName) {
        // Previous highest bid is above reserve and becomes the second highest
        secondHighestBid = highestBid;
      } 

      highestBid = bid.amount;
      winner = bid.amount >= reservePrice ? bid.bidderName : winner;
    } else if (bid.amount > secondHighestBid && bid.amount >= reservePrice && bid.bidderName !== winner) {
      // Current bid is higher than the second highest bid and from a different bidder
      secondHighestBid = bid.amount;
    }
  }

  if (highestBid < reservePrice) {
    // No bids match the reserve price
    return { winner: '', secondHighestBid: reservePrice };
  }

  return {
    winner,
    secondHighestBid: secondHighestBid > 0 ? secondHighestBid : reservePrice,
  };
}
