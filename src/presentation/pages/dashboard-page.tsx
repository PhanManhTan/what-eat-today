import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Link } from 'react-router-dom';
import {
  Flame,
  Dumbbell,
  Scale,
  Calendar,
  Utensils,
  ShoppingCart,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';
import {
  calculateUserTargets,
  type CalculatedTargets,
} from '@/application/use-cases/calculate-user-targets.use-case';
import { DexieUserProfileRepository } from '@/infrastructure/repositories/dexie-user-profile.repository';
import type { UserProfile } from '@/domain/entities/user-profile';

const userProfileRepo = new DexieUserProfileRepository();

export const DashboardPage: React.FC = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [targets, setTargets] = useState<CalculatedTargets | null>(null);

  useEffect(() => {
    userProfileRepo.getProfile().then((p) => {
      setProfile(p);
      setTargets(calculateUserTargets(p));
    });
  }, []);

  return (
    <div className="space-y-8">
      {/* Welcome Hero */}
      <div className="flex flex-col justify-between gap-4 border-b pb-6 md:flex-row md:items-center">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">
            Personal Macro & Nutrition Dashboard
          </h1>
          <p className="mt-1 text-muted-foreground">
            Deterministic, USDA-backed nutritional arithmetic. Zero guessing, zero paywalls.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Link to="/planner">
            <Button className="gap-2">
              <Calendar className="h-4 w-4" /> Go to Meal Planner
            </Button>
          </Link>
        </div>
      </div>

      {/* Daily Targets Row */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* Calorie Target */}
        <Card className="border-l-4 border-l-amber-500">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Daily Calorie Target
            </CardTitle>
            <Flame className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {targets ? `${targets.targetCaloriesKcal.toLocaleString()} kcal` : 'Loading...'}
            </div>
            <p className="mt-1 text-xs text-muted-foreground">
              Goal:{' '}
              <span className="font-semibold capitalize text-foreground">
                {profile?.goal ?? 'Maintain'}
              </span>
            </p>
          </CardContent>
        </Card>

        {/* Protein Target */}
        <Card className="border-l-4 border-l-emerald-500">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Daily Protein Floor
            </CardTitle>
            <Dumbbell className="h-4 w-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {targets ? `${targets.targetProteinGrams} g` : 'Loading...'}
            </div>
            <p className="mt-1 text-xs text-muted-foreground">
              {targets?.proteinPercentOfKcal ?? 0}% of daily calories
            </p>
          </CardContent>
        </Card>

        {/* BMR */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Base Burn (BMR)
            </CardTitle>
            <Scale className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {targets ? `${targets.bmrKcal.toLocaleString()} kcal` : 'Loading...'}
            </div>
            <p className="mt-1 text-xs text-muted-foreground">Mifflin–St Jeor formula</p>
          </CardContent>
        </Card>

        {/* TDEE */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Active Burn (TDEE)
            </CardTitle>
            <Flame className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {targets ? `${targets.tdeeKcal.toLocaleString()} kcal` : 'Loading...'}
            </div>
            <p className="mt-1 text-xs capitalize text-muted-foreground">
              {profile?.activityLevel ?? 'Sedentary'}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Reference Weight Notice (if applicable) */}
      {targets?.usesReferenceWeight && (
        <div className="flex items-start gap-3 rounded-lg border border-amber-500/30 bg-amber-500/10 p-4 text-sm text-amber-900 dark:text-amber-200">
          <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-amber-600 dark:text-amber-400" />
          <div>
            <p className="font-semibold">Healthy Protein Scaling Active (BMI 25 Ceiling)</p>
            <p className="mt-0.5 text-xs text-amber-800 dark:text-amber-300">
              To prevent over-prescribing protein for higher body weights, your protein floor is
              calculated using a reference weight of{' '}
              <span className="font-bold">{targets.referenceWeightKg} kg</span> (normal BMI cap),
              keeping protein within safe, proven metabolic boundaries.
            </p>
          </div>
        </div>
      )}

      {/* Quick Navigation Cards */}
      <div className="grid gap-6 md:grid-cols-3">
        <Card className="transition-colors hover:border-primary/50">
          <CardHeader>
            <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Utensils className="h-5 w-5" />
            </div>
            <CardTitle>Recipe Catalog</CardTitle>
            <CardDescription>
              Build meals with line-by-line gram weights, exact USDA FoodData Central entries, and
              transparent math.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link to="/recipes">
              <Button variant="outline" className="w-full">
                View Recipes
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="transition-colors hover:border-primary/50">
          <CardHeader>
            <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Calendar className="h-5 w-5" />
            </div>
            <CardTitle>Manual 7-Day Planner</CardTitle>
            <CardDescription>
              Plan your week day-by-day. Every single day is verified against your protein floor —
              never hidden behind a weekly average.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link to="/planner">
              <Button variant="outline" className="w-full">
                Open Planner
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="transition-colors hover:border-primary/50">
          <CardHeader>
            <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <ShoppingCart className="h-5 w-5" />
            </div>
            <CardTitle>Smart Grocery List</CardTitle>
            <CardDescription>
              Automatically maps ingredients to supermarket aisles. Differentiates food consumed
              from realistic store package purchases.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link to="/grocery">
              <Button variant="outline" className="w-full">
                View Grocery List
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      {/* Core Architectural Guarantees */}
      <Card className="bg-muted/40">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <CheckCircle2 className="h-5 w-5 text-emerald-500" /> Open-Source & Privacy Principles
          </CardTitle>
        </CardHeader>
        <CardContent className="grid gap-3 text-sm text-muted-foreground sm:grid-cols-2">
          <div>
            <span className="font-semibold text-foreground">100% Client-Side / Local-First:</span>{' '}
            All recipes, meal plans, and personal body metrics are stored locally in IndexedDB. No
            tracking, no mandatory cloud accounts.
          </div>
          <div>
            <span className="font-semibold text-foreground">Transparent Arithmetic:</span> All
            macronutrient figures are computed deterministically from public domain USDA FoodData
            Central and Vietnamese NIN tables.
          </div>
          <div>
            <span className="font-semibold text-foreground">Forever Free:</span> No subscription
            tiers, paywalls, or artificial meal planning limits.
          </div>
          <div>
            <span className="font-semibold text-foreground">Self-Hostable:</span> Can be deployed as
            a static web app or self-hosted via a single Docker container.
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
