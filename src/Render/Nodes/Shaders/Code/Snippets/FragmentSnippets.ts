import type { DivineShaderBuilder } from "divine-shaders";
export function RegisterFragmentSnippets(builder: typeof DivineShaderBuilder) {
 builder.snippets.create({
  id: "standard_color",
  body: {
   GLSL: () => `
  vec4 rgb = getBaseColor(vec2(0.,0.));
 if (rgb.a < 0.5) { 
    discard;
  }
  rgb = getColor(rgb);
  rgb = getAO(rgb);
  vec4 mixLight = getLight(rgb);
  vec3 finalColor = doFog(mixLight);
  FragColor = vec4(finalColor.rgb , rgb.w );
  `,
  },
 });
}
