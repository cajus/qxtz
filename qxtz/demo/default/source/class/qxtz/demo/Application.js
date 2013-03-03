/* ************************************************************************

   Copyright:

   License:

   Authors:

************************************************************************ */

/* ************************************************************************

#asset(qxtz/demo/*)

************************************************************************ */

/**
 * This is the main application class of your custom application "qxtz"
 */
qx.Class.define("qxtz.demo.Application",
{
  extend : qx.application.Standalone,



  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */

  members :
  {
    /**
     * This method contains the initial application code and gets called 
     * during startup of the application
     * 
     * @lint ignoreDeprecated(alert)
     */
    main : function()
    {
      // Call super class
      this.base(arguments);

      // Enable logging in debug variant
      if (qx.core.Environment.get("qx.debug"))
      {
        // support native logging capabilities, e.g. Firebug for Firefox
        qx.log.appender.Native;
        // support additional cross-browser console. Press F7 to toggle visibility
        qx.log.appender.Console;
      }

      /*
      -------------------------------------------------------------------------
        Below is your actual application code...
      -------------------------------------------------------------------------
      */

      // Create a Timezone map
      var tzmap = new qxtz.TimeZoneMap();

      var tz = qxtz.TimeZoneManager.determine();
      tzmap.setTimeZone(tz);

      var model = qxtz.TimeZoneManager.getTimeZones();
      var sb = new qx.ui.form.SelectBox();
      var sc = new qx.data.controller.List(null, sb);
      sc.setLabelPath("name");
      sc.setModel(model);
      //sb.setSelection([tz]);
      sb.addListener("changeSelection", function(ev) {
        tzmap.setTimeZone(ev.getData()[0].getModel());
      });

      // Document is the application root
      var doc = this.getRoot();
			
      // Add stuff
      doc.add(tzmap, {left: 10, top: 10});
      doc.add(sb, {left: 10, top: 450});
    }
  }
});
