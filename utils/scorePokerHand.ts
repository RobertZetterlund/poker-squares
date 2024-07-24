const suits = ["H", "D", "C", "S"] as const;
const values = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14] as const;
export type Card = {
  Suit: "H" | "D" | "C" | "S";
  Value: 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14;
};

export function getDeck(dateStr: string) {
  let deck = new Array<Card>();

  for (let i = 0; i < suits.length; i++) {
    for (let x = 0; x < values.length; x++) {
      const card: Card = { Value: values[x], Suit: suits[i] };
      deck.push(card);
    }
  }

  return shuffle(deck, Number(dateStr.replaceAll("_", "")));
}

enum ScoringHand {
  FOUR_OF_A_KIND = 4,
  STRAIGHT_FLUSH = 8,
  STRAIGHT = 4,
  FLUSH = 5,
  HIGH_CARD = 0,
  ONE_PAIR = 1,
  TWO_PAIR = 2,
  ROYAL_FLUSH = 9,
  THREE_OF_A_KIND = 3,
  FULL_HOUSE = 6,
}

const handScore = [
  ScoringHand.FOUR_OF_A_KIND,
  ScoringHand.STRAIGHT_FLUSH,
  ScoringHand.STRAIGHT,
  ScoringHand.FLUSH,
  ScoringHand.HIGH_CARD,
  ScoringHand.ONE_PAIR,
  ScoringHand.TWO_PAIR,
  ScoringHand.ROYAL_FLUSH,
  ScoringHand.THREE_OF_A_KIND,
  ScoringHand.FULL_HOUSE,
];

const SuitToNumber = { S: 1, C: 2, H: 4, D: 8 } as const;

export type Hand = Card[];

export function rankPokerHand(hand: Hand) {
  var v,
    i,
    o,
    s =
      (1 << hand[0].Value) |
      (1 << hand[1].Value) |
      (1 << hand[2].Value) |
      (1 << hand[3].Value) |
      (1 << hand[4].Value);
  for (i = -1, v = o = 0; i < 5; i++, o = Math.pow(2, hand[i]?.Value * 4)) {
    v += o * (((v / o) & 15) + 1);
  }
  v = (v % 15) - (s / (s & -s) == 31 || s == 0x403c ? 3 : 1);
  v -=
    ((SuitToNumber[hand[0].Suit] ==
      (SuitToNumber[hand[1].Suit] |
        SuitToNumber[hand[2].Suit] |
        SuitToNumber[hand[3].Suit] |
        SuitToNumber[hand[4].Suit])) as any) * (s == 0x7c00 ? -5 : 1);
  return handScore[v];
}

export function shuffle(deck: Card[], seed: number) {
  var m = deck.length,
    t,
    i;

  // While there remain elements to shuffle…
  while (m) {
    // Pick a remaining element…
    i = Math.floor(random(seed) * m--);

    // And swap it with the current element.
    t = deck[m];
    deck[m] = deck[i];
    deck[i] = t;
    ++seed;
  }

  return deck;
}

function random(seed: number) {
  var x = Math.sin(seed++) * 10000;
  return x - Math.floor(x);
}
