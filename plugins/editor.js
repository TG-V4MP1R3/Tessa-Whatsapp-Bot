const Asena = require("../Utilis/events")
const { photoEditor, menu } = require("../Utilis/editors")
const { getBuffer } = require("../Utilis/download")
const { MessageType } = require("@adiwajshing/baileys")
const Language = require("../language")
const Lang = Language.getString("ocr")
const fm = true

Asena.addCommand(
  {
    pattern: "skull",
    fromMe: fm,
    dontAddCommandList: true,
    desc: "Skull Photo editor.",
  },
  async (message, match) => {
    if (!message.reply_message || !message.reply_message.image)
      return await message.sendMessage(Lang.NEED_REPLY)
    const { status, result } = await photoEditor(
      await message.reply_message.downloadAndSaveMediaMessage(),
      "skull"
    )
    if (!status) return await message.sendMessage(`*${result}*`)
    const { buffer } = await getBuffer(result)
    return await message.sendMessage(buffer, {}, MessageType.image)
  }
)
Asena.addCommand(
  {
    pattern: "sketch",
    fromMe: fm,
    dontAddCommandList: true,
    desc: "Sketch Photo editor.",
  },
  async (message, match) => {
    if (!message.reply_message || !message.reply_message.image)
      return await message.sendMessage(Lang.NEED_REPLY)
    const { status, result } = await photoEditor(
      await message.reply_message.downloadAndSaveMediaMessage(),
      "sketch"
    )
    if (!status) return await message.sendMessage(`*${result}*`)
    const { buffer } = await getBuffer(result)
    return await message.sendMessage(buffer, {}, MessageType.image)
  }
)

Asena.addCommand(
  {
    pattern: "pencil",
    fromMe: fm,
    dontAddCommandList: true,
    desc: "pencil Photo editor.",
  },
  async (message, match) => {
    if (!message.reply_message || !message.reply_message.image)
      return await message.sendMessage(Lang.NEED_REPLY)
    const { status, result } = await photoEditor(
      await message.reply_message.downloadAndSaveMediaMessage(),
      "pencil"
    )
    if (!status) return await message.sendMessage(`*${result}*`)
    const { buffer } = await getBuffer(result)
    return await message.sendMessage(buffer, {}, MessageType.image)
  }
)

Asena.addCommand(
  {
    pattern: "color",
    fromMe: fm,
    dontAddCommandList: true,
    desc: "color Photo editor.",
  },
  async (message, match) => {
    if (!message.reply_message || !message.reply_message.image)
      return await message.sendMessage(Lang.NEED_REPLY)
    const { status, result } = await photoEditor(
      await message.reply_message.downloadAndSaveMediaMessage(),
      "color"
    )
    if (!status) return await message.sendMessage(`*${result}*`)
    const { buffer } = await getBuffer(result)
    return await message.sendMessage(buffer, {}, MessageType.image)
  }
)

Asena.addCommand(
  {
    pattern: "kiss",
    fromMe: fm,
    dontAddCommandList: true,
    desc: "kiss Photo editor.",
  },
  async (message, match) => {
    if (!message.reply_message || !message.reply_message.image)
      return await message.sendMessage(Lang.NEED_REPLY)
    const { status, result } = await photoEditor(
      await message.reply_message.downloadAndSaveMediaMessage(),
      "kiss"
    )
    if (!status) return await message.sendMessage(`*${result}*`)
    const { buffer } = await getBuffer(result)
    return await message.sendMessage(buffer, {}, MessageType.image)
  }
)

Asena.addCommand(
  {
    pattern: "bokeh",
    fromMe: fm,
    dontAddCommandList: true,
    desc: "bokeh Photo editor.",
  },
  async (message, match) => {
    if (!message.reply_message || !message.reply_message.image)
      return await message.sendMessage(Lang.NEED_REPLY)
    const { status, result } = await photoEditor(
      await message.reply_message.downloadAndSaveMediaMessage(),
      "bokeh"
    )
    if (!status) return await message.sendMessage(`*${result}*`)
    const { buffer } = await getBuffer(result)
    return await message.sendMessage(buffer, {}, MessageType.image)
  }
)

Asena.addCommand(
  {
    pattern: "wanted",
    fromMe: fm,
    dontAddCommandList: true,
    desc: "Wanted Photo editor.",
  },
  async (message, match) => {
    if (!message.reply_message || !message.reply_message.image)
      return await message.sendMessage(Lang.NEED_REPLY)
    const { status, result } = await photoEditor(
      await message.reply_message.downloadAndSaveMediaMessage(),
      "wanted"
    )
    if (!status) return await message.sendMessage(`*${result}*`)
    const { buffer } = await getBuffer(result)
    return await message.sendMessage(buffer, {}, MessageType.image)
  }
)

Asena.addCommand(
  {
    pattern: "look",
    fromMe: fm,
    dontAddCommandList: true,
    desc: "Dramatic Look Photo editor.",
  },
  async (message, match) => {
    if (!message.reply_message || !message.reply_message.image)
      return await message.sendMessage(Lang.NEED_REPLY)
    const { status, result } = await photoEditor(
      await message.reply_message.downloadAndSaveMediaMessage(),
      "look"
    )
    if (!status) return await message.sendMessage(`*${result}*`)
    const { buffer } = await getBuffer(result)
    return await message.sendMessage(buffer, {}, MessageType.image)
  }
)

Asena.addCommand(
  {
    pattern: "gandm",
    fromMe: fm,
    dontAddCommandList: true,
    desc: "Dramatic Look Photo editor.",
  },
  async (message, match) => {
    if (!message.reply_message || !message.reply_message.image)
      return await message.sendMessage(Lang.NEED_REPLY)
    const { status, result } = await photoEditor(
      await message.reply_message.downloadAndSaveMediaMessage(),
      "gandm"
    )
    if (!status) return await message.sendMessage(`*${result}*`)
    const { buffer } = await getBuffer(result)
    return await message.sendMessage(buffer, {}, MessageType.image)
  }
)

Asena.addCommand(
  {
    pattern: "dark",
    fromMe: fm,
    dontAddCommandList: true,
    desc: "Dramatic Look Photo editor.",
  },
  async (message, match) => {
    if (!message.reply_message || !message.reply_message.image)
      return await message.sendMessage(Lang.NEED_REPLY)
    const { status, result } = await photoEditor(
      await message.reply_message.downloadAndSaveMediaMessage(),
      "dark"
    )
    if (!status) return await message.sendMessage(`*${result}*`)
    const { buffer } = await getBuffer(result)
    return await message.sendMessage(buffer, {}, MessageType.image)
  }
)

Asena.addCommand(
  {
    pattern: "makeup",
    fromMe: fm,
    dontAddCommandList: true,
    desc: "Dramatic Look Photo editor.",
  },
  async (message, match) => {
    if (!message.reply_message || !message.reply_message.image)
      return await message.sendMessage(Lang.NEED_REPLY)
    const { status, result } = await photoEditor(
      await message.reply_message.downloadAndSaveMediaMessage(),
      "makeup"
    )
    if (!status) return await message.sendMessage(`*${result}*`)
    const { buffer } = await getBuffer(result)
    return await message.sendMessage(buffer, {}, MessageType.image)
  }
)

Asena.addCommand(
  {
    pattern: "cartoon",
    fromMe: fm,
    dontAddCommandList: true,
    desc: "Dramatic Look Photo editor.",
  },
  async (message, match) => {
    if (!message.reply_message || !message.reply_message.image)
      return await message.sendMessage(Lang.NEED_REPLY)
    const { status, result } = await photoEditor(
      await message.reply_message.downloadAndSaveMediaMessage(),
      "cartoon"
    )
    if (!status) return await message.sendMessage(`*${result}*`)
    const { buffer } = await getBuffer(result)
    return await message.sendMessage(buffer, {}, MessageType.image)
  }
)
Asena.addCommand(
  { pattern: "editor", fromMe: fm, desc: Lang.EDITOR },
  async (message, match) => {
    return await message.sendMessage(menu(), {}, MessageType.listMessage)
  }
)
