uniform Light lights[MAX_LIGHTS];
uniform vec3 eye;
uniform sampler2D backgroundTex, albedoTex, normalTex, positionTex;

varying vec2 uv;

void main() {
  vec4 albedo = texture2D(albedoTex, uv);
  Material material = Material(
    albedo.xyz,
    albedo.w
  );

  vec4 normal = texture2D(normalTex, uv);
  vec4 position = texture2D(positionTex, uv);

  if (normal.w == 0.0) {
    discard;
  } else {
    gl_FragColor = vec4(compute(lights, material, eye, position, normal.xyz), 1.0);
  }
}
