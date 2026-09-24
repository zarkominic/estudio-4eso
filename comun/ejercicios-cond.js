/* ejercicios-cond.js — conditionals and wish. Frases de un banco revisado:
   inventarlas por combinación da inglés que no habla nadie. */
(function(){

const TIPOS = [
  {f:"If you heat ice, it melts.", t:"zero", por:"Present + present: a general truth that always happens."},
  {f:"If you mix blue and yellow, you get green.", t:"zero", por:"Present + present: a fact, not a single situation."},
  {f:"If it rains tomorrow, we will stay at home.", t:"first", por:"Present + will: a real, likely future situation."},
  {f:"If you study, you will pass.", t:"first", por:"Present + will: possible and realistic."},
  {f:"If I had more time, I would learn Japanese.", t:"second", por:"Past simple + would: an imaginary present situation (I don't have time)."},
  {f:"If she were taller, she would play basketball.", t:"second", por:"Past + would: unreal now. «were» for all persons is correct in conditionals."},
  {f:"If we had left earlier, we would have caught the train.", t:"third", por:"Past perfect + would have: an imaginary past. We didn't leave earlier, and we missed it."},
  {f:"If he had listened, he wouldn't have failed.", t:"third", por:"Past perfect + would have + participle: regret about the past."},
  {f:"If I had studied medicine, I would be a doctor now.", t:"mixed", por:"Past condition (had studied) with a present result (would be now): mixed."},
];

const HUECOS = [
  {f:"If it ___ (rain) tomorrow, we'll cancel the match.", r:"rains", t:"first", por:"First conditional: if + present simple."},
  {f:"If I ___ (be) you, I would apologise.", r:"were", alt:["was"], t:"second", por:"Second conditional: if + past. «were» is the standard form, also with I."},
  {f:"If they had asked me, I ___ (help) them.", r:"would have helped", alt:["'d have helped","would've helped"], t:"third", por:"Third conditional: would have + past participle."},
  {f:"If you ___ (not / hurry), you'll miss the bus.", r:"don't hurry", alt:["do not hurry"], t:"first", por:"First conditional: if + present simple, here negative."},
  {f:"If I won the lottery, I ___ (travel) round the world.", r:"would travel", alt:["'d travel"], t:"second", por:"Second conditional: would + infinitive."},
  {f:"If she ___ (know) the answer, she would have told us.", r:"had known", alt:["'d known"], t:"third", por:"Third conditional: if + past perfect."},
  {f:"Water boils if you ___ (heat) it to 100 °C.", r:"heat", t:"zero", por:"Zero conditional: present + present."},
  {f:"If we ___ (have) a car, we would go to the beach.", r:"had", t:"second", por:"Second conditional: if + past simple."},
  {f:"I'll lend you my bike if you ___ (promise) to be careful.", r:"promise", t:"first", por:"First conditional: never «will» after if."},
  {f:"If he hadn't eaten so much, he ___ (not / feel) sick.", r:"wouldn't have felt", alt:["would not have felt"], t:"third", por:"Third conditional, negative: wouldn't have + participle."},
];

const WISH = [
  {f:"I'm not tall. → I wish I ___ taller.", r:"were", alt:["was"], por:"Wish about the present → past simple."},
  {f:"I didn't study. → I wish I ___ harder.", r:"had studied", alt:["'d studied"], por:"Regret about the past → past perfect."},
  {f:"You keep interrupting me. → I wish you ___ interrupting me.", r:"would stop", alt:["'d stop"], por:"Annoyance about someone's behaviour → would."},
  {f:"I can't swim. → I wish I ___ swim.", r:"could", por:"Ability you don't have → could."},
  {f:"I told her the secret. → If only I ___ her!", r:"hadn't told", alt:["had not told"], por:"If only + past perfect: regret about the past."},
  {f:"It's raining. → I wish it ___ raining.", r:"would stop", alt:["weren't","wasn't"], por:"Something you want to change that doesn't depend on you → would stop (or weren't raining)."},
];

const LINKERS = [
  {f:"You won't pass ___ you study.", r:"unless", por:"unless = if … not: «if you don't study»."},
  {f:"You can borrow my laptop ___ you give it back tomorrow.", r:"as long as", alt:["provided that","providing","on condition that"], por:"as long as = only if this condition is met."},
  {f:"Take an umbrella ___ it rains.", r:"in case", por:"in case = as a precaution, because it might happen."},
  {f:"I'll go to the party ___ you come with me.", r:"if", alt:["as long as","provided that"], por:"Simple condition: if."},
];

Object.assign(EJERCICIOS, {
  tipoCondicional: {
    titulo: "Which conditional?",
    genera(){
      const e = elige(TIPOS);
      return {textoPlano: true,
        enunciado: `«${e.f}»<br><span class="mini">Write: zero, first, second, third or mixed</span>`,
        respuesta: e.t, respuestaAlt: [e.t + " conditional"],
        pista: "Look at the verb after «if» and the verb in the other half. Present? Past? Past perfect?",
        pasos: [e.por, `→ <b>${e.t}</b> conditional.`]};
    }},
  completarCondicional: {
    titulo: "Complete the conditional",
    genera(){
      const e = elige(HUECOS);
      return {textoPlano: true,
        enunciado: `${e.f.replace("___", "<b>_____</b>")}<br><span class="mini">Write only the missing words</span>`,
        respuesta: e.r, respuestaAlt: e.alt || [],
        pista: `It's a ${e.t} conditional. Remember the pattern for that type.`,
        pasos: [`Type: <b>${e.t}</b>.`, e.por, `Answer: <b>${e.r}</b>.`]};
    }},
  wishRegret: {
    titulo: "I wish / If only",
    genera(){
      const e = elige(WISH);
      return {textoPlano: true,
        enunciado: `${e.f.replace("___", "<b>_____</b>")}<br><span class="mini">Write only the missing words</span>`,
        respuesta: e.r, respuestaAlt: e.alt || [],
        pista: "Present wish → past. Past regret → past perfect. Complaint about someone → would.",
        pasos: [e.por, `Answer: <b>${e.r}</b>.`]};
    }},
  conectoresCondicionales: {
    titulo: "Unless, as long as, in case…",
    genera(){
      const e = elige(LINKERS);
      return {textoPlano: true,
        enunciado: `${e.f.replace("___", "<b>_____</b>")}<br><span class="mini">unless, as long as, in case or if</span>`,
        respuesta: e.r, respuestaAlt: e.alt || [],
        pista: "unless = if not · as long as = only if · in case = just in case it happens",
        pasos: [e.por, `Answer: <b>${e.r}</b>.`]};
    }},
});
})();
