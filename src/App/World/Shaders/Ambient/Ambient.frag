vec3 ambient(Light light, Material material, vec3 eye, vec4 position, vec3 normal) {
  float attenuation = getAttenuation(light, position);
  return light.ambient.xyz * material.color * attenuation;
}