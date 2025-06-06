import { google } from '@ai-sdk/google';
import { Agent } from "@mastra/core/agent";
import { Memory } from '@mastra/memory';
import { LibSQLStore } from '@mastra/libsql';
import { cloneRepositoryTool } from "../tools/github-clone-tool";
import { treeAnalyzerTool } from "../tools/tree-analyzer-tool";
import { tokeiAnalyzerTool } from "../tools/tokei-analyzer-tool";
import { readmeAnalyzerTool } from "../tools/readme-analyzer-tool";


// エージェント定義
export const githubAnalysisAgent = new Agent({
  name: "GitHub Analysis Agent",
  instructions: "GitHubリポジトリを解析するエージェントです。リポジトリのURLを指定すると、それをクローンして解析できます。",
  model: google("gemini-2.0-flash"),
  tools: {
    cloneRepositoryTool,
    treeAnalyzerTool,
    tokeiAnalyzerTool,
    readmeAnalyzerTool
  },
  memory: new Memory({
    storage: new LibSQLStore({
      url: 'file:../mastra.db', // path is relative to the .mastra/output directory
    }),
  }),
});
