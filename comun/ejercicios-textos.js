/* ejercicios-textos.js — tipologías textuales, conectores y argumentación. */

Object.assign(EJERCICIOS, {

  tipoTexto: {
    titulo: "¿Qué tipo de texto es?",
    genera(){
      const casos = [
        {t:"El agua hierve a 100 °C a nivel del mar porque la presión atmosférica...", r:"expositivo",
         ex:"Informa de forma objetiva, sin opinar: <b>expositivo</b>."},
        {t:"Creo que deberían prohibir los móviles en clase. En primer lugar, distraen...", r:"argumentativo",
         ex:"Defiende una tesis con argumentos: <b>argumentativo</b>."},
        {t:"Abrió la puerta despacio. Fuera, la calle estaba vacía. Entonces oyó un ruido...", r:"narrativo",
         ex:"Cuenta hechos que se suceden en el tiempo: <b>narrativo</b>."},
        {t:"Era alto, de pelo oscuro y manos grandes. Llevaba un abrigo gris que le quedaba largo.", r:"descriptivo",
         ex:"Dice cómo es algo o alguien, sin que pase nada: <b>descriptivo</b>."},
        {t:"—¿Vienes? —No puedo, tengo que estudiar. —Venga, solo un rato.", r:"dialogado",
         ex:"Reproduce lo que dicen dos personas: <b>dialogado</b>."},
        {t:"Mezcle la harina con el azúcar. Después añada los huevos y bata durante dos minutos.", r:"instructivo",
         ex:"Da instrucciones ordenadas para hacer algo: <b>instructivo</b>."},
        {t:"La fotosíntesis es el proceso mediante el cual las plantas transforman la luz en energía.", r:"expositivo",
         ex:"Explica un concepto de forma neutra: <b>expositivo</b>."},
        {t:"No es aceptable que suban el precio del transporte. Los datos demuestran que...", r:"argumentativo",
         ex:"Hay una postura y pruebas para defenderla: <b>argumentativo</b>."},
      ];
      const c = elige(casos);
      return {textoPlano: true,
        enunciado: `<em>«${c.t}»</em><br><span class="mini">¿Qué tipo de texto es? (narrativo, descriptivo, expositivo, argumentativo, dialogado o instructivo)</span>`,
        respuesta: c.r,
        pista: "¿Cuenta algo que pasa, dice cómo es, informa, convence, reproduce voces o manda hacer?",
        pasos: [c.ex,
          `Pregunta clave: <b>¿para qué está escrito?</b> Contar (narrativo), pintar (descriptivo), informar (expositivo), convencer (argumentativo), hablar (dialogado) o guiar (instructivo).`]};
    }},

  conector: {
    titulo: "¿Qué conector encaja?",
    genera(){
      const casos = [
        {f:"Estudió mucho; ____, suspendió.", r:"sin embargo", tipo:"oposición", ex:"Hay contraste entre las dos ideas."},
        {f:"Llovía mucho; ____, suspendieron el partido.", r:"por lo tanto", tipo:"consecuencia", ex:"La segunda idea es efecto de la primera."},
        {f:"No vino. ____, estaba enfermo.", r:"en efecto", tipo:"confirmación", ex:"Confirma lo anterior."},
        {f:"____, hay que definir el problema. Después, buscar soluciones.", r:"en primer lugar", tipo:"orden", ex:"Ordena las partes del texto."},
        {f:"El plan es caro. ____, no tenemos tiempo.", r:"además", tipo:"adición", ex:"Suma un argumento en la misma dirección."},
        {f:"____, podemos concluir que la medida fracasó.", r:"en conclusión", tipo:"cierre", ex:"Cierra el texto y recoge lo dicho."},
        {f:"Es un buen método; ____, el más usado en Europa.", r:"de hecho", tipo:"refuerzo", ex:"Refuerza con un dato lo que se acaba de decir."},
        {f:"No pudo venir ____ estaba trabajando.", r:"porque", tipo:"causa", ex:"Introduce la causa."},
      ];
      const c = elige(casos);
      return {textoPlano: true,
        enunciado: `<b>${c.f}</b><br><span class="mini">Escribe un conector de <b>${c.tipo}</b></span>`,
        respuesta: c.r,
        pista: `Hace falta un conector de ${c.tipo}.`,
        pasos: [c.ex, `Por ejemplo: <b>${c.r}</b>.`,
          `Otros de ${c.tipo}: ${
            c.tipo === "oposición" ? "no obstante, en cambio, por el contrario, ahora bien" :
            c.tipo === "consecuencia" ? "así pues, en consecuencia, de ahí que, por eso" :
            c.tipo === "adición" ? "asimismo, también, es más, por otra parte" :
            c.tipo === "orden" ? "para empezar, a continuación, por último, finalmente" :
            c.tipo === "cierre" ? "en resumen, en definitiva, para terminar" :
            c.tipo === "causa" ? "ya que, puesto que, debido a que, dado que" :
            c.tipo === "refuerzo" ? "es más, incluso, en realidad" : "efectivamente, ciertamente"}.`]};
    }},

  tipoArgumento: {
    titulo: "¿Qué tipo de argumento?",
    genera(){
      const casos = [
        {a:"Según un estudio de la Universidad de Harvard, dormir ocho horas mejora la memoria.", r:"autoridad",
         ex:"Se apoya en alguien reconocido: argumento de <b>autoridad</b>."},
        {a:"El 78 % de los encuestados dijo que usaría el carril bici.", r:"datos",
         ex:"Se apoya en cifras: argumento de <b>datos</b> o estadístico."},
        {a:"Mi primo dejó el azúcar y perdió diez kilos.", r:"ejemplo",
         ex:"Un caso concreto: argumento de <b>ejemplo</b>. Ojo: uno solo prueba poco."},
        {a:"Nadie querría que le trataran así; por eso no debemos hacerlo.", r:"experiencia",
         ex:"Apela a lo que cualquiera sabe o siente: argumento de <b>experiencia</b> o sentido común."},
        {a:"Prohibirlo sería como prohibir los coches porque hay accidentes.", r:"analogia",
         ex:"Compara con otra situación parecida: argumento por <b>analogía</b>."},
        {a:"Los expertos de la OMS recomiendan reducir la sal.", r:"autoridad",
         ex:"Cita a una institución reconocida: <b>autoridad</b>."},
      ];
      const c = elige(casos);
      return {textoPlano: true,
        enunciado: `<em>«${c.a}»</em><br><span class="mini">¿Qué tipo de argumento es? (autoridad, datos, ejemplo, experiencia, analogía)</span>`,
        respuesta: c.r,
        pista: "¿En qué se apoya: en alguien que sabe, en cifras, en un caso, en lo que todos vivimos, o en una comparación?",
        pasos: [c.ex,
          `Al comentar un texto, no basta con decir que hay argumentos: hay que decir <b>de qué tipo</b> y si son sólidos.`]};
    }},

  coherenciaCohesion: {
    titulo: "¿Qué falla en este texto?",
    genera(){
      const casos = [
        {t:"Ana llegó tarde. Ana abrió la puerta. Ana dejó la mochila. Ana se sentó.", r:"repeticion",
         ex:"Se repite «Ana» cuatro veces. Falta <b>cohesión</b>: habría que usar pronombres o elipsis."},
        {t:"Me gusta el fútbol. El jueves hay clase de mates. Mi perro se llama Rocky.", r:"coherencia",
         ex:"Las frases no tienen relación entre sí: falta <b>coherencia</b>. No hay un tema común."},
        {t:"Fui al cine y vi una película y me gustó mucho y luego cenamos y volvimos.", r:"conectores",
         ex:"Todo unido con «y»: faltan <b>conectores</b> variados que marquen la relación entre ideas."},
        {t:"Primero hay que batir los huevos. Los huevos son ricos en proteínas y vitaminas.", r:"coherencia",
         ex:"Se va del tema: estaba dando instrucciones y pasa a informar. Rompe la <b>coherencia</b>."},
        {t:"El libro que compré ayer. Es muy bueno y lo recomiendo.", r:"puntuacion",
         ex:"La primera no es una oración: le falta verbo principal. Problema de <b>puntuación</b>."},
      ];
      const c = elige(casos);
      return {textoPlano: true,
        enunciado: `<em>«${c.t}»</em><br><span class="mini">¿Qué falla? (repetición, coherencia, conectores, puntuación)</span>`,
        respuesta: c.r,
        pista: "¿Se repite algo, se va del tema, todo va unido igual, o hay frases sin verbo?",
        pasos: [c.ex,
          `<b>Coherencia</b>: que todo hable de lo mismo y tenga sentido. <b>Cohesión</b>: que las frases estén bien enlazadas.`]};
    }},
});
