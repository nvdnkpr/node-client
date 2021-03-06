// Generated by IcedCoffeeScript 1.7.1-a
(function() {
  var BufferInStream, BufferOutStream, Command, E, add_option_dict, dv, env, _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  dv = require('./decrypt_and_verify');

  add_option_dict = require('./argparse').add_option_dict;

  env = require('../env').env;

  _ref = require('iced-spawn'), BufferOutStream = _ref.BufferOutStream, BufferInStream = _ref.BufferInStream;

  E = require('../err').E;

  exports.Command = Command = (function(_super) {
    __extends(Command, _super);

    function Command() {
      return Command.__super__.constructor.apply(this, arguments);
    }

    Command.prototype.set_argv = function(a) {
      var n;
      if ((n = a.files.length) > 2) {
        return new E.ArgsError("Expected 1 or 2 files; got " + n);
      } else {
        return Command.__super__.set_argv.call(this, a);
      }
    };

    Command.prototype.add_subcommand_parser = function(scp) {
      var name, opts, sub;
      opts = {
        aliases: ["vrfy"],
        help: "verify a file"
      };
      name = "verify";
      sub = scp.addParser(name, opts);
      add_option_dict(sub, dv.Command.OPTS);
      sub.addArgument(["files"], {
        nargs: '*'
      });
      return opts.aliases.concat([name]);
    };

    Command.prototype.make_gpg_args = function() {
      var args, gargs, o, _ref1;
      args = ["--verify", "--with-colons", "--keyid-format", "long", "--keyserver", env().get_key_server(), "--with-fingerprint"];
      if (env().get_debug()) {
        args.push("--keyserver-options", "debug=1");
      }
      if ((o = this.argv.output) != null) {
        args.push("--output", o);
      }
      gargs = {
        args: args
      };
      gargs.stderr = new BufferOutStream();
      if (this.argv.message) {
        gargs.stdin = new BufferInStream(this.argv.message);
      } else if ((_ref1 = this.argv.files) != null ? _ref1.length : void 0) {
        args.push.apply(args, this.argv.files);
      } else {
        gargs.stdin = process.stdin;
        this.batch = true;
      }
      return gargs;
    };

    return Command;

  })(dv.Command);

}).call(this);
