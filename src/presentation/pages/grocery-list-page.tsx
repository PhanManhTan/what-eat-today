import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { ShoppingCart, Check, Info, Download } from 'lucide-react';

interface MockGroceryAisle {
  aisle: string;
  items: {
    id: string;
    name: string;
    portionNeeded: string;
    packToBuy: string;
    checked: boolean;
  }[];
}

const INITIAL_AISLES: MockGroceryAisle[] = [
  {
    aisle: 'Meat & Poultry',
    items: [
      {
        id: '1',
        name: 'Boneless Skinless Chicken Breast',
        portionNeeded: '800 g for 4 meals',
        packToBuy: '2 packs (500g each)',
        checked: false,
      },
      {
        id: '2',
        name: 'Chicken Thigh Fillets',
        portionNeeded: '600 g for 2 meals',
        packToBuy: '1 pack (700g)',
        checked: false,
      },
    ],
  },
  {
    aisle: 'Produce (Fresh Fruits & Vegetables)',
    items: [
      {
        id: '3',
        name: 'Fresh Broccoli Heads',
        portionNeeded: '450 g',
        packToBuy: '2 heads (~500g)',
        checked: true,
      },
      {
        id: '4',
        name: 'Bell Peppers (Red & Green)',
        portionNeeded: '400 g',
        packToBuy: '4 peppers',
        checked: false,
      },
      {
        id: '5',
        name: 'Baby Spinach Leaves',
        portionNeeded: '90 g',
        packToBuy: '1 bag (120g)',
        checked: true,
      },
    ],
  },
  {
    aisle: 'Dairy & Eggs',
    items: [
      {
        id: '6',
        name: 'Large Grade-A Eggs',
        portionNeeded: '9 eggs',
        packToBuy: '1 carton (10 or 12 eggs)',
        checked: false,
      },
      {
        id: '7',
        name: 'Liquid Egg Whites',
        portionNeeded: '200 g',
        packToBuy: '1 carton (500g)',
        checked: false,
      },
    ],
  },
  {
    aisle: 'Pantry, Grains & Oils',
    items: [
      {
        id: '8',
        name: 'Brown Rice (Dry)',
        portionNeeded: '320 g',
        packToBuy: '1 bag (1 kg)',
        checked: false,
      },
      {
        id: '9',
        name: 'Extra Virgin Olive Oil',
        portionNeeded: '40 g',
        packToBuy: 'Kitchen staple (in stock)',
        checked: true,
      },
    ],
  },
];

export const GroceryListPage: React.FC = () => {
  const [aisles, setAisles] = useState<MockGroceryAisle[]>(INITIAL_AISLES);

  const toggleItem = (aisleIndex: number, itemId: string) => {
    setAisles((prev) =>
      prev.map((a, i) => {
        if (i !== aisleIndex) return a;
        return {
          ...a,
          items: a.items.map((item) =>
            item.id === itemId ? { ...item, checked: !item.checked } : item
          ),
        };
      })
    );
  };

  const totalCount = aisles.reduce((sum, a) => sum + a.items.length, 0);
  const checkedCount = aisles.reduce((sum, a) => sum + a.items.filter((i) => i.checked).length, 0);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col justify-between gap-4 border-b pb-5 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight sm:text-3xl">Smart Grocery List</h1>
          <p className="mt-1 text-sm text-muted-foreground sm:text-base">
            Sorted by supermarket aisle. Separates the food you eat from what you actually pay for
            at the till.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-xs">
            {checkedCount} / {totalCount} items packed
          </Badge>
          <Button
            variant="outline"
            size="sm"
            className="gap-1.5"
            disabled
            title="Export will be available in P4"
          >
            <Download className="h-3.5 w-3.5" /> Export (P4)
          </Button>
        </div>
      </div>

      {/* Pack vs Portion Notice */}
      <div className="flex items-start gap-3 rounded-lg border bg-muted/30 p-4 text-xs sm:text-sm">
        <Info className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
        <div>
          <p className="font-semibold text-foreground">Portion vs. Pack Size Distinction</p>
          <p className="mt-0.5 text-xs text-muted-foreground">
            A recipe might call for 300g of meat, but shops sell 500g trays. Our grocery engine
            calculates both: the precise nutrients entering your body, and the realistic packs to
            buy so you never waste ingredients.
          </p>
        </div>
      </div>

      {/* Aisles List */}
      <div className="space-y-4">
        {aisles.map((aisleGroup, aIdx) => (
          <Card key={aisleGroup.aisle}>
            <CardHeader className="border-b bg-muted/20 px-5 py-3">
              <CardTitle className="flex items-center justify-between text-sm font-semibold">
                <span>{aisleGroup.aisle}</span>
                <span className="text-xs font-normal text-muted-foreground">
                  {aisleGroup.items.filter((i) => i.checked).length} / {aisleGroup.items.length}{' '}
                  bought
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <ul className="divide-y divide-border">
                {aisleGroup.items.map((item) => (
                  <li
                    key={item.id}
                    onClick={() => toggleItem(aIdx, item.id)}
                    className="flex cursor-pointer items-center justify-between p-4 transition-colors hover:bg-muted/40"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`flex h-5 w-5 items-center justify-center rounded border transition-colors ${
                          item.checked
                            ? 'border-primary bg-primary text-primary-foreground'
                            : 'border-muted-foreground/40'
                        }`}
                      >
                        {item.checked && <Check className="h-3.5 w-3.5" />}
                      </div>
                      <div>
                        <span
                          className={`text-sm font-medium ${
                            item.checked ? 'text-muted-foreground line-through' : 'text-foreground'
                          }`}
                        >
                          {item.name}
                        </span>
                        <div className="mt-0.5 flex items-center gap-2 text-xs text-muted-foreground">
                          <span>Portion: {item.portionNeeded}</span>
                          <span>•</span>
                          <span className="font-medium text-foreground/80">
                            To Buy: {item.packToBuy}
                          </span>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex items-center justify-center gap-1.5 py-2 text-center text-xs text-muted-foreground">
        <ShoppingCart className="h-4 w-4 text-primary" />
        <span>Full automatic shopping list synthesis from active weekly plans arrives in P4.</span>
      </div>
    </div>
  );
};
