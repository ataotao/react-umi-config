// 验证是否为空值（包含 null, [],{}, undefined ）
export function isEmpty(obj) {
    if (obj === null) {
        return true;
    }
    if (isArray(obj) || isString(obj)) {
        return obj.length === 0;
    }

    for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
            return false;
        }
    }

    if (!isNaN(obj)) {
        return false;
    }

    return true;
}
// 验证字符串
export function isString(obj) {
    return typeof obj === 'string';
    // return toString.call(obj) === '[object String]';
}

// 验证数组
export function isArray(obj) {
    // return obj instanceof Array;
    return toString.call(obj) === '[object Array]';
}
// 验证函数
export function isFunction(obj) {
    return typeof obj === 'function';
    // return toString.call(obj) === '[object Function]';
}
// 验证对象
export function isObject(obj) {
    return obj === Object(obj) && !isArray(obj);
    // return obj instanceof Object;
    // return typeOf(obj, "object");
}

// 验证空对象{}
export function isEmptyObject(obj) {
    if (isObject(obj)) {
        for (let name in obj) {
            return false;
        }
        return true;
    } else {
        return false;
    }
}

// 表单验证-手机号码验证
export function validateTel(value) {
    let regExp = /^(13[0-9]|15[012356789]|17[0-9]|18[0-9]|14[57])[0-9]{8}$/;
    return regExp.test(value);
}

// 去左右空格及双引号、换行符
export function trim(s) {
    return typeof s === 'string'
        ? s.replace(/(^ +)|(["'\f\n\r\t\v])|( +$)/g, '')
        : s;
}

// 根据传入的key对数组排序
export function arrSort(arr, key) {
    arr.sort(function(a, b) {
        // return a[key] - b[key];
        return a[key].localeCompare(b[key]);
    });
    return arr;
}

// 设置本地存储
export function setLocal(key, data) {
    window.localStorage.setItem(key, JSON.stringify(data));
}

// 获取本地存储
export function getLocal(key) {
    return JSON.parse(localStorage.getItem(key));
}

// 移除本地存储
export function removeLocal(key) {
    window.localStorage.removeItem(key);
}

/**
 * 原生js addClass removeClass hasClass
 */
export function hasClass(elem, cls) {
    cls = cls || '';
    if (cls.replace(/\s/g, '').length === 0) return false; //当cls没有参数时，返回false
    return new RegExp(' ' + cls + ' ').test(' ' + elem.className + ' ');
}

export function addClass(ele, cls) {
    if (!hasClass(ele, cls)) {
        ele.className = ele.className === '' ? cls : ele.className + ' ' + cls;
    }
}

export function removeClass(ele, cls) {
    if (hasClass(ele, cls)) {
        var newClass = ' ' + ele.className.replace(/[\t\r\n]/g, '') + ' ';
        while (newClass.indexOf(' ' + cls + ' ') >= 0) {
            newClass = newClass.replace(' ' + cls + ' ', ' ');
        }
        ele.className = newClass.replace(/^\s+|\s+$/g, '');
    }
}

// 获取当前css样式属性值
export function getStyle(obj, attr) {
    if (obj.currentStyle) {
        return obj.currentStyle[attr];
    } else {
        return document.defaultView.getComputedStyle(obj, null)[attr];
        //   return window.getComputedStyle(obj, null)[attr];
    }
}

// 判断传入对象的每个key是否为空对象、空数组或者空字符串，返回非空的序列
export function returnNonEmpty(obj) {
    let _o = {};
    for (let key in obj) {
        if (
            obj[key] !== '' ||
            (isArray(obj[key]) && obj.length > 0) ||
            isEmptyObject(obj[key])
        ) {
            _o[key] = obj[key];
        }
    }
    return _o;
}

// 模拟休眠
export function sleep(timeountMS) {
    return new Promise(resolve => {
        setTimeout(resolve, timeountMS);
    });
}

// 数组去重
export function uniqueArr(arr) {
    let res = Array.from(new Set(arr)).sort();
    return res;
}

// 深拷贝引用类型数据
export function clone(initialObj, finalObj) {
    function _deepClone(initialObj, finalObj, conflict) {
        var i;
        if (
            initialObj &&
            typeof initialObj === 'object' &&
            (i = [Object, Array].indexOf(initialObj.constructor)) !== -1
        ) {
            if (!finalObj) {
                finalObj = initialObj.constructor === Array ? [] : {};
            }
            if (conflict) {
                i = conflict.k.indexOf(initialObj);
                if (i !== -1) {
                    return conflict.v[i];
                }
                conflict.k.push(initialObj);
                conflict.v.push(finalObj);
            }
            for (var key in initialObj) {
                finalObj[key] = _deepClone(
                    initialObj[key],
                    finalObj[key],
                    conflict
                );
            }
            return finalObj;
        }
        return initialObj;
    }
    return _deepClone(initialObj, finalObj, {
        k: [],
        v: []
    });
}

// 判断url
export function isUrl(path) {
    /* eslint no-useless-escape:0 */
    const reg = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/g;
    return reg.test(path);
}
