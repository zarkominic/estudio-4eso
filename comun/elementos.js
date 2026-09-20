/* elementos.js — los 20 primeros elementos más algunos de transición.
   Es lo que entra en 4º ESO. Lo usan los generadores de ejercicios y la tabla
   periódica interactiva del tema.
     z = número atómico   g = grupo   p = periodo
     conf = configuración electrónica   val = electrones de la última capa
     masa = masa atómica (media de sus isótopos)   tipo = para colorear la tabla */
const ELEMENTOS = [
  {z:1,  s:"H",  n:"hidrógeno", g:1,  p:1, conf:"1s1",                    val:1, masa:1.01,  tipo:"no metal"},
  {z:2,  s:"He", n:"helio",     g:18, p:1, conf:"1s2",                    val:2, masa:4.00,  tipo:"noble"},
  {z:3,  s:"Li", n:"litio",     g:1,  p:2, conf:"1s2 2s1",                val:1, masa:6.94,  tipo:"metal"},
  {z:4,  s:"Be", n:"berilio",   g:2,  p:2, conf:"1s2 2s2",                val:2, masa:9.01,  tipo:"metal"},
  {z:5,  s:"B",  n:"boro",      g:13, p:2, conf:"1s2 2s2 2p1",            val:3, masa:10.81, tipo:"semimetal"},
  {z:6,  s:"C",  n:"carbono",   g:14, p:2, conf:"1s2 2s2 2p2",            val:4, masa:12.01, tipo:"no metal"},
  {z:7,  s:"N",  n:"nitrógeno", g:15, p:2, conf:"1s2 2s2 2p3",            val:5, masa:14.01, tipo:"no metal"},
  {z:8,  s:"O",  n:"oxígeno",   g:16, p:2, conf:"1s2 2s2 2p4",            val:6, masa:16.00, tipo:"no metal"},
  {z:9,  s:"F",  n:"flúor",     g:17, p:2, conf:"1s2 2s2 2p5",            val:7, masa:19.00, tipo:"no metal"},
  {z:10, s:"Ne", n:"neón",      g:18, p:2, conf:"1s2 2s2 2p6",            val:8, masa:20.18, tipo:"noble"},
  {z:11, s:"Na", n:"sodio",     g:1,  p:3, conf:"1s2 2s2 2p6 3s1",        val:1, masa:22.99, tipo:"metal"},
  {z:12, s:"Mg", n:"magnesio",  g:2,  p:3, conf:"1s2 2s2 2p6 3s2",        val:2, masa:24.31, tipo:"metal"},
  {z:13, s:"Al", n:"aluminio",  g:13, p:3, conf:"1s2 2s2 2p6 3s2 3p1",    val:3, masa:26.98, tipo:"metal"},
  {z:14, s:"Si", n:"silicio",   g:14, p:3, conf:"1s2 2s2 2p6 3s2 3p2",    val:4, masa:28.09, tipo:"semimetal"},
  {z:15, s:"P",  n:"fósforo",   g:15, p:3, conf:"1s2 2s2 2p6 3s2 3p3",    val:5, masa:30.97, tipo:"no metal"},
  {z:16, s:"S",  n:"azufre",    g:16, p:3, conf:"1s2 2s2 2p6 3s2 3p4",    val:6, masa:32.07, tipo:"no metal"},
  {z:17, s:"Cl", n:"cloro",     g:17, p:3, conf:"1s2 2s2 2p6 3s2 3p5",    val:7, masa:35.45, tipo:"no metal"},
  {z:18, s:"Ar", n:"argón",     g:18, p:3, conf:"1s2 2s2 2p6 3s2 3p6",    val:8, masa:39.95, tipo:"noble"},
  {z:19, s:"K",  n:"potasio",   g:1,  p:4, conf:"1s2 2s2 2p6 3s2 3p6 4s1",val:1, masa:39.10, tipo:"metal"},
  {z:20, s:"Ca", n:"calcio",    g:2,  p:4, conf:"1s2 2s2 2p6 3s2 3p6 4s2",val:2, masa:40.08, tipo:"metal"},
  {z:26, s:"Fe", n:"hierro",    g:8,  p:4, conf:"[Ar] 4s2 3d6",           val:2, masa:55.85, tipo:"transicion"},
  {z:29, s:"Cu", n:"cobre",     g:11, p:4, conf:"[Ar] 4s1 3d10",          val:1, masa:63.55, tipo:"transicion"},
  {z:30, s:"Zn", n:"cinc",      g:12, p:4, conf:"[Ar] 4s2 3d10",          val:2, masa:65.38, tipo:"transicion"},
  {z:35, s:"Br", n:"bromo",     g:17, p:4, conf:"[Ar] 4s2 3d10 4p5",      val:7, masa:79.90, tipo:"no metal"},
  {z:36, s:"Kr", n:"kriptón",   g:18, p:4, conf:"[Ar] 4s2 3d10 4p6",      val:8, masa:83.80, tipo:"noble"},
];
