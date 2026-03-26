import type { PluginInput } from "@opencode-ai/plugin"
import { loadBuiltinCommands } from "../commands"

export function createChatMessageHook(_ctx: PluginInput) {
  const builtinCommands = loadBuiltinCommands()

  return {
    "chat.message": async (
      input: {
        sessionID: string
        agent?: string
        messageID?: string
      },
      output: {
        message: Record<string, unknown>
        parts: Array<{ type: string; text?: string; [key: string]: unknown }>
      }
    ): Promise<void> => {
      // Extract text from parts
      const text = output.parts
        .filter((p) => p.type === "text" && p.text)
        .map((p) => p.text)
        .join("")

      if (!text) return

      // Check if message starts with a command
      for (const [name, cmd] of Object.entries(builtinCommands)) {
        if (text.startsWith(`/${name}`)) {
          // Command detected - inject template content
          // The command template will be processed by OpenCode
          console.log(`[chat-message-hook] Detected command: /${name}`)
        }
      }
    },
  }
}
