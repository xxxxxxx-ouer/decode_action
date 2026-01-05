//Mon Jan 05 2026 05:49:46 GMT+0000 (Coordinated Universal Time)
//Base:https://github.com/echo094/decode-js
//Modify:https://github.com/smallfawn/decode_action
const a0_0x2ef5ce = require("axios"),
  a0_0x21e6eb = require("fs"),
  a0_0x529027 = require("path"),
  a0_0x234efb = require("crypto"),
  a0_0x43e2d2 = require("querystring"),
  {
    SocksProxyAgent: a0_0x219665
  } = require("socks-proxy-agent"),
  a0_0x295443 = [196, 202, 208, 214, 220, 226, 118, 46, 47, 48, 49, 50, 51, 33, 39, 45, 51, 87, 123, 171, 177, 183, 201, 207, 213, 226, 227, 228, 229, 230, 231];
function a0_0x5a204f(_0x409ed2) {
  let _0xeee713 = 0;
  for (let _0xa040fb = 0; _0xa040fb < _0x409ed2.length; _0xa040fb++) {
    _0xeee713 = _0x409ed2.charCodeAt(_0xa040fb) + ((_0xeee713 << 5) - _0xeee713);
  }
  const _0x5a4e73 = a0_0x295443[Math.abs(_0xeee713) % a0_0x295443.length];
  return "[38;5;" + _0x5a4e73 + "m";
}
function a0_0x6b6969() {
  const _0x1afa15 = new Date();
  return "[90m[" + _0x1afa15.getHours().toString().padStart(2, "0") + ":" + _0x1afa15.getMinutes().toString().padStart(2, "0") + ":" + _0x1afa15.getSeconds().toString().padStart(2, "0") + "]" + "[0m";
}
const a0_0x1a8fe2 = {
  APP_ID: 1692,
  URL_LOGIN: "http://wlyz.cn/api/single/login",
  URL_INFO: "http://wlyz.cn/api/single/info",
  TIMEOUT: 10000
};
global.DYNAMIC_CONFIG = {
  apiPool: [],
  concurrency: 0
};
const a0_0x3d57b6 = {
  0: "小时体验卡",
  1: "天卡 (24H)",
  2: "周卡 (7D)",
  3: "半月卡 (15D)",
  4: "月卡 (30D)",
  5: "季度卡 (90D)",
  6: "半年卡 (180D)",
  7: "年卡 (365D)",
  8: "👑 永久至尊卡"
};
class a0_0x20f8da {
  constructor() {
    const _0x4eb0bd = process.env.QL_DIR || "/ql",
      _0x20cd2a = a0_0x529027.join(_0x4eb0bd, "data", "config");
    this.saveDir = a0_0x21e6eb.existsSync(_0x20cd2a) ? _0x20cd2a : a0_0x21e6eb.existsSync(a0_0x529027.join(_0x4eb0bd, "config")) ? a0_0x529027.join(_0x4eb0bd, "config") : __dirname;
    this.file = a0_0x529027.join(this.saveDir, "wlyz_device_token.txt");
  }
  getMac() {
    try {
      if (a0_0x21e6eb.existsSync(this.file)) {
        const _0x4b6f27 = a0_0x21e6eb.readFileSync(this.file, "utf8").trim();
        if (_0x4b6f27 && _0x4b6f27.length > 5) {
          return _0x4b6f27;
        }
      }
      const _0x837734 = a0_0x234efb.randomUUID().replace(/-/g, "");
      a0_0x21e6eb.writeFileSync(this.file, _0x837734, {
        encoding: "utf8"
      });
      return _0x837734;
    } catch (_0x4269a2) {
      return "temp_" + Date.now();
    }
  }
}
class a0_0x134421 {
  constructor() {
    this.device = new a0_0x20f8da();
    this.mac = this.device.getMac();
    this.card = process.env.KS_KM_666;
    this.token = "";
  }
  printContactInfo() {
    console.log("[35m================================================================[0m");
    console.log("[38;5;220m💎 官方定价: 单账号 0.66元/天 (多号叠加) | 认准正版授权[0m");
    console.log("[96m📞 售后专线: 🛰️Wechat: [LambLambVibe] | 🐧QQ: [1076731230][0m");
    console.log("[35m================================================================[0m\n");
  }
  async step1_Login() {
    if (!this.card) {
      console.log("\n[31m❌ 致命错误：未找到环境变量 KS_KM_666，请先配置卡密！[0m");
      this.printContactInfo();
      return false;
    }
    console.log("\n[34m⏳ [1/2] 正在连接验证服务器...[0m");
    try {
      const _0xd47706 = await a0_0x2ef5ce.get(a0_0x1a8fe2.URL_LOGIN, {
          params: {
            appId: a0_0x1a8fe2.APP_ID,
            card: this.card,
            mac: this.mac,
            timestamp: "",
            safeCode: "",
            signature: ""
          },
          timeout: a0_0x1a8fe2.TIMEOUT
        }),
        _0x49f3bf = _0xd47706.data;
      return _0x49f3bf.code === 1 || _0x49f3bf.code === 200 || _0x49f3bf.msg && _0x49f3bf.msg.includes("成功") ? (this.token = _0x49f3bf.token || _0x49f3bf.data && _0x49f3bf.data.token || "", true) : (console.log("[31m⛔ 登录失败: " + _0x49f3bf.msg + "[0m"), this.printContactInfo(), false);
    } catch (_0xee7942) {
      console.log("[31m⚠️ 网络异常: " + _0xee7942.message + "[0m");
      this.printContactInfo();
      return false;
    }
  }
  async step2_GetInfo() {
    console.log("[34m⏳ [2/2] 正在拉取授权配置...[0m");
    try {
      const _0x3cd430 = await a0_0x2ef5ce.get(a0_0x1a8fe2.URL_INFO, {
          params: {
            appId: a0_0x1a8fe2.APP_ID,
            card: this.card,
            mac: this.mac,
            token: this.token,
            timestamp: "",
            safeCode: "",
            signature: ""
          },
          timeout: a0_0x1a8fe2.TIMEOUT
        }),
        _0x4258f2 = _0x3cd430.data;
      if (_0x4258f2.code === 1 || _0x4258f2.code === 200) {
        const _0x26d441 = _0x4258f2.data || {};
        this.printAuthSuccessLog(_0x26d441);
        this.parseConfig(_0x26d441.mark);
        return true;
      } else {
        console.log("[31m⛔ 授权获取失败: " + _0x4258f2.msg + "[0m");
        this.printContactInfo();
        return false;
      }
    } catch (_0x4f7cb2) {
      console.log("[31m⚠️ 授权接口异常: " + _0x4f7cb2.message + "[0m");
      this.printContactInfo();
      return false;
    }
  }
  parseConfig(_0x39fd1d) {
    if (!_0x39fd1d) {
      return;
    }
    const _0x4efef6 = "pgrm.top",
      _0x43c6da = _0x39fd1d.split(";"),
      _0x1e475d = [];
    let _0x2b8dcb = 0;
    for (const _0x22b6bd of _0x43c6da) {
      if (_0x22b6bd.includes(":")) {
        const [_0x5c45de, _0x3233b3] = _0x22b6bd.split(":");
        if (_0x5c45de && _0x3233b3) {
          const _0x4d93f6 = "http://" + _0x5c45de + "." + _0x4efef6 + ":" + _0x3233b3;
          _0x1e475d.push(_0x4d93f6);
        }
      } else {
        const _0x2e1164 = parseInt(_0x22b6bd);
        if (!isNaN(_0x2e1164)) {
          _0x2b8dcb = _0x2e1164;
        }
      }
    }
    _0x1e475d.length > 0 && _0x2b8dcb > 0 && (global.DYNAMIC_CONFIG.apiPool = _0x1e475d, global.DYNAMIC_CONFIG.concurrency = _0x2b8dcb);
    console.log("[90m⚙️ 系统配置已下发: 签名节点[" + global.DYNAMIC_CONFIG.apiPool.length + "个] | 并发限制[" + global.DYNAMIC_CONFIG.concurrency + "线程]" + "[0m");
  }
  printAuthSuccessLog(_0xcfb654) {
    const _0x4bb25f = a0_0x3d57b6[_0xcfb654.type] || "未知卡种";
    console.log("\n[92m🎉 验证通过！尊贵的 [" + _0x4bb25f + "] 用户" + "[0m");
    console.log("[38;5;220m📅 激活时间: " + (_0xcfb654.fromTime || "未知") + "[0m");
    console.log("[91m⏳ 到期时间: " + (_0xcfb654.endTime || "未知") + "[0m");
    this.printContactInfo();
  }
}
const a0_0x436ac0 = ["look", "food", "box", "search"],
  a0_0x4d3e8f = {
    look: {
      name: "看广告得金币",
      businessId: 672,
      posId: 24067,
      subPageId: 100026367,
      requestSceneType: 1,
      taskType: 1
    },
    search: {
      name: "搜索任务",
      businessId: 7076,
      posId: 216268,
      subPageId: 100161537,
      requestSceneType: 1,
      taskType: 1
    },
    food: {
      name: "饭补广告",
      businessId: 9362,
      posId: 24067,
      subPageId: 100026367,
      requestSceneType: 7,
      taskType: 2
    },
    box: {
      name: "宝箱广告",
      businessId: 606,
      posId: 20346,
      subPageId: 100024064,
      requestSceneType: 1,
      taskType: 1
    },
    look_follow: {
      name: "普通追加",
      businessId: 672,
      posId: 24067,
      subPageId: 100026367,
      requestSceneType: 2,
      taskType: 1
    },
    search_follow: {
      name: "搜索追加",
      businessId: 7076,
      posId: 216268,
      subPageId: 100161537,
      requestSceneType: 7,
      taskType: 2
    }
  };
global.globalStats = {
  startTime: Date.now(),
  isStopping: false,
  isExiting: false,
  summaryPrinted: false,
  accountInstances: []
};
function a0_0x32935b(_0x5b7405) {
  let _0x11cd86 = _0x5b7405 === 1 ? "[90m" : _0x5b7405 === 10 ? "[31m" : _0x5b7405 === 5 ? "[36m" : "[92m";
  return "[1m" + _0x11cd86 + _0x5b7405 + "[0m";
}
function a0_0x493d89(_0x5622b8) {
  return new Promise(_0x151250 => {
    const _0x338cf7 = setTimeout(_0x151250, _0x5622b8);
    if (global.globalStats.isStopping) {
      clearTimeout(_0x338cf7);
      _0x151250();
    }
  });
}
function a0_0x1d7e97() {
  const _0x26cbf7 = new Date(),
    _0x1d0e82 = new Date(_0x26cbf7);
  _0x1d0e82.setDate(_0x26cbf7.getDate() + 1);
  _0x1d0e82.setHours(1, 0, 0, 0);
  return _0x1d0e82.getTime() - _0x26cbf7.getTime();
}
const a0_0x1f3228 = {
  welcome: () => {
    console.log("[35m================================================================[0m");
    console.log("[38;5;220m[1m  💎 尊敬的 SVIP 运气妹妹，您的财富帝国钻井队已集结 💎[0m");
    console.log("[96m  🔥 钻井平台 4.0 满负荷自检中，正在为您疯狂压榨金币原油...[0m");
    console.log("[35m================================================================[0m");
  },
  info: _0x1ce79c => console.log(a0_0x6b6969() + " " + "[34m" + "📡 " + _0x1ce79c + "[0m"),
  login: (_0x6763a9, _0x3b3df4, _0x3767b6, _0x16b65f) => console.log(a0_0x6b6969() + " " + _0x6763a9 + " " + "[1m" + "[94m" + _0x16b65f + "[0m" + " " + "[32m" + "[1m" + "🏗️ 钻机完美就位！| 💰初始油量: " + _0x3b3df4 + " | ￥金库: " + _0x3767b6 + "[0m"),
  ledger: (_0xe7b054, _0x3dcc65, _0x1fbb14, _0x4a7e68, _0x1832be) => console.log(a0_0x6b6969() + " " + _0xe7b054 + " " + "[1m" + "[95m" + "🌋 报告老板！喷油成功: +" + _0x3dcc65 + "[0m" + " " + "[1m" + "[36m" + "| 累计产油: " + _0x4a7e68 + " | 总库存: " + _0x1fbb14 + " | ￥金库: " + _0x1832be + "元" + "[0m"),
  error: (_0x11c422, _0x5ad9a0) => console.log(a0_0x6b6969() + " " + _0x11c422 + " " + "[31m" + "❌ 故障报警：" + _0x5ad9a0 + "[0m"),
  task: (_0x5ac5f8, _0x29d565) => console.log(a0_0x6b6969() + " " + _0x5ac5f8 + " " + "[1m" + "[35m" + "🚀 " + _0x29d565 + "[0m"),
  step: (_0x13681b, _0x1a0d79) => console.log(a0_0x6b6969() + " " + _0x13681b + " " + "[90m" + "  🚜 " + _0x1a0d79 + "[0m"),
  rest: (_0x372e97, _0x569ed8) => console.log(a0_0x6b6969() + " " + _0x372e97 + " " + "[31m" + "[1m" + "💤 " + _0x569ed8 + "[0m"),
  wait: (_0x272239, _0x5b799f) => console.log(a0_0x6b6969() + " " + _0x272239 + " " + "[36m" + "🔧 " + _0x5b799f + "[0m"),
  black: _0x125c5f => console.log("[31m[1m💀💀💀 " + _0x125c5f + " 井口被炸毁(黑号)，运气妹妹下令立刻撤场！ 💀💀💀" + "[0m")
};
async function a0_0x3e3d54(_0x32cc35, _0x1e578f) {
  if (global.globalStats.isStopping) {
    return {
      response: null,
      body: null
    };
  }
  let _0xc30b4c = null;
  if (_0x1e578f && _0x1e578f.startsWith("socks")) {
    try {
      _0xc30b4c = new a0_0x219665(_0x1e578f);
    } catch (_0xb460d8) {}
  }
  try {
    const _0x51f490 = {
        method: _0x32cc35.method || "GET",
        url: _0x32cc35.url,
        headers: _0x32cc35.headers || {},
        data: _0x32cc35.body || _0x32cc35.form,
        timeout: 15000,
        httpAgent: _0xc30b4c,
        httpsAgent: _0xc30b4c
      },
      _0x6170e3 = await a0_0x2ef5ce(_0x51f490);
    return {
      response: _0x6170e3,
      body: _0x6170e3.data
    };
  } catch (_0x3eb60f) {
    return {
      response: null,
      body: null
    };
  }
}
async function a0_0x2ecc73(_0x3dbf6f, _0x29be6) {
  const _0x2b623a = "https://nebula.kuaishou.com/rest/n/nebula/activity/earn/overview/basicInfo?source=bottom_guide_first",
    {
      body: _0x3ef449
    } = await a0_0x3e3d54({
      method: "GET",
      url: _0x2b623a,
      headers: {
        "User-Agent": "kwai-android aegon/3.56.0",
        Cookie: _0x3dbf6f
      }
    }, _0x29be6);
  if (_0x3ef449 && _0x3ef449.result === 1 && _0x3ef449.data) {
    return {
      nickname: _0x3ef449.data.userData?.["nickname"] || "未知矿主",
      totalCoin: _0x3ef449.data.totalCoin || 0,
      allCash: _0x3ef449.data.allCash || "0.00"
    };
  }
  return null;
}
class a0_0x15919d {
  constructor({
    index: _0x3d1cda,
    cookie: _0x55f6a9,
    salt: _0x5a9e29,
    proxyUrl: _0x2b44bb,
    remark: _0x1faef6
  }) {
    this.index = _0x3d1cda;
    this.cookie = _0x55f6a9;
    this.salt = _0x5a9e29;
    this.proxyUrl = _0x2b44bb;
    this.remark = _0x1faef6 || "运气号";
    this.userId = (_0x55f6a9.match(/userId=([^;]+)/) || [, "未知"])[1];
    this.egid = (_0x55f6a9.match(/egid=([^;]+)/) || [, ""])[1];
    this.did = (_0x55f6a9.match(/did=([^;]+)/) || [, ""])[1];
    this.kuaishouApiSt = (_0x55f6a9.match(/kuaishou\.api_st=([^;]+)/) || [, ""])[1];
    this.myColor = a0_0x5a204f(this.userId);
    this.modeIcon = this.proxyUrl ? "🌐隧道" : "📡本地";
    this.nickname = "同步中...";
    this.idTag = this.myColor + "[" + this.remark + "][" + this.nickname + "][" + this.userId + "]" + "[0m";
    this.sessionCoins = 0;
    this.accountTotalCoins = 0;
    this.accountCash = "0.00";
    this.appver = "13.7.20.10468";
    this.reportQueryParams = "mod=Xiaomi(MI 11)&appver=" + this.appver + "&egid=" + this.egid + "&did=" + this.did;
    this.currentTaskIndex = 0;
    this.adaddnum = 0;
    this.isBlacklisted = false;
    this.risk10Count = 0;
    this.consecutiveFailCount = 0;
  }
  async requestSignWithFailover(_0xee76c9, _0x2a64df, _0x19bba2) {
    const _0x13ab7a = global.DYNAMIC_CONFIG.apiPool;
    if (!_0x13ab7a || _0x13ab7a.length === 0) {
      a0_0x1f3228.error(this.idTag, "❌ 签名接口配置错误 (Pool Empty) - 无法获取广告数据");
      return null;
    }
    for (let _0x1a5709 = 0; _0x1a5709 < _0x13ab7a.length; _0x1a5709++) {
      const _0x46bf0e = _0x13ab7a[_0x1a5709],
        _0x41cdd8 = "" + _0x46bf0e + _0xee76c9;
      try {
        const _0x4dd94c = await a0_0x3e3d54({
          method: "POST",
          url: _0x41cdd8,
          body: _0x2a64df,
          headers: _0x19bba2
        }, null);
        if (_0x4dd94c && _0x4dd94c.body && _0x4dd94c.body.status) {
          return _0x4dd94c;
        }
      } catch (_0x1c6a96) {}
      _0x1a5709 === _0x13ab7a.length - 1 && a0_0x1f3228.error(this.idTag, "❌ 所有签名接口连接失败 - 无法获取广告数据");
    }
    return null;
  }
  async runInfiniteWorker() {
    const _0x2df864 = await a0_0x2ecc73(this.cookie, this.proxyUrl);
    if (_0x2df864) {
      this.nickname = _0x2df864.nickname;
      this.accountTotalCoins = _0x2df864.totalCoin;
      this.accountCash = _0x2df864.allCash;
      this.updateIdTag();
      a0_0x1f3228.login(this.idTag, this.accountTotalCoins, this.accountCash, this.modeIcon);
    } else {
      a0_0x1f3228.error(this.idTag, "钻机无法发动：矿主证件(CK)失效或隧道崩塌。");
      return;
    }
    while (!global.globalStats.isStopping && !this.isBlacklisted) {
      const _0x40c865 = a0_0x436ac0[this.currentTaskIndex];
      a0_0x1f3228.task(this.idTag, "开始执行下钻指令：目标层级 [" + a0_0x4d3e8f[_0x40c865].name + "]");
      const _0x45d7e7 = await this.drillOilWell(_0x40c865);
      if (this.isBlacklisted || global.globalStats.isStopping) {
        break;
      }
      if (_0x45d7e7.signal === "WIND_CONTROL_10") {
        this.risk10Count++;
        const _0x2a1b7c = this.risk10Count === 1 ? 7200000 : this.risk10Count === 2 ? 18000000 : a0_0x1d7e97();
        a0_0x1f3228.rest(this.idTag, "⚠️ 井口坍塌！正在紧急维护，工厂停工 " + (this.risk10Count > 2 ? "至凌晨 01:00" : _0x2a1b7c / 3600000 + "小时") + "...");
        await a0_0x493d89(_0x2a1b7c);
        if (this.risk10Count >= 3) {
          this.risk10Count = 0;
        }
        this.switchNextIndex();
      } else {
        if (_0x45d7e7.signal === "WELL_EMPTY") {
          this.consecutiveFailCount++;
          if (this.consecutiveFailCount >= a0_0x436ac0.length) {
            await this.performDeepCheck();
          } else {
            this.switchNextIndex();
          }
        } else {
          this.consecutiveFailCount = 0;
          this.switchNextIndex();
        }
      }
    }
    if (this.isBlacklisted) {
      a0_0x1f3228.black(this.idTag);
    }
  }
  updateIdTag() {
    this.idTag = this.myColor + "[" + this.remark + "][" + this.nickname + "][" + this.userId + "]" + "[0m";
  }
  switchNextIndex() {
    this.currentTaskIndex = (this.currentTaskIndex + 1) % a0_0x436ac0.length;
  }
  async performDeepCheck() {
    a0_0x1f3228.info(this.idTag + " 正在对全场矿区进行深度巡检...");
    const _0x60cb85 = await a0_0x2ecc73(this.cookie, this.proxyUrl);
    if (!_0x60cb85) {
      a0_0x1f3228.error(this.idTag, "撤场报告：矿主证件(CK)已作废！");
      this.isBlacklisted = true;
      return;
    }
    a0_0x1f3228.rest(this.idTag, "巡检报告：今日原油采收已达上限。冬眠至凌晨 01:00 再战...");
    this.consecutiveFailCount = 0;
    await a0_0x493d89(a0_0x1d7e97());
  }
  async drillOilWell(_0x25d86b) {
    while (!global.globalStats.isStopping && !this.isBlacklisted) {
      const _0x274dd7 = await this.executeSingleTask(_0x25d86b, true);
      if (this.isBlacklisted || global.globalStats.isStopping) {
        return {
          signal: "STOP"
        };
      }
      if (!_0x274dd7.success || _0x274dd7.reward === 0) {
        return {
          signal: "WELL_EMPTY"
        };
      }
      if (_0x274dd7.reward === 10) {
        return {
          signal: "WIND_CONTROL_10"
        };
      }
      if (_0x274dd7.reward === 5 || _0x274dd7.reward > 10) {
        this.risk10Count = 0;
      }
      a0_0x1f3228.wait(this.idTag, "钻头降温保养中，等待心跳冷却 (60s)...");
      await a0_0x493d89(60000);
      const _0x3e6719 = _0x25d86b === "look" ? "look_follow" : _0x25d86b === "search" ? "search_follow" : null;
      if (_0x3e6719) {
        const _0x39f708 = await this.loopFollowUp(_0x3e6719);
        if (_0x39f708 === "DEAD" || _0x39f708 === "WIND_CONTROL_10") {
          return {
            signal: _0x39f708
          };
        }
        a0_0x1f3228.info(this.idTag + " 追加井口钻干，重回该大类主井继续高压抽取...");
      }
    }
  }
  async loopFollowUp(_0x3d56fc) {
    let _0x3c8aea = true,
      _0x183dc6 = 1,
      _0x1f246f = "FINISHED";
    while (_0x3c8aea && !global.globalStats.isStopping && !this.isBlacklisted) {
      const _0x331ba4 = await this.executeSingleTask(_0x3d56fc, false, _0x183dc6);
      if (this.isBlacklisted || global.globalStats.isStopping) {
        return "DEAD";
      }
      if (_0x331ba4.success && _0x331ba4.reward > 0) {
        if (_0x331ba4.reward === 10) {
          _0x1f246f = "WIND_CONTROL_10";
          _0x3c8aea = false;
        } else {
          if (_0x331ba4.reward === 5 || _0x331ba4.reward > 10) {
            this.risk10Count = 0;
          }
          a0_0x1f3228.wait(this.idTag, "追加获利喷油，降温冷却 (60s)...");
          await a0_0x493d89(60000);
          _0x183dc6++;
        }
      } else {
        _0x3c8aea = false;
      }
    }
    return _0x1f246f;
  }
  async executeSingleTask(_0x19bf36, _0x255a5e, _0x5b401d = 0) {
    const _0x257f22 = a0_0x4d3e8f[_0x19bf36],
      _0x446447 = _0x255a5e ? "[核心主井]" : "[卫星侧井-" + _0x5b401d + "]";
    try {
      const _0x397cd0 = await this.getAdInfo(_0x257f22);
      if (!_0x397cd0) {
        return {
          success: false,
          reward: 0
        };
      }
      const _0x45c00d = 35000 + Math.floor(Math.random() * 5000),
        _0x4ce5d1 = new Date(Date.now() + _0x45c00d).toLocaleTimeString();
      a0_0x1f3228.step(this.idTag, _0x446447 + " 启动下钻！目标: \"" + (_0x397cd0.caption || "优质原油").substring(0, 10) + "...\" | 预计喷油: " + "[1m" + "[94m" + _0x4ce5d1 + "[0m" + " | 💰 预估: " + "[1m" + "[36m" + _0x397cd0.awardCoin + "[0m");
      await a0_0x493d89(_0x45c00d);
      const _0x1b773e = await this.generateSignature(_0x397cd0.cid, _0x397cd0.llsid, _0x257f22);
      if (!_0x1b773e) {
        return {
          success: false,
          reward: 0
        };
      }
      const _0x486205 = await this.submitReport(_0x1b773e);
      if (_0x19bf36.includes("search")) {
        this.adaddnum = _0x486205.success ? this.adaddnum + 1 : 0;
      }
      if (_0x486205.success) {
        const _0x433736 = _0x486205.reward;
        if (_0x433736 === 1) {
          this.isBlacklisted = true;
          return {
            success: true,
            reward: 1
          };
        }
        this.sessionCoins += _0x433736;
        const _0x427b9c = await a0_0x2ecc73(this.cookie, this.proxyUrl);
        _0x427b9c && (this.accountTotalCoins = _0x427b9c.totalCoin, this.accountCash = _0x427b9c.allCash);
        a0_0x1f3228.ledger(this.idTag, _0x433736, this.accountTotalCoins, this.sessionCoins, this.accountCash);
        this.sessionCoins >= 150000 && (a0_0x1f3228.rest(this.idTag, "🎉 战报：单日产油量突破 15万！老板赚翻了！进入豪宅休息至凌晨 01:00..."), this.consecutiveFailCount = 0, await a0_0x493d89(a0_0x1d7e97()), this.sessionCoins = 0);
        return {
          success: true,
          reward: _0x433736
        };
      }
      return {
        success: false,
        reward: 0
      };
    } catch (_0xb5a134) {
      return {
        success: false,
        reward: 0
      };
    }
  }
  async getAdInfo(_0x3d5d6d) {
    const _0x1c0460 = "/rest/e/reward/mixed/ad",
      _0x77b04d = {
        appInfo: {
          appId: "kuaishou_nebula",
          name: "快手极速版",
          packageName: "com.kuaishou.nebula",
          version: this.appver,
          versionCode: -1
        },
        deviceInfo: {
          osType: 1,
          osVersion: "15",
          deviceId: this.did,
          screenSize: {
            width: 1080,
            height: 2249
          },
          ftt: ""
        },
        userInfo: {
          userId: this.userId,
          age: 0,
          gender: ""
        },
        impInfo: [{
          pageId: 11101,
          subPageId: _0x3d5d6d.subPageId,
          action: 0,
          browseType: 3,
          impExtData: "{}",
          mediaExtData: "{}"
        }]
      };
    if (_0x3d5d6d.businessId === 7076) {
      const _0x26a7d1 = "eyJwYWdlSWQiOiAxMTAxNCwgInN1YlBhZ2VJZCI6IDEwMDE2MTUzNywgInBvc0lkIjogMjE2MjY4LCAiYnVzaW5lc3NJZCI6IDcwNzYsICJleHRQYXJhbXMiOiAiIiwgImN1c3RvbURhdGEiOiB7ImV4aXRJbmZvIjogeyJ0b2FzdERlc2MiOiBudWxsLCAidG9hc3RJbWdVcmwiOiBudWxsfX0sICJwZW5kYW50VHlwZSI6IDEsICJkaXNwbGF5VHlwZSI6IDIsICJzaW5nbGVQYWdlSWQiOiAwLCAic2luZ2xlU3ViUGFnZUlkIjogMCwgImNoYW5uZWwiOiAwLCAiY291bnRkb3duUmVwb3J0IjogZmFsc2UsICJ0aGVtZVR5cGUiOiAwLCAibWl4ZWRBZCI6IHRydWUsICJmdWxsTWl4ZWQiOiB0cnVlLCAiYXV0b1JlcG9ydCI6IHRydWUsICJmcm9tVGFza0NlbnRlciI6IHRydWUsICJzZWFyY2hJbnNwaXJlU2NoZW1lSW5mbyI6IG51bGwsICJhbW91bnQiOiAwfQ==",
        _0x2d5324 = {
          openH5AdCount: 0,
          sessionLookedCompletedCount: this.adaddnum,
          sessionType: _0x3d5d6d.requestSceneType === 7 ? "2" : "1",
          searchKey: "短剧小说",
          triggerType: "2",
          disableReportToast: true,
          businessEnterAction: "7",
          neoParams: _0x26a7d1
        };
      _0x77b04d.impInfo[0].impExtData = JSON.stringify(_0x2d5324);
    }
    const _0x36d612 = {
        "Content-Type": "application/json",
        "User-Agent": "Mozilla/5.0"
      },
      _0x556465 = Buffer.from(JSON.stringify(_0x77b04d)).toString("base64"),
      _0xbbb36d = await this.requestSignWithFailover("/encsign", {
        data: _0x556465
      }, _0x36d612);
    if (!_0xbbb36d || !_0xbbb36d.body || !_0xbbb36d.body.status || !_0xbbb36d.body.data) {
      return null;
    }
    const _0x2f51d7 = {
        encData: _0xbbb36d.body.data.encdata,
        sign: _0xbbb36d.body.data.sign,
        cs: "false",
        client_key: "2ac2a76d",
        videoModelCrowdTag: "1_23",
        os: "android",
        "kuaishou.api_st": this.kuaishouApiSt,
        uQaTag: "1##swLdgl:99#ecPp:-9#cmNt:-0#cmHs:-3#cmMnsl:-0"
      },
      _0x2127cb = {
        earphoneMode: "1",
        mod: "Xiaomi(23116PN5BC)",
        appver: this.appver,
        isp: "CUCC",
        language: "zh-cn",
        ud: this.userId,
        did_tag: "0",
        net: "WIFI",
        kcv: "1599",
        app: "0",
        kpf: "ANDROID_PHONE",
        ver: "11.6",
        android_os: "0",
        boardPlatform: "pineapple",
        kpn: "NEBULA",
        androidApiLevel: "35",
        country_code: "cn",
        sys: "ANDROID_15",
        sw: "1080",
        sh: "2400",
        abi: "arm64",
        userRecoBit: "0"
      },
      _0x35fa7c = await this.requestSignWithFailover("/nssig", {
        path: _0x1c0460,
        data: a0_0x43e2d2.stringify(_0x2f51d7) + "&" + a0_0x43e2d2.stringify(_0x2127cb),
        salt: this.salt
      }, _0x36d612);
    if (!_0x35fa7c || !_0x35fa7c.body || !_0x35fa7c.body.status) {
      return null;
    }
    const _0x54a5c9 = "https://api.e.kuaishou.com" + _0x1c0460 + "?" + a0_0x43e2d2.stringify({
        ..._0x2127cb,
        sig: _0x35fa7c.body.data.sig,
        __NS_sig3: _0x35fa7c.body.data.nssig3,
        __NStokensig: _0x35fa7c.body.data.nstokensig
      }),
      _0x23110c = await a0_0x3e3d54({
        method: "POST",
        url: _0x54a5c9,
        form: _0x2f51d7,
        headers: {
          "User-Agent": "kwai-android aegon/3.56.0",
          "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
          Cookie: "kuaishou_api_st=" + this.kuaishouApiSt
        }
      }, this.proxyUrl);
    if (_0x23110c.body && _0x23110c.body.result === 1 && _0x23110c.body.feeds && _0x23110c.body.feeds[0]) {
      const _0x3f78aa = _0x23110c.body.feeds[0].ad || _0x23110c.body.feeds[0];
      let _0x5afb55 = "";
      try {
        _0x5afb55 = _0x23110c.body.feeds[0].exp_tag.split("/")[1].split("_")[0];
      } catch (_0x55fa0c) {}
      return {
        cid: _0x3f78aa.creativeId,
        llsid: _0x5afb55,
        awardCoin: JSON.parse(_0x3f78aa.extData || "{}").awardCoin || 0,
        caption: _0x23110c.body.feeds[0].caption || ""
      };
    }
    return null;
  }
  async generateSignature(_0x49b645, _0x116d04, _0x128d7f) {
    const _0x5de66d = JSON.stringify({
        businessId: _0x128d7f.businessId,
        endTime: Date.now() - 30000,
        extParams: "",
        mediaScene: "video",
        neoInfos: [{
          creativeId: _0x49b645,
          extInfo: "",
          llsid: _0x116d04,
          requestSceneType: _0x128d7f.requestSceneType,
          taskType: _0x128d7f.taskType,
          watchExpId: "",
          watchStage: 0
        }],
        pageId: 11101,
        posId: _0x128d7f.posId,
        reportType: 0,
        sessionId: "",
        startTime: Date.now() - 65000,
        subPageId: _0x128d7f.subPageId
      }),
      _0x4e6edc = "bizStr=" + encodeURIComponent(_0x5de66d) + "&cs=false&client_key=2ac2a76d&kuaishou.api_st=" + this.kuaishouApiSt,
      _0x4d22c8 = this.reportQueryParams + "&c=Xiaomi&sys=ANDROID_15&" + _0x4e6edc,
      _0x5cabc4 = await this.requestSignWithFailover("/nssig", {
        path: "/rest/r/ad/task/report",
        data: _0x4d22c8,
        salt: this.salt
      }, {
        "Content-Type": "application/json"
      });
    if (_0x5cabc4 && _0x5cabc4.body && _0x5cabc4.body.status) {
      return {
        sig: _0x5cabc4.body.data.sig,
        sig3: _0x5cabc4.body.data.nssig3,
        sigtoken: _0x5cabc4.body.data.nstokensig,
        post: _0x4e6edc
      };
    }
    return null;
  }
  async submitReport(_0x3edbe8) {
    const _0x5a43e9 = "https://api.e.kuaishou.com/rest/r/ad/task/report?" + this.reportQueryParams + "&c=Xiaomi&sys=ANDROID_15&sig=" + _0x3edbe8.sig + "&__NS_sig3=" + _0x3edbe8.sig3 + "&__NS_xfalcon=&__NStokensig=" + _0x3edbe8.sigtoken,
      _0x1bb273 = await a0_0x3e3d54({
        method: "POST",
        url: _0x5a43e9,
        body: _0x3edbe8.post,
        headers: {
          "User-Agent": "kwai-android aegon/3.56.0",
          "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
          Cookie: "kuaishou_api_st=" + this.kuaishouApiSt
        }
      }, this.proxyUrl);
    if (_0x1bb273.body && _0x1bb273.body.result === 1) {
      return {
        success: true,
        reward: _0x1bb273.body.data.neoAmount
      };
    }
    return {
      success: false
    };
  }
}
function a0_0x380aec() {
  if (global.globalStats.summaryPrinted) {
    return;
  }
  global.globalStats.summaryPrinted = true;
  console.log("\n[35m================================================================================[0m");
  console.log("[38;5;220m[1m📊 运气钻井工厂 - 最终产能结算快报 (老板请阅)[0m");
  console.log("[35m================================================================================[0m");
  const _0xdc87d5 = Math.floor((Date.now() - global.globalStats.startTime) / 1000),
    _0x116956 = Math.floor(_0xdc87d5 / 3600),
    _0x411ab2 = Math.floor(_0xdc87d5 % 3600 / 60),
    _0x2dae8e = _0xdc87d5 % 60;
  console.log("⏱️ 累计疯狂开采时长: " + _0x116956 + "时" + _0x411ab2 + "分" + _0x2dae8e + "秒");
  console.log("--------------------------------------------------------------------------------");
  console.log("排名".padEnd(4) + " | " + "旗下采油井 (备注/矿主/UID)".padEnd(40) + " | " + "累计产油量 (金币)".padEnd(15));
  console.log("--------------------------------------------------------------------------------");
  let _0x379877 = 0;
  global.globalStats.accountInstances.sort((_0x4d171c, _0x5d9f66) => _0x5d9f66.sessionCoins - _0x4d171c.sessionCoins).forEach((_0x4163f6, _0x3244e1) => {
    const _0x51d295 = ("[" + _0x4163f6.remark + "][" + _0x4163f6.nickname + "][" + _0x4163f6.userId + "]").substring(0, 40);
    console.log((_0x3244e1 + 1).toString().padEnd(4) + " | " + _0x51d295.padEnd(40) + " | " + "[92m" + _0x4163f6.sessionCoins.toString().padEnd(15) + "[0m");
    _0x379877 += _0x4163f6.sessionCoins;
  });
  console.log("--------------------------------------------------------------------------------");
  console.log("[1m[36m💰 今日总产油量汇总: " + _0x379877 + " 桶原油(金币)" + "[0m");
  console.log("[35m================================================================================[0m\n");
}
function a0_0x577140(_0x4f00d9) {
  if (global.globalStats.isExiting) {
    return;
  }
  global.globalStats.isExiting = true;
  global.globalStats.isStopping = true;
  console.log("\n[38;5;220m🛑 收到 " + _0x4f00d9 + " 信号，运气妹妹正在结算，请稍候..." + "[0m");
  a0_0x380aec();
  setTimeout(() => process.exit(0), 4000);
}
(async () => {
  a0_0x1f3228.welcome();
  const _0x5815cf = new a0_0x134421();
  if (!(await _0x5815cf.step1_Login())) {
    process.exit(1);
  }
  if (!(await _0x5815cf.step2_GetInfo())) {
    process.exit(1);
  }
  const _0x329dd9 = process.env.ksck || "";
  if (!_0x329dd9) {
    return console.log("[31m❌ 致命错误：请设置 ksck 环境变量 (ck#salt#remark#proxy)[0m");
  }
  const _0x16d709 = _0x329dd9.split("&").filter(_0x2ee2ac => _0x2ee2ac).map((_0x3dd9e4, _0x40d8d4) => {
    const _0x5c5924 = _0x3dd9e4.split("#");
    return {
      index: _0x40d8d4 + 1,
      cookie: _0x5c5924[0],
      salt: _0x5c5924[1],
      remark: _0x5c5924[2],
      proxyUrl: _0x5c5924[3]
    };
  });
  a0_0x1f3228.info("工厂正式开工 | 检测到 " + _0x16d709.length + " 个待命账号");
  a0_0x1f3228.info("调度策略：并发限制 [" + global.DYNAMIC_CONFIG.concurrency + "] | 动态接口池 [" + global.DYNAMIC_CONFIG.apiPool.length + "个]");
  const _0xa2b517 = global.DYNAMIC_CONFIG.concurrency;
  _0xa2b517 <= 0 && (console.log("\n[31m[1m⛔ 严重警告：当前卡密并发权限为 0，无法执行任何任务！[0m"), console.log("[31m请联系运气妹妹升级卡密权限。脚本已终止。[0m\n"), process.exit(0));
  const _0x463121 = [],
    _0x3eb217 = [];
  for (const _0x55b5c0 of _0x16d709) {
    const _0x2b1d64 = new a0_0x15919d(_0x55b5c0);
    global.globalStats.accountInstances.push(_0x2b1d64);
    const _0x46821a = _0x2b1d64.runInfiniteWorker();
    _0x463121.push(_0x46821a);
    if (_0xa2b517 < _0x16d709.length) {
      const _0x592277 = _0x46821a.then(() => _0x3eb217.splice(_0x3eb217.indexOf(_0x592277), 1));
      _0x3eb217.push(_0x592277);
      if (_0x3eb217.length >= _0xa2b517) {
        await Promise.race(_0x3eb217);
      }
    }
  }
  setInterval(() => {
    a0_0x1f3228.info("⏰ 财务审计时间到，正在生成产量报表...");
    a0_0x380aec();
    global.globalStats.summaryPrinted = false;
  }, 1800000);
  process.on("SIGINT", () => a0_0x577140("SIGINT"));
  process.on("SIGTERM", () => a0_0x577140("SIGTERM"));
  process.on("SIGHUP", () => a0_0x577140("SIGHUP"));
  await Promise.all(_0x463121);
})();