import { apiClient, ApiResponse } from './apiClient.ts';
import { Recipe } from '../types/index.ts';
import { RECIPES } from '../data/recipes.ts';

export class RecipeService {
  /**
   * Retrieves full catalog of RecipeDB dishes
   */
  async getAllRecipes(): Promise<ApiResponse<Recipe[]>> {
    return apiClient.get<Recipe[]>('/recipedb/recipes', RECIPES);
  }

  /**
   * Retrieves a single recipe by its unique ID
   */
  async getRecipeById(id: string): Promise<Recipe | undefined> {
    const res = await apiClient.get<Recipe[]>('/recipedb/recipes', RECIPES);
    return res.data.find(r => r.id === id);
  }

  /**
   * Searches recipes by ingredient, dish title, or cuisine
   */
  async searchRecipes(query: string): Promise<Recipe[]> {
    const cleanQuery = query.toLowerCase().trim();
    if (!cleanQuery) return RECIPES;

    return RECIPES.filter(recipe => {
      const matchTitle = recipe.title.toLowerCase().includes(cleanQuery);
      const matchCuisine = recipe.cuisine.toLowerCase().includes(cleanQuery);
      const matchChef = recipe.chefName.toLowerCase().includes(cleanQuery);
      const matchIngredient = recipe.ingredients.some(ing => ing.name.toLowerCase().includes(cleanQuery));
      const matchDietary = recipe.dietaryTags.some(tag => tag.toLowerCase().includes(cleanQuery));

      return matchTitle || matchCuisine || matchChef || matchIngredient || matchDietary;
    });
  }

  /**
   * Discovers recipes sharing specific computational gastronomy flavor compounds
   */
  async getRelatedRecipesByIngredients(ingredientNames: string[]): Promise<Recipe[]> {
    const targets = ingredientNames.map(i => i.toLowerCase().trim());
    return RECIPES.filter(recipe => 
      recipe.ingredients.some(ing => 
        targets.some(target => ing.name.toLowerCase().includes(target))
      )
    );
  }
}

export const recipeService = new RecipeService();
