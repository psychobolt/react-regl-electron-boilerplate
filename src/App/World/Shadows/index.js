export * from './Directional';
export * from './Point';
export * from './Shadow';
export { default as Shadow } from './Shadow';
export * from './Shadows.component';
export { default } from './Shadows.component';

export const enableShadows = (shadows, lights = []) => lights.map(light => {
  const shadow = shadows.find(({ light: shadowLight }) => shadowLight === light);
  return shadow ? { ...light, shadow } : light;
});
