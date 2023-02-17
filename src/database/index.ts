import { Sequelize } from 'sequelize';
import { DATABASE_URI } from '../shared/constants/global.constants';

export const sequelize = new Sequelize(DATABASE_URI);

export const useDbConnection = async () => {

    await sequelize.authenticate({ logging: false })
        .then(() => console.debug('[DATABASE] Connection success'))
        .catch((error) => console.error('[DATABASE] Connection error: ', error?.message));

    sequelize.sync({ force: false })
        .then(() => console.debug('[DATABASE] Tables async'))
        .catch((error) => console.error(error?.message));
}
