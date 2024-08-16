import knex from 'knex';

const db = knex({
  client: 'mysql2',
  connection: {
    host: 'db',
    user: 'root',
    password: 'password',
    database: 'mydatabase'
  }
});

const findNotificatioSetting =async(id)=>{
  try {
    const priceotification = await db('price_notification')
      .where({ id })
      .first()

    const lineSettings = await db('line')
      .where({ id })
      .first()
    return {id: priceotification.id, virtualCurrencyType: priceotification.virtual_currency_type, targetPrice: priceotification.target_price, lineToken: lineSettings.token};
  } catch (error) {
    console.error('システムエラー');
  }
};

const createNotificatioSetting=async(id)=>{
  
}

export default findNotificatioSetting;