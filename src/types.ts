export type Bid = { bidderName: string; amount: number; };
export type AuctionOutcome = {
    winner: string,
    secondHighestBid: number
}