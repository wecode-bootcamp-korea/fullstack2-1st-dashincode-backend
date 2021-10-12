import prisma from '../prisma';

const getCategory = async () => {
  const mainCategory = await prisma.$queryRaw`
  SELECT id, name FROM main_categories ORDER BY id
  `;
  const subCategory = await prisma.$queryRaw`
    SELECT * from sub_categories;
  `;
  return [mainCategory, subCategory];
};

const getNewestProductOfEachCategory = async () => {
  await prisma.$queryRaw`SET sql_mode=(SELECT REPLACE(@@sql_mode,'ONLY_FULL_GROUP_BY',''))`;
  const newestProductOfEachCategory = await prisma.$queryRaw`
    select
      p.id,
      p.name,
      p.main_category_id,
      i.image_url
    from(
      select
        *
      from products
      where (main_category_id, created_at) in (
        select main_category_id, max(created_at) as created_at
        from products group by main_category_id
      )
    order by updated_at desc
    ) p
    JOIN products_thumbnails i
    ON i.product_id = p.id
    group by p.main_category_id
  `;

  return newestProductOfEachCategory;
};

export default {
  getCategory,
  getNewestProductOfEachCategory,
};
