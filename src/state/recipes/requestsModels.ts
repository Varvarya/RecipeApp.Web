import {IngredientType} from '../groceriesSlice/requestsModels';

export type queryParams = {
    RecipeId?: number,
    Title?: string,
    FromCalories?: number,
    ToCalories?: number,
    FromCarbs?: number,
    ToCarbs?: number,
    FromFat?: number,
    ToFat?: number,
    FromProtein?: number,
    ToProtein?: number,
    FromReadyInMinutes?: number,
    ToReadyInMinutes?: number,
    IsVegan?: boolean,
    IsHealthy?: boolean,
    Season?: number,
    DishType?: number,
    GetUserCreatedRecipesOnly?: boolean,
    UseCurrentlyStoredIngredients?: boolean,
    ExcludeForbiddenIngredients?: boolean,
    ConsiderIngredientsAmount?: boolean,
    acceptableMatchIngredientsPercentage?: number
};

export type Recipe = {
    ingredientsMatchingPercentage: number,
    id: number,
    title: string,
    image: string,
    calories: number,
    carbs: number,
    fat: number,
    protein: number,
    readyInMinutes: number,
    vegan: boolean,
    healthy: boolean,
    season: number,
    servings: number,
    summary: string,
    dishType: number,
    'recipeSteps': {
        id: number,
        description: string,
        order: number
    }[],
    ingredients: IngredientType[]
}

