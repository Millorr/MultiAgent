import type { Plugin } from "@opencode-ai/plugin"
import { createTaskTool } from "./tools/delegate-task"
import { loadBuiltinCommands } from "./commands"
import type { CommandDefinition } from "./commands/types"

export const plugin: Plugin = async (_ctx) => {
  const taskTool = createTaskTool()
  const builtinCommands = loadBuiltinCommands()

  return {
    tool: {
      task: taskTool,
    },
    config: async (config) => {
      // Wire up builtin commands
      // The command property may not be in the official Config type, so we use type assertion
      ;(config as unknown as { command?: Record<string, CommandDefinition> }).command = {
        ...builtinCommands,
        ...((config as unknown as { command?: Record<string, CommandDefinition> }).command ?? {}),
      }
    },
  }
}
