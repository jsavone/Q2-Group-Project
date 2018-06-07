module.exports = {
  development: {
      client: 'pg',
      connection: {
        database: "cooks-club",
        host: "localhost"
      },
      migrations: {
          directory: __dirname + '/db/migrations',
        },
      seeds: {
          directory: __dirname + '/db/seeds',
        },
    },
  production: {
      client: 'pg',
      connection: process.env.postgres://xmgqbenumchuxx:1a18fcf75a3c3e3113177bce5731f8e41b5799d84d68194177c71f93fed347ed@ec2-54-235-252-23.compute-1.amazonaws.com:5432/dco385u19s7crm,
      migrations: {
          directory: __dirname + '/db/migrations',
        },
      seeds: {
          directory: __dirname + '/db/seeds',
          // directory: __dirname + '/db/seeds/production',
        },
    },
};
