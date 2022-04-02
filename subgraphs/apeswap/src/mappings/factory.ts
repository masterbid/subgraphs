import { PairCreated } from "../../generated/Factory/Factory";
import { Bundle } from "../../generated/schema";
import { Pool } from "../../generated/templates";
import { getOrCreatePool } from "../helpers/pool";
import { BIGINT_ZERO } from "../utils/constant";
import { getOrCreateToken } from "../utils/token";

export function handlePairCreated(event: PairCreated): void {
  let pairAddress = event.params.pair;
  let token0Address = event.params.token0;
  let token1Address = event.params.token1;

  // create new bundle, if it doesn't already exist
  let bundle = Bundle.load("1");
  if (bundle == null) {
    let bundle = new Bundle("1");
    bundle.bnbPrice = BIGINT_ZERO;
    bundle.save();
  }

  // Create Tokens
  let token0 = getOrCreateToken(token0Address);
  let token1 = getOrCreateToken(token1Address);

  // Create pair
  getOrCreatePool(event, pairAddress, token0, token1);

  // create the tracked contract based on the template
  Pool.create(pairAddress);
}
