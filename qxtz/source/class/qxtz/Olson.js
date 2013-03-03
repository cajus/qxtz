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
qx.Class.define("qxtz.Olson",
{
  extend : qx.core.Object,

  statics :
  {

    /*
     * The keys in this dictionary are comma separated as such:
     *
     * First the offset compared to UTC time in minutes.
     *
     * Then a flag which is 0 if the timezone does not take daylight savings into account and 1 if it
     * does.
     *
     * Thirdly an optional 's' signifies that the timezone is in the southern hemisphere,
     * only interesting for timezones with DST.
     *
     * The mapped arrays is used for constructing the jstz.TimeZone object from within
     * jstz.determine_timezone();
     */
    timezones : {
      '-720,0'   : 'Etc/GMT+12',
      '-660,0'   : 'Pacific/Pago_Pago',
      '-600,1'   : 'America/Adak',
      '-600,0'   : 'Pacific/Honolulu',
      '-570,0'   : 'Pacific/Marquesas',
      '-540,0'   : 'Pacific/Gambier',
      '-540,1'   : 'America/Anchorage',
      '-480,1'   : 'America/Los_Angeles',
      '-480,0'   : 'Pacific/Pitcairn',
      '-420,0'   : 'America/Phoenix',
      '-420,1'   : 'America/Denver',
      '-360,0'   : 'America/Guatemala',
      '-360,1'   : 'America/Chicago',
      '-360,1,s' : 'Pacific/Easter',
      '-300,0'   : 'America/Bogota',
      '-300,1'   : 'America/New_York',
      '-270,0'   : 'America/Caracas',
      '-240,1'   : 'America/Halifax',
      '-240,0'   : 'America/Santo_Domingo',
      '-240,1,s' : 'America/Santiago',
      '-210,1'   : 'America/St_Johns',
      '-180,1'   : 'America/Godthab',
      '-180,0'   : 'America/Argentina/Buenos_Aires',
      '-180,1,s' : 'America/Montevideo',
      '-120,0'   : 'Etc/GMT+2',
      '-120,1'   : 'Etc/GMT+2',
      '-60,1'    : 'Atlantic/Azores',
      '-60,0'    : 'Atlantic/Cape_Verde',
      '0,0'      : 'Etc/UTC',
      '0,1'      : 'Europe/London',
      '60,1'     : 'Europe/Berlin',
      '60,0'     : 'Africa/Lagos',
      '60,1,s'   : 'Africa/Windhoek',
      '120,1'    : 'Asia/Beirut',
      '120,0'    : 'Africa/Johannesburg',
      '180,0'    : 'Asia/Baghdad',
      '180,1'    : 'Europe/Moscow',
      '210,1'    : 'Asia/Tehran',
      '240,0'    : 'Asia/Dubai',
      '240,1'    : 'Asia/Baku',
      '270,0'    : 'Asia/Kabul',
      '300,1'    : 'Asia/Yekaterinburg',
      '300,0'    : 'Asia/Karachi',
      '330,0'    : 'Asia/Kolkata',
      '345,0'    : 'Asia/Kathmandu',
      '360,0'    : 'Asia/Dhaka',
      '360,1'    : 'Asia/Omsk',
      '390,0'    : 'Asia/Rangoon',
      '420,1'    : 'Asia/Krasnoyarsk',
      '420,0'    : 'Asia/Jakarta',
      '480,0'    : 'Asia/Shanghai',
      '480,1'    : 'Asia/Irkutsk',
      '525,0'    : 'Australia/Eucla',
      '525,1,s'  : 'Australia/Eucla',
      '540,1'    : 'Asia/Yakutsk',
      '540,0'    : 'Asia/Tokyo',
      '570,0'    : 'Australia/Darwin',
      '570,1,s'  : 'Australia/Adelaide',
      '600,0'    : 'Australia/Brisbane',
      '600,1'    : 'Asia/Vladivostok',
      '600,1,s'  : 'Australia/Sydney',
      '630,1,s'  : 'Australia/Lord_Howe',
      '660,1'    : 'Asia/Kamchatka',
      '660,0'    : 'Pacific/Noumea',
      '690,0'    : 'Pacific/Norfolk',
      '720,1,s'  : 'Pacific/Auckland',
      '720,0'    : 'Pacific/Tarawa',
      '765,1,s'  : 'Pacific/Chatham',
      '780,0'    : 'Pacific/Tongatapu',
      '780,1,s'  : 'Pacific/Apia',
      '840,0'    : 'Pacific/Kiritimati'
    },

    all : [
      'Etc/GMT+12',
      'Pacific/Pago_Pago',
      'America/Adak',
      'Pacific/Honolulu',
      'Pacific/Marquesas',
      'Pacific/Gambier',
      'America/Anchorage',
      'America/Los_Angeles',
      'Pacific/Pitcairn',
      'America/Phoenix',
      'America/Denver',
      'America/Guatemala',
      'America/Chicago',
      'Pacific/Easter',
      'America/Bogota',
      'America/New_York',
      'America/Caracas',
      'America/Halifax',
      'America/Santo_Domingo',
      'America/Santiago',
      'America/St_Johns',
      'America/Godthab',
      'America/Argentina/Buenos_Aires',
      'America/Montevideo',
      'Etc/GMT+2',
      'Etc/GMT+2',
      'Atlantic/Azores',
      'Atlantic/Cape_Verde',
      'Etc/UTC',
      'Europe/London',
      'Europe/Berlin',
      'Africa/Lagos',
      'Africa/Windhoek',
      'Asia/Beirut',
      'Africa/Johannesburg',
      'Asia/Baghdad',
      'Europe/Moscow',
      'Asia/Tehran',
      'Asia/Dubai',
      'Asia/Baku',
      'Asia/Kabul',
      'Asia/Yekaterinburg',
      'Asia/Karachi',
      'Asia/Kolkata',
      'Asia/Kathmandu',
      'Asia/Dhaka',
      'Asia/Omsk',
      'Asia/Rangoon',
      'Asia/Krasnoyarsk',
      'Asia/Jakarta',
      'Asia/Shanghai',
      'Asia/Irkutsk',
      'Australia/Eucla',
      'Australia/Eucla',
      'Asia/Yakutsk',
      'Asia/Tokyo',
      'Australia/Darwin',
      'Australia/Adelaide',
      'Australia/Brisbane',
      'Asia/Vladivostok',
      'Australia/Sydney',
      'Australia/Lord_Howe',
      'Asia/Kamchatka',
      'Pacific/Noumea',
      'Pacific/Norfolk',
      'Pacific/Auckland',
      'Pacific/Tarawa',
      'Pacific/Chatham',
      'Pacific/Tongatapu',
      'Pacific/Apia',
      'Pacific/Kiritimati',
      'America/Denver',
      'America/Mazatlan',
      'America/Chicago',
      'America/Mexico_City',
      'America/Santiago',
      'America/Asuncion',
      'America/Campo_Grande',
      'America/Montevideo',
      'America/Sao_Paulo',
      'Asia/Beirut',
      'Europe/Helsinki',
      'Europe/Istanbul',
      'Asia/Damascus',
      'Asia/Jerusalem',
      'Asia/Gaza',
      'Pacific/Auckland',
      'Pacific/Fiji',
      'America/Los_Angeles',
      'America/Santa_Isabel',
      'America/Havana',
      'America/New_York',
      'America/Goose_Bay',
      'America/Halifax',
      'America/Miquelon',
      'America/Godthab',
      'Europe/Moscow',
      'Asia/Yekaterinburg',
      'Asia/Omsk',
      'Asia/Krasnoyarsk',
      'Australia/Perth',
      'Asia/Irkutsk',
      'Asia/Yakutsk',
      'Asia/Vladivostok',
      'Asia/Kamchatka',
      'Asia/Gaza',
      'Africa/Cairo',
      'Europe/Minsk'
    ]
  }
});
