uniform Light lights[MAX_LIGHTS];
uniform Material material;
uniform vec3 eye;

varying vec4 vPosition;
varying vec3 vNormal;

void main() {
  gl_FragColor = vec4(compute(lights, material, eye, vPosition, vNormal), 1.0);
}