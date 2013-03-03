/* ************************************************************************

   Copyright:
     2009 ACME Corporation -or- Your Name, http://www.example.com
     
   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Your Name (username)

************************************************************************ */

/* ************************************************************************

#asset(qxtz/*)

************************************************************************ */

/**
 * This is the main class of contribution "qxtz"
 * 
 * TODO: Replace the sample code of a custom button with the actual code of 
 * your contribution.
 */
qx.Class.define("qxtz.TimeZoneManager",
{
  extend : qx.core.Object,

  statics :
  {
    HEMISPHERE_SOUTH : 's',

    /**
     * Gets the offset in minutes from UTC for a certain date.
     * @param {Date} date
     * @returns {Number}
     */
    _getDateOffset : function (date) {
      var offset = -date.getTimezoneOffset();
      return (offset !== null ? offset : 0);
    },

    _getDate : function (year, month, date) {
      var d = new Date();
      if (year !== undefined) {
        d.setFullYear(year);
      }
      d.setDate(date);
      d.setMonth(month);
      return d;
    },

    _getJanuaryOffset : function (year) {
      return qxtz.TimeZoneManager._getDateOffset(qxtz.TimeZoneManager._getDate(year, 0 ,2));
    },

    _getJuneOffset : function (year) {
      return qxtz.TimeZoneManager._getDateOffset(qxtz.TimeZoneManager._getDate(year, 5, 2));
    },

    /**
     * Private method.
     * Checks whether a given date is in daylight savings time.
     * If the date supplied is after august, we assume that we're checking
     * for southern hemisphere DST.
     * @param {Date} date
     * @returns {Boolean}
     */
    dateIsDst : function (date) {
      var base_offset = ((date.getMonth() > 7 ? qxtz.TimeZoneManager._getJuneOffset(date.getFullYear())
           : qxtz.TimeZoneManager._getJanuaryOffset(date.getFullYear()))),
           date_offset = qxtz.TimeZoneManager._getDateOffset(date);

      return (base_offset - date_offset) !== 0;
    },

    /**
     * This function does some basic calculations to create information about
     * the user's timezone.
     *
     * Returns a key that can be used to do lookups in jstz.olson.timezones.
     *
     * @returns {String}
     */
    _lookupKey : function () {
        var january_offset = qxtz.TimeZoneManager._getJanuaryOffset(),
            june_offset = qxtz.TimeZoneManager._getJuneOffset(),
            diff = qxtz.TimeZoneManager._getJanuaryOffset() - qxtz.TimeZoneManager._getJuneOffset();

        if (diff < 0) {
            return january_offset + ",1";
        } else if (diff > 0) {
            return june_offset + ",1," + qxtz.TimeZoneManager.HEMISPHERE_SOUTH;
        }

        return january_offset + ",0";
    },

    /**
     * Uses get_timezone_info() to formulate a key to use in the olson.timezones dictionary.
     *
     * Returns a primitive object on the format:
     * {'timezone': TimeZone, 'key' : 'the key used to find the TimeZone object'}
     *
     * @returns Object
     */
    determine : function () {
        var key = qxtz.TimeZoneManager._lookupKey();
        return new qxtz.TimeZone(qxtz.Olson.timezones[key], true);
    },

    /**
     * This object contains information on when daylight savings starts for
     * different timezones.
     *
     * The list is short for a reason. Often we do not have to be very specific
     * to single out the correct timezone. But when we do, this list comes in
     * handy.
     *
     * Each value is a date denoting when daylight savings starts for that timezone.
     */
    dstStartFor : function (tz_name) {

      var ru_pre_dst_change = new Date(2010, 6, 15, 1, 0, 0, 0), // In 2010 Russia had DST, this allows us to detect Russia :)
          dst_starts = {
              'America/Denver':       new Date(2011, 2, 13, 3, 0, 0, 0),
              'America/Mazatlan':     new Date(2011, 3, 3, 3, 0, 0, 0),
              'America/Chicago':      new Date(2011, 2, 13, 3, 0, 0, 0),
              'America/Mexico_City':  new Date(2011, 3, 3, 3, 0, 0, 0),
              'America/Asuncion':     new Date(2012, 9, 7, 3, 0, 0, 0),
              'America/Santiago':     new Date(2012, 9, 3, 3, 0, 0, 0),
              'America/Campo_Grande': new Date(2012, 9, 21, 5, 0, 0, 0),
              'America/Montevideo':   new Date(2011, 9, 2, 3, 0, 0, 0),
              'America/Sao_Paulo':    new Date(2011, 9, 16, 5, 0, 0, 0),
              'America/Los_Angeles':  new Date(2011, 2, 13, 8, 0, 0, 0),
              'America/Santa_Isabel': new Date(2011, 3, 5, 8, 0, 0, 0),
              'America/Havana':       new Date(2012, 2, 10, 2, 0, 0, 0),
              'America/New_York':     new Date(2012, 2, 10, 7, 0, 0, 0),
              'Asia/Beirut':          new Date(2011, 2, 27, 1, 0, 0, 0),
              'Europe/Helsinki':      new Date(2011, 2, 27, 4, 0, 0, 0),
              'Europe/Istanbul':      new Date(2011, 2, 28, 5, 0, 0, 0),
              'Asia/Damascus':        new Date(2011, 3, 1, 2, 0, 0, 0),
              'Asia/Jerusalem':       new Date(2011, 3, 1, 6, 0, 0, 0),
              'Asia/Gaza':            new Date(2009, 2, 28, 0, 30, 0, 0),
              'Africa/Cairo':         new Date(2009, 3, 25, 0, 30, 0, 0),
              'Pacific/Auckland':     new Date(2011, 8, 26, 7, 0, 0, 0),
              'Pacific/Fiji':         new Date(2010, 11, 29, 23, 0, 0, 0),
              'America/Halifax':      new Date(2011, 2, 13, 6, 0, 0, 0),
              'America/Goose_Bay':    new Date(2011, 2, 13, 2, 1, 0, 0),
              'America/Miquelon':     new Date(2011, 2, 13, 5, 0, 0, 0),
              'America/Godthab':      new Date(2011, 2, 27, 1, 0, 0, 0),
              'Europe/Moscow':        ru_pre_dst_change,
              'Asia/Yekaterinburg':   ru_pre_dst_change,
              'Asia/Omsk':            ru_pre_dst_change,
              'Asia/Krasnoyarsk':     ru_pre_dst_change,
              'Asia/Irkutsk':         ru_pre_dst_change,
              'Asia/Yakutsk':         ru_pre_dst_change,
              'Asia/Vladivostok':     ru_pre_dst_change,
              'Asia/Kamchatka':       ru_pre_dst_change,
              'Europe/Minsk':         ru_pre_dst_change,
              'Australia/Perth':      new Date(2008, 10, 1, 1, 0, 0, 0)
          };

        return dst_starts[tz_name];
    },

    /**
     * Gets the TimeZone object for a named timezone
     * @param {String} Time zone string like Europe/Berlin
     * @returns {TimeZone}
     */
    getTimeZone : function(name)
    {
      for (var i in qxtz.Olson.timezones) {
        if (name == qxtz.Olson.timezones[i]) {
          return new qxtz.TimeZone(qxtz.Olson.timezones[i]);
        }
      }

      return undefined;
    },

    /**
     * Gets all timezones as a qx.data.Array.
     * @returns {[TimeZone]}
     */
    getTimeZones : function()
    {
      var res = new qx.data.Array();

      for (var i in qxtz.Olson.all) {
        res.append([new qxtz.TimeZone(qxtz.Olson.all[i])]);
      }

      res.sort(function(a, b) {
        if(a.getName() == b.getName()){
          return 0;
        }
        return (a.getName() < b.getName()) ? -1 : 1;
      });

      return res;
    }
  }
});
