class Cache {
    constructor() {
        this.data = {};
    }
    set = (key,value) => {
        this.data[key] = new CacheObject(value);
    }
    get = async (key,getFn,getFnParams,parseFn) => {
        if(this.data[key] && (Date.now() - this.data[key].timeStamp < 1.08e+7)) {
            console.log('cache hit!');
        } else {
            console.log('cache miss!');
            let res = await getFn(...getFnParams);
            res = parseFn(res);
            this.set(key,res);
            console.log(this.data[key]);
        }
        return this.data[key];
    }
}
class CacheObject {
    constructor(value) {
        this.value = value;
        this.timeStamp = Date.now();
    } 
}

const cache = new Cache();

module.exports = cache;