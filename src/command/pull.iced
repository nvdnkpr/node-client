{Base} = require './base'
log = require '../log'
{ArgumentParser} = require 'argparse'
{add_option_dict} = require './argparse'
{session} = require '../session'
{make_esc} = require 'iced-error'
{env} = require '../env'
log = require '../log'
{User} = require '../user'
req = require '../req'
{prompt_passphrase} = require '../prompter'
{KeyManager} = require '../keymanager'
{E} = require '../err'

##=======================================================================

exports.Command = class Command extends Base

  #----------

  use_session : () -> true

  #----------

  add_subcommand_parser : (scp) ->
    opts = 
      help : "pull your private key from the server"
    name = "pull"
    sub = scp.addParser name, opts
    add_option_dict sub, @OPTS
    return [ name ]

  #----------

  get_private_key : (cb) ->
    log.debug "+ Fetching me.json from server"
    await req.get { endpoint : "me" }, defer err, body
    if not err? and not (@p3skb = body.me.private_keys?.primary?.bundle)?
      err = new E.NoRemoteKeyError "no private key found on server"
    log.debug "- fetched me"
    cb err

  #----------

  prompt_passphrase : (cb) ->
    args = 
      prompt : "Your keybase passphrase"
    await prompt_passphrase args, defer err, @passphrase
    cb err, @passphrase 

  #----------

  unlock_key : (cb) ->
    prompter = @prompt_passphrase.bind(@)
    await KeyManager.import_from_p3skb { raw : @p3skb, prompter }, defer err, @km
    cb err

  #----------

  save : (cb) ->  
    await @km.save_to_ring { @passphrase }, defer err
    cb err

  #----------
  
  run : (cb) ->
    esc = make_esc cb, "Command::run"
    await session.login esc defer()
    await @get_private_key esc defer()
    await @unlock_key esc defer()
    await @save esc defer()
    cb null

##=======================================================================

