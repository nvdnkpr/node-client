// Generated by IcedCoffeeScript 1.7.1-a
(function() {
  var ArgumentParser, Base, Command, E, PackageJson, User, add_option_dict, bold, constants, env, format_fingerprint, iced, log, make_esc, master_ring, prompt_yn, req, session, __iced_k, __iced_k_noop,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  iced = require('iced-coffee-script').iced;
  __iced_k = __iced_k_noop = function() {};

  Base = require('./base').Base;

  log = require('../log');

  ArgumentParser = require('argparse').ArgumentParser;

  add_option_dict = require('./argparse').add_option_dict;

  PackageJson = require('../package').PackageJson;

  session = require('../session');

  make_esc = require('iced-error').make_esc;

  prompt_yn = require('../prompter').prompt_yn;

  log = require('../log');

  req = require('../req');

  E = require('../err').E;

  User = require('../user').User;

  constants = require('../constants').constants;

  format_fingerprint = require('pgp-utils').util.format_fingerprint;

  env = require('../env').env;

  bold = require('colors').bold;

  master_ring = require('../keyring').master_ring;

  exports.Command = Command = (function(_super) {
    __extends(Command, _super);

    function Command() {
      return Command.__super__.constructor.apply(this, arguments);
    }

    Command.prototype.OPTS = {
      f: {
        alias: "force",
        action: "storeTrue",
        help: "don't ask interactively, just do it!"
      }
    };

    Command.prototype.use_session = function() {
      return true;
    };

    Command.prototype.add_subcommand_parser = function(scp) {
      var name, opts, sub;
      opts = {
        aliases: [],
        help: "revoke the currently active PGP keys"
      };
      name = "revoke";
      sub = scp.addParser(name, opts);
      add_option_dict(sub, this.OPTS);
      sub.addArgument(["search"], {
        nargs: '?'
      });
      return opts.aliases.concat([name]);
    };

    Command.prototype.get_the_go_ahead = function(cb) {
      var ans, err, opts, ___iced_passed_deferral, __iced_deferrals, __iced_k;
      __iced_k = __iced_k_noop;
      ___iced_passed_deferral = iced.findDeferral(arguments);
      err = null;
      (function(_this) {
        return (function(__iced_k) {
          if (!_this.argv.force) {
            opts = {
              prompt: "DANGER ZONE! Really revoke your key and cancel all signatures",
              defval: false
            };
            (function(__iced_k) {
              __iced_deferrals = new iced.Deferrals(__iced_k, {
                parent: ___iced_passed_deferral,
                filename: "/Users/max/src/keybase-node-client/src/command/revoke.iced",
                funcname: "Command.get_the_go_ahead"
              });
              prompt_yn(opts, __iced_deferrals.defer({
                assign_fn: (function() {
                  return function() {
                    err = arguments[0];
                    return ans = arguments[1];
                  };
                })(),
                lineno: 55
              }));
              __iced_deferrals._fulfill();
            })(function() {
              return __iced_k(!ans ? err = new E.CancelError("No go-ahead given") : void 0);
            });
          } else {
            return __iced_k();
          }
        });
      })(this)((function(_this) {
        return function() {
          return cb(err);
        };
      })(this));
    };

    Command.prototype.revoke_key = function(cb) {
      var args, err, ___iced_passed_deferral, __iced_deferrals, __iced_k;
      __iced_k = __iced_k_noop;
      ___iced_passed_deferral = iced.findDeferral(arguments);
      args = {
        revoke_primary: 1,
        revocation_type: 0
      };
      (function(_this) {
        return (function(__iced_k) {
          __iced_deferrals = new iced.Deferrals(__iced_k, {
            parent: ___iced_passed_deferral,
            filename: "/Users/max/src/keybase-node-client/src/command/revoke.iced",
            funcname: "Command.revoke_key"
          });
          req.post({
            endpoint: "key/revoke",
            args: args
          }, __iced_deferrals.defer({
            assign_fn: (function() {
              return function() {
                return err = arguments[0];
              };
            })(),
            lineno: 65
          }));
          __iced_deferrals._fulfill();
        });
      })(this)((function(_this) {
        return function() {
          return cb(err);
        };
      })(this));
    };

    Command.prototype.show_key = function(cb) {
      var err, err_public, err_secret, esc, fp, me, username, ___iced_passed_deferral, __iced_deferrals, __iced_k;
      __iced_k = __iced_k_noop;
      ___iced_passed_deferral = iced.findDeferral(arguments);
      esc = make_esc(cb, "show_key");
      username = env().get_username();
      (function(_this) {
        return (function(__iced_k) {
          __iced_deferrals = new iced.Deferrals(__iced_k, {
            parent: ___iced_passed_deferral,
            filename: "/Users/max/src/keybase-node-client/src/command/revoke.iced",
            funcname: "Command.show_key"
          });
          User.load({
            username: username
          }, esc(__iced_deferrals.defer({
            assign_fn: (function() {
              return function() {
                return me = arguments[0];
              };
            })(),
            lineno: 73
          })));
          __iced_deferrals._fulfill();
        });
      })(this)((function(_this) {
        return function() {
          fp = me.fingerprint(true);
          err = null;
          (function(__iced_k) {
            if (fp != null) {
              log.warn("Loaded keys for " + username + "@" + constants.canonical_host);
              log.warn("  Key fingerprint: " + (format_fingerprint(fp)));
              (function(__iced_k) {
                __iced_deferrals = new iced.Deferrals(__iced_k, {
                  parent: ___iced_passed_deferral,
                  filename: "/Users/max/src/keybase-node-client/src/command/revoke.iced",
                  funcname: "Command.show_key"
                });
                master_ring().gpg({
                  args: ["-k", fp]
                }, __iced_deferrals.defer({
                  assign_fn: (function() {
                    return function() {
                      return err_public = arguments[0];
                    };
                  })(),
                  lineno: 79
                }));
                __iced_deferrals._fulfill();
              })(function() {
                (function(__iced_k) {
                  __iced_deferrals = new iced.Deferrals(__iced_k, {
                    parent: ___iced_passed_deferral,
                    filename: "/Users/max/src/keybase-node-client/src/command/revoke.iced",
                    funcname: "Command.show_key"
                  });
                  master_ring().gpg({
                    args: ["-K", fp]
                  }, __iced_deferrals.defer({
                    assign_fn: (function() {
                      return function() {
                        return err_secret = arguments[0];
                      };
                    })(),
                    lineno: 80
                  }));
                  __iced_deferrals._fulfill();
                })(function() {
                  log.warn("  - Public key: " + (typeof err_public !== "undefined" && err_public !== null ? 'unfound' : bold('found')));
                  return __iced_k(log.warn("  - Secret key: " + (typeof err_secret !== "undefined" && err_secret !== null ? 'unfound' : bold('found'))));
                });
              });
            } else {
              return __iced_k(err = new E.NoLocalKeyError("No local key to revoke!"));
            }
          })(function() {
            return cb(err);
          });
        };
      })(this));
    };

    Command.prototype.run = function(cb) {
      var esc, ___iced_passed_deferral, __iced_deferrals, __iced_k;
      __iced_k = __iced_k_noop;
      ___iced_passed_deferral = iced.findDeferral(arguments);
      esc = make_esc(cb, "run");
      (function(_this) {
        return (function(__iced_k) {
          __iced_deferrals = new iced.Deferrals(__iced_k, {
            parent: ___iced_passed_deferral,
            filename: "/Users/max/src/keybase-node-client/src/command/revoke.iced",
            funcname: "Command.run"
          });
          session.login(esc(__iced_deferrals.defer({
            lineno: 91
          })));
          __iced_deferrals._fulfill();
        });
      })(this)((function(_this) {
        return function() {
          (function(__iced_k) {
            __iced_deferrals = new iced.Deferrals(__iced_k, {
              parent: ___iced_passed_deferral,
              filename: "/Users/max/src/keybase-node-client/src/command/revoke.iced",
              funcname: "Command.run"
            });
            _this.show_key(esc(__iced_deferrals.defer({
              lineno: 92
            })));
            __iced_deferrals._fulfill();
          })(function() {
            (function(__iced_k) {
              __iced_deferrals = new iced.Deferrals(__iced_k, {
                parent: ___iced_passed_deferral,
                filename: "/Users/max/src/keybase-node-client/src/command/revoke.iced",
                funcname: "Command.run"
              });
              _this.get_the_go_ahead(esc(__iced_deferrals.defer({
                lineno: 93
              })));
              __iced_deferrals._fulfill();
            })(function() {
              (function(__iced_k) {
                __iced_deferrals = new iced.Deferrals(__iced_k, {
                  parent: ___iced_passed_deferral,
                  filename: "/Users/max/src/keybase-node-client/src/command/revoke.iced",
                  funcname: "Command.run"
                });
                _this.revoke_key(esc(__iced_deferrals.defer({
                  lineno: 94
                })));
                __iced_deferrals._fulfill();
              })(function() {
                log.info("success!");
                return cb(null);
              });
            });
          });
        };
      })(this));
    };

    return Command;

  })(Base);

}).call(this);
