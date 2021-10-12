import { categoryServices } from '../services';
import { wrapAsync } from '../utils/wrapAsync';

const getCategory = wrapAsync(async (req, res) => {
  const location = req.params.location;
  const category = await categoryServices.getCategory(location);
  res.status(200).json({
    DATA: category,
  });
});

export default {
  getCategory,
};
