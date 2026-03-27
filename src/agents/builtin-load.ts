import { resolve } from "path"
import { existsSync, readFileSync } from "fs"

const AGENT_DIR = resolve(__dirname, "builtin")

export interface AgentInfo {
  name: string
  description: string
  prompt: string
}

const frontmatterRegex = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/

function parseFrontmatter(content: string): { name: string; description: string; prompt: string } {
  const match = content.match(frontmatterRegex)
  if (!match) {
    return { name: "", description: "", prompt: content }
  }

  const frontmatter = match[1]
  const body = match[2]

  let name = ""
  let description = ""

  for (const line of frontmatter.split("\n")) {
    const colonIdx = line.indexOf(":")
    if (colonIdx > 0) {
      const key = line.slice(0, colonIdx).trim()
      const value = line.slice(colonIdx + 1).trim()
      if (key === "name") name = value
      if (key === "description") description = value
    }
  }

  return { name, description, prompt: body.trim() }
}

export function loadBuiltinAgentsFromDisk(): AgentInfo[] {
  const agents: AgentInfo[] = []

  const agentDirs = ["searcher", "librarian", "architect", "strategist", "reviewer", "planner", "bridge", "worker"]

  for (const agentDir of agentDirs) {
    const agentPath = resolve(AGENT_DIR, agentDir, "AGENT.md")
    if (existsSync(agentPath)) {
      const content = readFileSync(agentPath, "utf8")
      const parsed = parseFrontmatter(content)
      agents.push({
        name: parsed.name || agentDir,
        description: parsed.description,
        prompt: parsed.prompt
      })
    }
  }

  return agents
}
