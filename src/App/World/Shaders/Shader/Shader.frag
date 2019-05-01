float getAttenuation(Light light, vec4 position) {
  float distance = length(light.direction.xyz - position.xyz);
  return 1.0 / (light.constant + light.linear * distance + light.quadratic * (distance * distance));
}

vec3 getLightDir(Light light, vec4 position) {
  if (light.direction.w == 0.0) {
    return normalize(-light.direction.xyz);
  } else {
    return normalize(light.direction.xyz - position.xyz);
  }
}

vec4 getLightCoord(Light light, vec4 position) {
  return light.projection * light.view * position;
}