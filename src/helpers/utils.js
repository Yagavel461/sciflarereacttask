import axios from 'axios';
import moment from 'moment';
import APIURL from './globalVariables';
import cookie from 'react-cookies';
import { toast } from 'react-toastify';
let api_status = [
  { status_code: '401', func: () => (deleteAllCookies(), reloadWindow()) },
  {
    status_code: '406',
    func: () => {
      document
        .getElementById('checkLockStatus')
        .classList.add('checkLockStatus');
    },
  },
];


export function api_status_func(error) {
  // console.log(error.response.status);
  api_status?.map((e) => {
    // console.log(e);
    if (error?.response?.status === parseInt(e?.status_code)) {
      e.func();
    }
  });
}
export function getApiCall(url, callback) {
  createInstance(url, null, 0)
    .then((result) => {
      callback(result.data);
    })
    .catch((error) => {
      api_status_func(error);
      if(error?.response){
        return callback(error.response.data)
      }
      return callback(error);
    });
}
export function postApiCall(url, data, callback) {
  createInstance(url, data, 1)
    .then((result) => {
      callback(result.data);
    })
    .catch((error) => {
      api_status_func(error);
      if(error?.response){
        return callback(error.response.data)
      }
        return callback(error);
    });
}

export function putApiCall(url, data, callback) {
  createInstance(url, data, 2)
    .then((result) => {
      callback(result.data);
    })
    .catch((error) => {
      api_status_func(error);
      if(error?.response){
       return callback(error.response.data)
      }
     return callback(error);
    });
}
export function patchApiCall(url, data, callback) {
  createInstance(url, data, 3)
    .then((result) => {
      callback(result.data);
    })
    .catch((error) => {
      api_status_func(error);
       if(error?.response){
        return callback(error.response.data)
      }
       return callback(error);
    });
}

export function deleteApiCall(url, data, callback) {
  createInstance(url, data, 4)
    .then((result) => {
      callback(result.data);
    })
    .catch((error) => {
      api_status_func(error);
       if(error?.response){
       return callback(error.response.data)
      }
       return callback(error);
    });
}

export function toFixedPercentage(value) {
  return Number(value).toFixed(1);
}
export function createInstance(append, data, type) {
  let instance = axios.create({
    baseURL:
      // APIURL.LOCAL_URL,
      APIURL.STAGING_URL,
    // APIURL.LIVE_URL,
    headers: {
      'Content-Tye': 'application/json',
      Authorization: 'Bearer ' + getCookie('IppoStoreAdminToken'),
      'x-csrf-token': getCookie('StoreCsrfToken'),
    },
    withCredentials: true,
  });
  let url = APIURL.STAGING_URL + append;
  // let url = APIURL.LIVE_URL+append
  // let url = APIURL.LOCAL_URL+append
  switch (type) {
    case 0:
      return instance.get(url);
    case 1:
      return instance.post(url, data);
    case 2:
      return instance.put(url, data);
    case 3:
      return instance.patch(url, data);
    case 4:
      return instance.delete(url, data);
    default:
      return instance.get(url);
  }
}

export function setCookie(name, storevalue) {
  let date = new Date();
  date.setTime(date.getTime() + 24 * 60 * 60 * 1000); // 24 hours * 60 minutes * 60 seconds * 1000 milliseconds
  let expirationDate = '; expires=' + date.toUTCString();
  document.cookie = name + '=' + storevalue + expirationDate + ';path=/';
}

export function setCookieWithExpiry(name, storevalue, expirydays) {
  const d = new Date();
  d.setTime(d.getTime() + expirydays * 24 * 60 * 60 * 1000);
  let expires = 'expires=' + d.toUTCString();
  document.cookie = name + '=' + storevalue + ';' + expires + ';path=/';
}
export function getCookie(name) {
  let get_name = name + '=';
  let ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(get_name) == 0) {
      return c.substring(get_name.length, c.length);
    }
  }
  return '';
}

export function removeCookie(cookieName) {
  document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
}
export function deleteAllCookies() {
  let cookies = document.cookie.split(';');
  const d = new Date();
  d.setTime(d.getTime() + 1 * 24 * 60 * 60 * 1000);
  let expires = 'expires=' + d.toUTCString();
  for (let i = 0; i < cookies.length; i++) {
    let cookie = cookies[i];
    let eqPos = cookie.indexOf('=');
    let name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
    document.cookie = name + '=;' + expires + ';path=/';
  }
}
export function storageSetItem(key, value) {
  return window.localStorage.setItem(key, JSON.stringify(value));
}
export function storageGetItem(key) {
  return JSON.parse(window.localStorage.getItem(key));
}
export function storageRemoveItem(key) {
  return localStorage.removeItem(key);
}
export function storageRemoveAll() {
  return window.sessionStorage.clear();
}
export function sessionStorageSetItem(key, value) {
  return window.sessionStorage.setItem(key, JSON.stringify(value));
}
export function sessionStorageGetItem(key) {
  return JSON.parse(window.sessionStorage.getItem(key));
}
export function sessionStorageRemoveItem(key) {
  return window.sessionStorage.removeItem(key);
}
export function sessionStorageRemoveAll() {
  return window.sessionStorage.clear();
}
export function currencyFormatter(amount, code) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: code,
  }).format(amount);
}
export function showDateTime(date) {
  if (date === '' || date === undefined || date === null || date === '-') {
    return '';
  }
  let inputdate = moment(date);
  return moment.utc(inputdate).local().format('DD-MM-YYYY h:mm A');
}
  
export function LoanshowDateTime(date) {
    if (date === '' || date === undefined || date === null || date === '-') {
      return '';
    }
    let inputdate = moment(date);
    return moment.utc(inputdate).format('DD-MM-YYYY h:mm A');
  }

export function showZoneDate(date) {
  if (date === '' || date === undefined || date === null || date === '-') {
    return '';
  }
  let inputdate = moment(date);
  return moment.utc(inputdate).local().format('DD-MM-YYYY');
}
export function showZoneTime(time) {
  if (time === '' || time === undefined || time === null || time === '-') {
    return '';
  }
  let inputtime = moment(time);
  return moment.utc(inputtime).local().format('h:mm a');
}
export function textCapitalize(data) {
  if (data !== undefined && data !== null && data !== '') {
    return data.charAt(0).toUpperCase() + data.slice(1);
  } else {
    return data;
  }
}
export function textUppercase(data) {
  if (data !== undefined && data !== null && data !== '') {
    return data.toUpperCase();
  } else {
    return data;
  }
}
export function parseJson(jsondata) {
  return JSON.parse(jsondata);
}
export function stringifyJson(jsondata) {
  return JSON.stringify(jsondata);
}
export function reloadWindow() {
  return window.location.reload();
}
export function reloadWindowToPath(pathtoload) {
  return (window.location.href = pathtoload);
}
export const isInvalidEmail = (email) => {
  let eRegex =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return !eRegex.test(email);
};
export const passwordValidations = (value) => {
  let strongRegex = new RegExp(
    '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})'
  );
  return !strongRegex.test(value);
};
export const number = (value) => {
  return !/^\d+$/.test(value);
};
export const isInvalidName = (value) => {
  let nameRegex = /^[a-zA-Z ]+$/;
  return !nameRegex.test(value);
};
export const isNamewithSpace = (value) => {
  let nameRegex = /^[a-zA-z]+([\s][a-zA-Z]+)*$/;
  return !nameRegex.test(value);
};
export const isNameCheck = '^[A-za-z0-9]{3,16}$';

export const isValidPhone = (value) => {
  let phoneRegex =
    /^(?:(?:\+|0{0,2})91(\s*[\ -]\s*)?|[0]?)?[6789]\d{9}|(\d[ -]?){10}\d$/gm;
  return !phoneRegex.test(value);
};
export const getFixed = (value) => {
  return Math.round(parseFloat(value) * 100) / 100;
};
export const isDisabledDate = (current) => {
  return current < moment().subtract(1, 'days').endOf('day');
};
export function masking(value) {
  let input = value;
  input = input.toString().replace(/^(\d{0,4})(\d{0,3})/, '$1 $2');
  let prefix = input.substr(0, input.length - 4);
  let suffix = input.substr(-4);
  let masked = prefix.replace(/\d/g, 'X');
  let a = masked + suffix;
  return a;
}
export function roundAmount(value) {
  return Math.round(parseFloat(value) * 100) / 100;
}
export const calculatePercent = (value, percent) => {
  return value === 0 || value === '' ? 0 : roundAmount((value * percent) / 100);
};
export const percentage = (value, percent) => {
  return (value * percent) / 100;
};
export const multiply = (value1, value2) => {
  return roundAmount(value1 * value2);
};
export function toFixed(value) {
  return Number(value).toFixed(2);
}
export function dateString(date) {
  return date !== '' && date !== isNaN ? date.format('YYYY-MM-DD') : '';
}
export function checkMapList(val) {
  if (typeof val == 'object' && val.length >= 1) {
    return true;
  }
  return false;
}


export function downloadImage(url, name) {
  axios({
    url: url,
    // url : url.replace("https://ippostore.s3.ap-south-1.amazonaws.com","https://storeapi.ippopay.com/ippostore"),
    method: 'GET',
    responseType: 'arraybuffer',
  })
    .then((response) => {
      const contentDisposition = response.headers['content-disposition'];
      let fileName = name;
      if (contentDisposition) {
        const match = contentDisposition.match(/filename="(.+)"/);
        if (match && match[1]) {
          fileName = match[1];
        }
      }
      const blob = new Blob([response.data]);
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = fileName;
      link.click();
      window.URL.revokeObjectURL(link.href);
    })
    .catch((error) => {
      console.log(error?.response?.status);
      if (error?.response?.status === 403) {
        toast.error('Image URL TIMEOUT - Reload Page');
      } else {
        toast.error('Image Download Error');
      }
    });
}

export const omitEmptyValues = (data) => {
  const processedData = {};
  for (const key in data) {
    if (data[key] !== '' && data[key] !== null) {
      processedData[key] = data[key];
    }
  }
  return processedData;
};


// COOKIES DUPLICATION PREVENTION //

function getCookievalue(name) {
  let nameEQ = name + "=";
  let cookies = document.cookie.split(';');
  for (let i = 0; i < cookies.length; i++) {
      let cookie = cookies[i];
      while (cookie.charAt(0) === ' ') {
          cookie = cookie.substring(1, cookie.length);
      }
      if (cookie.indexOf(nameEQ) === 0) {
          return cookie.substring(nameEQ.length, cookie.length);
      }
  }
  return null;
}

function deleteCookie(name) {
document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}

export function updateCookie(name, cookieValue) {
if (getCookievalue(name) !== null) {
    deleteCookie(name);
}
setCookie(name,cookieValue);
}
