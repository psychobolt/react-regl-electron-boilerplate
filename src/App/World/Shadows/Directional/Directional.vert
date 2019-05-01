precision mediump float;

attribute vec3 position;

uniform mat4 projection, view, model;

varying vec3 vPosition;

void main() {
  vec4 p = projection * view * model * vec4(position, 1.0);
  vPosition = p.xyz;
  gl_Position = p;
}