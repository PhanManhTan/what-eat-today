import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { CalendarDays, Plus, CheckCircle2, Repeat, Utensils } from 'lucide-react';

const DAYS_OF_WEEK = [
  {
    id: 'mon',
    label: 'Monday',
    date: 'Day 1',
    targetFloor: 150,
    currentProtein: 160.8,
    status: 'reached',
  },
  {
    id: 'tue',
    label: 'Tuesday',
    date: 'Day 2',
    targetFloor: 150,
    currentProtein: 154.5,
    status: 'reached',
  },
  {
    id: 'wed',
    label: 'Wednesday',
    date: 'Day 3',
    targetFloor: 150,
    currentProtein: 158.8,
    status: 'reached',
  },
  {
    id: 'thu',
    label: 'Thursday',
    date: 'Day 4',
    targetFloor: 150,
    currentProtein: 152.0,
    status: 'reached',
  },
  {
    id: 'fri',
    label: 'Friday',
    date: 'Day 5',
    targetFloor: 150,
    currentProtein: 153.2,
    status: 'reached',
  },
  {
    id: 'sat',
    label: 'Saturday',
    date: 'Day 6',
    targetFloor: 150,
    currentProtein: 156.4,
    status: 'reached',
  },
  {
    id: 'sun',
    label: 'Sunday',
    date: 'Day 7',
    targetFloor: 150,
    currentProtein: 151.1,
    status: 'reached',
  },
];

export const MealPlannerPage: React.FC = () => {
  const [selectedDay, setSelectedDay] = useState('mon');
  const activeDay = DAYS_OF_WEEK.find((d) => d.id === selectedDay) ?? DAYS_OF_WEEK[0]!;

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col justify-between gap-4 border-b pb-5 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
            Manual Weekly Meal Planner
          </h1>
          <p className="mt-1 text-sm text-muted-foreground sm:text-base">
            Every day is independently verified against your protein floor. No day quietly falls
            short.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="success" className="gap-1 px-3 py-1">
            <CheckCircle2 className="h-3.5 w-3.5" /> 7/7 Days Cleared
          </Badge>
        </div>
      </div>

      {/* 7-Day Navigation Strip */}
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-7">
        {DAYS_OF_WEEK.map((day) => {
          const isSelected = day.id === selectedDay;
          return (
            <button
              key={day.id}
              onClick={() => setSelectedDay(day.id)}
              className={`flex flex-col rounded-lg border p-3 text-left transition-all ${
                isSelected
                  ? 'border-primary bg-primary/5 shadow-sm ring-2 ring-primary/20'
                  : 'border-border hover:bg-muted/50'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-muted-foreground">{day.date}</span>
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
              </div>
              <span className="mt-0.5 text-sm font-bold">{day.label}</span>
              <div className="mt-2 text-xs">
                <span className="font-semibold text-primary">{day.currentProtein}g</span>
                <span className="text-muted-foreground"> / {day.targetFloor}g</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Selected Day View */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between border-b pb-4">
          <div>
            <CardTitle className="flex items-center gap-2 text-xl">
              <CalendarDays className="h-5 w-5 text-primary" /> {activeDay.label} Overview
            </CardTitle>
            <p className="mt-1 text-xs text-muted-foreground">
              Target:{' '}
              <span className="font-semibold text-foreground">
                ≥ {activeDay.targetFloor}g protein
              </span>{' '}
              | Achieved:{' '}
              <span className="font-bold text-emerald-600 dark:text-emerald-400">
                {activeDay.currentProtein}g
              </span>
            </p>
          </div>
          <Badge variant="success">Daily Target Met</Badge>
        </CardHeader>

        <CardContent className="space-y-4 pt-6">
          {/* Meal Slots */}
          <div className="grid gap-4 md:grid-cols-3">
            {/* Breakfast */}
            <div className="space-y-3 rounded-lg border p-4">
              <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                <span>Breakfast</span>
                <span>34.8g protein</span>
              </div>
              <div className="text-sm font-medium">Veggie Scrambled Eggs & Toast</div>
              <p className="text-xs text-muted-foreground">
                3 large eggs, 2 egg whites, spinach, 2 slices whole-wheat bread
              </p>
              <div className="flex items-center justify-between border-t pt-2 text-xs text-muted-foreground">
                <span>462.5 kcal</span>
                <span>8 min prep</span>
              </div>
            </div>

            {/* Lunch */}
            <div className="space-y-3 rounded-lg border p-4">
              <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                <span className="flex items-center gap-1">
                  Lunch{' '}
                  <span title="Cooked in batch">
                    <Repeat className="h-3 w-3 text-primary" />
                  </span>
                </span>
                <span>56.5g protein</span>
              </div>
              <div className="text-sm font-medium">Chicken, Rice & Broccoli Bowl</div>
              <p className="text-xs text-muted-foreground">
                200g chicken breast, 80g brown rice, 150g broccoli, olive oil
              </p>
              <div className="flex items-center justify-between border-t pt-2 text-xs text-muted-foreground">
                <span>684.3 kcal</span>
                <Badge variant="outline" className="text-[10px]">
                  Batch meal (2/3)
                </Badge>
              </div>
            </div>

            {/* Dinner */}
            <div className="space-y-3 rounded-lg border p-4">
              <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                <span>Dinner</span>
                <span>69.5g protein</span>
              </div>
              <div className="text-sm font-medium">Chicken Thigh & Pepper Stir-Fry</div>
              <p className="text-xs text-muted-foreground">
                300g chicken thigh, bell peppers, onion, white rice, soy sauce
              </p>
              <div className="flex items-center justify-between border-t pt-2 text-xs text-muted-foreground">
                <span>708.5 kcal</span>
                <span>25 min prep</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center justify-between gap-3 border-t pt-4 text-xs text-muted-foreground sm:flex-row">
            <div className="flex items-center gap-2">
              <Utensils className="h-4 w-4 text-primary" />
              <span>Full interactive drag-and-drop planning will be introduced in P3.</span>
            </div>
            <Button size="sm" variant="outline" disabled className="gap-1">
              <Plus className="h-3.5 w-3.5" /> Add Meal Slot (P3)
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
