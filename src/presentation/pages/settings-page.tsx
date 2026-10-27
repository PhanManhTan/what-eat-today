import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { DexieUserProfileRepository } from '@/infrastructure/repositories/dexie-user-profile.repository';
import {
  CURRENT_DATABASE_SCHEMA_VERSION,
  BACKUP_FORMAT_VERSION,
} from '@/infrastructure/db/schema-version';
import { calculateUserTargets } from '@/application/use-cases/calculate-user-targets.use-case';
import type {
  UserProfile,
  Gender,
  ActivityLevel,
  NutritionGoal,
} from '@/domain/entities/user-profile';
import { Database, ShieldCheck, Save, RefreshCw, CheckCircle2 } from 'lucide-react';

const profileRepo = new DexieUserProfileRepository();

export const SettingsPage: React.FC = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    profileRepo.getProfile().then(setProfile);
  }, []);

  if (!profile) {
    return <div className="py-12 text-center text-muted-foreground">Loading settings...</div>;
  }

  const liveTargets = calculateUserTargets(profile);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    await profileRepo.saveProfile(profile);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2500);
  };

  const handleReset = async () => {
    if (confirm('Are you sure you want to reset settings to default values?')) {
      const reset = await profileRepo.resetToDefault();
      setProfile(reset);
      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 2000);
    }
  };

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      {/* Page Header */}
      <div className="border-b pb-5">
        <h1 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
          Settings & Personal Metrics
        </h1>
        <p className="mt-1 text-sm text-muted-foreground sm:text-base">
          Adjust your biological data to calculate exact personal calorie and protein targets.
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Profile Metrics Card */}
        <Card>
          <CardHeader>
            <CardTitle>Biometric Data (Mifflin–St Jeor Parameters)</CardTitle>
            <CardDescription>
              All computations are 100% deterministic and evaluated locally in your browser.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {/* Age */}
              <div>
                <label className="mb-1 block text-xs font-semibold text-muted-foreground">
                  Age
                </label>
                <input
                  type="number"
                  min="10"
                  max="120"
                  value={profile.age}
                  onChange={(e) => setProfile({ ...profile, age: parseInt(e.target.value) || 30 })}
                  className="w-full rounded-md border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              {/* Gender */}
              <div>
                <label className="mb-1 block text-xs font-semibold text-muted-foreground">
                  Gender
                </label>
                <select
                  value={profile.gender}
                  onChange={(e) => setProfile({ ...profile, gender: e.target.value as Gender })}
                  className="w-full rounded-md border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="male">Male (+5 kcal BMR offset)</option>
                  <option value="female">Female (-161 kcal BMR offset)</option>
                </select>
              </div>

              {/* Height */}
              <div>
                <label className="mb-1 block text-xs font-semibold text-muted-foreground">
                  Height (cm)
                </label>
                <input
                  type="number"
                  min="100"
                  max="250"
                  value={profile.heightCm}
                  onChange={(e) =>
                    setProfile({ ...profile, heightCm: parseFloat(e.target.value) || 175 })
                  }
                  className="w-full rounded-md border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              {/* Weight */}
              <div>
                <label className="mb-1 block text-xs font-semibold text-muted-foreground">
                  Weight (kg)
                </label>
                <input
                  type="number"
                  min="30"
                  max="300"
                  step="0.5"
                  value={profile.weightKg}
                  onChange={(e) =>
                    setProfile({ ...profile, weightKg: parseFloat(e.target.value) || 75 })
                  }
                  className="w-full rounded-md border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>

            {/* Activity Level & Goal */}
            <div className="grid gap-4 pt-2 sm:grid-cols-2">
              <div>
                <label className="mb-1 block text-xs font-semibold text-muted-foreground">
                  Activity Level
                </label>
                <select
                  value={profile.activityLevel}
                  onChange={(e) =>
                    setProfile({ ...profile, activityLevel: e.target.value as ActivityLevel })
                  }
                  className="w-full rounded-md border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="sedentary">Sedentary (Desk work, no exercise) — 1.2x</option>
                  <option value="light">Light (Exercise 1-3 days/wk) — 1.375x</option>
                  <option value="moderate">Moderate (Exercise 3-5 days/wk) — 1.55x</option>
                  <option value="very">Very Active (Heavy training 6-7 days/wk) — 1.725x</option>
                  <option value="athlete">Athlete / Physical Job — 1.9x</option>
                </select>
              </div>

              <div>
                <label className="mb-1 block text-xs font-semibold text-muted-foreground">
                  Primary Nutrition Goal
                </label>
                <select
                  value={profile.goal}
                  onChange={(e) =>
                    setProfile({ ...profile, goal: e.target.value as NutritionGoal })
                  }
                  className="w-full rounded-md border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="cut">Fat Loss (Cut): -20% calories, 2.2g protein/kg</option>
                  <option value="maintain">Maintain: 0% calorie delta, 1.76g protein/kg</option>
                  <option value="bulk">Muscle Gain (Bulk): +10% surplus, 2.0g protein/kg</option>
                </select>
              </div>
            </div>

            {/* Live Computed Summary */}
            <div className="mt-4 flex flex-wrap items-center justify-between gap-4 rounded-lg border bg-muted/40 p-4 text-sm">
              <div>
                <span className="block text-xs text-muted-foreground">Resulting Daily Target:</span>
                <span className="text-xl font-bold text-primary">
                  {liveTargets.targetCaloriesKcal.toLocaleString()} kcal
                </span>
                <span className="ml-2 text-xs text-muted-foreground">
                  (BMR: {liveTargets.bmrKcal} / TDEE: {liveTargets.tdeeKcal})
                </span>
              </div>
              <div className="text-right">
                <span className="block text-xs text-muted-foreground">Daily Protein Floor:</span>
                <span className="text-xl font-bold text-emerald-600 dark:text-emerald-400">
                  {liveTargets.targetProteinGrams} g
                </span>
                <span className="block text-xs text-muted-foreground">
                  {liveTargets.proteinPercentOfKcal}% of calories
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleReset}
                className="gap-1.5 text-xs"
              >
                <RefreshCw className="h-3.5 w-3.5" /> Reset Defaults
              </Button>
              <div className="flex items-center gap-2">
                {isSaved && (
                  <span className="flex items-center gap-1 text-xs font-medium text-emerald-600 dark:text-emerald-400">
                    <CheckCircle2 className="h-4 w-4" /> Saved!
                  </span>
                )}
                <Button type="submit" className="gap-2">
                  <Save className="h-4 w-4" /> Save Profile
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </form>

      {/* Local Storage & Privacy Status */}
      <div className="grid gap-4 sm:grid-cols-2">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-sm font-semibold">
              <Database className="h-4 w-4 text-primary" /> IndexedDB Local Database
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-xs text-muted-foreground">
            <div className="flex justify-between">
              <span>Database Name:</span>
              <span className="font-mono font-medium text-foreground">what_eat_today_local_db</span>
            </div>
            <div className="flex justify-between">
              <span>Schema Version:</span>
              <Badge variant="outline" className="text-[10px]">
                v{CURRENT_DATABASE_SCHEMA_VERSION}
              </Badge>
            </div>
            <div className="flex justify-between">
              <span>Backup Format:</span>
              <span className="font-mono text-foreground">{BACKUP_FORMAT_VERSION}</span>
            </div>
            <div className="flex justify-between">
              <span>Driver:</span>
              <span className="font-medium text-foreground">Dexie.js (Zero external server)</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-sm font-semibold">
              <ShieldCheck className="h-4 w-4 text-emerald-500" /> Privacy & Local-First Guarantee
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-xs text-muted-foreground">
            <p>
              Your biometrics, personal notes, custom recipes, and meal plans never leave this
              browser session.
            </p>
            <p>Zero tracking cookies, zero analytics beacons, zero mandatory external API calls.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
