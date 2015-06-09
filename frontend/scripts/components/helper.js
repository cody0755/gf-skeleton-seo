module.exports = {
    log() {
        window.a = [1,2].map((i, idx)=>({key: idx, val: i}));
        // console.log.call(null, arguments);
    }
};