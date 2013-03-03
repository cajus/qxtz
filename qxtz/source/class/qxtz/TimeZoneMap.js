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
qx.Class.define("qxtz.TimeZoneMap",
{
  extend : qx.ui.container.Composite,


  /*
  *****************************************************************************
     CONSTRUCTOR
  *****************************************************************************
  */

  /**
   * Create a new custom button
   */
  construct : function() 
  {
    this.base(arguments, new qx.ui.layout.Canvas());

    // Load background image
    var bg = new qx.ui.basic.Image("qxtz/timezone/bg.png");
    this.add(bg);

    // Set tile conversation map
    this.__zonemap = [
      -11.0, -10.0, -9.0, -9.5, -8.0, -7.0, -6.0, -5.0, -5.5,
      -4.0, -4.5, -3.0, -3.5, -2.0, -1.0, 0.0, 1.0, 2.0, 3.0,
      3.5, 4.0, 4.5, 5.0, 5.5, 5.75, 6.0, 6.5, 7.0, 8.0, 9.0,
      9.5, 10.0, 10.5, 11.0, 11.5, 12.0, 12.75, 13.0
    ];
  },

  properties :
  {
      selection :
      {
          nullable : true,
          check : "Number",
          transform : "_transformSelection",
          apply : "_applySelection"
      },

      timeZone :
      {
          nullable : true,
          check : "qxtz.TimeZone",
          apply : "_applyTimeZone"
      }
  },

  members :
  {
      __zone_map : null,
      __selection: null,

      _applyTimeZone : function(tz)
      {
        this.setSelection(tz.getOffset());
      },

      _transformSelection : function(value)
      {
        // Wrap around for map pieces
        if (value > 13.0) {
          value -= 24.0;
        }
        if (value < -11.0) {
          value += 24.0;
        }

        // Find closest zone pixmap available
        if (!this.__hasOffset(value)) {
            var offsets = [0.25, -0.25, 0.5, -0.5];
            for (var i in offsets){
              if (this.__hasOffset(value + offsets[i])){
                return value + offsets[i];
              }
            }
        }
        return value;
      },

      _applySelection : function(value)
      {
          if (this.__selection) {
            this.remove(this.__selection);
          }

          var fmt = new qx.util.format.NumberFormat();
          fmt.setGroupingUsed(false);
          fmt.setMaximumFractionDigits(2);
          fmt.setMinimumFractionDigits(1);

          var selection = new qx.ui.basic.Image("qxtz/timezone/timezone_" + fmt.format(value) + ".png");
          this.add(selection);
          this.__selection = selection;
      },

      __hasOffset : function(value)
      {
        for (var i in this.__zone_map) {
          if (this.__zone_map[i] == value) {
            return true;
          }
        }
        return false;
      }
  }
});
