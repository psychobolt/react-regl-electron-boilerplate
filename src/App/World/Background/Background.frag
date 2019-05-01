#extension GL_EXT_draw_buffers : require

precision mediump float;

uniform vec4 color;
uniform sampler2D normalTex;

varying vec2 uv;

void main() {
  vec4 normal = texture2D(normalTex, uv);
  if (normal.w == 0.0) {
    gl_FragData[0] = color;
    gl_FragData[2] = vec4(0.0, 0.0, 0.0, 0.0);
  }
}