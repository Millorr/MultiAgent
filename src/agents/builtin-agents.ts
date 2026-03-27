import type { AgentConfig } from "./types"
import { loadBuiltinAgentsFromDisk } from "./builtin-load"

// Cache loaded agents
let cachedAgents: Record<string, AgentConfig> | null = null

function getBuiltinAgents(): Record<string, AgentConfig> {
  if (!cachedAgents) {
    const agents = loadBuiltinAgentsFromDisk()
    cachedAgents = {}
    for (const agent of agents) {
      cachedAgents[agent.name] = {
        name: agent.name,
        description: agent.description,
        prompt: agent.prompt,
        mode: "subagent",
      }
    }
  }
  return cachedAgents
}

export function createBuiltinAgents(): Record<string, AgentConfig> {
  return { ...getBuiltinAgents() }
}
