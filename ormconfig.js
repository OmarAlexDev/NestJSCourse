var dbConfig = {
    synchronize: false,
    migrations: ['migrations/*.js'],
    cli: {
        migrationsDir: 'migrations'
    }
};

//npm run typeorm migration:generate -- -n initial-schema -o
//npm run typeorm migration:run

switch(process.env.NODE_ENV){
    case 'development':
        Object.assign(dbConfig,{
            type: 'sqlite',
            database: 'db.sqlite',
            entities: ['**/*.entity.js']
        });
        break;
    
    case 'test':
        Object.assign(dbConfig,{
            type: 'sqlite',
            database: 'test.sqlite',
            entities: ['**/*.entity.ts'],
            migrationsRun: true
        });
        break;

    case 'production':

        break;
    default:
        throw new Error('Unknown environment');

}

module.exports = dbConfig;