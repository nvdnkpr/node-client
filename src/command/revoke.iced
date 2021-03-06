{Base} = require './base'
log = require '../log'
{ArgumentParser} = require 'argparse'
{add_option_dict} = require './argparse'
{PackageJson} = require '../package'
session = require '../session'
{make_esc} = require 'iced-error'
{prompt_yn} = require '../prompter'
log = require '../log'
req = require '../req'
{E} = require '../err'
{User} = require '../user'
{constants} = require '../constants'
{format_fingerprint} = require('pgp-utils').util
{env} = require '../env'
{bold} = require 'colors'
{master_ring} = require '../keyring'

##=======================================================================

exports.Command = class Command extends Base

  #----------

  OPTS:
    f :
      alias : "force"
      action : "storeTrue"
      help : "don't ask interactively, just do it!"


  #----------

  use_session : () -> true

  #----------

  add_subcommand_parser : (scp) ->
    opts = 
      aliases  : []
      help : "revoke the currently active PGP keys"
    name = "revoke"
    sub = scp.addParser name, opts
    add_option_dict sub, @OPTS
    sub.addArgument [ "search" ], { nargs : '?' }
    return opts.aliases.concat [ name ]

  #----------

  get_the_go_ahead : (cb) ->
    err = null
    unless @argv.force
      opts = 
        prompt : "DANGER ZONE! Really revoke your key and cancel all signatures"
        defval  : false
      await prompt_yn opts, defer err, ans
      err = new E.CancelError "No go-ahead given" unless ans
    cb err

  #----------

  revoke_key : (cb) ->
    args = 
      revoke_primary  : 1
      revocation_type : 0
    await req.post { endpoint : "key/revoke", args }, defer err
    cb err

  #----------

  show_key : (cb) ->
    esc = make_esc cb, "show_key"
    username = env().get_username()
    await User.load { username }, esc defer me
    fp = me.fingerprint(true)
    err = null
    if fp?
      log.warn "Loaded keys for #{username}@#{constants.canonical_host}"
      log.warn "  Key fingerprint: #{format_fingerprint fp}"
      await master_ring().gpg { args : [ "-k", fp ] }, defer err_public
      await master_ring().gpg { args : [ "-K", fp ] }, defer err_secret
      log.warn "  - Public key: #{if err_public? then 'unfound' else bold('found')}"
      log.warn "  - Secret key: #{if err_secret? then 'unfound' else bold('found')}"
    else
      err = new E.NoLocalKeyError "No local key to revoke!"
    cb err

  #----------

  run : (cb) ->
    esc = make_esc cb, "run"
    await session.login esc defer()
    await @show_key esc defer()
    await @get_the_go_ahead esc defer()
    await @revoke_key esc defer()
    log.info "success!"
    cb null

##=======================================================================

