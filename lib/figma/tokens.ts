import tokenSource from "@/data/figma/tokens.json";

type TokenLeaf = string | number;
type TokenNode = {
  [key: string]: TokenLeaf | TokenNode;
};

export function getFigmaToken(path: string): TokenLeaf | undefined {
  const segments = path.split(".");
  let current: TokenLeaf | TokenNode = tokenSource as TokenNode;

  for (const segment of segments) {
    if (typeof current !== "object" || current === null || !(segment in current)) {
      return undefined;
    }
    current = current[segment] as TokenLeaf | TokenNode;
  }

  return current as TokenLeaf;
}
