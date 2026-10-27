# Data Sources & Provenance

`what-eat-today` computes all nutrition values deterministically using publicly available, non-proprietary food composition datasets.

---

## 1. USDA FoodData Central (FDC)

- **Source**: United States Department of Agriculture, Agricultural Research Service.
- **Coverage**: International staples, foundation foods, raw cuts of meat, grains, vegetables, and fruit.
- **License**: **Public Domain / CC0** (Works of the United States Government are not subject to copyright under 17 U.S.C. § 105).
- **Reference URL**: [https://fdc.nal.usda.gov/](https://fdc.nal.usda.gov/)
- **Identifier Format**: `fdc_id` (numeric integer, e.g. `171077` for raw chicken breast).

---

## 2. Vietnam Food Composition Table (Bảng Thành Phần Thực Phẩm Việt Nam)

- **Source**: Viện Dinh dưỡng Quốc gia (National Institute of Nutrition - Vietnam Ministry of Health).
- **Coverage**: Traditional Vietnamese food ingredients, Asian vegetables, regional seafood, herbs, and sauces.
- **Status**: Official reference data published for scientific and dietary calculation.
- **Usage**: Stored as standardized per-100g nutrient references with explicit attribution.

---

## 3. Open Food Facts

- **Source**: Open Food Facts Community Database.
- **Coverage**: Packaged groceries, barcode products, and store package sizes.
- **License**: **Open Database License (ODbL) v1.0** and Database Contents License (DbCL).
- **Reference URL**: [https://world.openfoodfacts.org/](https://world.openfoodfacts.org/)
