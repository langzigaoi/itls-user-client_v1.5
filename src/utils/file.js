// 把文件按照二进制形式读取
export function readFile(file) {
    return new Promise(resolve => {
        let reader = new FileReader();
        reader.readAsBinaryString(file);
        reader.onload = res => {
            resolve(res.target.result);
        }
    });
}

// 选择题格式
export let choiceProblem = {
    title : {
        text: '标题',
        type: 'string'
    },
    options : {
        text: '选项',
        type: 'string'
    },
    answer : {
        text: '答案',
        type: 'string'
    },
    analysis : {
        text: '分析',
        type: 'string'
    },
    difficulty : {
        text: '难度',
        type: 'string'
    },
    isDelete : {
        text: '是否删除',
        type: 'string'
    },
    userId : {
        text: '用户Id',
        type: 'number'
    }
}