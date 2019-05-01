#pragma glslify: import('../../Shadows/Shadow/Shadow.frag')

struct Light {
  vec4 direction;

  vec4 ambient;
  vec4 diffuse;
  vec4 specular;

  float constant;
  float linear;
  float quadratic;

  mat4 view;
  mat4 projection;

  Shadow shadow;
};