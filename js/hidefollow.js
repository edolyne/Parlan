/*! hidefollow - v0.1.0 - 2013-09-11
* https://github.com/arnonate/jQuery-FASS-Widget
* Copyright (c) 2013 Nate Arnold; Licensed MIT */
/* ========================================================================
 * HIDEFOLLOW v1.0.0
 * https://github.com/arnonate/hideshare
 * ========================================================================

  Copyright (c) 2013 Nate Arnold
  Copyright (c) 2013 Edolyne Long (forked to create a follow button)

  Permission is hereby granted, free of charge, to any person
  obtaining a copy of this software and associated documentation
  files (the "Software"), to deal in the Software without
  restriction, including without limitation the rights to use,
  copy, modify, merge, publish, distribute, sublicense, and/or sell
  copies of the Software, and to permit persons to whom the
  Software is furnished to do so, subject to the following
  conditions:

  The above copyright notice and this permission notice shall be
  included in all copies or substantial portions of the Software.

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
  EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
  OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
  NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
  HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
  WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
  FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
  OTHER DEALINGS IN THE SOFTWARE.
 */

;(function(window, $) {

  "use strict";

  // HIDEFOLLOW PUBLIC CLASS DEFINITION
  // =================================

  var Hidefollow = function (elem, options) {
    this.elem = elem;
    this.$elem = $(elem);
    this.options = options;
  };

  Hidefollow.prototype = {
    defaults: {
      LIlink: null,
      TWlink: null,
      FBlink: null,
      media: null,
      facebook: false,
      twitter: false,
      pinterest: false,
      googleplus: false,
      linkedin: false,
      position: "right",
      speed: 200
    },

    init: function() {
      this.config = $.extend({}, this.defaults, this.options);
      this.wrapHidefollow();
      return this;
    },

    wrapHidefollow: function() {
      var output = output,
          width = this.$elem.outerWidth(),
          height = this.$elem.outerHeight(),
          liWidth = 0,
          placement = this.config.position,
          transition = this.config.speed,
          shareTitle = this.config.title,
          followLinkLI = this.config.LIlink,
          followLinkTW = this.config.TWlink,
          followLinkFB = this.config.FBlink,
          shareMedia = this.config.media,
          facebookTemplate = '<li><a class="hidefollow-facebook" href="http://www.facebook.com"><i class="icon-facebook-sign icon-2x"></i><span>Facebook</span></a></li>',
          twitterTemplate = '<li><a class="hidefollow-twitter" href="http://www.twitter.com"><i class="icon-twitter-sign icon-2x"></i><span>Twitter</span></a></li>',
          pinterestTemplate = '<li><a class="hidefollow-pinterest" href="http://www.pinterest.com"><i class="icon-pinterest-sign icon-2x"></i><span>Pinterest</span></a></li>',
          googleplusTemplate = '<li><a class="hidefollow-google-plus" href="http://plus.google.com"><i class="icon-google-plus-sign icon-2x"></i><span>Google Plus</span></a></li>',
          linkedinTemplate = '<li><a class="hidefollow-linkedin" href="http://www.linkedin.com"><i class="icon-linkedin-sign icon-2x"></i><span>Linked In</span></a></li>';

      if (this.config.facebook) {
        output = facebookTemplate;
        liWidth += 40;
      } else {
        output = "";
        liWidth = liWidth;
      }
      if (this.config.twitter) {
        output += twitterTemplate;
        liWidth += 40;
      } else {
        output = output;
        liWidth = liWidth;
      }
      if (this.config.pinterest) {
        output += pinterestTemplate;
        liWidth += 40;
      } else {
        output = output;
        liWidth = liWidth;
      }
      if (this.config.googleplus) {
        output += googleplusTemplate;
        liWidth += 40;
      } else {
        output = output;
        liWidth = liWidth;
      }
      if (this.config.linkedin) {
        output += linkedinTemplate;
        liWidth += 40;
      } else {
        output = output;
        liWidth = liWidth;
      }
      if (liWidth < width) {
        liWidth = width;
      }

      // Construct sharing list
      var hidefollowList = '<ul class="hidefollow-list" style="display: none; width: ' + liWidth + 'px' + '">' + output + '</ul>';

      // Wrap button
      this.$elem.addClass("hidefollow-btn").wrap("<div class='hidefollow-wrap' style='width:" + width + "px; height:" + height + "px;' />");

      // Insert sharing button list
      $(hidefollowList).insertAfter(this.$elem);

      // Get placement of share buttons
      var getPlacement = function(placement, width, height, speed) {

        var styles = {};

        if (placement === "right") {
          styles = {
            "left"    : width + 10 + "px",
            "right"   : -(width + 10) + "px",
            "opacity" : "toggle"
          };
        } else if (placement === "left") {
          styles = {
            "left"    : -(width + 10) + "px",
            "right"   : width + 10 + "px",
            "opacity" : "toggle"
          };
        } else if (placement === "top") {
          styles = {
            "top"     : -(height + 10) + "px",
            "bottom"  : height + 10 + "px",
            "opacity" : "toggle"
          };
        } else /* placement === "bottom" */ {
          styles = {
            "top"     : height + 10 + "px",
            "bottom"  : -(height + 10) + "px",
            "left"    : "0px",
            "opacity" : "toggle"
          };
        }

        $(".hidefollow-list").animate(styles, speed).addClass("shown");
      };

      // Return to original position
      var returnPlacement = function(speed) {
        var styles = {
          "top"     : "0px",
          "left"    : "0px",
          "opacity" : "toggle"
        };

        $(".hidefollow-list").animate(styles, speed).removeClass("shown");
      };

      // Toggle sharing on button click
      this.$elem.click(function() {
        var list = $(".hidefollow-list");
        if (list.hasClass("shown")){
          returnPlacement(transition);
        } else {
          getPlacement(placement, width, height, transition);
        }
        return false;
      });


      // SHARING FUNCTIONS
      var followFacebook = function() {
        window.open('http://www.facebook.com/' + encodeURIComponent(followLinkFB));
      };
      var followTwitter = function() {
        window.open('http://twitter.com/' + encodeURIComponent(followLinkTW));
      };
      var followPinterest = function() {
        window.open('http://pinterest.com/pin/create/button/?url=' + encodeURIComponent(shareLink));
      };
      var followGooglePlus = function() {
        window.open('http://plus.google.com/share?url=' + encodeURIComponent(shareLink));
      };
      var followLinkedIn = function() {
        window.open('http://www.linkedin.com/in/' + encodeURIComponent(followLinkLI));
      };

      $(".hidefollow-facebook").click(function() {
        followFacebook();
        return false;
      });

      $(".hidefollow-twitter").click(function() {
        followTwitter();
        return false;
      });

      $(".hidefollow-pinterest").click(function() {
        followPinterest();
        return false;
      });

      $(".hidefollow-google-plus").click(function() {
        followGooglePlus();
        return false;
      });

      $(".hidefollow-linkedin").click(function() {
        followLinkedIn();
        return false;
      });

    }
  };

  Hidefollow.defaults = Hidefollow.prototype.defaults;

  $.fn.hidefollow = function(options) {
    return this.each(function() {
      new Hidefollow(this, options).init();
    });
  };

  window.Hidefollow = Hidefollow;

})(window, jQuery);