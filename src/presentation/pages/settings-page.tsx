import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { DexieUserProfileRepository } from '@/infrastructure/repositories/dexie-user-profile.repository';
import { LocalUserPreferencesRepository } from '@/infrastructure/repositories/local-user-preferences.repository';
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
import {
  Database,
  ShieldCheck,
  Save,
  RefreshCw,
  CheckCircle2,
  Globe,
  MapPin,
  Trash2,
} from 'lucide-react';

const profileRepo = new DexieUserProfileRepository();
const userPrefsRepo = new LocalUserPreferencesRepository();

export const SettingsPage: React.FC = () => {
  const { t, i18n } = useTranslation(['settings', 'common']);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isSaved, setIsSaved] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  useEffect(() => {
    profileRepo.getProfile().then(setProfile);
  }, []);

  const handleLanguageChange = (lang: string) => {
    i18n.changeLanguage(lang);
  };

  const handleClearDiscoveryData = async () => {
    if (window.confirm(t('clearLocalDataConfirm'))) {
      await userPrefsRepo.clearSwipeHistory();
      localStorage.removeItem('what_eat_today_favorites');
      setStatusMessage(t('clearSuccess'));
      setTimeout(() => setStatusMessage(null), 3000);
    }
  };

  if (!profile) {
    return <div className="py-12 text-center text-muted-foreground">{t('loading', { ns: 'common' })}</div>;
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
        <h1 className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight">
          {t('title')}
        </h1>
        <p className="mt-1 text-xs sm:text-sm text-muted-foreground">
          {t('subtitle')}
        </p>
      </div>

      {statusMessage && (
        <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-4 text-xs font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-2">
          <CheckCircle2 className="h-4 w-4" />
          <span>{statusMessage}</span>
        </div>
      )}

      {/* Language & Regional Discovery Settings */}
      <div className="grid gap-4 sm:grid-cols-2">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-sm font-semibold">
              <Globe className="h-4 w-4 text-primary" /> {t('language')}
            </CardTitle>
            <CardDescription className="text-xs">
              {t('languageDesc')}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => handleLanguageChange('vi-VN')}
                className={`flex-1 rounded-xl border p-3 text-center text-xs font-bold transition-all cursor-pointer ${
                  i18n.language.startsWith('vi')
                    ? 'border-primary bg-primary/10 text-primary shadow-sm'
                    : 'bg-card text-muted-foreground hover:bg-muted'
                }`}
              >
                🇻🇳 Tiếng Việt
              </button>
              <button
                type="button"
                onClick={() => handleLanguageChange('en-US')}
                className={`flex-1 rounded-xl border p-3 text-center text-xs font-bold transition-all cursor-pointer ${
                  i18n.language.startsWith('en')
                    ? 'border-primary bg-primary/10 text-primary shadow-sm'
                    : 'bg-card text-muted-foreground hover:bg-muted'
                }`}
              >
                🇺🇸 English
              </button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-sm font-semibold">
              <MapPin className="h-4 w-4 text-primary" /> {t('location')}
            </CardTitle>
            <CardDescription className="text-xs">
              {t('locationDesc')}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-xl border bg-muted/40 p-3 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-bold text-foreground">{t('hcmc')}</span>
                <Badge variant="success" className="text-[10px]">
                  Hoạt động
                </Badge>
              </div>
              <p className="mt-1 text-[11px] text-muted-foreground">
                Hà Nội, Đà Nẵng và các vùng quốc tế sẽ được cập nhật trong các phiên bản tiếp theo.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Discovery Data Management */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-sm font-semibold">
            <Trash2 className="h-4 w-4 text-rose-500" /> Quản Lý Dữ Liệu Khám Phá Món
          </CardTitle>
          <CardDescription className="text-xs">
            Xóa danh sách món đã thích và lịch sử vuốt thẻ trên trình duyệt này
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <p className="text-xs text-muted-foreground">
            Lịch sử vuốt và các món yêu thích được lưu cục bộ trong LocalStorage / IndexedDB.
          </p>
          <Button
            variant="outline"
            size="sm"
            onClick={handleClearDiscoveryData}
            className="text-rose-600 border-rose-300 dark:border-rose-900 hover:bg-rose-50 dark:hover:bg-rose-950/20 text-xs shrink-0"
          >
            <Trash2 className="h-3.5 w-3.5 mr-1.5" />
            <span>{t('clearLocalData')}</span>
          </Button>
        </CardContent>
      </Card>

      {/* Biometric & Macro Nutrition Settings Form */}
      <form onSubmit={handleSave} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Dữ Liệu Dinh Dưỡng Cá Nhân (Mifflin–St Jeor)</CardTitle>
            <CardDescription>
              Toàn bộ chỉ số calo & đạm được tính toán tất định 100% bằng thuật toán toán học cục bộ.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {/* Age */}
              <div>
                <label className="mb-1 block text-xs font-semibold text-muted-foreground">
                  Tuổi (Age)
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
                  Giới tính (Gender)
                </label>
                <select
                  value={profile.gender}
                  onChange={(e) => setProfile({ ...profile, gender: e.target.value as Gender })}
                  className="w-full rounded-md border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="male">Nam (+5 kcal BMR offset)</option>
                  <option value="female">Nữ (-161 kcal BMR offset)</option>
                </select>
              </div>

              {/* Height */}
              <div>
                <label className="mb-1 block text-xs font-semibold text-muted-foreground">
                  Chiều cao (cm)
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
                  Cân nặng (kg)
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
                  Mức độ vận động (Activity Level)
                </label>
                <select
                  value={profile.activityLevel}
                  onChange={(e) =>
                    setProfile({ ...profile, activityLevel: e.target.value as ActivityLevel })
                  }
                  className="w-full rounded-md border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="sedentary">Ít vận động (Ngồi văn phòng) — 1.2x</option>
                  <option value="light">Vận động nhẹ (Tập 1-3 ngày/tuần) — 1.375x</option>
                  <option value="moderate">Vận động vừa (Tập 3-5 ngày/tuần) — 1.55x</option>
                  <option value="very">Vận động nặng (Tập 6-7 ngày/tuần) — 1.725x</option>
                  <option value="athlete">Vận động viên / Lao động nặng — 1.9x</option>
                </select>
              </div>

              <div>
                <label className="mb-1 block text-xs font-semibold text-muted-foreground">
                  Mục tiêu dinh dưỡng
                </label>
                <select
                  value={profile.goal}
                  onChange={(e) =>
                    setProfile({ ...profile, goal: e.target.value as NutritionGoal })
                  }
                  className="w-full rounded-md border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="cut">Giảm mỡ (Cut): -20% calo, 2.2g đạm/kg</option>
                  <option value="maintain">Duy trì (Maintain): 0% delta, 1.76g đạm/kg</option>
                  <option value="bulk">Tăng cơ (Bulk): +10% thặng dư, 2.0g đạm/kg</option>
                </select>
              </div>
            </div>

            {/* Live Computed Summary */}
            <div className="mt-4 flex flex-wrap items-center justify-between gap-4 rounded-xl border bg-muted/40 p-4 text-sm">
              <div>
                <span className="block text-xs text-muted-foreground">Mục tiêu calo hàng ngày:</span>
                <span className="text-xl font-bold text-primary">
                  {liveTargets.targetCaloriesKcal.toLocaleString()} kcal
                </span>
                <span className="ml-2 text-xs text-muted-foreground">
                  (BMR: {liveTargets.bmrKcal} / TDEE: {liveTargets.tdeeKcal})
                </span>
              </div>
              <div className="text-right">
                <span className="block text-xs text-muted-foreground">Lượng đạm tối thiểu:</span>
                <span className="text-xl font-bold text-emerald-600 dark:text-emerald-400">
                  {liveTargets.targetProteinGrams} g
                </span>
                <span className="block text-xs text-muted-foreground">
                  {liveTargets.proteinPercentOfKcal}% tổng năng lượng
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
                <RefreshCw className="h-3.5 w-3.5" /> Khôi phục mặc định
              </Button>
              <div className="flex items-center gap-2">
                {isSaved && (
                  <span className="flex items-center gap-1 text-xs font-medium text-emerald-600 dark:text-emerald-400">
                    <CheckCircle2 className="h-4 w-4" /> Đã lưu thành công!
                  </span>
                )}
                <Button type="submit" className="gap-2">
                  <Save className="h-4 w-4" /> Lưu thông tin
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
              <Database className="h-4 w-4 text-primary" /> Cơ sở dữ liệu cục bộ IndexedDB
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
              <span className="font-medium text-foreground">Dexie.js (Trình duyệt nội bộ)</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-sm font-semibold">
              <ShieldCheck className="h-4 w-4 text-emerald-500" /> Cam Kết Quyền Riêng Tư & Mở
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-xs text-muted-foreground">
            <p>
              Dữ liệu cá nhân, món ăn yêu thích và kế hoạch ăn uống không bao giờ rời khỏi trình duyệt của bạn.
            </p>
            <p>100% Không cookie theo dõi, không quảng cáo, không yêu cầu đăng ký tài khoản.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
