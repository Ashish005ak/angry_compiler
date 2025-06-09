// angryErrorTransformer.js

const errorMap = [
    {
      match: /expected [‘']?;[’']?/i,
      response: () => "Seriously? A semicolon? It's like the first thing they teach in C!"
    },
    {
      match: /undefined variable/i,
      response: () => "You're summoning ghosts now? That variable doesn't even exist!"
    },
    {
      match: /SyntaxError: Unexpected token/i,
      response: () => "Unexpected token? More like unexpected intelligence. Check your code."
    },
    {
      match: /Segmentation fault/i,
      response: () => "You poked memory where you shouldn't. Classic move."
    },
    {
      match: /TypeError/i,
      response: () => "You gave it a banana and expected it to act like a number. Genius!"
    }
  ];
  
  function transformToAngryError(rawError) {
    for (let rule of errorMap) {
      if (rule.match.test(rawError)) {
        return rule.response(rawError); 
      }
    }
  

    return `Wow. That broke spectacularly. Here's what the compiler said:\n${rawError}`;
  }
  
  module.exports = { transformToAngryError };  