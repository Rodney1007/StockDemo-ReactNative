export default class PriceColorUtils {
  static getPriceChangeColor(value: string, reference: string): string {
    const numValue = parseFloat(value);
    const numReference = parseFloat(reference);

    if (numValue > numReference) return '#FF5252';  // 高於參考價為紅色
    if (numValue < numReference) return '#4CAF50';  // 低於參考價為綠色
    return '#FFFFFF';  // 等於參考價為白色
  }
} 