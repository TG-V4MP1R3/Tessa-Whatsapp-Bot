const { MessageType, Mimetype } = require("@adiwajshing/baileys")
const Asena = require("../Utilis/events")
// const config = require('../config');
const moment = require("moment")
const {
  getName,
  getBuffer,
  getJson,
  IdentifySong,
} = require("../Utilis/download")
const Language = require("../language")
const Lang = Language.getString("updown")
const { emoji, getImgUrl, isUrl } = require("../Utilis/Misc")

Asena.addCommand(
  { pattern: "whois ?(.*)", fromMe: true, desc: "Show Group or person info." },
  async (message, match) => {
    const u = message.mention[0] || message.reply_message.jid
    if (message.isGroup && !u) {
      let pp
      try {
        pp = await message.client.getProfilePicture(message.jid)
      } catch (error) {
        pp =
          "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
      }
      const group = await message.client.groupMetadata(message.jid)
      const msg =
        "```" +
        `Name    : ${group.subject}
Id      : ${group.id}
Onwer   : wa.me/${parseInt(group.owner)}
Created : ${moment.unix(group.creation).format("MMMM Do YYYY, h:mm a")}
Desc    : ${group.desc}` +
        "```"
      let { buffer } = await getBuffer(pp)
      return await message.sendMessage(
        buffer,
        { caption: msg },
        MessageType.image
      )
    }
    if (message.isGroup && u) {
      const status = await message.client.getStatus(u)
      let pp
      try {
        pp = await message.client.getProfilePicture(u)
      } catch (error) {
        pp =
          "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
      }
      const msg =
        "```" +
        `Name   : ${await getName(u, message.client)}
Id     : ${u}
Status : ${status.status}` +
        "```"
      const { buffer } = await getBuffer(pp)
      return await message.sendMessage(
        buffer,
        { caption: msg },
        MessageType.image
      )
    }
    const status = await message.client.getStatus(u || message.jid)
    let pp
    try {
      pp = await message.client.getProfilePicture(u || message.jid)
    } catch (error) {
      pp =
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
    }
    const msg =
      "```" +
      `Name   : ${await getName(u || message.jid, message.client)}
Id     : ${u || message.jid}
Status : ${status.status}` +
      "```"
    const { buffer } = await getBuffer(pp)
    await message.sendMessage(buffer, { caption: msg }, MessageType.image)
  }
)

Asena.addCommand(
  { pattern: "upload ?(.*)", fromMe: true, desc: "Download from link." },
  async (message, match) => {
    match = isUrl(match || message.reply_message.text || "upload")
    if (!match) return await message.sendMessage(Lang.NEED_URL)
    if (match.startsWith("https://images.app.goo.gl"))
      match = await getImgUrl(match)
    await message.sendMessage(Lang.DOWNLOADING)
    let { buffer, type, name, emessage, mime } = await getBuffer(match)
    if (!buffer) return await message.sendMessage(emessage)
    if (type == "video")
      return await message.sendMessage(
        buffer,
        { filename: name, mimetype: mime, quoted: message.quoted },
        MessageType.video
      )
    else if (type == "image")
      return await message.sendMessage(
        buffer,
        { filename: name, mimetype: mime, quoted: message.quoted },
        MessageType.image
      )
    else if (type == "audio")
      return await message.sendMessage(
        buffer,
        { filename: name, mimetype: mime, quoted: message.quoted },
        MessageType.audio
      )
    else
      return await message.sendMessage(
        buffer,
        { filename: name, mimetype: mime, quoted: message.quoted },
        MessageType.document
      )
  }
)

Asena.addCommand(
  { pattern: "scl ?(.*)", fromMe: true, desc: Lang.SCL_DESC },
  async (message, match) => {
    match = !message.reply_message ? match : message.reply_message.text
    if (match === "" || !match.startsWith("https://"))
      return await message.sendMessage(Lang.NEED_URL)
    let sc = "https://soundcloud.com" + match.split(".com")[1]
    let url = `https://api.zeks.xyz/api/soundcloud?apikey=bottus000000&url=${sc}`
    const json = await getJson(url)
    if (json.status !== true) return await message.sendMessage(Lang.NOT_FOUND)
    let title = json.result.title
    let { buffer, mime } = await getBuffer(json.result.download)
    await message.sendMessage(
      buffer,
      { filename: title, mimetype: mime, ptt: false },
      MessageType.audio
    )
  }
)

Asena.addCommand(
  { pattern: "emoji ?(.*)", fromMe: true, desc: Lang.EMOJI_DESC },
  async (message, match) => {
    match = !message.reply_message ? match : message.reply_message.text
    if (match === "") return await message.sendMessage(Lang.NEED_EMOJI)
    let buffer = await emoji(match)
    if (buffer !== false)
      return await message.sendMessage(
        buffer,
        { quoted: message.quoted, mimetype: Mimetype.webp },
        MessageType.sticker
      )
  }
)

Asena.addCommand(
  { pattern: "ss ?(.*)", fromMe: true, desc: Lang.SS_DESC },
  async (message, match) => {
    match = !message.reply_message ? match : message.reply_message.text
    let url = `https://shot.screenshotapi.net/screenshot?&url=${match}
	&width=1388&height=720&output=image&file_type=png&block_ads=true&no_cookie_banners=true&dark_mode=true&wait_for_event=networkidle`
    let { buffer } = await getBuffer(url)
    await message.sendMessage(
      buffer,
      { quoted: message.quoted },
      MessageType.image
    )
  }
)

Asena.addCommand(
  { pattern: "find", fromMe: true, desc: Lang.FIND_DESC },
  async (message, match) => {
    if (!message.reply_message || !message.reply_message.audio)
      return await message.sendMessage(`*Reply to a audio!*`)
    const data = await IdentifySong(
      await message.reply_message.downloadAndSaveMediaMessage("find")
    )
    if (!data) return
    if (!data.status) return await message.sendMessage(Lang.NOT_FOUND)
    return await message.sendMessage(
      Lang.FIND_MSG.format(
        data.data.title,
        data.data.artists || data.data.artist,
        data.data.genre || data.data.label,
        data.data.album,
        data.data.release_date
      ),
      { quoted: message.quoted }
    )
  }
)

Asena.addCommand(
  { pattern: "attp ?(.*)", fromMe: true, desc: Lang.ATTP_DESC },
  async (message, match) => {
    if (!match) return await message.sendMessage(Lang.ATTP_NEED_REPLY)
    const { buffer } = await getBuffer(
      `https://api.xteam.xyz/attp?file&text=${match}`
    )
    if (buffer)
      return await message.sendMessage(
        buffer,
        { mimetype: Mimetype.webp },
        MessageType.sticker
      )
  }
)
