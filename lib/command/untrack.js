// Generated by IcedCoffeeScript 1.7.1-a
(function() {
  var ArgumentParser, Base, Command, E, PackageJson, TrackWrapper, User, add_option_dict, athrow, db, iced, log, make_esc, prompt_yn, session, __iced_k, __iced_k_noop,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  iced = require('iced-coffee-script').iced;
  __iced_k = __iced_k_noop = function() {};

  Base = require('./base').Base;

  log = require('../log');

  ArgumentParser = require('argparse').ArgumentParser;

  add_option_dict = require('./argparse').add_option_dict;

  PackageJson = require('../package').PackageJson;

  E = require('../err').E;

  make_esc = require('iced-error').make_esc;

  db = require('../db');

  User = require('../user').User;

  session = require('../session').session;

  TrackWrapper = require('../trackwrapper').TrackWrapper;

  athrow = require('pgp-utils').util.athrow;

  prompt_yn = require('../prompter').prompt_yn;

  exports.Command = Command = (function(_super) {
    __extends(Command, _super);

    function Command() {
      return Command.__super__.constructor.apply(this, arguments);
    }

    Command.prototype.OPTS = {
      k: {
        alias: 'remove-key',
        action: 'storeTrue',
        help: 'remove key from GPG keyring'
      },
      b: {
        alias: 'batch',
        action: 'storeTrue',
        help: "run in batch mode / don't prompt"
      },
      K: {
        alias: "keep-key",
        action: 'storeTrue',
        help: "preserve key in GPG keyring"
      }
    };

    Command.prototype.add_subcommand_parser = function(scp) {
      var name, opts, sub;
      opts = {
        aliases: ["unverify"],
        help: "untrack this user"
      };
      name = "untrack";
      sub = scp.addParser(name, opts);
      sub.addArgument(["them"], {
        nargs: 1,
        help: "the username of the user to untrack"
      });
      add_option_dict(sub, this.OPTS);
      return opts.aliases.concat([name]);
    };

    Command.prototype.remove_key = function(them, cb) {
      var args, esc, go, ___iced_passed_deferral, __iced_deferrals, __iced_k;
      __iced_k = __iced_k_noop;
      ___iced_passed_deferral = iced.findDeferral(arguments);
      esc = make_esc(cb, "Untrack::remove_key");
      go = false;
      (function(_this) {
        return (function(__iced_k) {
          if (_this.argv.remove_key) {
            return __iced_k(go = true);
          } else {
            (function(__iced_k) {
              if (_this.argv.keep_key) {
                return __iced_k(go = false);
              } else {
                (function(__iced_k) {
                  if (_this.argv.batch) {
                    log.warn("Not removing key; in batch mode");
                    return __iced_k(go = false);
                  } else {
                    args = {
                      prompt: "Remove " + _this.argv.them[0] + "'s public key from your local keyring? ",
                      defval: true
                    };
                    (function(__iced_k) {
                      __iced_deferrals = new iced.Deferrals(__iced_k, {
                        parent: ___iced_passed_deferral,
                        filename: "/Users/max/src/keybase-node-client/src/command/untrack.iced",
                        funcname: "Command.remove_key"
                      });
                      prompt_yn(args, esc(__iced_deferrals.defer({
                        assign_fn: (function() {
                          return function() {
                            return go = arguments[0];
                          };
                        })(),
                        lineno: 60
                      })));
                      __iced_deferrals._fulfill();
                    })(__iced_k);
                  }
                })(__iced_k);
              }
            })(__iced_k);
          }
        });
      })(this)((function(_this) {
        return function() {
          (function(__iced_k) {
            if (go) {
              (function(__iced_k) {
                __iced_deferrals = new iced.Deferrals(__iced_k, {
                  parent: ___iced_passed_deferral,
                  filename: "/Users/max/src/keybase-node-client/src/command/untrack.iced",
                  funcname: "Command.remove_key"
                });
                them.remove_key(esc(__iced_deferrals.defer({
                  lineno: 62
                })));
                __iced_deferrals._fulfill();
              })(__iced_k);
            } else {
              return __iced_k();
            }
          })(function() {
            return cb(null);
          });
        };
      })(this));
    };

    Command.prototype.run = function(cb) {
      var err, esc, g, local, me, remote, them, trackw, untrack_obj, ___iced_passed_deferral, __iced_deferrals, __iced_k;
      __iced_k = __iced_k_noop;
      ___iced_passed_deferral = iced.findDeferral(arguments);
      esc = make_esc(cb, "Untrack::run");
      log.debug("+ run");
      (function(_this) {
        return (function(__iced_k) {
          __iced_deferrals = new iced.Deferrals(__iced_k, {
            parent: ___iced_passed_deferral,
            filename: "/Users/max/src/keybase-node-client/src/command/untrack.iced",
            funcname: "Command.run"
          });
          User.load_me(esc(__iced_deferrals.defer({
            assign_fn: (function() {
              return function() {
                return me = arguments[0];
              };
            })(),
            lineno: 70
          })));
          __iced_deferrals._fulfill();
        });
      })(this)((function(_this) {
        return function() {
          (function(__iced_k) {
            __iced_deferrals = new iced.Deferrals(__iced_k, {
              parent: ___iced_passed_deferral,
              filename: "/Users/max/src/keybase-node-client/src/command/untrack.iced",
              funcname: "Command.run"
            });
            User.load({
              username: _this.argv.them[0]
            }, esc(__iced_deferrals.defer({
              assign_fn: (function() {
                return function() {
                  return them = arguments[0];
                };
              })(),
              lineno: 71
            })));
            __iced_deferrals._fulfill();
          })(function() {
            (function(__iced_k) {
              __iced_deferrals = new iced.Deferrals(__iced_k, {
                parent: ___iced_passed_deferral,
                filename: "/Users/max/src/keybase-node-client/src/command/untrack.iced",
                funcname: "Command.run"
              });
              TrackWrapper.load({
                tracker: me,
                trackee: them
              }, esc(__iced_deferrals.defer({
                assign_fn: (function() {
                  return function() {
                    return trackw = arguments[0];
                  };
                })(),
                lineno: 72
              })));
              __iced_deferrals._fulfill();
            })(function() {
              var _ref;
              _ref = trackw.is_tracking(), remote = _ref.remote, local = _ref.local;
              (function(__iced_k) {
                if (!remote && !local) {
                  err = new E.UntrackError("You're not tracking '" + (them.username()) + "'");
                  (function(__iced_k) {
                    __iced_deferrals = new iced.Deferrals(__iced_k, {
                      parent: ___iced_passed_deferral,
                      filename: "/Users/max/src/keybase-node-client/src/command/untrack.iced",
                      funcname: "Command.run"
                    });
                    athrow(err, esc(__iced_deferrals.defer({
                      lineno: 77
                    })));
                    __iced_deferrals._fulfill();
                  })(__iced_k);
                } else {
                  (function(__iced_k) {
                    if (remote) {
                      untrack_obj = them.gen_untrack_obj();
                      (function(__iced_k) {
                        __iced_deferrals = new iced.Deferrals(__iced_k, {
                          parent: ___iced_passed_deferral,
                          filename: "/Users/max/src/keybase-node-client/src/command/untrack.iced",
                          funcname: "Command.run"
                        });
                        me.gen_track_proof_gen({
                          uid: them.id,
                          untrack_obj: untrack_obj
                        }, esc(__iced_deferrals.defer({
                          assign_fn: (function() {
                            return function() {
                              return g = arguments[0];
                            };
                          })(),
                          lineno: 80
                        })));
                        __iced_deferrals._fulfill();
                      })(function() {
                        (function(__iced_k) {
                          __iced_deferrals = new iced.Deferrals(__iced_k, {
                            parent: ___iced_passed_deferral,
                            filename: "/Users/max/src/keybase-node-client/src/command/untrack.iced",
                            funcname: "Command.run"
                          });
                          session.load_and_login(esc(__iced_deferrals.defer({
                            lineno: 81
                          })));
                          __iced_deferrals._fulfill();
                        })(function() {
                          (function(__iced_k) {
                            __iced_deferrals = new iced.Deferrals(__iced_k, {
                              parent: ___iced_passed_deferral,
                              filename: "/Users/max/src/keybase-node-client/src/command/untrack.iced",
                              funcname: "Command.run"
                            });
                            g.run(esc(__iced_deferrals.defer({
                              lineno: 82
                            })));
                            __iced_deferrals._fulfill();
                          })(__iced_k);
                        });
                      });
                    } else {
                      return __iced_k(log.warn("You're not remotely tracking '" + (them.username()) + "'; purging local state"));
                    }
                  })(__iced_k);
                }
              })(function() {
                (function(__iced_k) {
                  __iced_deferrals = new iced.Deferrals(__iced_k, {
                    parent: ___iced_passed_deferral,
                    filename: "/Users/max/src/keybase-node-client/src/command/untrack.iced",
                    funcname: "Command.run"
                  });
                  _this.remove_key(them, esc(__iced_deferrals.defer({
                    lineno: 86
                  })));
                  __iced_deferrals._fulfill();
                })(function() {
                  (function(__iced_k) {
                    __iced_deferrals = new iced.Deferrals(__iced_k, {
                      parent: ___iced_passed_deferral,
                      filename: "/Users/max/src/keybase-node-client/src/command/untrack.iced",
                      funcname: "Command.run"
                    });
                    TrackWrapper.remove_local_track({
                      uid: them.id
                    }, esc(__iced_deferrals.defer({
                      lineno: 87
                    })));
                    __iced_deferrals._fulfill();
                  })(function() {
                    log.debug("- run");
                    return cb(err);
                  });
                });
              });
            });
          });
        };
      })(this));
    };

    return Command;

  })(Base);

}).call(this);
