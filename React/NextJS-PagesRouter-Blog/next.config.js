const {PHASE_DEVELOPMENT_SERVER} = require("next/constants")

module.exports = function (phase) {
    if (phase === PHASE_DEVELOPMENT_SERVER){
        return {
            env: {
                mongodb_username: 'german_ss22',
                mongodb_password: 'coder1234',
                mongodb_clustername: 'Cluster0',
                mongodb_database: 'my-site-dev'
            }
        }
    }
    
    return {
        env: {
            mongodb_username: 'german_ss22',
            mongodb_password: 'coder1234',
            mongodb_clustername: 'Cluster0',
            mongodb_database: 'my-site'
        }
    }
}