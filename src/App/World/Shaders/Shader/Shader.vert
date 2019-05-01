#pragma glslify: inverse = require(glsl-inverse)
#pragma glslify: transpose = require(glsl-transpose)

precision mediump float;

attribute vec3 position;
attribute vec3 normal;

uniform mat4 projection, view, model;

varying vec3 vNormal;
varying vec4 vPosition;

void main() {
  vec4 worldSpacePosition = model * vec4(position, 1.0);
  vNormal = mat3(transpose(inverse(model))) * normal; // See, https://learnopengl.com/Lighting/Basic-Lighting
  vPosition = worldSpacePosition;
  gl_Position = projection * view * worldSpacePosition;
}