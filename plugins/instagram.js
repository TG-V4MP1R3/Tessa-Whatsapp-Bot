const Asena = require("../Utilis/events")
const { MessageType, Mimetype } = require("@adiwajshing/baileys")
const { getBuffer, igStory, downVideo } = require("../Utilis/download")
const { instagram } = require("../Utilis/Misc")
const Language = require("../language")
const Lang = Language.getString("insta")
Asena.addCommand(
  {
    pattern: "insta ?(.*)",
    fromMe: true,
    desc: Lang.INSTA_DESC,
  },
  async (message, match) => {
    match = match || message.reply_message.text
    if (!match || !/instagram.com/.test(match))
      return await message.sendMessage(Lang.NEED_REPLY)
    await message.sendMessage(Lang.DOWNLOADING)
    const urls = await instagram(match)
    if (!urls) return await message.sendMessage(Lang.NOT_FOUND)
    for (const url of urls) {
      const { buffer, type } = await getBuffer(url)
      if (!buffer) await message.sendMessage(url)
      else if (type == "image")
        await message.sendMessage(
          buffer,
          { mimetype: Mimetype.jpeg, quoted: message.quoted },
          MessageType.image
        )
      else
        await message.sendMessage(
          buffer,
          { mimetype: Mimetype.mp4, quoted: message.quoted },
          MessageType.video
        )
    }
  }
)

Asena.addCommand(
  { pattern: "story ?(.*)", fromMe: true, desc: Lang.STORY_DESC },
  async (message, match) => {
    match = !message.reply_message ? match : message.reply_message.text
    if (
      match === "" ||
      (!match.includes("/stories/") && match.startsWith("http"))
    )
      return await message.sendMessage(Lang.USERNAME)
    if (match.includes("/stories/")) {
      const s = match.indexOf("/stories/") + 9
      const e = match.lastIndexOf("/")
      match = match.substring(s, e)
    }
    const json = await igStory(match)
    if (!json) return await message.sendMessage("*Not found!*")
    await message.sendMessage(Lang.DOWNLOADING_STORY.format(json.length))
    for (const url of json) {
      const { buffer, type } = await getBuffer(url)
      if (type == "video")
        await message.sendMessage(
          buffer,
          { mimetype: Mimetype.mp4, quoted: message.quoted },
          MessageType.video
        )
      else if (type == "image")
        await message.sendMessage(
          buffer,
          { mimetype: Mimetype.jpeg, quoted: message.quoted },
          MessageType.image
        )
    }
  }
)

Asena.addCommand(
  {
    pattern: "fb ?(.*)",
    fromMe: true,
    desc: Lang.FB_DESC,
  },
  async (message, match) => {
    match = !message.reply_message ? match : message.reply_message.text
    if (match === "") return await message.sendMessage(Lang.NEED_REPLY)
    await message.sendMessage(Lang.DOWNLOADING)
    let links = await downVideo(match)
    if (links.length == 0) return await message.sendMessage(Lang.NOT_FOUND)
    let { buffer, size } = await getBuffer(links[0])
    if (size > 100)
      return await message.sendMessage(
        Lang.SIZE.format(size, links[0], links[1])
      )
    return await message.sendMessage(
      buffer,
      { quoted: message.quoted, caption: Lang.CAPTION.format(links[1] || "") },
      MessageType.video
    )
  }
)
