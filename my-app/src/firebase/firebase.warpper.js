import firebase from "firebase";
import firebaseConfig from "./firebase.key";

firebase.initializeApp(firebaseConfig);

class api {
  constructor() {
    this.auth = firebase.auth();
    this.provider = {
      google: new firebase.auth.GoogleAuthProvider()
    };
    firebase.auth().languageCode = "kr_KR";

    this.db = firebase.firestore();
  }

  async sendLog(info) {
    try {
      if (window) {
        let navigator = window.navigator;

        const log = {
          ip: window.localStorage.getItem("ip"),
          browser: window.localStorage.getItem("browser"),
          time: new Date(),
          language: navigator.language,
          info: info
        };

        return await this.db
          .collection("log")
          .doc(log.ip)
          .collection("time")
          .doc(log.time.toISOString())
          .set({
            log
          });
      }
    } catch (e) {
      throw e;
    }
  }

  getLocalIP() {
    return new Promise(function(resolve, reject) {
      // NOTE: window.RTCPeerConnection is "not a constructor" in FF22/23
      var RTCPeerConnection =
        /*window.RTCPeerConnection ||*/ window.webkitRTCPeerConnection ||
        window.mozRTCPeerConnection;

      if (!RTCPeerConnection) {
        reject("Your browser does not support this API");
      }

      var rtc = new RTCPeerConnection({ iceServers: [] });
      var addrs = {};
      addrs["0.0.0.0"] = false;

      function grepSDP(sdp) {
        var hosts = [];
        var finalIP = "";
        sdp.split("\r\n").forEach(function(line) {
          // c.f. http://tools.ietf.org/html/rfc4566#page-39
          if (~line.indexOf("a=candidate")) {
            // http://tools.ietf.org/html/rfc4566#section-5.13
            var parts = line.split(" "), // http://tools.ietf.org/html/rfc5245#section-15.1
              addr = parts[4],
              type = parts[7];
            if (type === "host") {
              finalIP = addr;
            }
          } else if (~line.indexOf("c=")) {
            // http://tools.ietf.org/html/rfc4566#section-5.7
            var parts = line.split(" "),
              addr = parts[2];
            finalIP = addr;
          }
        });
        return finalIP;
      }

      if (1 || window.mozRTCPeerConnection) {
        // FF [and now Chrome!] needs a channel/stream to proceed
        rtc.createDataChannel("", { reliable: false });
      }

      rtc.onicecandidate = function(evt) {
        // convert the candidate to SDP so we can run it through our general parser
        // see https://twitter.com/lancestout/status/525796175425720320 for details
        if (evt.candidate) {
          var addr = grepSDP("a=" + evt.candidate.candidate);
          resolve(addr);
        }
      };
      rtc.createOffer(
        function(offerDesc) {
          rtc.setLocalDescription(offerDesc);
        },
        function(e) {
          console.warn("offer failed", e);
        }
      );
    });
  }

  getBrowser() {
    const sUsrAg = window.navigator.userAgent;
    let sBrowser = undefined;

    if (sUsrAg.indexOf("Firefox") > -1) {
      sBrowser = "Mozilla Firefox";
      // "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:61.0) Gecko/20100101 Firefox/61.0"
    } else if (sUsrAg.indexOf("SamsungBrowser") > -1) {
      sBrowser = "Samsung Internet";
      // "Mozilla/5.0 (Linux; Android 9; SAMSUNG SM-G955F Build/PPR1.180610.011) AppleWebKit/537.36 (KHTML, like Gecko) SamsungBrowser/9.4 Chrome/67.0.3396.87 Mobile Safari/537.36
    } else if (sUsrAg.indexOf("Opera") > -1 || sUsrAg.indexOf("OPR") > -1) {
      sBrowser = "Opera";
      // "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.102 Safari/537.36 OPR/57.0.3098.106"
    } else if (sUsrAg.indexOf("Trident") > -1) {
      sBrowser = "Microsoft Internet Explorer";
      // "Mozilla/5.0 (Windows NT 10.0; WOW64; Trident/7.0; .NET4.0C; .NET4.0E; Zoom 3.6.0; wbx 1.0.0; rv:11.0) like Gecko"
    } else if (sUsrAg.indexOf("Edge") > -1) {
      sBrowser = "Microsoft Edge";
      // "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36 Edge/16.16299"
    } else if (sUsrAg.indexOf("Chrome") > -1) {
      sBrowser = "Google Chrome or Chromium";
      // "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Ubuntu Chromium/66.0.3359.181 Chrome/66.0.3359.181 Safari/537.36"
    } else if (sUsrAg.indexOf("Safari") > -1) {
      sBrowser = "Apple Safari";
      // "Mozilla/5.0 (iPhone; CPU iPhone OS 11_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/11.0 Mobile/15E148 Safari/604.1 980x1306"
    }

    return sBrowser;
  }
}

const instance = new api();

export default Object.freeze(instance);
