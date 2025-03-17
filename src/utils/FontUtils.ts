export class FontUtils {
  private static readonly DEFAULT_SIZE = 16;
  private static readonly MIN_SIZE = 8;
  private static readonly MAX_LENGTH = 7;

  public static calculateStockNameFontSize(name: string): number {
    if (name.length > this.MAX_LENGTH) {
      return Math.max(
        this.MIN_SIZE,
        Math.floor(this.DEFAULT_SIZE * (this.MAX_LENGTH / name.length))
      );
    }
    return this.DEFAULT_SIZE;
  }
}

export default FontUtils;
