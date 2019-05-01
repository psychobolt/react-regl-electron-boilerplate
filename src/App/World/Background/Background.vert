precision mediump float;

attribute vec2 position;

varying vec2 uv;

void main() {
  uv = (1.0 + position.xy) * 0.5;
  gl_Position = vec4(position, 0.0, 1.0);
}