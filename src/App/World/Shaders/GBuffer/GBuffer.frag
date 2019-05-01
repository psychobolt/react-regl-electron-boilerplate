#extension GL_EXT_draw_buffers : require

precision mediump float;

#pragma glslify: import('../../Materials/Material/Material.frag')

uniform Material material;

varying vec3 vNormal;
varying vec4 vPosition;

void main() {
  // just output geometry data.
  gl_FragData[1] = vec4(material.color, material.shininess);
  gl_FragData[2] = vec4(vNormal, 1.0);
  gl_FragData[3] = vPosition;
}