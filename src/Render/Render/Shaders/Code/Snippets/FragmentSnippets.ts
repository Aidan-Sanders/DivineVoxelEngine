import type { DVEShaderBuilder } from "Libs/Shaders/DVEShaderBuilder";
export function RegisterFragmentSnippets(builder: typeof DVEShaderBuilder) {
 builder.snippets.create("standard_color", {
  GLSL: `
  vec4 rgb = getBaseColor(vec2( vUV.x,vUV.y));
  if (rgb.a < 0.5) { 
    discard;
  }
  rgb = getColor(rgb);
  rgb = getAO(rgb);
  vec4 mixLight = getLight(rgb);
  vec3 finalColor = doFog(mixLight);
  gl_FragColor = vec4(finalColor.rgb , rgb.w ); `,
 });
}