export const figmaManifest = {
  fileKey: process.env.FIGMA_FILE_KEY ?? "",
  designSystemPageNodeId: process.env.FIGMA_DS_PAGE_NODE_ID ?? "",
  mainScreenNodeIds: {
    home: process.env.FIGMA_SCREEN_HOME_NODE_ID ?? "",
    playerStats: process.env.FIGMA_SCREEN_PLAYER_STATS_NODE_ID ?? "",
    match: process.env.FIGMA_SCREEN_MATCH_NODE_ID ?? "",
    pauseReplay: process.env.FIGMA_SCREEN_PAUSE_REPLAY_NODE_ID ?? "",
  },
} as const;

export function hasFigmaManifest() {
  return Boolean(figmaManifest.fileKey && figmaManifest.designSystemPageNodeId);
}
