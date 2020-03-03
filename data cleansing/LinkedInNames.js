var firstNameCleanse = (str) => /(?<=\().+?(?=\))|(?<="|').+?(?="|')|(?<=[a-zA-Z]{1,3}\.\s)\S+/.exec(str) ? /(?<=\().+?(?=\))|(?<="|').+?(?="|')|(?<=[a-zA-Z]{1,3}\.\s)\S+/.exec(str)[0] : /\S+/.exec(str) ? /\S+/.exec(str)[0] : str;
var lastNameCleanse = (str) => str[1] && /[a-z]/.test(str[1]) ? str.replace(/\s*[,-]\s*[A-Z\s-,]{3,}/,'').replace(/\s*,.+/, '') : str;
var fixCase = (s) => s && typeof s === 'string' ? s.split(/\b/).map(el=> el.replace(/\w\S*/g, txt=> txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase())).join('').replace(/(?<=\bMc)\w/ig, t=> t.charAt(0).toUpperCase()) : false;
