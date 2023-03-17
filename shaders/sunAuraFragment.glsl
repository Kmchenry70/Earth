varying vec3 vertexNormal;

void main() {
    float intensity = pow(1 - dot(vertexNormal, vec3(0, 0, 1.0)), 2.0);
    vec3 sunAura = vec3(1, 1, 0) * pow(intensity, 1.5);
    gl_FragColor = vec4(0.3, 0.6, 0, 1.0) * intensity;
}