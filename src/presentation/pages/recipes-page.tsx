import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Plus, UtensilsCrossed, Clock, BookOpen, ShieldCheck } from 'lucide-react';

export const RecipesPage: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col justify-between gap-4 border-b pb-5 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight sm:text-3xl">Recipe Catalog</h1>
          <p className="mt-1 text-sm text-muted-foreground sm:text-base">
            Transparent meals with line-by-line gram weights and verified nutrient calculations.
          </p>
        </div>
        <Button className="shrink-0 gap-2" disabled title="Recipe creation will be enabled in P2">
          <Plus className="h-4 w-4" /> New Recipe (P2)
        </Button>
      </div>

      {/* Provenance and Nutrition Guarantee Banner */}
      <div className="flex items-start gap-3 rounded-lg border bg-muted/30 p-4 text-sm">
        <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-emerald-500" />
        <div>
          <p className="font-semibold text-foreground">Verified Nutrition Math Guarantee</p>
          <p className="mt-0.5 text-xs text-muted-foreground">
            Every recipe computes its calories and macros strictly by multiplying ingredient gram
            weights with verified nutrient datasets (USDA FoodData Central CC0 and Vietnam National
            Institute of Nutrition). No AI estimation or guessed numbers.
          </p>
        </div>
      </div>

      {/* Demonstration Card of Transparent Math */}
      <div className="space-y-4">
        <h2 className="flex items-center gap-2 text-lg font-semibold">
          <BookOpen className="h-5 w-5 text-primary" /> Recipe Structure Demonstration
        </h2>

        <Card>
          <CardHeader>
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <CardTitle className="text-xl">Chicken, Rice & Broccoli Bowl</CardTitle>
                <CardDescription className="mt-1 flex items-center gap-3 text-xs">
                  <span className="flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" /> 30 min cook time
                  </span>
                  <span>•</span>
                  <span>1 serving</span>
                  <span>•</span>
                  <Badge variant="outline" className="text-[10px]">
                    High Protein
                  </Badge>
                </CardDescription>
              </div>
              <div className="text-right">
                <span className="text-2xl font-bold text-primary">56.5 g</span>
                <span className="block text-xs text-muted-foreground">Protein / 684 kcal</span>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {/* Table of Line-by-Line Math */}
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b text-xs text-muted-foreground">
                    <th className="py-2 font-medium">Ingredient</th>
                    <th className="py-2 font-medium">Gram Weight</th>
                    <th className="py-2 font-medium">Protein (g)</th>
                    <th className="py-2 font-medium">Calories (kcal)</th>
                    <th className="py-2 font-medium">Provenance</th>
                  </tr>
                </thead>
                <tbody className="divide-y text-xs sm:text-sm">
                  <tr>
                    <td className="py-2.5 font-medium">Chicken breast, raw boneless skinless</td>
                    <td className="py-2.5 text-muted-foreground">200 g</td>
                    <td className="py-2.5 font-semibold text-emerald-600 dark:text-emerald-400">
                      45.0 g
                    </td>
                    <td className="py-2.5">239 kcal</td>
                    <td className="py-2.5 text-xs text-muted-foreground">USDA FDC #171077</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 font-medium">Brown rice, long-grain dry</td>
                    <td className="py-2.5 text-muted-foreground">80 g</td>
                    <td className="py-2.5 font-semibold text-emerald-600 dark:text-emerald-400">
                      6.0 g
                    </td>
                    <td className="py-2.5">294 kcal</td>
                    <td className="py-2.5 text-xs text-muted-foreground">USDA FDC #169704</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 font-medium">Fresh broccoli florets</td>
                    <td className="py-2.5 text-muted-foreground">150 g</td>
                    <td className="py-2.5 font-semibold text-emerald-600 dark:text-emerald-400">
                      3.9 g
                    </td>
                    <td className="py-2.5">47 kcal</td>
                    <td className="py-2.5 text-xs text-muted-foreground">USDA FDC #170379</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 font-medium">Olive oil</td>
                    <td className="py-2.5 text-muted-foreground">10 g</td>
                    <td className="py-2.5 font-semibold text-emerald-600 dark:text-emerald-400">
                      0.0 g
                    </td>
                    <td className="py-2.5">88 kcal</td>
                    <td className="py-2.5 text-xs text-muted-foreground">USDA FDC #171413</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 font-medium">Soy sauce & garlic</td>
                    <td className="py-2.5 text-muted-foreground">21 g</td>
                    <td className="py-2.5 font-semibold text-emerald-600 dark:text-emerald-400">
                      1.6 g
                    </td>
                    <td className="py-2.5">17 kcal</td>
                    <td className="py-2.5 text-xs text-muted-foreground">USDA FDC</td>
                  </tr>
                </tbody>
                <tfoot>
                  <tr className="border-t-2 bg-muted/20 text-sm font-bold">
                    <td className="py-2.5">Total per serving</td>
                    <td className="py-2.5 text-muted-foreground">461 g</td>
                    <td className="py-2.5 text-emerald-600 dark:text-emerald-400">56.5 g</td>
                    <td className="py-2.5">684.3 kcal</td>
                    <td className="py-2.5 text-xs text-muted-foreground">Exact Sum</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Empty State / Future Phase Notice */}
      <Card className="border-dashed">
        <CardContent className="flex flex-col items-center justify-center py-10 text-center">
          <UtensilsCrossed className="mb-3 h-10 w-10 text-muted-foreground" />
          <h3 className="text-base font-semibold">Full Food Catalog & Recipe Editor</h3>
          <p className="mt-1 max-w-md text-sm text-muted-foreground">
            Scheduled for P1 (Food catalog ingestion) and P2 (Custom recipe builder with automatic
            macro computation).
          </p>
        </CardContent>
      </Card>
    </div>
  );
};
