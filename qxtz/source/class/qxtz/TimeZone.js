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
qx.Class.define("qxtz.TimeZone",
{
  extend : qx.core.Object,


  /*
  *****************************************************************************
     CONSTRUCTOR
  *****************************************************************************
  */

  /**
   * Create a new custom button
   */
  construct : function(name, detection) 
  {
    this.base(arguments);
    this.__detection = detection !== undefined;
    this.setName(name);
  },

  properties :
  {
    name :
    {
        check : "String",
        apply : "_applyName",
        transform : "_transformName",
        event : "changeName"
    }
  },

  members :
  {
    __offset : null,
    __southern : null,
    __detection : null,
    __dtc : null,

    /**
     * The keys in this object are timezones that we know may be ambiguous after
     * a preliminary scan through the olson_tz object.
     *
     * The array of timezones to compare must be in the order that daylight savings
     * starts for the regions.
     * 
     * @TODO: Once 2013 is upon us, remove Asia/Gaza from the Beirut ambiguity list,
     * by then it should suffice that it lives in the Africa/Johannesburg check.
     */
    AMBIGUITIES : {
        'America/Denver':       ['America/Denver', 'America/Mazatlan'],
        'America/Chicago':      ['America/Chicago', 'America/Mexico_City'],
        'America/Santiago':     ['America/Santiago', 'America/Asuncion', 'America/Campo_Grande'],
        'America/Montevideo':   ['America/Montevideo', 'America/Sao_Paulo'],
        'Asia/Beirut':          ['Asia/Beirut', 'Europe/Helsinki', 'Europe/Istanbul', 'Asia/Damascus', 'Asia/Jerusalem', 'Asia/Gaza'],
        'Pacific/Auckland':     ['Pacific/Auckland', 'Pacific/Fiji'],
        'America/Los_Angeles':  ['America/Los_Angeles', 'America/Santa_Isabel'],
        'America/New_York':     ['America/Havana', 'America/New_York'],
        'America/Halifax':      ['America/Goose_Bay', 'America/Halifax'],
        'America/Godthab':      ['America/Miquelon', 'America/Godthab'],
        'Asia/Dubai':           ['Europe/Moscow'],
        'Asia/Dhaka':           ['Asia/Yekaterinburg'],
        'Asia/Jakarta':         ['Asia/Omsk'],
        'Asia/Shanghai':        ['Asia/Krasnoyarsk', 'Australia/Perth'],
        'Asia/Tokyo':           ['Asia/Irkutsk'],
        'Australia/Brisbane':   ['Asia/Yakutsk'],
        'Pacific/Noumea':       ['Asia/Vladivostok'],
        'Pacific/Tarawa':       ['Asia/Kamchatka'],
        'Africa/Johannesburg':  ['Asia/Gaza', 'Africa/Cairo'],
        'Asia/Baghdad':         ['Europe/Minsk']},

    _transformName : function(value)
    {
      if (!this.__detection) {
        return value;
      }

      if (this._isAmbiguous(value)) {
        return this._ambiguityCheck(value);
      }

      return value;
    },

    _applyName : function(value)
    {
      var i = this.__zoneName2Info(value);

      var parts = i.split(",");
      this.__offset = parseInt(parts[0]) / 60;
      this.__dtc = parts[1] == "1";
      this.__southern = parts[2] !== undefined;
    },

    __zoneName2Info : function(value)
    {
      // Get offset, dtc and hemisphere
      for (var i in qxtz.Olson.timezones) {
        if (qxtz.Olson.timezones[i] == value) {
          return i;
        }
      }

      // We got here because we're in the ambiguous list:
      // get the key for our timezone and try again
      var found = false;
      for (var tz in this.AMBIGUITIES){
        for (var n in this.AMBIGUITIES[tz]){
          if (this.AMBIGUITIES[tz][n] == value){
              found = true;
              break;
          }
        }

        if (found) {
          break;
        }
      }

      // Get offset, dtc and hemisphere
      for (i in qxtz.Olson.timezones) {
        if (qxtz.Olson.timezones[i] == tz) {
          return i;
        }
      }

      return undefined;
    },

    /**
     * Checks if a timezone has possible ambiguities. I.e timezones that are similar.
     *
     * For example, if the preliminary scan determines that we're in America/Denver.
     * We double check here that we're really there and not in America/Mazatlan.
     *
     * This is done by checking known dates for when daylight savings start for different
     * timezones during 2010 and 2011.
     */
    _ambiguityCheck : function (value) {
      var ambiguity_list = this.AMBIGUITIES[value],
         length = ambiguity_list.length,
          i = 0,
          tz = ambiguity_list[0];

      for (; i < length; i += 1) {
        tz = ambiguity_list[i];

        if (qxtz.TimeZoneManager.dateIsDst(qxtz.TimeZoneManager.dstStartFor(tz))) {
          return tz;
        }
      }

      return undefined;
    },

    /**
     * Checks if it is possible that the timezone is ambiguous.
     */
    _isAmbiguous : function (value) {
      return typeof (this.AMBIGUITIES[value]) !== 'undefined';
    },

    /**
     * Return the offset of the current time zone in hours
     */
    getOffset : function()
    {
      return this.__offset;
    },

    /**
     * Return a flag wether the zone respects daylight saving or not
     */
    hasDayLightSaving : function()
    {
      return this.__dtc;
    },

    isSouthernHemisphere : function()
    {
      return this.__southern;
    }
  }
});
