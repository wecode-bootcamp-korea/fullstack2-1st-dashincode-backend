import { categoryServices } from '../services';
import { wrapAsync } from '../utils/wrapAsync';

const getCategory = wrapAsync(async (req, res) => {
  const location = req.params.location;
  const category = await categoryServices.getCategory(location);
  res.status(200).json({
    DATA: category,
    //{id:1, name:다신메이드, list:{"1": "닭가슴살", "3": "요거트"}}
  });
});

const getSliderCategory = wrapAsync(async (req, res) => {
  const category = await categoryServices.getSliderCategory();
  res.status(200).json({
    DATA: category,
  });
});

export default { getCategory, getSliderCategory };
