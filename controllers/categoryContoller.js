import { categoryServices } from '../services';
import { wrapAsync } from '../utils/wrapAsync'

const getCategory = wrapAsync(async (req, res) => {
  const category = await categoryServices.getCategory();
  res.status(200).json({
    message: 'SUCCESS',
    category,
  });
});

export default { getCategory };
