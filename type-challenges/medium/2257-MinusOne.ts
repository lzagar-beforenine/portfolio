/*
  2257 - MinusOne
  -------
  by Mustafo Faiz (@fayzzzm) #medium #math

  ### Question

  Given a number (always positive) as a type. Your type should return the number decreased by one.

  For example:

  ```ts
  type Zero = MinusOne<1> // 0
  type FiftyFour = MinusOne<55> // 54
  ```

  > View on GitHub: https://tsch.js.org/2257
*/

/* _____________ Your Code Here _____________ */

type NumberLiteral = "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9";

type Dictionary = {
  "0": "9";
  "1": "0";
  "2": "1";
  "3": "2";
  "4": "3";
  "5": "4";
  "6": "5";
  "7": "6";
  "8": "7";
  "9": "8";
};

type ReverseString<TString extends string> =
  TString extends `${infer First}${infer Rest}`
    ? `${ReverseString<Rest>}${First}`
    : "";

type RemoveLeadingZeros<TString extends string> = TString extends "0"
  ? "0"
  : TString extends `${"0"}${infer Rest}`
  ? RemoveLeadingZeros<Rest>
  : TString;

type ParseInt<TString extends string> =
  RemoveLeadingZeros<TString> extends `${infer Digit extends number}`
    ? Digit
    : never;

type RemoveLastChar<TString extends string> =
  ReverseString<TString> extends `${infer Last}${infer Rest}`
    ? ReverseString<Rest>
    : TString;

type MinusOneForString<TString extends string> =
  ReverseString<TString> extends `${infer Last extends NumberLiteral}${infer Rest}`
    ? Last extends "0"
      ? `${MinusOneForString<RemoveLastChar<TString>>}${Dictionary[Last]}`
      : ReverseString<`${Dictionary[Last]}${Rest}`>
    : never;

type MinusOne<TNumber extends number> = TNumber extends 0
  ? -1
  : ParseInt<MinusOneForString<`${TNumber}`>>;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from "@type-challenges/utils";

type cases = [
  Expect<Equal<MinusOne<1>, 0>>,
  Expect<Equal<MinusOne<55>, 54>>,
  Expect<Equal<MinusOne<3>, 2>>,
  Expect<Equal<MinusOne<100>, 99>>,
  Expect<Equal<MinusOne<1101>, 1100>>,
  Expect<Equal<MinusOne<0>, -1>>,
  Expect<Equal<MinusOne<9_007_199_254_740_992>, 9_007_199_254_740_991>>
];

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/2257/answer
  > View solutions: https://tsch.js.org/2257/solutions
  > More Challenges: https://tsch.js.org
*/
