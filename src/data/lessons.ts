import beginner from './lessons.beginner.json'
import intermediate from './lessons.intermediate.json'
import advanced from './lessons.advanced.json'
import type { Lesson, LessonQuizQuestion } from '../lib/types'

type ExtraQuestion = Omit<LessonQuizQuestion, 'id'>

const GENERIC_EXTRAS: ExtraQuestion[] = [
  {
    questionEn: 'Choose the correct sentence.',
    questionHi: 'सही वाक्य चुनें।',
    optionsEn: ['He go to school.', 'He goes to school.', 'He going to school.', 'He gone to school.'],
    optionsHi: ['He go to school.', 'He goes to school.', 'He going to school.', 'He gone to school.'],
    correctIndex: 1,
    explanationEn: 'With he/she/it in present simple, we often add -s/-es: “He goes…”.',
    explanationHi: 'Present simple में he/she/it के साथ अक्सर -s/-es लगता है: “He goes…”.',
  },
  {
    questionEn: 'Which word is a noun?',
    questionHi: 'कौन सा शब्द संज्ञा (noun) है?',
    optionsEn: ['quickly', 'beautiful', 'teacher', 'and'],
    optionsHi: ['quickly', 'beautiful', 'teacher (शिक्षक)', 'and (और)'],
    correctIndex: 2,
    explanationEn: 'A noun names a person/place/thing/idea: teacher, Delhi, book…',
    explanationHi: 'Noun व्यक्ति/स्थान/वस्तु/विचार का नाम है: teacher, Delhi, book…',
  },
  {
    questionEn: 'Pick the correct question word for a place.',
    questionHi: 'स्थान (place) के लिए सही question word चुनें।',
    optionsEn: ['Who', 'Where', 'Why', 'When'],
    optionsHi: ['Who (कौन)', 'Where (कहाँ)', 'Why (क्यों)', 'When (कब)'],
    correctIndex: 1,
    explanationEn: '“Where” is used for places.',
    explanationHi: '“Where” का उपयोग स्थान के लिए होता है।',
  },
  {
    questionEn: 'Choose the correct article: ___ apple',
    questionHi: 'सही article चुनें: ___ apple',
    optionsEn: ['a', 'an', 'the', 'no article'],
    optionsHi: ['a', 'an', 'the', 'कोई नहीं'],
    correctIndex: 1,
    explanationEn: 'Use “an” before a vowel sound: an apple.',
    explanationHi: 'Vowel sound से पहले “an” आता है: an apple.',
  },
  {
    questionEn: 'Which is the correct past simple form of “go”?',
    questionHi: '“go” का सही past simple रूप कौन सा है?',
    optionsEn: ['goed', 'goes', 'went', 'going'],
    optionsHi: ['goed', 'goes', 'went', 'going'],
    correctIndex: 2,
    explanationEn: 'Past simple of “go” is “went”.',
    explanationHi: '“go” का past simple “went” होता है।',
  },
  {
    questionEn: 'Choose the correct punctuation.',
    questionHi: 'सही punctuation चुनें।',
    optionsEn: ['What is your name.', 'What is your name?', 'What is your name!', 'What is your name,'],
    optionsHi: ['What is your name.', 'What is your name?', 'What is your name!', 'What is your name,'],
    correctIndex: 1,
    explanationEn: 'Questions end with a question mark (?).',
    explanationHi: 'Question का अंत question mark (?) से होता है।',
  },
  {
    questionEn: 'Choose the correct future form.',
    questionHi: 'सही future form चुनें।',
    optionsEn: ['I will call you.', 'I called you.', 'I call you.', 'I have called you.'],
    optionsHi: ['I will call you.', 'I called you.', 'I call you.', 'I have called you.'],
    correctIndex: 0,
    explanationEn: '“Will + V1” is a common way to express future.',
    explanationHi: 'Future के लिए “Will + V1” एक सामान्य तरीका है।',
  },
]

const EXTRAS_BY_KEY: Record<string, ExtraQuestion[]> = {
  alphabet: [
    {
      questionEn: 'Which letter comes before D?',
      questionHi: 'D से पहले कौन सा अक्षर आता है?',
      optionsEn: ['B', 'C', 'E', 'F'],
      optionsHi: ['B', 'C', 'E', 'F'],
      correctIndex: 1,
      explanationEn: 'Alphabet order: C, D, E…',
      explanationHi: 'वर्णमाला क्रम: C, D, E…',
    },
    {
      questionEn: 'How many vowels are there in English (A, E, I, O, U)?',
      questionHi: 'English में vowels (A, E, I, O, U) कितने होते हैं?',
      optionsEn: ['4', '5', '6', '7'],
      optionsHi: ['4', '5', '6', '7'],
      correctIndex: 1,
      explanationEn: 'There are 5 main vowels: A, E, I, O, U.',
      explanationHi: '5 मुख्य vowels होते हैं: A, E, I, O, U.',
    },
    {
      questionEn: 'Which letter is a vowel?',
      questionHi: 'इनमें से vowel कौन सा है?',
      optionsEn: ['B', 'D', 'E', 'G'],
      optionsHi: ['B', 'D', 'E', 'G'],
      correctIndex: 2,
      explanationEn: 'E is a vowel.',
      explanationHi: 'E vowel है।',
    },
    {
      questionEn: 'Which is the lowercase of “T”?',
      questionHi: '“T” का lowercase कौन सा है?',
      optionsEn: ['t', 'T', 'p', 'f'],
      optionsHi: ['t', 'T', 'p', 'f'],
      correctIndex: 0,
      explanationEn: 'Lowercase of T is t.',
      explanationHi: 'T का lowercase t होता है।',
    },
    {
      questionEn: 'What letter comes between M and O?',
      questionHi: 'M और O के बीच कौन सा अक्षर आता है?',
      optionsEn: ['L', 'N', 'P', 'Q'],
      optionsHi: ['L', 'N', 'P', 'Q'],
      correctIndex: 1,
      explanationEn: '… M, N, O …',
      explanationHi: '… M, N, O …',
    },
    {
      questionEn: 'Which is an uppercase letter?',
      questionHi: 'इनमें से uppercase अक्षर कौन सा है?',
      optionsEn: ['g', 'k', 'R', 'm'],
      optionsHi: ['g', 'k', 'R', 'm'],
      correctIndex: 2,
      explanationEn: 'Uppercase letters are capital letters: A, B, C…',
      explanationHi: 'Uppercase यानी capital letters: A, B, C…',
    },
    {
      questionEn: 'Which comes first in the alphabet?',
      questionHi: 'वर्णमाला में पहले कौन आता है?',
      optionsEn: ['S', 'Q', 'R', 'T'],
      optionsHi: ['S', 'Q', 'R', 'T'],
      correctIndex: 1,
      explanationEn: 'Q comes before R, S, and T.',
      explanationHi: 'Q, R/S/T से पहले आता है।',
    },
  ],

  'parts-of-speech': [
    {
      questionEn: 'Which word is an adjective?',
      questionHi: 'कौन सा शब्द विशेषण (adjective) है?',
      optionsEn: ['quick', 'quickly', 'run', 'under'],
      optionsHi: ['quick (तेज़)', 'quickly (जल्दी)', 'run (दौड़ना)', 'under (के नीचे)'],
      correctIndex: 0,
      explanationEn: 'Adjectives describe nouns: quick car, red apple…',
      explanationHi: 'Adjective संज्ञा का वर्णन करता है: quick car, red apple…',
    },
    {
      questionEn: 'Which word is an adverb?',
      questionHi: 'कौन सा शब्द क्रिया-विशेषण (adverb) है?',
      optionsEn: ['happy', 'slowly', 'book', 'teacher'],
      optionsHi: ['happy (खुश)', 'slowly (धीरे)', 'book (किताब)', 'teacher (शिक्षक)'],
      correctIndex: 1,
      explanationEn: 'Adverbs often describe how an action happens: slowly, quickly…',
      explanationHi: 'Adverb अक्सर बताता है काम कैसे हुआ: slowly, quickly…',
    },
    {
      questionEn: 'Which word is a preposition?',
      questionHi: 'कौन सा शब्द preposition है?',
      optionsEn: ['in', 'blue', 'eat', 'she'],
      optionsHi: ['in (में)', 'blue (नीला)', 'eat (खाना)', 'she (वह)'],
      correctIndex: 0,
      explanationEn: 'Prepositions show relation: in, on, under, at…',
      explanationHi: 'Preposition संबंध बताता है: in, on, under, at…',
    },
    {
      questionEn: 'Which word is a conjunction?',
      questionHi: 'कौन सा शब्द conjunction है?',
      optionsEn: ['and', 'very', 'small', 'walk'],
      optionsHi: ['and (और)', 'very (बहुत)', 'small (छोटा)', 'walk (चलना)'],
      correctIndex: 0,
      explanationEn: 'Conjunctions join words/clauses: and, but, because…',
      explanationHi: 'Conjunction जोड़ता है: and, but, because…',
    },
    {
      questionEn: 'Which word is an interjection?',
      questionHi: 'कौन सा शब्द interjection है?',
      optionsEn: ['Wow!', 'because', 'table', 'write'],
      optionsHi: ['Wow! (वाह!)', 'because (क्योंकि)', 'table (मेज़)', 'write (लिखना)'],
      correctIndex: 0,
      explanationEn: 'Interjections show sudden feeling: Wow!, Oh!, Oops!',
      explanationHi: 'Interjection अचानक भावना: Wow!, Oh!, Oops!',
    },
    {
      questionEn: 'Which word is a pronoun?',
      questionHi: 'कौन सा शब्द pronoun है?',
      optionsEn: ['he', 'city', 'green', 'under'],
      optionsHi: ['he (वह)', 'city (शहर)', 'green (हरा)', 'under (के नीचे)'],
      correctIndex: 0,
      explanationEn: 'Pronouns replace nouns: he, she, it, they…',
      explanationHi: 'Pronoun संज्ञा की जगह: he, she, it, they…',
    },
    {
      questionEn: 'Which word is a verb?',
      questionHi: 'कौन सा शब्द verb है?',
      optionsEn: ['sleep', 'sleepy', 'slowly', 'bed'],
      optionsHi: ['sleep (सोना)', 'sleepy (नींद-सा)', 'slowly (धीरे)', 'bed (बिस्तर)'],
      correctIndex: 0,
      explanationEn: 'A verb shows action/state: sleep, run, is…',
      explanationHi: 'Verb कार्य/स्थिति बताता है: sleep, run, is…',
    },
  ],

  noun: [
    {
      questionEn: 'A noun is the name of…',
      questionHi: 'Noun किसका नाम होता है?',
      optionsEn: ['an action', 'a person/place/thing/idea', 'a joining word', 'a describing word'],
      optionsHi: ['कार्य', 'व्यक्ति/स्थान/वस्तु/विचार', 'जोड़ने वाला शब्द', 'वर्णन करने वाला शब्द'],
      correctIndex: 1,
      explanationEn: 'Nouns name people, places, things, and ideas.',
      explanationHi: 'Noun व्यक्ति, स्थान, वस्तु, विचार का नाम है।',
    },
    {
      questionEn: 'Which option is a place (noun)?',
      questionHi: 'कौन सा स्थान (place noun) है?',
      optionsEn: ['Delhi', 'eat', 'quickly', 'blue'],
      optionsHi: ['Delhi (दिल्ली)', 'eat (खाना)', 'quickly (जल्दी)', 'blue (नीला)'],
      correctIndex: 0,
      explanationEn: 'Delhi is a place name (noun).',
      explanationHi: 'Delhi स्थान का नाम है (noun).',
    },
    {
      questionEn: 'Which sentence has a noun highlighted correctly?',
      questionHi: 'किस वाक्य में noun सही पहचाना गया है?',
      optionsEn: ['(Run) is fun.', '(Happy) is a city.', '(Book) is on the table.', '(Quickly) is my friend.'],
      optionsHi: ['(Run) मज़ेदार है।', '(Happy) एक शहर है।', '(Book) मेज़ पर है।', '(Quickly) मेरा दोस्त है।'],
      correctIndex: 2,
      explanationEn: '“Book” is a thing (noun).',
      explanationHi: '“Book” वस्तु है (noun).',
    },
    {
      questionEn: 'Which is an idea (noun)?',
      questionHi: 'कौन सा “idea” (noun) है?',
      optionsEn: ['honesty', 'jump', 'fast', 'under'],
      optionsHi: ['honesty (ईमानदारी)', 'jump (कूदना)', 'fast (तेज़)', 'under (के नीचे)'],
      correctIndex: 0,
      explanationEn: 'Abstract nouns name ideas/qualities: honesty, love…',
      explanationHi: 'Abstract noun विचार/गुण: honesty, love…',
    },
    {
      questionEn: 'Which is NOT a noun?',
      questionHi: 'कौन सा noun नहीं है?',
      optionsEn: ['teacher', 'table', 'run', 'city'],
      optionsHi: ['teacher', 'table', 'run (दौड़ना)', 'city'],
      correctIndex: 2,
      explanationEn: '“Run” is a verb here (action).',
      explanationHi: 'यहाँ “run” क्रिया (verb) है।',
    },
    {
      questionEn: 'Choose the common noun.',
      questionHi: 'Common noun चुनें।',
      optionsEn: ['India', 'Ravi', 'city', 'Delhi'],
      optionsHi: ['India', 'Ravi', 'city (शहर)', 'Delhi'],
      correctIndex: 2,
      explanationEn: 'Common nouns are general names: city, boy, book…',
      explanationHi: 'Common noun सामान्य नाम: city, boy, book…',
    },
    {
      questionEn: 'Which sentence uses a noun as a subject?',
      questionHi: 'किस वाक्य में noun subject है?',
      optionsEn: ['Quickly runs.', 'The dog barks.', 'Very beautiful.', 'Under the table.'],
      optionsHi: ['Quickly runs.', 'The dog barks.', 'Very beautiful.', 'Under the table.'],
      correctIndex: 1,
      explanationEn: '“The dog” (noun) is the subject.',
      explanationHi: '“The dog” (noun) subject है।',
    },
  ],

  pronoun: [
    {
      questionEn: 'A pronoun replaces…',
      questionHi: 'Pronoun किसकी जगह आता है?',
      optionsEn: ['a verb', 'a noun', 'a preposition', 'an adverb'],
      optionsHi: ['verb', 'noun', 'preposition', 'adverb'],
      correctIndex: 1,
      explanationEn: 'Pronouns replace nouns: Ravi → he, Sita → she.',
      explanationHi: 'Pronoun noun की जगह: Ravi → he, Sita → she.',
    },
    {
      questionEn: 'Which is a pronoun?',
      questionHi: 'कौन सा pronoun है?',
      optionsEn: ['they', 'table', 'quick', 'in'],
      optionsHi: ['they (वे)', 'table (मेज़)', 'quick (तेज़)', 'in (में)'],
      correctIndex: 0,
      explanationEn: 'They/he/she/it/we/I are pronouns.',
      explanationHi: 'They/he/she/it/we/I pronouns हैं।',
    },
    {
      questionEn: 'Pick the correct pronoun: “Sita is here. ___ is happy.”',
      questionHi: 'सही pronoun चुनें: “Sita is here. ___ is happy.”',
      optionsEn: ['He', 'She', 'It', 'They'],
      optionsHi: ['He', 'She', 'It', 'They'],
      correctIndex: 1,
      explanationEn: 'Use “she” for a girl/woman.',
      explanationHi: 'लड़की/महिला के लिए “she”।',
    },
    {
      questionEn: 'Which is an object pronoun?',
      questionHi: 'Object pronoun कौन सा है?',
      optionsEn: ['I', 'he', 'me', 'we'],
      optionsHi: ['I', 'he', 'me (मुझे)', 'we'],
      correctIndex: 2,
      explanationEn: 'Object pronouns: me, him, her, us, them.',
      explanationHi: 'Object pronouns: me, him, her, us, them.',
    },
    {
      questionEn: 'Choose the correct sentence.',
      questionHi: 'सही वाक्य चुनें।',
      optionsEn: ['Me am a student.', 'I am a student.', 'I are a student.', 'I is a student.'],
      optionsHi: ['Me am a student.', 'I am a student.', 'I are a student.', 'I is a student.'],
      correctIndex: 1,
      explanationEn: 'Subject pronoun “I” goes with “am”.',
      explanationHi: 'Subject pronoun “I” के साथ “am”।',
    },
    {
      questionEn: 'Which pronoun is used for things/animals?',
      questionHi: 'वस्तु/जानवर के लिए कौन सा pronoun?',
      optionsEn: ['he', 'she', 'it', 'we'],
      optionsHi: ['he', 'she', 'it', 'we'],
      correctIndex: 2,
      explanationEn: '“It” is used for things/animals (general).',
      explanationHi: 'वस्तु/जानवर के लिए सामान्यतः “it”।',
    },
    {
      questionEn: 'Pick the plural pronoun.',
      questionHi: 'Plural pronoun चुनें।',
      optionsEn: ['he', 'she', 'it', 'they'],
      optionsHi: ['he', 'she', 'it', 'they (वे)'],
      correctIndex: 3,
      explanationEn: '“They” refers to more than one person/thing.',
      explanationHi: '“They” एक से अधिक के लिए।',
    },
  ],
}

function ensureQuizCount(lesson: Lesson, desiredCount: number): Lesson {
  if (lesson.quiz.length >= desiredCount) return lesson

  const extras = EXTRAS_BY_KEY[lesson.illustrationKey] ?? GENERIC_EXTRAS
  const needed = desiredCount - lesson.quiz.length

  const appended: LessonQuizQuestion[] = []
  for (let i = 0; i < needed; i++) {
    const src = extras[i] ?? GENERIC_EXTRAS[i % GENERIC_EXTRAS.length]
    appended.push({
      id: `q${lesson.quiz.length + i + 1}`,
      ...src,
    })
  }

  return {
    ...lesson,
    quiz: [...lesson.quiz, ...appended],
  }
}

const BASE_LESSONS: Lesson[] = [
  ...(beginner as Lesson[]),
  ...(intermediate as Lesson[]),
  ...(advanced as Lesson[]),
]

export const LESSONS: Lesson[] = BASE_LESSONS.map((l) => ensureQuizCount(l, 10))
