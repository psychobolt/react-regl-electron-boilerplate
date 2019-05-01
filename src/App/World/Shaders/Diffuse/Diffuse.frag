vec3 diffuse(Light light, Material material, vec3 eye, vec4 position, vec3 normal) {
  float diff = max(dot(normal, getLightDir(light, position)), 0.0);
  return light.diffuse.xyz * diff * material.color * getAttenuation(light, position);
}