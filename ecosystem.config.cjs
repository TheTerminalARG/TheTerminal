module.exports = {
    apps: [
        {
            name: 'the-terminal',
            script: 'server.js',
            max_memory_restart: '100M',
            instances: '1',
            exec_mode: 'fork',
            env: {
                NODE_ENV: 'production',
            }
        }
    ]
};
