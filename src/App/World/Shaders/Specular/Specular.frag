vec3 specular(Light light, Material material, vec3 eye, vec4 position, vec3 normal) {
  vec3 viewDir = normalize(eye - position.xyz);
  vec3 halfwayDir = normalize(getLightDir(light, position) + viewDir);
  float intensity = pow(max(dot(viewDir, halfwayDir), 0.0), material.shininess);
  return light.specular.xyz * (intensity * material.color) * getAttenuation(light, position);
}