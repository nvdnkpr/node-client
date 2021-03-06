// Generated by IcedCoffeeScript 1.7.1-a
(function() {
  var Base, E, EscOk, FN, Infile, Outfile, PasswordManager, SC, SRV, add_option_dict, base58, constants, crypto, env, fs, iced, join, log, myfs, pick, req, rmkey, triplesec, __iced_k, __iced_k_noop, _ref,
    __slice = [].slice;

  iced = require('iced-coffee-script').iced;
  __iced_k = __iced_k_noop = function() {};

  log = require('../log');

  PasswordManager = require('../pw').PasswordManager;

  base58 = require('../basex').base58;

  crypto = require('crypto');

  myfs = require('../fs');

  fs = require('fs');

  rmkey = require('../util').rmkey;

  add_option_dict = require('./argparse').add_option_dict;

  _ref = require('../file'), Infile = _ref.Infile, Outfile = _ref.Outfile;

  EscOk = require('iced-error').EscOk;

  E = require('../err').E;

  constants = require('../constants').constants;

  join = require('path').join;

  FN = constants.filenames;

  SRV = constants.server;

  SC = constants.security;

  triplesec = require('triplesec');

  req = require('../req');

  env = require('../env').env;

  pick = function() {
    var a, args, _i, _len;
    args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
    for (_i = 0, _len = args.length; _i < _len; _i++) {
      a = args[_i];
      if (a != null) {
        return a;
      }
    }
    return null;
  };

  exports.Base = Base = (function() {
    function Base(parent) {
      this.parent = parent;
      this.batch = false;
    }

    Base.prototype.set_argv = function(a) {
      this.argv = a;
      return null;
    };

    Base.OPTS = {
      p: {
        alias: 'passhrase',
        help: 'passphrase used to log into keybase'
      },
      c: {
        alias: 'config',
        help: "a configuration file (" + (join('~', FN.config_dir, FN.config_file)) + ")"
      },
      i: {
        alias: "interactive",
        action: "storeTrue",
        help: "interactive mode"
      },
      d: {
        alias: "debug",
        action: "storeTrue",
        help: "debug mode"
      },
      C: {
        alias: "no-color",
        action: "storeTrue",
        help: "disable logging colors"
      },
      port: {
        help: 'which port to connect to'
      },
      "no-tls": {
        action: "storeTrue",
        help: "turn off HTTPS/TLS (on by default)"
      },
      "host": {
        help: 'which host to connect to'
      },
      "api-uri-prefix": {
        help: "the API prefix to use (" + SRV.api_uri_prefix + ")"
      },
      B: {
        alias: "batch",
        action: "storeTrue",
        help: "batch mode; disable all prompts"
      },
      "preserve-tmp-keyring": {
        action: "storeTrue",
        help: "preserve the temporary keyring; don't clean it up"
      },
      "homedir": {
        help: "specify a non-standard home directory; look for GPG keychain there"
      }
    };

    Base.prototype.use_config = function() {
      return true;
    };

    Base.prototype.use_session = function() {
      return false;
    };

    Base.prototype.use_db = function() {
      return true;
    };

    Base.prototype.config_opts = function() {
      return {};
    };

    Base.prototype.make_outfile = function(cb) {
      var err, file, ___iced_passed_deferral, __iced_deferrals, __iced_k;
      __iced_k = __iced_k_noop;
      ___iced_passed_deferral = iced.findDeferral(arguments);
      (function(_this) {
        return (function(__iced_k) {
          __iced_deferrals = new iced.Deferrals(__iced_k, {
            parent: ___iced_passed_deferral,
            filename: "/Users/max/src/keybase-node-client/src/command/base.iced",
            funcname: "Base.make_outfile"
          });
          Outfile.open({
            target: _this.output_filename()
          }, __iced_deferrals.defer({
            assign_fn: (function() {
              return function() {
                err = arguments[0];
                return file = arguments[1];
              };
            })(),
            lineno: 93
          }));
          __iced_deferrals._fulfill();
        });
      })(this)((function(_this) {
        return function() {
          return cb(err, file);
        };
      })(this));
    };

    Base.prototype._login = function(cb) {
      var err, ok, ___iced_passed_deferral, __iced_deferrals, __iced_k;
      __iced_k = __iced_k_noop;
      ___iced_passed_deferral = iced.findDeferral(arguments);
      ok = false;
      err = null;
      (function(_this) {
        return (function(__iced_k) {
          __iced_deferrals = new iced.Deferrals(__iced_k, {
            parent: ___iced_passed_deferral,
            filename: "/Users/max/src/keybase-node-client/src/command/base.iced",
            funcname: "Base._login"
          });
          _this._session_check(__iced_deferrals.defer({
            assign_fn: (function() {
              return function() {
                err = arguments[0];
                return ok = arguments[1];
              };
            })(),
            lineno: 101
          }));
          __iced_deferrals._fulfill();
        });
      })(this)((function(_this) {
        return function() {
          (function(__iced_k) {
            var _results, _while;
            _results = [];
            _while = function(__iced_k) {
              var _break, _continue, _next;
              _break = function() {
                return __iced_k(_results);
              };
              _continue = function() {
                return iced.trampoline(function() {
                  return _while(__iced_k);
                });
              };
              _next = function(__iced_next_arg) {
                _results.push(__iced_next_arg);
                return _continue();
              };
              if (!!ok) {
                return _break();
              } else {
                (function(__iced_k) {
                  __iced_deferrals = new iced.Deferrals(__iced_k, {
                    parent: ___iced_passed_deferral,
                    filename: "/Users/max/src/keybase-node-client/src/command/base.iced",
                    funcname: "Base._login"
                  });
                  _this._login_iter(__iced_deferrals.defer({
                    assign_fn: (function() {
                      return function() {
                        err = arguments[0];
                        return ok = arguments[1];
                      };
                    })(),
                    lineno: 103
                  }));
                  __iced_deferrals._fulfill();
                })(_next);
              }
            };
            _while(__iced_k);
          })(function() {
            return cb(err, ok);
          });
        };
      })(this));
    };

    Base.prototype._init_pwmgr = function() {
      var pwopts;
      pwopts = {
        password: this.password(),
        salt: this.salt_or_email(),
        interactive: this.argv.interactive
      };
      return this.pwmgr.init(pwopts);
    };

    Base.prototype.password = function() {
      return pick(this.argv.password, this.config.password());
    };

    return Base;

  })();

}).call(this);
