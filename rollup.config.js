import { getRollupConfig } from "savage-rollup-config";

import pkg from "./package.json" assert { type: "json" };

export default getRollupConfig(pkg);
