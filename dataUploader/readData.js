const csv = require('csv-parser');
const fs = require('fs');
const { Prisma, PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const csvData = [];
//fileName만 바꾸시면 테이블별로 데이터베이스에 입력됩니다.
const fileName = 'mainCategory';
const filePath = `dataUploader/csv/${fileName}.csv`;

const InsertData = () => {
  fs.createReadStream(filePath)
    .pipe(csv())
    .on('data', async data => {
      const sort = {
        mainCategory: Prisma.sql`INSERT INTO main_categories (id, name) VALUES (${data.id}, ${data.name})`,
        subCategory: Prisma.sql`INSERT INTO sub_categories (id, name, main_category_id) VALUES (${data.id}, ${data.name}, ${data.main_category_id})`,
        shipment: Prisma.sql`INSERT INTO sub_categories (id, shipment) VALUES (${data.id}, ${data.shipment})`,
        productShipment: Prisma.sql`INSERT INTO products_shipments (product_id, shipment_id) VALUES (${data.product_id}, ${data.shipment_id})`,
        productThumbnail: Prisma.sql`INSERT INTO products_thumbnails (image_url, is_main, product_id) VALUES (${data.image_url}, ${data.is_main}, ${data.product_id})`,
        product: Prisma.sql`INSERT INTO products (name, price, discounted_price, description, storage, clicked, shipping_company, main_category_id, sub_category_id) VALUES 
        (${data.name},${data.price}, ${data.discounted_price}, ${data.description}, ${data.storage}, ${data.clicked}, ${data.shipping_company}, ${data.main_category_id}, ${data.sub_category_id})`,
        comment: Prisma.sql`INSERT INTO comments (scores, comment, image_url, user_id, product_id) VALUES (${data.scores},${data.comment}, ${data.image_url}, ${data.user_id}, ${data.product_id})`,
      };
      try {
        csvData.push(data);
        await prisma.$queryRaw`
          ${
            fileName == 'mainCategory'
              ? sort.mainCategory
              : 'subCategory'
              ? sort.subCategory
              : 'shipment'
              ? sort.shipment
              : 'productShipment'
              ? sort.productShipment
              : 'productThumbnail'
              ? sort.productThumbnail
              : 'product'
              ? sort.product
              : 'comment'
              ? sort.comment
              : prisma.empty
          }
        `;
      } catch (err) {
        console.log(err);
      }
    })
    .on('end', async () => {
      await console.log('csvData: ', csvData);
      prisma.$disconnect();
    });
};

InsertData();
