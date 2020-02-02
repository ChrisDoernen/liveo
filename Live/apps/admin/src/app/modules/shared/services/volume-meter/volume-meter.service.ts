import { Injectable } from "@angular/core";

@Injectable()
export class VolumeMeterService {
  private _volumeColorScale = [
    [-20, "#303e4d"],
    [-19, "#33484b"],
    [-18, "#355148"],
    [-17, "#385b46"],
    [-16, "#3a6543"],
    [-15, "#3d6e41"],
    [-14, "#3f783e"],
    [-13, "#42813c"],
    [-12, "#448b39"],
    [-11, "#479537"],
    [-10, "#499e34"],
    [-9, "#4ca832"],
    [-8, "#52a832"],
    [-7, "#58a832"],
    [-6, "#5da832"],
    [-5, "#63a832"],
    [-4, "#69a832"],
    [-3, "#6fa832"],
    [-2, "#75a832"],
    [-1, "#7ba832"],
    [0, "#80a832"],
    [1, "#86a832"],
    [2, "#8ca832"],
    [3, "#8f9d32"],
    [4, "#948832"],
    [5, "#9b6832"],
    [6, "#9e5d32"],
    [7, "#a34732"],
    [8, "#a53d32"],
    [9, "#a83232"]
  ];

  public convertLoudnessToColor(value: string): string {
    const number = parseFloat(value);
    const rounded = Math.round(number);
    const scaleLength = this._volumeColorScale.length;
    if (rounded < this._volumeColorScale[0][0]) {
      return this._volumeColorScale[0][1] as string;
    }
    if (rounded > this._volumeColorScale[scaleLength - 1][0]) {
      return this._volumeColorScale[scaleLength - 1][1] as string;
    }
    return this._volumeColorScale[rounded + 20][1] as string;
  }
}
