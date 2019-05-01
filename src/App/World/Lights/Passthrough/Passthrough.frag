precision mediump float;

uniform sampler2D backgroundTex, albedoTex, normalTex, positionTex;

varying vec2 uv;

void main() {
  vec4 albedo = texture2D(albedoTex, uv);
  vec4 normal = texture2D(normalTex, uv);

  if (normal.w == 0.0) {
    discard;
  } else {
    gl_FragColor = albedo;
  }
}