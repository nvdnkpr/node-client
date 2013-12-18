{Base} = require './base'
log = require '../log'
{ArgumentParser} = require 'argparse'
{add_option_dict} = require './argparse'
{PackageJson} = require '../package'
{gpg} = require '../gpg'
{BufferOutStream} = require '../stream'
{E} = require '../err'
{make_esc} = require 'iced-error'
req = require '../req'

##=======================================================================

exports.Command = class Command extends Base

  #----------

  add_subcommand_parser : (scp) ->
    opts = 
      aliases : [ "vrfy" ]
      help : "add a proof of identity"
    name = "verify"
    sub = scp.addParser name, opts
    sub.addArgument [ "username" ], { nargs : 1 }
    return opts.aliases.concat [ name ]

  #----------

  fetch_user : (cb) ->
    args = 
      endpoint : "user/lookup"
      args : 
        username : @argv.username

    await req.get args, defer err, body
    console.log body
    cb err

  #----------

  run : (cb) ->
    esc = make_esc cb,   "Verify::run"
    await @fetch_user    esc defer()
    #await @fetch_track   esc defer()
    #await @fetch_proofs  esc defer()
    #await @verify_proofs esc defer()
    #await @prompt_ok     esc defer()
    #await @post_track    esc defer()
    #await @write_out     esc defer()
    cb null

##=======================================================================
