import React from 'react';
import {Recipe} from '../state/recipes/requestsModels';

export type OnClickEvent = React.MouseEvent<HTMLButtonElement> & {
    id: string;
}

export type MealPlan = {
    mealPlanDate: string,
    mealPlanDays: MealRecipe[]
}

export type MealRecipe = {
    recipeId: number,
    servings: number,
    // recipe: {
    //
    //     ingredientsMatchingPercentage: number | null,
    //     id: number,
    //     title: string,
    //     image: string,
    //     calories: number,
    //     carbs: number,
    //     fat: number,
    //     protein: number,
    //     readyInMinutes: number,
    //     vegan: boolean,
    //     healthy: boolean,
    //     season: number,
    //     servings: number,
    //     summary: string,
    //     dishType: number,
    //     recipeSteps: {
    //         id: number,
    //         description: string,
    //         order: number
    //     }[],
    //     ingredients: IngredientType[]
    // },
    recipe: Recipe
    ingestion: {
        order: number,
        dishType: number,
        dayOfWeek: number
    }
}
