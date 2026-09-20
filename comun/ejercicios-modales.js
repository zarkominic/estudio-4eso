/* ejercicios-modales.js — verbos modales en inglés. */

Object.assign(EJERCICIOS, {

  elegirModal: {
    titulo: "¿Qué modal encaja?",
    genera(){
      const casos = [
        {f:"You ____ wear a helmet. It's the law.", r:"must", ex:"Obligación que viene de una norma o de quien habla: <b>must</b>."},
        {f:"I ____ work on Saturdays. My boss says so.", r:"have to", ex:"Obligación externa, impuesta por otro: <b>have to</b>."},
        {f:"You ____ see that film. It's amazing!", r:"should", ex:"Consejo, no obligación: <b>should</b>."},
        {f:"She ____ speak four languages.", r:"can", ex:"Habilidad presente: <b>can</b>."},
        {f:"____ you help me, please?", r:"could", ex:"Petición educada: <b>could</b> suena más amable que «can»."},
        {f:"It ____ rain later. Take an umbrella.", r:"might", ex:"Posibilidad no segura: <b>might</b> o «may»."},
        {f:"You ____ smoke here. It's forbidden.", r:"mustn't", ex:"Prohibición: <b>mustn't</b>. No es lo mismo que «don't have to»."},
        {f:"You ____ pay. It's free.", r:"don't have to", ex:"Ausencia de obligación: <b>don't have to</b>. No está prohibido: simplemente no hace falta."},
        {f:"When I was five I ____ swim.", r:"could", ex:"Habilidad en el pasado: <b>could</b>."},
        {f:"That ____ be John. He's in Paris right now.", r:"can't", ex:"Deducción negativa, casi seguro que no: <b>can't</b>."},
      ];
      const c = elige(casos);
      return {textoPlano: true,
        enunciado: `<b>${c.f}</b><br><span class="mini">Escribe el modal que falta</span>`,
        respuesta: c.r,
        pista: "Pregúntate qué expresa: obligación, consejo, habilidad, posibilidad, permiso o deducción.",
        pasos: [c.ex, `Queda: <b>${c.f.replace("____", c.r)}</b>`]};
    }},

  mustODontHaveTo: {
    titulo: "Prohibido o no hace falta",
    genera(){
      const casos = [
        {f:"You ____ use your phone during the exam.", r:"mustn't", pq:"Está <b>prohibido</b>."},
        {f:"You ____ bring food. Lunch is included.", r:"don't have to", pq:"<b>No hace falta</b>, pero puedes si quieres."},
        {f:"You ____ touch that. It's dangerous.", r:"mustn't", pq:"Prohibición: es peligroso."},
        {f:"You ____ come early. The meeting starts at ten.", r:"don't have to", pq:"No es necesario venir antes."},
        {f:"Passengers ____ open the doors while the train is moving.", r:"mustn't", pq:"Prohibido por seguridad."},
        {f:"You ____ pay for the children. They go free.", r:"don't have to", pq:"No es obligatorio pagar."},
      ];
      const c = elige(casos);
      return {textoPlano: true,
        enunciado: `<b>${c.f}</b><br><span class="mini">¿«mustn't» o «don't have to»?</span>`,
        respuesta: c.r,
        pista: "«Mustn't» es PROHIBIDO. «Don't have to» es NO HACE FALTA. No significan lo mismo.",
        pasos: [c.pq, `Va <b>${c.r}</b>.`,
          `Este par es de los que más se falla, porque en español los dos se traducen parecido: «no debes» y «no tienes que».`]};
    }},

  modalPerfect: {
    titulo: "Modales del pasado",
    genera(){
      const casos = [
        {f:"She ____ (must / study) a lot. She got an A+.", r:"must have studied", ex:"Deducción sobre el pasado, casi seguro: <b>must have + participio</b>."},
        {f:"You ____ (should / tell) me. I would have helped.", r:"should have told", ex:"Reproche: algo que no se hizo y habría estado bien. <b>should have + participio</b>."},
        {f:"He ____ (can't / see) us. It was too dark.", r:"can't have seen", ex:"Deducción negativa sobre el pasado: <b>can't have + participio</b>."},
        {f:"They ____ (might / miss) the train. They're late.", r:"might have missed", ex:"Posibilidad en el pasado: <b>might have + participio</b>."},
        {f:"I ____ (should / not eat) so much.", r:"shouldn't have eaten", ex:"Arrepentimiento: <b>shouldn't have + participio</b>."},
        {f:"She ____ (must / be) tired after the trip.", r:"must have been", ex:"Deducción: seguro que lo estaba."},
      ];
      const c = elige(casos);
      return {textoPlano: true,
        enunciado: `<b>${c.f}</b><br><span class="mini">Escribe la forma completa</span>`,
        respuesta: c.r,
        pista: "Modal + have + participio. El modal no cambia; lo que marca el pasado es «have + participio».",
        pasos: [c.ex, `Queda: <b>${c.f.replace(/____ \([^)]+\)/, c.r)}</b>`,
          `Ojo: nunca «must studied» ni «should told». Siempre con <b>have</b> en medio.`]};
    }},

  deduccion: {
    titulo: "Deducir con modales",
    genera(){
      const casos = [
        {f:"The lights are on, so he ____ be at home.", r:"must", ex:"Casi seguro que sí: <b>must</b>."},
        {f:"She ____ be at work. It's Sunday.", r:"can't", ex:"Casi seguro que no: <b>can't</b>. Nunca «mustn't» para deducir."},
        {f:"I'm not sure, but they ____ be Spanish.", r:"might", ex:"Posible pero no seguro: <b>might</b> o «may» o «could»."},
        {f:"His car isn't here, so he ____ have left.", r:"must", ex:"Deducción sobre el pasado: must have left."},
        {f:"That ____ be true. It's impossible.", r:"can't", ex:"Imposible: <b>can't</b>."},
      ];
      const c = elige(casos);
      return {textoPlano: true,
        enunciado: `<b>${c.f}</b><br><span class="mini">¿must, can't o might?</span>`,
        respuesta: c.r,
        pista: "Escala: must (seguro que sí) · might (quizá) · can't (seguro que no).",
        pasos: [c.ex, `Va <b>${c.r}</b>.`,
          `Para deducir se usa <b>can't</b>, no «mustn't». «Mustn't» es prohibición, no deducción.`]};
    }},
});
