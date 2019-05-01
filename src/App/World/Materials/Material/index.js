// @flow

const uniform = name => `material.${name}`;

const MaterialProps = {
  color: [0.0, 0.0, 0.0],
  shininess: 32.0,
};

export const createMaterial = (props: typeof MaterialProps) => Object.entries({
  ...MaterialProps,
  ...props,
}).reduce((config, [key, value]) => ({
  ...config,
  uniforms: {
    ...config.uniforms,
    [uniform(key)]: value,
  },
}), {});
