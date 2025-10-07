import type { HttpClientError } from '@effect/platform/HttpClientError'
import type * as Effect from 'effect/Effect'
import type { BotApiError } from './BotApiError'
import type { MethodParams, MethodResults } from './methods.gen'

type Method<M extends keyof MethodParams> = (parameters: MethodParams[M]) => Effect.Effect<MethodResults[M], HttpClientError | BotApiError>

export interface BotApiShape {
  /**
   * Use this method to receive incoming updates using long polling ([wiki](https://en.wikipedia.org/wiki/Push_technology#Long_polling)). Returns an Array of [Update](https://core.telegram.org/bots/api#update) objects.
   *
   * > **Notes**
   * >
   * > **1.** This method will not work if an outgoing webhook is set up.
   * >
   * > **2.** In order to avoid getting duplicate updates, recalculate _offset_ after each server response.
   */
  getUpdates: Method<'getUpdates'>
  /**
   * Use this method to specify a URL and receive incoming updates via an outgoing webhook. Whenever there is an update for the bot, we will send an HTTPS POST request to the specified URL, containing a JSON-serialized [Update](https://core.telegram.org/bots/api#update). In case of an unsuccessful request (a request with response [HTTP status code](https://en.wikipedia.org/wiki/List_of_HTTP_status_codes) different from `2XY`), we will repeat the request and give up after a reasonable amount of attempts. Returns _True_ on success.
   *
   * If you'd like to make sure that the webhook was set by you, you can specify secret data in the parameter _secret\_token_. If specified, the request will contain a header “X-Telegram-Bot-Api-Secret-Token” with the secret token as content.
   *
   * > **Notes**
   * >
   * > **1.** You will not be able to receive updates using [getUpdates](https://core.telegram.org/bots/api#getupdates) for as long as an outgoing webhook is set up.
   * >
   * > **2.** To use a self-signed certificate, you need to upload your [public key certificate](https://core.telegram.org/bots/self-signed) using _certificate_ parameter. Please upload as InputFile, sending a String will not work.
   * >
   * > **3.** Ports currently supported _for webhooks_: **443, 80, 88, 8443**.
   * >
   * > If you're having any trouble setting up webhooks, please check out this [amazing guide to webhooks](https://core.telegram.org/bots/webhooks).
   */
  setWebhook: Method<'setWebhook'>
  /** Use this method to remove webhook integration if you decide to switch back to [getUpdates](https://core.telegram.org/bots/api#getupdates). Returns _True_ on success. */
  deleteWebhook: Method<'deleteWebhook'>
  /** Use this method to get current webhook status. Requires no parameters. On success, returns a [WebhookInfo](https://core.telegram.org/bots/api#webhookinfo) object. If the bot is using [getUpdates](https://core.telegram.org/bots/api#getupdates), will return an object with the _url_ field empty. */
  getWebhookInfo: Method<'getWebhookInfo'>
  /** A simple method for testing your bot's authentication token. Requires no parameters. Returns basic information about the bot in form of a [User](https://core.telegram.org/bots/api#user) object. */
  getMe: Method<'getMe'>
  /** Use this method to log out from the cloud Bot API server before launching the bot locally. You **must** log out the bot before running it locally, otherwise there is no guarantee that the bot will receive updates. After a successful call, you can immediately log in on a local server, but will not be able to log in back to the cloud Bot API server for 10 minutes. Returns _True_ on success. Requires no parameters. */
  logOut: Method<'logOut'>
  /** Use this method to close the bot instance before moving it from one local server to another. You need to delete the webhook before calling this method to ensure that the bot isn't launched again after server restart. The method will return error 429 in the first 10 minutes after the bot is launched. Returns _True_ on success. Requires no parameters. */
  close: Method<'close'>
  /** Use this method to send text messages. On success, the sent [Message](https://core.telegram.org/bots/api#message) is returned. */
  sendMessage: Method<'sendMessage'>
  /** Use this method to forward messages of any kind. Service messages and messages with protected content can't be forwarded. On success, the sent [Message](https://core.telegram.org/bots/api#message) is returned. */
  forwardMessage: Method<'forwardMessage'>
  /** Use this method to forward multiple messages of any kind. If some of the specified messages can't be found or forwarded, they are skipped. Service messages and messages with protected content can't be forwarded. Album grouping is kept for forwarded messages. On success, an array of [MessageId](https://core.telegram.org/bots/api#messageid) of the sent messages is returned. */
  forwardMessages: Method<'forwardMessages'>
  /** Use this method to copy messages of any kind. Service messages, paid media messages, giveaway messages, giveaway winners messages, and invoice messages can't be copied. A quiz [poll](https://core.telegram.org/bots/api#poll) can be copied only if the value of the field _correct\_option\_id_ is known to the bot. The method is analogous to the method [forwardMessage](https://core.telegram.org/bots/api#forwardmessage), but the copied message doesn't have a link to the original message. Returns the [MessageId](https://core.telegram.org/bots/api#messageid) of the sent message on success. */
  copyMessage: Method<'copyMessage'>
  /** Use this method to copy messages of any kind. If some of the specified messages can't be found or copied, they are skipped. Service messages, paid media messages, giveaway messages, giveaway winners messages, and invoice messages can't be copied. A quiz [poll](https://core.telegram.org/bots/api#poll) can be copied only if the value of the field _correct\_option\_id_ is known to the bot. The method is analogous to the method [forwardMessages](https://core.telegram.org/bots/api#forwardmessages), but the copied messages don't have a link to the original message. Album grouping is kept for copied messages. On success, an array of [MessageId](https://core.telegram.org/bots/api#messageid) of the sent messages is returned. */
  copyMessages: Method<'copyMessages'>
  /** Use this method to send photos. On success, the sent [Message](https://core.telegram.org/bots/api#message) is returned. */
  sendPhoto: Method<'sendPhoto'>
  /**
   * Use this method to send audio files, if you want Telegram clients to display them in the music player. Your audio must be in the .MP3 or .M4A format. On success, the sent [Message](https://core.telegram.org/bots/api#message) is returned. Bots can currently send audio files of up to 50 MB in size, this limit may be changed in the future.
   *
   * For sending voice messages, use the [sendVoice](https://core.telegram.org/bots/api#sendvoice) method instead.
   */
  sendAudio: Method<'sendAudio'>
  /** Use this method to send general files. On success, the sent [Message](https://core.telegram.org/bots/api#message) is returned. Bots can currently send files of any type of up to 50 MB in size, this limit may be changed in the future. */
  sendDocument: Method<'sendDocument'>
  /** Use this method to send video files, Telegram clients support MPEG4 videos (other formats may be sent as [Document](https://core.telegram.org/bots/api#document)). On success, the sent [Message](https://core.telegram.org/bots/api#message) is returned. Bots can currently send video files of up to 50 MB in size, this limit may be changed in the future. */
  sendVideo: Method<'sendVideo'>
  /** Use this method to send animation files (GIF or H.264/MPEG-4 AVC video without sound). On success, the sent [Message](https://core.telegram.org/bots/api#message) is returned. Bots can currently send animation files of up to 50 MB in size, this limit may be changed in the future. */
  sendAnimation: Method<'sendAnimation'>
  /** Use this method to send audio files, if you want Telegram clients to display the file as a playable voice message. For this to work, your audio must be in an .OGG file encoded with OPUS, or in .MP3 format, or in .M4A format (other formats may be sent as [Audio](https://core.telegram.org/bots/api#audio) or [Document](https://core.telegram.org/bots/api#document)). On success, the sent [Message](https://core.telegram.org/bots/api#message) is returned. Bots can currently send voice messages of up to 50 MB in size, this limit may be changed in the future. */
  sendVoice: Method<'sendVoice'>
  /** As of [v.4.0](https://telegram.org/blog/video-messages-and-telescope), Telegram clients support rounded square MPEG4 videos of up to 1 minute long. Use this method to send video messages. On success, the sent [Message](https://core.telegram.org/bots/api#message) is returned. */
  sendVideoNote: Method<'sendVideoNote'>
  /** Use this method to send paid media. On success, the sent [Message](https://core.telegram.org/bots/api#message) is returned. */
  sendPaidMedia: Method<'sendPaidMedia'>
  /** Use this method to send a group of photos, videos, documents or audios as an album. Documents and audio files can be only grouped in an album with messages of the same type. On success, an array of [Message](https://core.telegram.org/bots/api#message) objects that were sent is returned. */
  sendMediaGroup: Method<'sendMediaGroup'>
  /** Use this method to send point on the map. On success, the sent [Message](https://core.telegram.org/bots/api#message) is returned. */
  sendLocation: Method<'sendLocation'>
  /** Use this method to send information about a venue. On success, the sent [Message](https://core.telegram.org/bots/api#message) is returned. */
  sendVenue: Method<'sendVenue'>
  /** Use this method to send phone contacts. On success, the sent [Message](https://core.telegram.org/bots/api#message) is returned. */
  sendContact: Method<'sendContact'>
  /** Use this method to send a native poll. On success, the sent [Message](https://core.telegram.org/bots/api#message) is returned. */
  sendPoll: Method<'sendPoll'>
  /** Use this method to send a checklist on behalf of a connected business account. On success, the sent [Message](https://core.telegram.org/bots/api#message) is returned. */
  sendChecklist: Method<'sendChecklist'>
  /** Use this method to send an animated emoji that will display a random value. On success, the sent [Message](https://core.telegram.org/bots/api#message) is returned. */
  sendDice: Method<'sendDice'>
  /**
   * Use this method when you need to tell the user that something is happening on the bot's side. The status is set for 5 seconds or less (when a message arrives from your bot, Telegram clients clear its typing status). Returns _True_ on success.
   *
   * > Example: The [ImageBot](https://t.me/imagebot) needs some time to process a request and upload the image. Instead of sending a text message along the lines of “Retrieving image, please wait…”, the bot may use [sendChatAction](https://core.telegram.org/bots/api#sendchataction) with _action_ = _upload\_photo_. The user will see a “sending photo” status for the bot.
   *
   * We only recommend using this method when a response from the bot will take a **noticeable** amount of time to arrive.
   */
  sendChatAction: Method<'sendChatAction'>
  /** Use this method to change the chosen reactions on a message. Service messages of some types can't be reacted to. Automatically forwarded messages from a channel to its discussion group have the same available reactions as messages in the channel. Bots can't use paid reactions. Returns _True_ on success. */
  setMessageReaction: Method<'setMessageReaction'>
  /** Use this method to get a list of profile pictures for a user. Returns a [UserProfilePhotos](https://core.telegram.org/bots/api#userprofilephotos) object. */
  getUserProfilePhotos: Method<'getUserProfilePhotos'>
  /** Changes the emoji status for a given user that previously allowed the bot to manage their emoji status via the Mini App method [requestEmojiStatusAccess](https://core.telegram.org/bots/webapps#initializing-mini-apps). Returns _True_ on success. */
  setUserEmojiStatus: Method<'setUserEmojiStatus'>
  /**
   * Use this method to get basic information about a file and prepare it for downloading. For the moment, bots can download files of up to 20MB in size. On success, a [File](https://core.telegram.org/bots/api#file) object is returned. The file can then be downloaded via the link `https://api.telegram.org/file/bot<token>/<file_path>`, where `<file_path>` is taken from the response. It is guaranteed that the link will be valid for at least 1 hour. When the link expires, a new one can be requested by calling [getFile](https://core.telegram.org/bots/api#getfile) again.
   *
   * **Note:** This function may not preserve the original file name and MIME type. You should save the file's MIME type and name (if available) when the File object is received.
   */
  getFile: Method<'getFile'>
  /** Use this method to ban a user in a group, a supergroup or a channel. In the case of supergroups and channels, the user will not be able to return to the chat on their own using invite links, etc., unless [unbanned](https://core.telegram.org/bots/api#unbanchatmember) first. The bot must be an administrator in the chat for this to work and must have the appropriate administrator rights. Returns _True_ on success. */
  banChatMember: Method<'banChatMember'>
  /** Use this method to unban a previously banned user in a supergroup or channel. The user will **not** return to the group or channel automatically, but will be able to join via link, etc. The bot must be an administrator for this to work. By default, this method guarantees that after the call the user is not a member of the chat, but will be able to join it. So if the user is a member of the chat they will also be **removed** from the chat. If you don't want this, use the parameter _only\_if\_banned_. Returns _True_ on success. */
  unbanChatMember: Method<'unbanChatMember'>
  /** Use this method to restrict a user in a supergroup. The bot must be an administrator in the supergroup for this to work and must have the appropriate administrator rights. Pass _True_ for all permissions to lift restrictions from a user. Returns _True_ on success. */
  restrictChatMember: Method<'restrictChatMember'>
  /** Use this method to promote or demote a user in a supergroup or a channel. The bot must be an administrator in the chat for this to work and must have the appropriate administrator rights. Pass _False_ for all boolean parameters to demote a user. Returns _True_ on success. */
  promoteChatMember: Method<'promoteChatMember'>
  /** Use this method to set a custom title for an administrator in a supergroup promoted by the bot. Returns _True_ on success. */
  setChatAdministratorCustomTitle: Method<'setChatAdministratorCustomTitle'>
  /** Use this method to ban a channel chat in a supergroup or a channel. Until the chat is [unbanned](https://core.telegram.org/bots/api#unbanchatsenderchat), the owner of the banned chat won't be able to send messages on behalf of **any of their channels**. The bot must be an administrator in the supergroup or channel for this to work and must have the appropriate administrator rights. Returns _True_ on success. */
  banChatSenderChat: Method<'banChatSenderChat'>
  /** Use this method to unban a previously banned channel chat in a supergroup or channel. The bot must be an administrator for this to work and must have the appropriate administrator rights. Returns _True_ on success. */
  unbanChatSenderChat: Method<'unbanChatSenderChat'>
  /** Use this method to set default chat permissions for all members. The bot must be an administrator in the group or a supergroup for this to work and must have the _can\_restrict\_members_ administrator rights. Returns _True_ on success. */
  setChatPermissions: Method<'setChatPermissions'>
  /**
   * Use this method to generate a new primary invite link for a chat; any previously generated primary link is revoked. The bot must be an administrator in the chat for this to work and must have the appropriate administrator rights. Returns the new invite link as _String_ on success.
   *
   * > Note: Each administrator in a chat generates their own invite links. Bots can't use invite links generated by other administrators. If you want your bot to work with invite links, it will need to generate its own link using [exportChatInviteLink](https://core.telegram.org/bots/api#exportchatinvitelink) or by calling the [getChat](https://core.telegram.org/bots/api#getchat) method. If your bot needs to generate a new primary invite link replacing its previous one, use [exportChatInviteLink](https://core.telegram.org/bots/api#exportchatinvitelink) again.
   */
  exportChatInviteLink: Method<'exportChatInviteLink'>
  /** Use this method to create an additional invite link for a chat. The bot must be an administrator in the chat for this to work and must have the appropriate administrator rights. The link can be revoked using the method [revokeChatInviteLink](https://core.telegram.org/bots/api#revokechatinvitelink). Returns the new invite link as [ChatInviteLink](https://core.telegram.org/bots/api#chatinvitelink) object. */
  createChatInviteLink: Method<'createChatInviteLink'>
  /** Use this method to edit a non-primary invite link created by the bot. The bot must be an administrator in the chat for this to work and must have the appropriate administrator rights. Returns the edited invite link as a [ChatInviteLink](https://core.telegram.org/bots/api#chatinvitelink) object. */
  editChatInviteLink: Method<'editChatInviteLink'>
  /** Use this method to create a [subscription invite link](https://telegram.org/blog/superchannels-star-reactions-subscriptions#star-subscriptions) for a channel chat. The bot must have the _can\_invite\_users_ administrator rights. The link can be edited using the method [editChatSubscriptionInviteLink](https://core.telegram.org/bots/api#editchatsubscriptioninvitelink) or revoked using the method [revokeChatInviteLink](https://core.telegram.org/bots/api#revokechatinvitelink). Returns the new invite link as a [ChatInviteLink](https://core.telegram.org/bots/api#chatinvitelink) object. */
  createChatSubscriptionInviteLink: Method<'createChatSubscriptionInviteLink'>
  /** Use this method to edit a subscription invite link created by the bot. The bot must have the _can\_invite\_users_ administrator rights. Returns the edited invite link as a [ChatInviteLink](https://core.telegram.org/bots/api#chatinvitelink) object. */
  editChatSubscriptionInviteLink: Method<'editChatSubscriptionInviteLink'>
  /** Use this method to revoke an invite link created by the bot. If the primary link is revoked, a new link is automatically generated. The bot must be an administrator in the chat for this to work and must have the appropriate administrator rights. Returns the revoked invite link as [ChatInviteLink](https://core.telegram.org/bots/api#chatinvitelink) object. */
  revokeChatInviteLink: Method<'revokeChatInviteLink'>
  /** Use this method to approve a chat join request. The bot must be an administrator in the chat for this to work and must have the _can\_invite\_users_ administrator right. Returns _True_ on success. */
  approveChatJoinRequest: Method<'approveChatJoinRequest'>
  /** Use this method to decline a chat join request. The bot must be an administrator in the chat for this to work and must have the _can\_invite\_users_ administrator right. Returns _True_ on success. */
  declineChatJoinRequest: Method<'declineChatJoinRequest'>
  /** Use this method to set a new profile photo for the chat. Photos can't be changed for private chats. The bot must be an administrator in the chat for this to work and must have the appropriate administrator rights. Returns _True_ on success. */
  setChatPhoto: Method<'setChatPhoto'>
  /** Use this method to delete a chat photo. Photos can't be changed for private chats. The bot must be an administrator in the chat for this to work and must have the appropriate administrator rights. Returns _True_ on success. */
  deleteChatPhoto: Method<'deleteChatPhoto'>
  /** Use this method to change the title of a chat. Titles can't be changed for private chats. The bot must be an administrator in the chat for this to work and must have the appropriate administrator rights. Returns _True_ on success. */
  setChatTitle: Method<'setChatTitle'>
  /** Use this method to change the description of a group, a supergroup or a channel. The bot must be an administrator in the chat for this to work and must have the appropriate administrator rights. Returns _True_ on success. */
  setChatDescription: Method<'setChatDescription'>
  /** Use this method to add a message to the list of pinned messages in a chat. In private chats and channel direct messages chats, all non-service messages can be pinned. Conversely, the bot must be an administrator with the 'can\_pin\_messages' right or the 'can\_edit\_messages' right to pin messages in groups and channels respectively. Returns _True_ on success. */
  pinChatMessage: Method<'pinChatMessage'>
  /** Use this method to remove a message from the list of pinned messages in a chat. In private chats and channel direct messages chats, all messages can be unpinned. Conversely, the bot must be an administrator with the 'can\_pin\_messages' right or the 'can\_edit\_messages' right to unpin messages in groups and channels respectively. Returns _True_ on success. */
  unpinChatMessage: Method<'unpinChatMessage'>
  /** Use this method to clear the list of pinned messages in a chat. In private chats and channel direct messages chats, no additional rights are required to unpin all pinned messages. Conversely, the bot must be an administrator with the 'can\_pin\_messages' right or the 'can\_edit\_messages' right to unpin all pinned messages in groups and channels respectively. Returns _True_ on success. */
  unpinAllChatMessages: Method<'unpinAllChatMessages'>
  /** Use this method for your bot to leave a group, supergroup or channel. Returns _True_ on success. */
  leaveChat: Method<'leaveChat'>
  /** Use this method to get up-to-date information about the chat. Returns a [ChatFullInfo](https://core.telegram.org/bots/api#chatfullinfo) object on success. */
  getChat: Method<'getChat'>
  /** Use this method to get a list of administrators in a chat, which aren't bots. Returns an Array of [ChatMember](https://core.telegram.org/bots/api#chatmember) objects. */
  getChatAdministrators: Method<'getChatAdministrators'>
  /** Use this method to get the number of members in a chat. Returns _Int_ on success. */
  getChatMemberCount: Method<'getChatMemberCount'>
  /** Use this method to get information about a member of a chat. The method is only guaranteed to work for other users if the bot is an administrator in the chat. Returns a [ChatMember](https://core.telegram.org/bots/api#chatmember) object on success. */
  getChatMember: Method<'getChatMember'>
  /** Use this method to set a new group sticker set for a supergroup. The bot must be an administrator in the chat for this to work and must have the appropriate administrator rights. Use the field _can\_set\_sticker\_set_ optionally returned in [getChat](https://core.telegram.org/bots/api#getchat) requests to check if the bot can use this method. Returns _True_ on success. */
  setChatStickerSet: Method<'setChatStickerSet'>
  /** Use this method to delete a group sticker set from a supergroup. The bot must be an administrator in the chat for this to work and must have the appropriate administrator rights. Use the field _can\_set\_sticker\_set_ optionally returned in [getChat](https://core.telegram.org/bots/api#getchat) requests to check if the bot can use this method. Returns _True_ on success. */
  deleteChatStickerSet: Method<'deleteChatStickerSet'>
  /** Use this method to get custom emoji stickers, which can be used as a forum topic icon by any user. Requires no parameters. Returns an Array of [Sticker](https://core.telegram.org/bots/api#sticker) objects. */
  getForumTopicIconStickers: Method<'getForumTopicIconStickers'>
  /** Use this method to create a topic in a forum supergroup chat. The bot must be an administrator in the chat for this to work and must have the _can\_manage\_topics_ administrator rights. Returns information about the created topic as a [ForumTopic](https://core.telegram.org/bots/api#forumtopic) object. */
  createForumTopic: Method<'createForumTopic'>
  /** Use this method to edit name and icon of a topic in a forum supergroup chat. The bot must be an administrator in the chat for this to work and must have the _can\_manage\_topics_ administrator rights, unless it is the creator of the topic. Returns _True_ on success. */
  editForumTopic: Method<'editForumTopic'>
  /** Use this method to close an open topic in a forum supergroup chat. The bot must be an administrator in the chat for this to work and must have the _can\_manage\_topics_ administrator rights, unless it is the creator of the topic. Returns _True_ on success. */
  closeForumTopic: Method<'closeForumTopic'>
  /** Use this method to reopen a closed topic in a forum supergroup chat. The bot must be an administrator in the chat for this to work and must have the _can\_manage\_topics_ administrator rights, unless it is the creator of the topic. Returns _True_ on success. */
  reopenForumTopic: Method<'reopenForumTopic'>
  /** Use this method to delete a forum topic along with all its messages in a forum supergroup chat. The bot must be an administrator in the chat for this to work and must have the _can\_delete\_messages_ administrator rights. Returns _True_ on success. */
  deleteForumTopic: Method<'deleteForumTopic'>
  /** Use this method to clear the list of pinned messages in a forum topic. The bot must be an administrator in the chat for this to work and must have the _can\_pin\_messages_ administrator right in the supergroup. Returns _True_ on success. */
  unpinAllForumTopicMessages: Method<'unpinAllForumTopicMessages'>
  /** Use this method to edit the name of the 'General' topic in a forum supergroup chat. The bot must be an administrator in the chat for this to work and must have the _can\_manage\_topics_ administrator rights. Returns _True_ on success. */
  editGeneralForumTopic: Method<'editGeneralForumTopic'>
  /** Use this method to close an open 'General' topic in a forum supergroup chat. The bot must be an administrator in the chat for this to work and must have the _can\_manage\_topics_ administrator rights. Returns _True_ on success. */
  closeGeneralForumTopic: Method<'closeGeneralForumTopic'>
  /** Use this method to reopen a closed 'General' topic in a forum supergroup chat. The bot must be an administrator in the chat for this to work and must have the _can\_manage\_topics_ administrator rights. The topic will be automatically unhidden if it was hidden. Returns _True_ on success. */
  reopenGeneralForumTopic: Method<'reopenGeneralForumTopic'>
  /** Use this method to hide the 'General' topic in a forum supergroup chat. The bot must be an administrator in the chat for this to work and must have the _can\_manage\_topics_ administrator rights. The topic will be automatically closed if it was open. Returns _True_ on success. */
  hideGeneralForumTopic: Method<'hideGeneralForumTopic'>
  /** Use this method to unhide the 'General' topic in a forum supergroup chat. The bot must be an administrator in the chat for this to work and must have the _can\_manage\_topics_ administrator rights. Returns _True_ on success. */
  unhideGeneralForumTopic: Method<'unhideGeneralForumTopic'>
  /** Use this method to clear the list of pinned messages in a General forum topic. The bot must be an administrator in the chat for this to work and must have the _can\_pin\_messages_ administrator right in the supergroup. Returns _True_ on success. */
  unpinAllGeneralForumTopicMessages: Method<'unpinAllGeneralForumTopicMessages'>
  /**
   * Use this method to send answers to callback queries sent from [inline keyboards](https://core.telegram.org/bots/features#inline-keyboards). The answer will be displayed to the user as a notification at the top of the chat screen or as an alert. On success, _True_ is returned.
   *
   * > Alternatively, the user can be redirected to the specified Game URL. For this option to work, you must first create a game for your bot via [@BotFather](https://t.me/botfather) and accept the terms. Otherwise, you may use links like `t.me/your_bot?start=XXXX` that open your bot with a parameter.
   */
  answerCallbackQuery: Method<'answerCallbackQuery'>
  /** Use this method to get the list of boosts added to a chat by a user. Requires administrator rights in the chat. Returns a [UserChatBoosts](https://core.telegram.org/bots/api#userchatboosts) object. */
  getUserChatBoosts: Method<'getUserChatBoosts'>
  /** Use this method to get information about the connection of the bot with a business account. Returns a [BusinessConnection](https://core.telegram.org/bots/api#businessconnection) object on success. */
  getBusinessConnection: Method<'getBusinessConnection'>
  /** Use this method to change the list of the bot's commands. See [this manual](https://core.telegram.org/bots/features#commands) for more details about bot commands. Returns _True_ on success. */
  setMyCommands: Method<'setMyCommands'>
  /** Use this method to delete the list of the bot's commands for the given scope and user language. After deletion, [higher level commands](https://core.telegram.org/bots/api#determining-list-of-commands) will be shown to affected users. Returns _True_ on success. */
  deleteMyCommands: Method<'deleteMyCommands'>
  /** Use this method to get the current list of the bot's commands for the given scope and user language. Returns an Array of [BotCommand](https://core.telegram.org/bots/api#botcommand) objects. If commands aren't set, an empty list is returned. */
  getMyCommands: Method<'getMyCommands'>
  /** Use this method to change the bot's name. Returns _True_ on success. */
  setMyName: Method<'setMyName'>
  /** Use this method to get the current bot name for the given user language. Returns [BotName](https://core.telegram.org/bots/api#botname) on success. */
  getMyName: Method<'getMyName'>
  /** Use this method to change the bot's description, which is shown in the chat with the bot if the chat is empty. Returns _True_ on success. */
  setMyDescription: Method<'setMyDescription'>
  /** Use this method to get the current bot description for the given user language. Returns [BotDescription](https://core.telegram.org/bots/api#botdescription) on success. */
  getMyDescription: Method<'getMyDescription'>
  /** Use this method to change the bot's short description, which is shown on the bot's profile page and is sent together with the link when users share the bot. Returns _True_ on success. */
  setMyShortDescription: Method<'setMyShortDescription'>
  /** Use this method to get the current bot short description for the given user language. Returns [BotShortDescription](https://core.telegram.org/bots/api#botshortdescription) on success. */
  getMyShortDescription: Method<'getMyShortDescription'>
  /** Use this method to change the bot's menu button in a private chat, or the default menu button. Returns _True_ on success. */
  setChatMenuButton: Method<'setChatMenuButton'>
  /** Use this method to get the current value of the bot's menu button in a private chat, or the default menu button. Returns [MenuButton](https://core.telegram.org/bots/api#menubutton) on success. */
  getChatMenuButton: Method<'getChatMenuButton'>
  /** Use this method to change the default administrator rights requested by the bot when it's added as an administrator to groups or channels. These rights will be suggested to users, but they are free to modify the list before adding the bot. Returns _True_ on success. */
  setMyDefaultAdministratorRights: Method<'setMyDefaultAdministratorRights'>
  /** Use this method to get the current default administrator rights of the bot. Returns [ChatAdministratorRights](https://core.telegram.org/bots/api#chatadministratorrights) on success. */
  getMyDefaultAdministratorRights: Method<'getMyDefaultAdministratorRights'>
  /** Returns the list of gifts that can be sent by the bot to users and channel chats. Requires no parameters. Returns a [Gifts](https://core.telegram.org/bots/api#gifts) object. */
  getAvailableGifts: Method<'getAvailableGifts'>
  /** Sends a gift to the given user or channel chat. The gift can't be converted to Telegram Stars by the receiver. Returns _True_ on success. */
  sendGift: Method<'sendGift'>
  /** Gifts a Telegram Premium subscription to the given user. Returns _True_ on success. */
  giftPremiumSubscription: Method<'giftPremiumSubscription'>
  /** Verifies a user [on behalf of the organization](https://telegram.org/verify#third-party-verification) which is represented by the bot. Returns _True_ on success. */
  verifyUser: Method<'verifyUser'>
  /** Verifies a chat [on behalf of the organization](https://telegram.org/verify#third-party-verification) which is represented by the bot. Returns _True_ on success. */
  verifyChat: Method<'verifyChat'>
  /** Removes verification from a user who is currently verified [on behalf of the organization](https://telegram.org/verify#third-party-verification) represented by the bot. Returns _True_ on success. */
  removeUserVerification: Method<'removeUserVerification'>
  /** Removes verification from a chat that is currently verified [on behalf of the organization](https://telegram.org/verify#third-party-verification) represented by the bot. Returns _True_ on success. */
  removeChatVerification: Method<'removeChatVerification'>
  /** Marks incoming message as read on behalf of a business account. Requires the _can\_read\_messages_ business bot right. Returns _True_ on success. */
  readBusinessMessage: Method<'readBusinessMessage'>
  /** Delete messages on behalf of a business account. Requires the _can\_delete\_sent\_messages_ business bot right to delete messages sent by the bot itself, or the _can\_delete\_all\_messages_ business bot right to delete any message. Returns _True_ on success. */
  deleteBusinessMessages: Method<'deleteBusinessMessages'>
  /** Changes the first and last name of a managed business account. Requires the _can\_change\_name_ business bot right. Returns _True_ on success. */
  setBusinessAccountName: Method<'setBusinessAccountName'>
  /** Changes the username of a managed business account. Requires the _can\_change\_username_ business bot right. Returns _True_ on success. */
  setBusinessAccountUsername: Method<'setBusinessAccountUsername'>
  /** Changes the bio of a managed business account. Requires the _can\_change\_bio_ business bot right. Returns _True_ on success. */
  setBusinessAccountBio: Method<'setBusinessAccountBio'>
  /** Changes the profile photo of a managed business account. Requires the _can\_edit\_profile\_photo_ business bot right. Returns _True_ on success. */
  setBusinessAccountProfilePhoto: Method<'setBusinessAccountProfilePhoto'>
  /** Removes the current profile photo of a managed business account. Requires the _can\_edit\_profile\_photo_ business bot right. Returns _True_ on success. */
  removeBusinessAccountProfilePhoto: Method<'removeBusinessAccountProfilePhoto'>
  /** Changes the privacy settings pertaining to incoming gifts in a managed business account. Requires the _can\_change\_gift\_settings_ business bot right. Returns _True_ on success. */
  setBusinessAccountGiftSettings: Method<'setBusinessAccountGiftSettings'>
  /** Returns the amount of Telegram Stars owned by a managed business account. Requires the _can\_view\_gifts\_and\_stars_ business bot right. Returns [StarAmount](https://core.telegram.org/bots/api#staramount) on success. */
  getBusinessAccountStarBalance: Method<'getBusinessAccountStarBalance'>
  /** Transfers Telegram Stars from the business account balance to the bot's balance. Requires the _can\_transfer\_stars_ business bot right. Returns _True_ on success. */
  transferBusinessAccountStars: Method<'transferBusinessAccountStars'>
  /** Returns the gifts received and owned by a managed business account. Requires the _can\_view\_gifts\_and\_stars_ business bot right. Returns [OwnedGifts](https://core.telegram.org/bots/api#ownedgifts) on success. */
  getBusinessAccountGifts: Method<'getBusinessAccountGifts'>
  /** Converts a given regular gift to Telegram Stars. Requires the _can\_convert\_gifts\_to\_stars_ business bot right. Returns _True_ on success. */
  convertGiftToStars: Method<'convertGiftToStars'>
  /** Upgrades a given regular gift to a unique gift. Requires the _can\_transfer\_and\_upgrade\_gifts_ business bot right. Additionally requires the _can\_transfer\_stars_ business bot right if the upgrade is paid. Returns _True_ on success. */
  upgradeGift: Method<'upgradeGift'>
  /** Transfers an owned unique gift to another user. Requires the _can\_transfer\_and\_upgrade\_gifts_ business bot right. Requires _can\_transfer\_stars_ business bot right if the transfer is paid. Returns _True_ on success. */
  transferGift: Method<'transferGift'>
  /** Posts a story on behalf of a managed business account. Requires the _can\_manage\_stories_ business bot right. Returns [Story](https://core.telegram.org/bots/api#story) on success. */
  postStory: Method<'postStory'>
  /** Edits a story previously posted by the bot on behalf of a managed business account. Requires the _can\_manage\_stories_ business bot right. Returns [Story](https://core.telegram.org/bots/api#story) on success. */
  editStory: Method<'editStory'>
  /** Deletes a story previously posted by the bot on behalf of a managed business account. Requires the _can\_manage\_stories_ business bot right. Returns _True_ on success. */
  deleteStory: Method<'deleteStory'>
  /** Use this method to edit text and [game](https://core.telegram.org/bots/api#games) messages. On success, if the edited message is not an inline message, the edited [Message](https://core.telegram.org/bots/api#message) is returned, otherwise _True_ is returned. Note that business messages that were not sent by the bot and do not contain an inline keyboard can only be edited within **48 hours** from the time they were sent. */
  editMessageText: Method<'editMessageText'>
  /** Use this method to edit captions of messages. On success, if the edited message is not an inline message, the edited [Message](https://core.telegram.org/bots/api#message) is returned, otherwise _True_ is returned. Note that business messages that were not sent by the bot and do not contain an inline keyboard can only be edited within **48 hours** from the time they were sent. */
  editMessageCaption: Method<'editMessageCaption'>
  /** Use this method to edit animation, audio, document, photo, or video messages, or to add media to text messages. If a message is part of a message album, then it can be edited only to an audio for audio albums, only to a document for document albums and to a photo or a video otherwise. When an inline message is edited, a new file can't be uploaded; use a previously uploaded file via its file\_id or specify a URL. On success, if the edited message is not an inline message, the edited [Message](https://core.telegram.org/bots/api#message) is returned, otherwise _True_ is returned. Note that business messages that were not sent by the bot and do not contain an inline keyboard can only be edited within **48 hours** from the time they were sent. */
  editMessageMedia: Method<'editMessageMedia'>
  /** Use this method to edit live location messages. A location can be edited until its _live\_period_ expires or editing is explicitly disabled by a call to [stopMessageLiveLocation](https://core.telegram.org/bots/api#stopmessagelivelocation). On success, if the edited message is not an inline message, the edited [Message](https://core.telegram.org/bots/api#message) is returned, otherwise _True_ is returned. */
  editMessageLiveLocation: Method<'editMessageLiveLocation'>
  /** Use this method to stop updating a live location message before _live\_period_ expires. On success, if the message is not an inline message, the edited [Message](https://core.telegram.org/bots/api#message) is returned, otherwise _True_ is returned. */
  stopMessageLiveLocation: Method<'stopMessageLiveLocation'>
  /** Use this method to edit a checklist on behalf of a connected business account. On success, the edited [Message](https://core.telegram.org/bots/api#message) is returned. */
  editMessageChecklist: Method<'editMessageChecklist'>
  /** Use this method to edit only the reply markup of messages. On success, if the edited message is not an inline message, the edited [Message](https://core.telegram.org/bots/api#message) is returned, otherwise _True_ is returned. Note that business messages that were not sent by the bot and do not contain an inline keyboard can only be edited within **48 hours** from the time they were sent. */
  editMessageReplyMarkup: Method<'editMessageReplyMarkup'>
  /** Use this method to stop a poll which was sent by the bot. On success, the stopped [Poll](https://core.telegram.org/bots/api#poll) is returned. */
  stopPoll: Method<'stopPoll'>
  /** Use this method to approve a suggested post in a direct messages chat. The bot must have the 'can\_post\_messages' administrator right in the corresponding channel chat. Returns _True_ on success. */
  approveSuggestedPost: Method<'approveSuggestedPost'>
  /** Use this method to decline a suggested post in a direct messages chat. The bot must have the 'can\_manage\_direct\_messages' administrator right in the corresponding channel chat. Returns _True_ on success. */
  declineSuggestedPost: Method<'declineSuggestedPost'>
  /**
   * Use this method to delete a message, including service messages, with the following limitations:
   *
   * \- A message can only be deleted if it was sent less than 48 hours ago.
   *
   * \- Service messages about a supergroup, channel, or forum topic creation can't be deleted.
   *
   * \- A dice message in a private chat can only be deleted if it was sent more than 24 hours ago.
   *
   * \- Bots can delete outgoing messages in private chats, groups, and supergroups.
   *
   * \- Bots can delete incoming messages in private chats.
   *
   * \- Bots granted _can\_post\_messages_ permissions can delete outgoing messages in channels.
   *
   * \- If the bot is an administrator of a group, it can delete any message there.
   *
   * \- If the bot has _can\_delete\_messages_ administrator right in a supergroup or a channel, it can delete any message there.
   *
   * \- If the bot has _can\_manage\_direct\_messages_ administrator right in a channel, it can delete any message in the corresponding direct messages chat.
   *
   * Returns _True_ on success.
   */
  deleteMessage: Method<'deleteMessage'>
  /** Use this method to delete multiple messages simultaneously. If some of the specified messages can't be found, they are skipped. Returns _True_ on success. */
  deleteMessages: Method<'deleteMessages'>
  /** Use this method to send static .WEBP, [animated](https://telegram.org/blog/animated-stickers) .TGS, or [video](https://telegram.org/blog/video-stickers-better-reactions) .WEBM stickers. On success, the sent [Message](https://core.telegram.org/bots/api#message) is returned. */
  sendSticker: Method<'sendSticker'>
  /** Use this method to get a sticker set. On success, a [StickerSet](https://core.telegram.org/bots/api#stickerset) object is returned. */
  getStickerSet: Method<'getStickerSet'>
  /** Use this method to get information about custom emoji stickers by their identifiers. Returns an Array of [Sticker](https://core.telegram.org/bots/api#sticker) objects. */
  getCustomEmojiStickers: Method<'getCustomEmojiStickers'>
  /** Use this method to upload a file with a sticker for later use in the [createNewStickerSet](https://core.telegram.org/bots/api#createnewstickerset), [addStickerToSet](https://core.telegram.org/bots/api#addstickertoset), or [replaceStickerInSet](https://core.telegram.org/bots/api#replacestickerinset) methods (the file can be used multiple times). Returns the uploaded [File](https://core.telegram.org/bots/api#file) on success. */
  uploadStickerFile: Method<'uploadStickerFile'>
  /** Use this method to create a new sticker set owned by a user. The bot will be able to edit the sticker set thus created. Returns _True_ on success. */
  createNewStickerSet: Method<'createNewStickerSet'>
  /** Use this method to add a new sticker to a set created by the bot. Emoji sticker sets can have up to 200 stickers. Other sticker sets can have up to 120 stickers. Returns _True_ on success. */
  addStickerToSet: Method<'addStickerToSet'>
  /** Use this method to move a sticker in a set created by the bot to a specific position. Returns _True_ on success. */
  setStickerPositionInSet: Method<'setStickerPositionInSet'>
  /** Use this method to delete a sticker from a set created by the bot. Returns _True_ on success. */
  deleteStickerFromSet: Method<'deleteStickerFromSet'>
  /** Use this method to replace an existing sticker in a sticker set with a new one. The method is equivalent to calling [deleteStickerFromSet](https://core.telegram.org/bots/api#deletestickerfromset), then [addStickerToSet](https://core.telegram.org/bots/api#addstickertoset), then [setStickerPositionInSet](https://core.telegram.org/bots/api#setstickerpositioninset). Returns _True_ on success. */
  replaceStickerInSet: Method<'replaceStickerInSet'>
  /** Use this method to change the list of emoji assigned to a regular or custom emoji sticker. The sticker must belong to a sticker set created by the bot. Returns _True_ on success. */
  setStickerEmojiList: Method<'setStickerEmojiList'>
  /** Use this method to change search keywords assigned to a regular or custom emoji sticker. The sticker must belong to a sticker set created by the bot. Returns _True_ on success. */
  setStickerKeywords: Method<'setStickerKeywords'>
  /** Use this method to change the [mask position](https://core.telegram.org/bots/api#maskposition) of a mask sticker. The sticker must belong to a sticker set that was created by the bot. Returns _True_ on success. */
  setStickerMaskPosition: Method<'setStickerMaskPosition'>
  /** Use this method to set the title of a created sticker set. Returns _True_ on success. */
  setStickerSetTitle: Method<'setStickerSetTitle'>
  /** Use this method to set the thumbnail of a regular or mask sticker set. The format of the thumbnail file must match the format of the stickers in the set. Returns _True_ on success. */
  setStickerSetThumbnail: Method<'setStickerSetThumbnail'>
  /** Use this method to set the thumbnail of a custom emoji sticker set. Returns _True_ on success. */
  setCustomEmojiStickerSetThumbnail: Method<'setCustomEmojiStickerSetThumbnail'>
  /** Use this method to delete a sticker set that was created by the bot. Returns _True_ on success. */
  deleteStickerSet: Method<'deleteStickerSet'>
  /**
   * Use this method to send answers to an inline query. On success, _True_ is returned.
   *
   * No more than **50** results per query are allowed.
   */
  answerInlineQuery: Method<'answerInlineQuery'>
  /** Use this method to set the result of an interaction with a [Web App](https://core.telegram.org/bots/webapps) and send a corresponding message on behalf of the user to the chat from which the query originated. On success, a [SentWebAppMessage](https://core.telegram.org/bots/api#sentwebappmessage) object is returned. */
  answerWebAppQuery: Method<'answerWebAppQuery'>
  /** Stores a message that can be sent by a user of a Mini App. Returns a [PreparedInlineMessage](https://core.telegram.org/bots/api#preparedinlinemessage) object. */
  savePreparedInlineMessage: Method<'savePreparedInlineMessage'>
  /** Use this method to send invoices. On success, the sent [Message](https://core.telegram.org/bots/api#message) is returned. */
  sendInvoice: Method<'sendInvoice'>
  /** Use this method to create a link for an invoice. Returns the created invoice link as _String_ on success. */
  createInvoiceLink: Method<'createInvoiceLink'>
  /** If you sent an invoice requesting a shipping address and the parameter _is\_flexible_ was specified, the Bot API will send an [Update](https://core.telegram.org/bots/api#update) with a _shipping\_query_ field to the bot. Use this method to reply to shipping queries. On success, _True_ is returned. */
  answerShippingQuery: Method<'answerShippingQuery'>
  /** Once the user has confirmed their payment and shipping details, the Bot API sends the final confirmation in the form of an [Update](https://core.telegram.org/bots/api#update) with the field _pre\_checkout\_query_. Use this method to respond to such pre-checkout queries. On success, _True_ is returned. **Note:** The Bot API must receive an answer within 10 seconds after the pre-checkout query was sent. */
  answerPreCheckoutQuery: Method<'answerPreCheckoutQuery'>
  /** A method to get the current Telegram Stars balance of the bot. Requires no parameters. On success, returns a [StarAmount](https://core.telegram.org/bots/api#staramount) object. */
  getMyStarBalance: Method<'getMyStarBalance'>
  /** Returns the bot's Telegram Star transactions in chronological order. On success, returns a [StarTransactions](https://core.telegram.org/bots/api#startransactions) object. */
  getStarTransactions: Method<'getStarTransactions'>
  /** Refunds a successful payment in [Telegram Stars](https://t.me/BotNews/90). Returns _True_ on success. */
  refundStarPayment: Method<'refundStarPayment'>
  /** Allows the bot to cancel or re-enable extension of a subscription paid in Telegram Stars. Returns _True_ on success. */
  editUserStarSubscription: Method<'editUserStarSubscription'>
  /**
   * Informs a user that some of the Telegram Passport elements they provided contains errors. The user will not be able to re-submit their Passport to you until the errors are fixed (the contents of the field for which you returned the error must change). Returns _True_ on success.
   *
   * Use this if the data submitted by the user doesn't satisfy the standards your service requires for any reason. For example, if a birthday date seems invalid, a submitted document is blurry, a scan shows evidence of tampering, etc. Supply some details in the error message to make sure the user knows how to correct the issues.
   */
  setPassportDataErrors: Method<'setPassportDataErrors'>
  /** Use this method to send a game. On success, the sent [Message](https://core.telegram.org/bots/api#message) is returned. */
  sendGame: Method<'sendGame'>
  /** Use this method to set the score of the specified user in a game message. On success, if the message is not an inline message, the [Message](https://core.telegram.org/bots/api#message) is returned, otherwise _True_ is returned. Returns an error, if the new score is not greater than the user's current score in the chat and _force_ is _False_. */
  setGameScore: Method<'setGameScore'>
  /**
   * Use this method to get data for high score tables. Will return the score of the specified user and several of their neighbors in a game. Returns an Array of [GameHighScore](https://core.telegram.org/bots/api#gamehighscore) objects.
   *
   * > This method will currently return scores for the target user, plus two of their closest neighbors on each side. Will also return the top three users if the user and their neighbors are not among them. Please note that this behavior is subject to change.
   */
  getGameHighScores: Method<'getGameHighScores'>
}
