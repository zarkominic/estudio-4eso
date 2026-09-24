/* ejercicios-robot.js — robótica y sistemas de control (Arduino). */
(function(){

const COMP = [
  ["LDR (resistencia que varía con la luz)", "sensor", "Mide la luz: convierte algo del mundo en una señal eléctrica."],
  ["Sensor de ultrasonidos HC-SR04", "sensor", "Mide distancias con ecos: recoge información."],
  ["Pulsador", "sensor", "Le dice al sistema si está pulsado o no: es una entrada."],
  ["Termistor NTC", "sensor", "Su resistencia cambia con la temperatura: mide."],
  ["Sensor de infrarrojos (seguidor de línea)", "sensor", "Detecta si hay línea negra debajo: entrada."],
  ["Micrófono", "sensor", "Convierte sonido en señal eléctrica: entrada."],
  ["Motor de corriente continua", "actuador", "Convierte la señal en movimiento: actúa sobre el mundo."],
  ["Servomotor", "actuador", "Gira a un ángulo que le mandas: salida."],
  ["LED", "actuador", "Produce luz cuando recibe corriente: salida."],
  ["Zumbador (buzzer)", "actuador", "Produce sonido: salida."],
  ["Relé", "actuador", "Abre o cierra otro circuito cuando se lo ordenan: salida."],
  ["Pantalla LCD", "actuador", "Muestra información: salida."],
];

const LAZOS = [
  ["Una tostadora que tuesta 3 minutos y se para, esté como esté el pan.", "abierto", "No mide el resultado: hace lo programado y ya."],
  ["Un termostato que enciende la calefacción si la temperatura baja de 20 °C.", "cerrado", "Mide la temperatura (realimentación) y corrige según lo que mide."],
  ["Un semáforo que cambia cada 40 s, haya coches o no.", "abierto", "Funciona por tiempo, sin mirar el tráfico."],
  ["Un robot seguidor de línea que corrige el giro cuando se sale.", "cerrado", "Sus sensores le dicen si se desvía y rectifica."],
  ["Una lavadora que siempre hace el mismo programa de 60 minutos.", "abierto", "No comprueba si la ropa ya está limpia."],
  ["La cisterna del váter, que deja de llenarse cuando la boya sube.", "cerrado", "La boya mide el nivel y corta el agua: realimentación mecánica."],
  ["Un aire acondicionado que mantiene 24 °C.", "cerrado", "Mide la temperatura continuamente y ajusta."],
  ["Una farola que se enciende a las 20:00 con un temporizador.", "abierto", "Se enciende por hora, no por la luz que hay."],
];

const CODIGO = [
  {c:"pinMode(13, ___);", r:"OUTPUT", por:"Al pin 13 va el LED de la placa: le mandamos corriente, así que es salida."},
  {c:"pinMode(2, ___);  // aquí va un pulsador", r:"INPUT", alt:["INPUT_PULLUP"], por:"Un pulsador informa a la placa: es entrada."},
  {c:"digitalWrite(13, ___);  // encender el LED", r:"HIGH", por:"HIGH = 5 V = encendido. LOW = 0 V = apagado."},
  {c:"digitalWrite(13, ___);  // apagar el LED", r:"LOW", por:"LOW = 0 V = apagado."},
  {c:"delay(___);  // esperar 2 segundos", r:"2000", por:"delay cuenta en milisegundos: 2 s = 2000 ms."},
  {c:"delay(___);  // esperar medio segundo", r:"500", por:"0,5 s = 500 ms."},
  {c:"int luz = ___(A0);  // leer la LDR", r:"analogRead", por:"La LDR da un valor que va cambiando poco a poco: se lee con analogRead, de 0 a 1023."},
  {c:"int boton = ___(2);  // leer el pulsador", r:"digitalRead", por:"Un pulsador solo está pulsado o no: digitalRead, que devuelve HIGH o LOW."},
  {c:"// ¿Cuál es el valor máximo que puede devolver analogRead?", r:"1023", por:"El conversor es de 10 bits: 2¹⁰ = 1024 valores, de 0 a 1023."},
  {c:"// ¿Qué función se ejecuta una sola vez, al encender?", r:"setup", alt:["void setup","setup()"], por:"setup() prepara la placa una vez; loop() se repite sin parar."},
  {c:"// ¿Qué función se repite sin parar?", r:"loop", alt:["void loop","loop()"], por:"loop() es el bucle infinito donde va el programa."},
];

// [sistema, entrada, proceso, salida, palabras válidas de entrada, de salida]
const EPS = [
  ["un robot aspirador que esquiva obstáculos", "sensor de ultrasonidos", "la placa decide girar", "motores de las ruedas", ["ultrasonidos","sensor","sensor de ultrasonidos"], ["motores","motor","ruedas","motores de las ruedas"]],
  ["un riego automático", "sensor de humedad", "compara con el nivel mínimo", "electroválvula", ["humedad","sensor","sensor de humedad"], ["electrovalvula","valvula","electroválvula"]],
  ["una alarma de casa", "sensor de movimiento", "decide si hay intruso", "sirena", ["movimiento","pir","sensor","sensor de movimiento"], ["sirena","alarma"]],
  ["un termostato", "sensor de temperatura", "compara con la temperatura deseada", "caldera", ["temperatura","termometro","termómetro","sensor","sensor de temperatura","termistor"], ["caldera","calefaccion","calefacción"]],
];

Object.assign(EJERCICIOS, {
  sensorOActuador: {
    titulo: "¿Sensor o actuador?",
    genera(){
      const [n, r, por] = elige(COMP);
      return {textoPlano: true,
        enunciado: `<b>${n}</b><br><span class="mini">¿Es un sensor o un actuador?</span>`,
        respuesta: r, respuestaAlt: [r === "sensor" ? "entrada" : "salida"],
        pista: "Sensor = recoge información del mundo (entrada). Actuador = hace algo en el mundo (salida).",
        pasos: [por, `Es un <b>${r}</b>.`]};
    }},
  lazoControl: {
    titulo: "¿Lazo abierto o cerrado?",
    genera(){
      const [s, r, por] = elige(LAZOS);
      return {textoPlano: true,
        enunciado: `${s}<br><span class="mini">¿Lazo abierto o cerrado?</span>`,
        respuesta: r, respuestaAlt: ["lazo " + r],
        pista: "¿Mide el resultado y corrige? Entonces tiene realimentación: lazo cerrado.",
        pasos: [por, `Lazo <b>${r}</b>.`]};
    }},
  codigoArduino: {
    titulo: "Completa el código de Arduino",
    genera(){
      const e = elige(CODIGO);
      return {textoPlano: true,
        enunciado: `<pre style="white-space:pre-wrap;font-size:1rem;margin:.3rem 0">${e.c.replace("___", "<b>_____</b>")}</pre><span class="mini">Escribe lo que falta (o la respuesta)</span>`,
        respuesta: e.r, respuestaAlt: e.alt || [],
        pista: "pinMode prepara el pin (INPUT/OUTPUT), digitalWrite escribe HIGH/LOW, delay cuenta en milisegundos.",
        pasos: [e.por, `Respuesta: <b>${e.r}</b>.`]};
    }},
  entradaProcesoSalida: {
    titulo: "Entrada, proceso y salida",
    genera(){
      const [sis, ent, pro, sal, aE, aS] = elige(EPS);
      const pide = elige(["entrada", "salida"]);
      return {textoPlano: true,
        enunciado: `En <b>${sis}</b>: ${pide === "entrada" ? "¿qué elemento es la <b>entrada</b>?" : "¿qué elemento es la <b>salida</b>?"}<br><span class="mini">Opciones: ${[ent, sal].sort().join(" · ")}</span>`,
        respuesta: pide === "entrada" ? ent : sal, respuestaAlt: pide === "entrada" ? aE : aS,
        pista: "La entrada recoge información; la salida actúa.",
        pasos: [`<b>Entrada:</b> ${ent}.`, `<b>Proceso:</b> ${pro}.`, `<b>Salida:</b> ${sal}.`]};
    }},
});
})();
