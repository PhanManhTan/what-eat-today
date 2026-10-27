/**
 * Remove Vietnamese diacritical marks (tones) from a string for diacritic-insensitive search.
 * Example: "Bún bò Huế" -> "bun bo hue"
 */
export function removeVietnameseTones(str: string): string {
  if (!str) return '';

  let result = str.toLowerCase();

  // Replace specific Vietnamese vowel characters
  result = result.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a');
  result = result.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e');
  result = result.replace(/ì|í|ị|ỉ|ĩ/g, 'i');
  result = result.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o');
  result = result.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u');
  result = result.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y');
  result = result.replace(/đ/g, 'd');

  // Combining diacritical marks cleanup
  result = result.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

  return result.trim();
}

/**
 * Checks if search text matches a target text without case or tone sensitivity.
 */
export function matchesDiacriticInsensitive(target: string, query: string): boolean {
  if (!query) return true;
  if (!target) return false;
  return removeVietnameseTones(target).includes(removeVietnameseTones(query));
}
