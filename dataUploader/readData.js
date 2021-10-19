const csv = require('csv-parser');
const fs = require('fs');
const { Prisma, PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const csvData = [];

const InsertData = fileName => {
  const filePath = `dataUploader/csv/${fileName}.csv`;
  fs.createReadStream(filePath)
    .pipe(csv())
    .on('data', async data => {
      let query = '';
      if (fileName === 'mainCategory')
        query = Prisma.sql`INSERT INTO main_categories (id, name) VALUES (${data.id}, ${data.name})`;
      if (fileName === 'subCategory')
        query = Prisma.sql`INSERT INTO sub_categories (id, name, main_category_id) VALUES (${data.id}, ${data.name}, ${data.main_category_id})`;
      if (fileName === 'shipment')
        query = Prisma.sql`INSERT INTO shipments (id, shipment) VALUES (${data.id}, ${data.shipment})`;
      if (fileName === 'productShipment')
        query = Prisma.sql`INSERT INTO products_shipments (product_id, shipment_id) VALUES (${data.product_id}, ${data.shipment_id})`;
      if (fileName === 'productThumbnail')
        query = Prisma.sql`INSERT INTO products_thumbnails (image_url, is_main, product_id, id) VALUES (${data.image_url}, ${data.is_main}, ${data.product_id}, ${data.id})`;
      if (fileName === 'product')
        query = Prisma.sql`INSERT INTO products (name, price, discounted_price, description, storage, clicked, shipping_company, main_category_id, sub_category_id) VALUES 
        (${data.name},${data.price}, ${data.discounted_price}, ${data.description}, ${data.storage}, ${data.clicked}, ${data.shipping_company}, ${data.main_category_id}, ${data.sub_category_id})`;
      if (fileName === 'comment')
        query = Prisma.sql`INSERT INTO comments (scores, comment, image_url, user_id, product_id) VALUES (${data.scores},${data.comment}, ${data.image_url}, ${data.user_id}, ${data.product_id})`;
      try {
        csvData.push(data);
        await prisma.$queryRaw`
          ${query}`;
      } catch (err) {
        console.log(err);
      }
    })
    .on('end', async () => {
      await console.log('csvData: ', csvData);
      prisma.$disconnect();
    });
};

async function insertAllData() {
  const files = [
    'mainCategory',
    'subCategory',
    'product',
    'shipment',
    'productThumbnail',
    'productShipment',
    'comment',
  ];

  for await (let file of files) {
    await InsertData(file);
  }
}

insertAllData();
