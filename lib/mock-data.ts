export interface Lesson {
  id: string
  title: string
  createdAt: string
}

export interface Word {
  id: string
  lessonId: string
  frenchWord: string
}

export interface Translation {
  id: string
  wordId: string
  englishWord: string
  isPrimary: boolean
}

export const mockLessons: Lesson[] = [
  {
    id: "l1",
    title: "Les émotions",
    createdAt: "2025-08-26T10:00:00Z",
  },
  {
    id: "l2",
    title: "La famille",
    createdAt: "2025-08-25T14:30:00Z",
  },
  {
    id: "l3",
    title: "Les couleurs",
    createdAt: "2025-08-24T09:15:00Z",
  },
  {
    id: "l4",
    title: "La nourriture",
    createdAt: "2025-08-23T16:45:00Z",
  },
  {
    id: "l5",
    title: "Les animaux",
    createdAt: "2025-08-22T11:20:00Z",
  },
]

export const mockWords: Word[] = [
  // Les émotions
  { id: "w1", lessonId: "l1", frenchWord: "fatigué" },
  { id: "w2", lessonId: "l1", frenchWord: "heureux" },
  { id: "w3", lessonId: "l1", frenchWord: "triste" },
  { id: "w4", lessonId: "l1", frenchWord: "en colère" },
  { id: "w5", lessonId: "l1", frenchWord: "surpris" },

  // La famille
  { id: "w6", lessonId: "l2", frenchWord: "mère" },
  { id: "w7", lessonId: "l2", frenchWord: "père" },
  { id: "w8", lessonId: "l2", frenchWord: "frère" },
  { id: "w9", lessonId: "l2", frenchWord: "sœur" },
  { id: "w10", lessonId: "l2", frenchWord: "grand-mère" },

  // Les couleurs
  { id: "w11", lessonId: "l3", frenchWord: "rouge" },
  { id: "w12", lessonId: "l3", frenchWord: "bleu" },
  { id: "w13", lessonId: "l3", frenchWord: "vert" },
  { id: "w14", lessonId: "l3", frenchWord: "jaune" },
  { id: "w15", lessonId: "l3", frenchWord: "noir" },

  // La nourriture
  { id: "w16", lessonId: "l4", frenchWord: "pain" },
  { id: "w17", lessonId: "l4", frenchWord: "fromage" },
  { id: "w18", lessonId: "l4", frenchWord: "pomme" },
  { id: "w19", lessonId: "l4", frenchWord: "eau" },
  { id: "w20", lessonId: "l4", frenchWord: "café" },

  // Les animaux
  { id: "w21", lessonId: "l5", frenchWord: "chat" },
  { id: "w22", lessonId: "l5", frenchWord: "chien" },
  { id: "w23", lessonId: "l5", frenchWord: "oiseau" },
  { id: "w24", lessonId: "l5", frenchWord: "poisson" },
  { id: "w25", lessonId: "l5", frenchWord: "cheval" },
]

export const mockTranslations: Translation[] = [
  // fatigué
  { id: "t1", wordId: "w1", englishWord: "tired", isPrimary: true },
  { id: "t2", wordId: "w1", englishWord: "exhausted", isPrimary: false },
  { id: "t3", wordId: "w1", englishWord: "weary", isPrimary: false },
  { id: "t4", wordId: "w1", englishWord: "worn out", isPrimary: false },
  { id: "t5", wordId: "w1", englishWord: "drained", isPrimary: false },
  { id: "t6", wordId: "w1", englishWord: "sleepy", isPrimary: false },

  // heureux
  { id: "t7", wordId: "w2", englishWord: "happy", isPrimary: true },
  { id: "t8", wordId: "w2", englishWord: "joyful", isPrimary: false },
  { id: "t9", wordId: "w2", englishWord: "glad", isPrimary: false },
  { id: "t10", wordId: "w2", englishWord: "cheerful", isPrimary: false },
  { id: "t11", wordId: "w2", englishWord: "delighted", isPrimary: false },
  { id: "t12", wordId: "w2", englishWord: "content", isPrimary: false },

  // triste
  { id: "t13", wordId: "w3", englishWord: "sad", isPrimary: true },
  { id: "t14", wordId: "w3", englishWord: "unhappy", isPrimary: false },
  { id: "t15", wordId: "w3", englishWord: "melancholy", isPrimary: false },
  { id: "t16", wordId: "w3", englishWord: "sorrowful", isPrimary: false },
  { id: "t17", wordId: "w3", englishWord: "dejected", isPrimary: false },
  { id: "t18", wordId: "w3", englishWord: "downhearted", isPrimary: false },

  // en colère
  { id: "t19", wordId: "w4", englishWord: "angry", isPrimary: true },
  { id: "t20", wordId: "w4", englishWord: "mad", isPrimary: false },
  { id: "t21", wordId: "w4", englishWord: "furious", isPrimary: false },
  { id: "t22", wordId: "w4", englishWord: "irritated", isPrimary: false },
  { id: "t23", wordId: "w4", englishWord: "annoyed", isPrimary: false },
  { id: "t24", wordId: "w4", englishWord: "upset", isPrimary: false },

  // surpris
  { id: "t25", wordId: "w5", englishWord: "surprised", isPrimary: true },
  { id: "t26", wordId: "w5", englishWord: "amazed", isPrimary: false },
  { id: "t27", wordId: "w5", englishWord: "astonished", isPrimary: false },
  { id: "t28", wordId: "w5", englishWord: "shocked", isPrimary: false },
  { id: "t29", wordId: "w5", englishWord: "stunned", isPrimary: false },
  { id: "t30", wordId: "w5", englishWord: "startled", isPrimary: false },

  // mère
  { id: "t31", wordId: "w6", englishWord: "mother", isPrimary: true },
  { id: "t32", wordId: "w6", englishWord: "mom", isPrimary: false },
  { id: "t33", wordId: "w6", englishWord: "mama", isPrimary: false },
  { id: "t34", wordId: "w6", englishWord: "mum", isPrimary: false },
  { id: "t35", wordId: "w6", englishWord: "mommy", isPrimary: false },
  { id: "t36", wordId: "w6", englishWord: "parent", isPrimary: false },

  // père
  { id: "t37", wordId: "w7", englishWord: "father", isPrimary: true },
  { id: "t38", wordId: "w7", englishWord: "dad", isPrimary: false },
  { id: "t39", wordId: "w7", englishWord: "papa", isPrimary: false },
  { id: "t40", wordId: "w7", englishWord: "daddy", isPrimary: false },
  { id: "t41", wordId: "w7", englishWord: "pop", isPrimary: false },
  { id: "t42", wordId: "w7", englishWord: "parent", isPrimary: false },

  // frère
  { id: "t43", wordId: "w8", englishWord: "brother", isPrimary: true },
  { id: "t44", wordId: "w8", englishWord: "bro", isPrimary: false },
  { id: "t45", wordId: "w8", englishWord: "sibling", isPrimary: false },
  { id: "t46", wordId: "w8", englishWord: "male sibling", isPrimary: false },
  { id: "t47", wordId: "w8", englishWord: "big brother", isPrimary: false },
  { id: "t48", wordId: "w8", englishWord: "little brother", isPrimary: false },

  // sœur
  { id: "t49", wordId: "w9", englishWord: "sister", isPrimary: true },
  { id: "t50", wordId: "w9", englishWord: "sis", isPrimary: false },
  { id: "t51", wordId: "w9", englishWord: "sibling", isPrimary: false },
  { id: "t52", wordId: "w9", englishWord: "female sibling", isPrimary: false },
  { id: "t53", wordId: "w9", englishWord: "big sister", isPrimary: false },
  { id: "t54", wordId: "w9", englishWord: "little sister", isPrimary: false },

  // grand-mère
  { id: "t55", wordId: "w10", englishWord: "grandmother", isPrimary: true },
  { id: "t56", wordId: "w10", englishWord: "grandma", isPrimary: false },
  { id: "t57", wordId: "w10", englishWord: "granny", isPrimary: false },
  { id: "t58", wordId: "w10", englishWord: "nana", isPrimary: false },
  { id: "t59", wordId: "w10", englishWord: "gran", isPrimary: false },
  { id: "t60", wordId: "w10", englishWord: "grandmama", isPrimary: false },

  // rouge
  { id: "t61", wordId: "w11", englishWord: "red", isPrimary: true },
  { id: "t62", wordId: "w11", englishWord: "crimson", isPrimary: false },
  { id: "t63", wordId: "w11", englishWord: "scarlet", isPrimary: false },
  { id: "t64", wordId: "w11", englishWord: "cherry", isPrimary: false },
  { id: "t65", wordId: "w11", englishWord: "ruby", isPrimary: false },
  { id: "t66", wordId: "w11", englishWord: "burgundy", isPrimary: false },

  // bleu
  { id: "t67", wordId: "w12", englishWord: "blue", isPrimary: true },
  { id: "t68", wordId: "w12", englishWord: "azure", isPrimary: false },
  { id: "t69", wordId: "w12", englishWord: "navy", isPrimary: false },
  { id: "t70", wordId: "w12", englishWord: "cobalt", isPrimary: false },
  { id: "t71", wordId: "w12", englishWord: "sapphire", isPrimary: false },
  { id: "t72", wordId: "w12", englishWord: "turquoise", isPrimary: false },

  // vert
  { id: "t73", wordId: "w13", englishWord: "green", isPrimary: true },
  { id: "t74", wordId: "w13", englishWord: "emerald", isPrimary: false },
  { id: "t75", wordId: "w13", englishWord: "lime", isPrimary: false },
  { id: "t76", wordId: "w13", englishWord: "olive", isPrimary: false },
  { id: "t77", wordId: "w13", englishWord: "forest", isPrimary: false },
  { id: "t78", wordId: "w13", englishWord: "jade", isPrimary: false },

  // jaune
  { id: "t79", wordId: "w14", englishWord: "yellow", isPrimary: true },
  { id: "t80", wordId: "w14", englishWord: "golden", isPrimary: false },
  { id: "t81", wordId: "w14", englishWord: "amber", isPrimary: false },
  { id: "t82", wordId: "w14", englishWord: "lemon", isPrimary: false },
  { id: "t83", wordId: "w14", englishWord: "canary", isPrimary: false },
  { id: "t84", wordId: "w14", englishWord: "sunshine", isPrimary: false },

  // noir
  { id: "t85", wordId: "w15", englishWord: "black", isPrimary: true },
  { id: "t86", wordId: "w15", englishWord: "dark", isPrimary: false },
  { id: "t87", wordId: "w15", englishWord: "ebony", isPrimary: false },
  { id: "t88", wordId: "w15", englishWord: "charcoal", isPrimary: false },
  { id: "t89", wordId: "w15", englishWord: "jet", isPrimary: false },
  { id: "t90", wordId: "w15", englishWord: "midnight", isPrimary: false },

  // pain
  { id: "t91", wordId: "w16", englishWord: "bread", isPrimary: true },
  { id: "t92", wordId: "w16", englishWord: "loaf", isPrimary: false },
  { id: "t93", wordId: "w16", englishWord: "baguette", isPrimary: false },
  { id: "t94", wordId: "w16", englishWord: "roll", isPrimary: false },
  { id: "t95", wordId: "w16", englishWord: "toast", isPrimary: false },
  { id: "t96", wordId: "w16", englishWord: "bun", isPrimary: false },

  // fromage
  { id: "t97", wordId: "w17", englishWord: "cheese", isPrimary: true },
  { id: "t98", wordId: "w17", englishWord: "cheddar", isPrimary: false },
  { id: "t99", wordId: "w17", englishWord: "brie", isPrimary: false },
  { id: "t100", wordId: "w17", englishWord: "gouda", isPrimary: false },
  { id: "t101", wordId: "w17", englishWord: "camembert", isPrimary: false },
  { id: "t102", wordId: "w17", englishWord: "dairy", isPrimary: false },

  // pomme
  { id: "t103", wordId: "w18", englishWord: "apple", isPrimary: true },
  { id: "t104", wordId: "w18", englishWord: "fruit", isPrimary: false },
  { id: "t105", wordId: "w18", englishWord: "red apple", isPrimary: false },
  { id: "t106", wordId: "w18", englishWord: "green apple", isPrimary: false },
  { id: "t107", wordId: "w18", englishWord: "granny smith", isPrimary: false },
  { id: "t108", wordId: "w18", englishWord: "golden delicious", isPrimary: false },

  // eau
  { id: "t109", wordId: "w19", englishWord: "water", isPrimary: true },
  { id: "t110", wordId: "w19", englishWord: "liquid", isPrimary: false },
  { id: "t111", wordId: "w19", englishWord: "drink", isPrimary: false },
  { id: "t112", wordId: "w19", englishWord: "beverage", isPrimary: false },
  { id: "t113", wordId: "w19", englishWord: "fluid", isPrimary: false },
  { id: "t114", wordId: "w19", englishWord: "aqua", isPrimary: false },

  // café
  { id: "t115", wordId: "w20", englishWord: "coffee", isPrimary: true },
  { id: "t116", wordId: "w20", englishWord: "espresso", isPrimary: false },
  { id: "t117", wordId: "w20", englishWord: "cappuccino", isPrimary: false },
  { id: "t118", wordId: "w20", englishWord: "latte", isPrimary: false },
  { id: "t119", wordId: "w20", englishWord: "brew", isPrimary: false },
  { id: "t120", wordId: "w20", englishWord: "java", isPrimary: false },

  // chat
  { id: "t121", wordId: "w21", englishWord: "cat", isPrimary: true },
  { id: "t122", wordId: "w21", englishWord: "kitten", isPrimary: false },
  { id: "t123", wordId: "w21", englishWord: "feline", isPrimary: false },
  { id: "t124", wordId: "w21", englishWord: "kitty", isPrimary: false },
  { id: "t125", wordId: "w21", englishWord: "tabby", isPrimary: false },
  { id: "t126", wordId: "w21", englishWord: "tomcat", isPrimary: false },

  // chien
  { id: "t127", wordId: "w22", englishWord: "dog", isPrimary: true },
  { id: "t128", wordId: "w22", englishWord: "puppy", isPrimary: false },
  { id: "t129", wordId: "w22", englishWord: "canine", isPrimary: false },
  { id: "t130", wordId: "w22", englishWord: "hound", isPrimary: false },
  { id: "t131", wordId: "w22", englishWord: "mutt", isPrimary: false },
  { id: "t132", wordId: "w22", englishWord: "pooch", isPrimary: false },

  // oiseau
  { id: "t133", wordId: "w23", englishWord: "bird", isPrimary: true },
  { id: "t134", wordId: "w23", englishWord: "fowl", isPrimary: false },
  { id: "t135", wordId: "w23", englishWord: "avian", isPrimary: false },
  { id: "t136", wordId: "w23", englishWord: "songbird", isPrimary: false },
  { id: "t137", wordId: "w23", englishWord: "feathered friend", isPrimary: false },
  { id: "t138", wordId: "w23", englishWord: "winged creature", isPrimary: false },

  // poisson
  { id: "t139", wordId: "w24", englishWord: "fish", isPrimary: true },
  { id: "t140", wordId: "w24", englishWord: "seafood", isPrimary: false },
  { id: "t141", wordId: "w24", englishWord: "aquatic animal", isPrimary: false },
  { id: "t142", wordId: "w24", englishWord: "marine life", isPrimary: false },
  { id: "t143", wordId: "w24", englishWord: "swimmer", isPrimary: false },
  { id: "t144", wordId: "w24", englishWord: "catch", isPrimary: false },

  // cheval
  { id: "t145", wordId: "w25", englishWord: "horse", isPrimary: true },
  { id: "t146", wordId: "w25", englishWord: "stallion", isPrimary: false },
  { id: "t147", wordId: "w25", englishWord: "mare", isPrimary: false },
  { id: "t148", wordId: "w25", englishWord: "pony", isPrimary: false },
  { id: "t149", wordId: "w25", englishWord: "steed", isPrimary: false },
  { id: "t150", wordId: "w25", englishWord: "equine", isPrimary: false },
]

// Helper functions
export const getWordsByLessonId = (lessonId: string): Word[] => {
  return mockWords.filter((word) => word.lessonId === lessonId)
}

export const getTranslationsByWordId = (wordId: string): Translation[] => {
  return mockTranslations.filter((translation) => translation.wordId === wordId)
}

export const getLessonById = (lessonId: string): Lesson | undefined => {
  return mockLessons.find((lesson) => lesson.id === lessonId)
}

export const getWordById = (wordId: string): Word | undefined => {
  return mockWords.find((word) => word.id === wordId)
}
