export interface CommandDefinition {
  name: string
  description?: string
  template: string
  agent?: string
  model?: string
  subtask?: boolean
  argumentHint?: string
}

export type BuiltinCommandName = "work"

export type BuiltinCommands = Record<string, CommandDefinition>
