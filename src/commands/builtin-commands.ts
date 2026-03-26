import type { BuiltinCommandName, BuiltinCommands, CommandDefinition } from "./types"
import { WORK_DEFAULT_MESSAGE } from "./work"

const BUILTIN_COMMAND_DEFINITIONS: Record<BuiltinCommandName, Omit<CommandDefinition, "name">> = {
  work: {
    description: "(builtin) Start a self-referential development loop until completion",
    template: `<command-instruction>
${WORK_DEFAULT_MESSAGE}
</command-instruction>

<user-task>
$ARGUMENTS
</user-task>`,
    argumentHint: '"task description"',
  },
}

export function loadBuiltinCommands(
  _disabledCommands?: BuiltinCommandName[]
): BuiltinCommands {
  const commands: BuiltinCommands = {}

  for (const [name, definition] of Object.entries(BUILTIN_COMMAND_DEFINITIONS)) {
    commands[name] = { ...definition, name }
  }

  return commands
}
