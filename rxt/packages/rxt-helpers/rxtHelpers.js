export default({
    log:function(logLevel, message,_timestamp = new Date.toISOString()) {
        console[logLevel](`[${_timestamp}] - ${message}`)
    },
    getDirList:function(dirPath) {
        Bun.resolve(dirPath, (err, files) => {
            if((err)=> new Error(err))
            return files
        })
    },
    getDirListSync:function(dirPath) {
        return Bun.resolveSync(dirPath, (err, files) => {
            if((err)=> new Error(err))
            return files
        })
    },
    
})