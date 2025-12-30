import axios from "axios";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Vue from "vue";
import ProductData from "../product-data.json";
import { isLocalDev } from "../utils";

const endpoint = process.env.VUE_APP_API_URL || "https://apis.yyjlincoln.com";
const version = "{{{ VERSION }}}";
const downloaded = new Date().getTime();
const versionIdentifier = `${version}@${String(downloaded)}`;

let LAST_PATH = "";

const common = {
  getEndpoint: async (path, params) => {
    return axios
      .get(`${endpoint}${path}`, {
        params: params,
      })
      .then((res) => res.data);
  },
  getPageUpdate(currentPage) {
    if (isLocalDev()) {
      return;
    }
    this.getEndpoint("/getPageUpdates", {
      page: currentPage,
      version: versionIdentifier,
    })
      .then((data) => {
        if (data.code < 0) {
          let actions = [
            {
              title: "Home",
              type: "normal",
              handler: () => {
                window.app.$router.push("/");
              },
            },
            {
              title: "Cancel",
              type: "cancel",
              handler: () => {
                // Do nothing
              },
            },
          ];
          if (data.link) {
            actions.splice(0, 0, {
              title: "Continue",
              type: "normal",
              handler: () => {
                window.location = data.link;
              },
            });
          } else {
            actions.splice(0, 0, {
              title: "Refresh",
              type: "destructive",
              handler: () => {
                location.reload(true);
              },
            });
          }

          window.app.$alert.present(data.title, data.message, actions, {
            defaultAction: 0,
          });
        }
      })
      .catch((err) => {
        console.warn(
          "Could not fetch for page updates. The current content may not be up to date.",
          err
        );
      });
  },
};

const func = {
  reverseAnimation(that) {
    return new Promise((resolve) => {
      gsap
        .to(window, {
          scrollTo: 0,
          duration: 0.5,
          ease: "power3.out",
        })
        .then(() => {
          document.body.classList.add("cursor-wait");
          if (!that.timeline) {
            document.body.classList.remove("cursor-wait");
            resolve();
          } else {
            that.timeline.eventCallback("onReverseComplete", () => {
              document.body.classList.remove("cursor-wait");
              resolve();
            });
            that.timeline.reverse();
          }
        });
    });
  },
  processPath(path) {
    if (path != LAST_PATH) {
      LAST_PATH = path;
      Vue.prototype.$api.getPageUpdate(path);
    }
  },
  utils: {
    scrollTo(destination) {
      gsap.to(window, {
        scrollTo: destination,
        duration: 0.5,
        ease: "power3.out",
      });
    },
    inlineScrollTo(destination) {
      return function () {
        Vue.prototype.$func.utils.scrollTo(destination);
      };
    },
    openInNewWindow(url) {
      window.open(url, "_blank").focus();
    },
    inlineOpenInNewWindow(url) {
      return function () {
        Vue.prototype.$func.utils.openInNewWindow(url);
      };
    },
  },
};

const data = {
  ...ProductData,
};

const runtime = {
  firstLaunch: true,
};

function install(Vue) {
  Vue.prototype.$api = {
    ...common,
  };
  Vue.prototype.$func = {
    ...func,
  };
  Vue.prototype.$commondata = {
    ...data,
  };
  Vue.prototype.$runtime = {
    ...runtime,
  };

  Vue.mixin({
    beforeDestroy() {
      if (this.timeline) {
        this.timeline.kill();
      }
      ScrollTrigger.getAll().forEach(function (trigger) {
        trigger.kill();
      });
    },
    watch: {},
  });
}

function stringifyTimeDifference(timestamp, full = false) {
  let ts = Date.now(); // current timestamp
  let tso = new Date(ts); // current timestamp as an object
  let td = (ts - timestamp) / 1000; // time difference in seconds
  let tx = new Date(timestamp); // timestamp as an object
  if (td < 0) {
    full = true;
  }
  if (!full) {
    if (td < 60) {
      return `${String(Math.floor(td))} seconds ago`;
    } else if (td / 60 <= 60) {
      return Math.floor(td / 60) + " minutes ago";
    } else if (td / 3600 <= 5) {
      return Math.floor(td / 3600) + " hours ago";
    } else if (td / 3600 <= 24 && tso.getDate() == tx.getDate()) {
      return (
        (tx.getHours() < 10 ? "0" : "") +
        tx.getHours() +
        ":" +
        (tx.getMinutes() < 10 ? "0" : "") +
        tx.getMinutes()
      );
    } else if (tx.getFullYear() == tso.getFullYear()) {
      return (
        tx.getDate() +
        "/" +
        (tx.getMonth() + 1) +
        " " +
        (tx.getHours() < 10 ? "0" : "") +
        tx.getHours() +
        ":" +
        (tx.getMinutes() < 10 ? "0" : "") +
        tx.getMinutes()
      );
    } else {
      return (
        tx.getDate() +
        "/" +
        (tx.getMonth() + 1) +
        "/" +
        tx.getFullYear() +
        " " +
        (tx.getHours() < 10 ? "0" : "") +
        tx.getHours() +
        ":" +
        (tx.getMinutes() < 10 ? "0" : "") +
        tx.getMinutes()
      );
    }
  } else {
    return (
      tx.getDate() +
      "/" +
      (tx.getMonth() + 1) +
      "/" +
      tx.getFullYear() +
      " " +
      (tx.getHours() < 10 ? "0" : "") +
      tx.getHours() +
      ":" +
      (tx.getMinutes() < 10 ? "0" : "") +
      tx.getMinutes()
    );
  }
}

export default {
  install,
};

export { version, downloaded, stringifyTimeDifference };
