export const renderOptions = {
  helper: {
    grid: 0,
    stats: ""
  }
};
export interface RenderOptions {
  helper?: HelperOptions;
}

export interface HelperOptions {
  grid?: number;
  stats?: number;
}
