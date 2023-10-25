import { createSelector } from 'reselect';

const selectCategoryReducer = (state) => state.categories;

export const selectCategories = createSelector(
    [selectCategoryReducer],
    (categoriesReducerData) => categoriesReducerData.categories
);

export const selectCategoriesMap = createSelector(
    [selectCategories],
    (categories) => categories.reduce((previousVal, currentVal) => {
        const {title, items} = currentVal;

        previousVal[title.toLowerCase()] = items;

        return previousVal;
    }, {})
);

export const selectCategoriesIsLoading = createSelector(
    [selectCategoryReducer],
    (categoriesReducerData) => categoriesReducerData.isLoading
)