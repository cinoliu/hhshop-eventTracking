/**
 * 解析数组类型dataKey
 * 例如list[$INDEX],返回{key:list, index: $INDEX}
 * 例如list[4],返回{key:list, index: 4}
 * @param {*} key
 * @param {*} index
 */

const apis = require('../../utils/apis.js');
const resloveArrayDataKey = (key, index) => {
    const leftBracketIndex = key.indexOf('[');
    const rightBracketIndex = key.indexOf(']');
    const result = {};
    if (leftBracketIndex > -1) {
        let arrIndex = key.substring(leftBracketIndex + 1, rightBracketIndex);
        const arrKey = key.substring(0, leftBracketIndex);
        if (arrIndex === '$INDEX') {
            arrIndex = index;
        }
        result.key = arrKey;
        result.index = parseInt(arrIndex, 10);
    }
    return result;
};

/**
 * 获取全局数据
 * @param {*} key 目前支持$APP.* $DATASET.* $INDEX
 * @param {*} dataset 点击元素dataset
 * @param {*} index 点击元素索引
 */
const getGloabData = (key, dataset) => {
    let result = '';
    if (key.indexOf('$APP.') > -1) {
        const App = getApp();
        const appKey = key.split('$APP.')[1];
        result = App[appKey];
    } else if (key.indexOf('$DATASET.') > -1) {
        const setKey = key.split('$DATASET.')[1];
        result = dataset[setKey];
    } else if (key.indexOf('$INDEX') > -1) {
        result = dataset.index;
    }
    return result;
};

const getPageData = (key, dataset = {}, paegData) => {
    const { index } = dataset;
    const keys = key.split('.');
    let result = paegData;
    if (keys.length > -1) {
        keys.forEach((name) => {
            const res = resloveArrayDataKey(name, index);
            if (res.key) {
                result = result[res.key][res.index];
            } else {
                result = result[name];
            }
        });
    } else {
        result = paegData[key];
    }
    return result;
};

const dataReader = (key, dataset, pageData) => {
    try {
        let result = '';
        if (key.indexOf('$') === 0) {
            result = getGloabData(key, dataset);
        } else {
            result = getPageData(key, dataset, pageData);
        }
        return result;
    } catch (e) {
        console.log(e);
        return '';
    }
};

const report = (track, pageData) => {
    try {
        const { element, method, remark } = track;
        const logger = [];
        for (var i = 0; i < track.dataList.length; i++) {
            var keys = Object.keys(track.dataList[i]).toString()
            var name = Object.values(track.dataList[i]).toString()
            var data = dataReader(name, track.dataset, pageData)
            var item = {};
            item[keys] = data
            logger.push(item)
        }
        if (track.is_debug) {
            if (element) {
                console.group("[" + element + ">>>埋点数据]", JSON.stringify(logger))
            }
            if (method) {
                console.group("[" + method + ">>>埋点数据]", JSON.stringify(logger))
            }
        }
        apis.uploadLog({
            logger: logger,
            remark: remark
        });
    } catch (e) {
        console.log(e);
        return '';
    }


};


export default report;