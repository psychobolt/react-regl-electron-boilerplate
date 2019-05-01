#define CUBE 0
#define MAP 1

struct GlobalShadow {
  samplerCube cube;
  sampler2D map;
  float shadowRes;
};

uniform GlobalShadow globalShadow;

vec2 toNDC(vec2 coord) {
  return (coord + 1.0) * 0.5;
}

float getDepth(Light light, vec2 coord) {
  vec4 borders = light.projection * vec4(toNDC(vec2(float(globalShadow.shadowRes))), 0.0, 1.0);
  if (
    coord.x < -borders.x
    || coord.x > borders.x
    || coord.y < -borders.y
    || coord.y > borders.y) {
    return 0.0;
  }

  int type = light.shadow.bufferType;
  if (type == CUBE) {

  }
  
  return texture2D(globalShadow.map, coord).z;
}

float calculateShadow(Light light, vec4 position, vec3 normal, vec2 offset) {
  vec4 lightCoord = getLightCoord(light, position);
  vec2 depthCoord = lightCoord.xy / lightCoord.w;
  vec2 texCoord = toNDC(depthCoord) + offset * (1.0 / float(globalShadow.shadowRes));
  float bias = max(light.shadow.maxBias * (1.0 - dot(normal, light.direction.xyz)), light.shadow.minBias);
  return lightCoord.z - bias > getDepth(light, texCoord) ? 1.0 : 0.0;
}