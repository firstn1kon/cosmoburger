import PropTypes from 'prop-types';

export const burgerIngredientsPropTypes = PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string,
    type: PropTypes.string,
    proteins: PropTypes.number,
    fat: PropTypes.number,
    carbohydrates: PropTypes.number,
    calories: PropTypes.number,
    price: PropTypes.number,
    image: PropTypes.string,
    image_mobile: PropTypes.string,
    image_large: PropTypes.string,
    __v: PropTypes.number,
});

export const ingredientDetailsPropTypes = {
    name: PropTypes.string.isRequired,
    fat: PropTypes.number.isRequired,
    carbohydrates: PropTypes.number.isRequired,
    proteins: PropTypes.number.isRequired,
    image_large: PropTypes.string.isRequired
};

export const orderDetailsPropTypes = {
    uid: PropTypes.string.isRequired
};

export const modalPropTypes = {
    children: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.node
    ]).isRequired,
    title: PropTypes.string,
    close: PropTypes.func.isRequired
};

export const modalOverlayPropTypes = {
    close: PropTypes.func.isRequired
};


export const ingredientPropTypes= {
    data: PropTypes.arrayOf(burgerIngredientsPropTypes).isRequired,
    type: PropTypes.string.isRequired
  }; 

export const viewIngredientPropTypes = {
    data: burgerIngredientsPropTypes.isRequired,
  }; 

export const burgerConstructorPropTypes = {
    data: PropTypes.arrayOf(burgerIngredientsPropTypes).isRequired
};


