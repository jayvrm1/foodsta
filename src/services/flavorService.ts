import { apiClient, ApiResponse } from './apiClient.ts';
import { IngredientFlavorData, FlavorCompound } from '../types/index.ts';
import { FLAVOR_INGREDIENTS, FLAVOR_COMPOUNDS } from '../data/flavorData.ts';
import { calculateSharedCompoundAffinity } from './gastronomyLogic.ts';

export class FlavorService {
  /**
   * Retrieves all cataloged ingredients with scientific flavor descriptors
   */
  async getAllIngredients(): Promise<ApiResponse<IngredientFlavorData[]>> {
    return apiClient.get<IngredientFlavorData[]>('/flavordb/ingredients', FLAVOR_INGREDIENTS);
  }

  /**
   * Retrieves a specific ingredient by ID or name
   */
  async getIngredient(identifier: string): Promise<IngredientFlavorData | undefined> {
    const clean = identifier.toLowerCase().trim();
    return FLAVOR_INGREDIENTS.find(
      ing => ing.id === clean || ing.name.toLowerCase() === clean || ing.name.toLowerCase().includes(clean)
    );
  }

  /**
   * Explores molecular flavor pairing between two or more ingredients
   * FlavorDB provides compound-level insight; note: FlavorDB supports pairing exploration,
   * not artificial taste judgment.
   */
  analyzePairing(ingredientA: IngredientFlavorData, ingredientB: IngredientFlavorData) {
    const compoundsA = ingredientA.compounds.map(c => c.name);
    const compoundsB = ingredientB.compounds.map(c => c.name);

    const affinity = calculateSharedCompoundAffinity(compoundsA, compoundsB);

    return {
      ingredientA: ingredientA.name,
      ingredientB: ingredientB.name,
      synergyIndex: affinity.affinityScore,
      sharedCompounds: affinity.sharedList,
      totalShared: affinity.sharedCount,
      scientificNotes: `Identified ${affinity.sharedCount} shared aromatic volatiles. FlavorDB scientific analysis indicates potential harmonic alignment across sensory receptors.`
    };
  }

  /**
   * Retrieves flavor compound library
   */
  getCompoundLibrary(): Record<string, FlavorCompound> {
    return FLAVOR_COMPOUNDS;
  }
}

export const flavorService = new FlavorService();
