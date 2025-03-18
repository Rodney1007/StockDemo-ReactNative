export default class VolumeUtils {
  static formatVolume(volume: string): { text: string; isShares: boolean } {
    const numVolume = parseInt(volume, 10);
    if (isNaN(numVolume)) {return { text: '-', isShares: false };}

    if (numVolume < 1000) {
      return { text: `${numVolume}股`, isShares: true };
    }
    return { text: `${Math.floor(numVolume / 1000).toLocaleString()}張`, isShares: false };
  }
}
