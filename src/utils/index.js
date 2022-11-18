import moment from "moment";
import store from "STORE";

export function param2Obj(url) {
  const search = url.split("?")[1];
  return JSON.parse(
    '{"' +
      decodeURIComponent(search)
        .replace(/"/g, '\\"')
        .replace(/&/g, '","')
        .replace(/=/g, '":"') +
      '"}'
  );
}

export function hasPermission(perm) {
  if (process.env.VUE_APP_PERMISSION === "0") {
    // console.log('hack')
    return true;
  }
  return store.getters.perms.some((item) => {
    return item === perm;
  });
}

export function mock_success(data) {
  return {
    status: "success",
    data: data,
  };
}

export function mock_failure(code, msg) {
  return {
    status: "failure",
    data: {
      error: msg,
      error_code: code,
    },
  };
}

export function param(json) {
  if (!json) return "";
  return cleanArray(
    Object.keys(json).map((key) => {
      if (json[key] === undefined) return "";
      return encodeURIComponent(key) + "=" + encodeURIComponent(json[key]);
    })
  ).join("&");
}

export function cleanArray(actual) {
  const newArray = [];
  for (let i = 0; i < actual.length; i++) {
    if (actual[i]) {
      newArray.push(actual[i]);
    }
  }
  return newArray;
}

export function checkDatePast(datetime) {
  // 判断是不是过去
  if (datetime + 86400 <= moment().unix()) {
    return true;
  }
  return false;
}

/**
 * 身份证检测
 * @param {*} socialNo
 */
export function checkCardId(socialNo) {
  if (socialNo == "") {
    // alert("输入身份证号码不能为空!");
    return false;
  }

  if (socialNo.length != 15 && socialNo.length != 18) {
    console.log("输入身份证号码格式不正确!");
    return false;
  }

  let area = {
    11: "北京",
    12: "天津",
    13: "河北",
    14: "山西",
    15: "内蒙古",
    21: "辽宁",
    22: "吉林",
    23: "黑龙江",
    31: "上海",
    32: "江苏",
    33: "浙江",
    34: "安徽",
    35: "福建",
    36: "江西",
    37: "山东",
    41: "河南",
    42: "湖北",
    43: "湖南",
    44: "广东",
    45: "广西",
    46: "海南",
    50: "重庆",
    51: "四川",
    52: "贵州",
    53: "云南",
    54: "西藏",
    61: "陕西",
    62: "甘肃",
    63: "青海",
    64: "宁夏",
    65: "新疆",
    71: "台湾",
    81: "香港",
    82: "澳门",
    91: "国外",
  };

  if (area[parseInt(socialNo.substr(0, 2))] == null) {
    console.log("身份证号码不正确(地区非法)!");
    return false;
  }

  if (socialNo.length == 15) {
    let pattern = /^\d{15}$/;
    if (pattern.exec(socialNo) == null) {
      console.log("15位身份证号码必须为数字！");
      return false;
    }
    let birth = parseInt("19" + socialNo.substr(6, 2));
    let month = socialNo.substr(8, 2);
    let day = parseInt(socialNo.substr(10, 2));
    switch (month) {
      case "01":
      case "03":
      case "05":
      case "07":
      case "08":
      case "10":
      case "12":
        if (day > 31) {
          console.log("输入身份证号码不格式正确!1");
          return false;
        }
        break;
      case "04":
      case "06":
      case "09":
      case "11":
        if (day > 30) {
          console.log("输入身份证号码不格式正确!2");
          return false;
        }
        break;
      case "02":
        if ((birth % 4 == 0 && birth % 100 != 0) || birth % 400 == 0) {
          if (day > 29) {
            console.log("输入身份证号码不格式正确!3");
            return false;
          }
        } else {
          if (day > 28) {
            console.log("输入身份证号码不格式正确!4");
            return false;
          }
        }
        break;
      default:
        console.log("输入身份证号码不格式正确!5");
        return false;
    }
    let nowYear = new Date().getFullYear();
    if (nowYear - parseInt(birth) < 15 || nowYear - parseInt(birth) > 100) {
      console.log("输入身份证号码不格式正确!6");
      return false;
    }
    return true;
  }

  let Wi = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2, 1];
  let lSum = 0;
  let nNum = 0;

  for (let i = 0; i < 17; ++i) {
    if (socialNo.charAt(i) < "0" || socialNo.charAt(i) > "9") {
      console.log("输入身份证号码格式不正确!7");
      return false;
    } else {
      nNum = socialNo.charAt(i) - "0";
    }
    lSum += nNum * Wi[i];
  }

  if (socialNo.charAt(17) == "X" || socialNo.charAt(17) == "x") {
    lSum += 10 * Wi[17];
  } else if (socialNo.charAt(17) < "0" || socialNo.charAt(17) > "9") {
    console.log("输入身份证号码格式不正确!8");
    return false;
  } else {
    lSum += (socialNo.charAt(17) - "0") * Wi[17];
  }

  if (lSum % 11 == 1) {
    return true;
  } else {
    console.log("输入身份证号码格式不正确!9");
    return false;
  }
}
