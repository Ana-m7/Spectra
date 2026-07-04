const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const behaviorSchema = new mongoose.Schema({
    name: String,
    description: String,
    ageRelevance: String,
    concernLevel: String,
    whatToObserve: String,
    ageBands: [String],
    tags: [String]
});

const Behavior = mongoose.model('Behavior', behaviorSchema);

const behaviors = [
    {
        name: "Does not respond to name",
        description: "Child does not turn or react when their name is called, even in a quiet environment.",
        ageRelevance: "12–18 months",
        concernLevel: "High",
        whatToObserve: "Try calling their name from different distances. Note if they respond to other sounds but not their name specifically.",
        ageBands: ["12m", "18m", "24m"],
        tags: ["name", "respond", "call"]
    },
    {
        name: "Limited eye contact",
        description: "Child avoids or rarely makes eye contact during interaction, feeding, or play.",
        ageRelevance: "12 months onwards",
        concernLevel: "High",
        whatToObserve: "Notice if they make eye contact when excited or when they want something. Total avoidance is more significant than occasional avoidance.",
        ageBands: ["12m", "18m", "24m", "36m"],
        tags: ["eye", "contact", "look"]
    },
    {
        name: "Spinning objects repeatedly",
        description: "Child spends long periods spinning wheels, tops, or any round object and becomes distressed if interrupted.",
        ageRelevance: "18–36 months",
        concernLevel: "Medium",
        whatToObserve: "Note how long the behavior lasts, how often it occurs, and whether the child can be redirected to other activities.",
        ageBands: ["18m", "24m", "36m", "48m+"],
        tags: ["spin", "spinning", "wheels", "objects", "toys"]
    },
    {
        name: "Hand flapping",
        description: "Child flaps hands repeatedly, usually when excited, happy, or distressed.",
        ageRelevance: "18 months onwards",
        concernLevel: "Medium",
        whatToObserve: "Notice the triggers — does it happen when excited? Anxious? How long does each episode last?",
        ageBands: ["18m", "24m", "36m", "48m+"],
        tags: ["hand", "flapping", "flap", "arms"]
    },
    {
        name: "Delayed speech or no speech",
        description: "Child has fewer words than expected for their age or has stopped using words they previously said.",
        ageRelevance: "12–24 months",
        concernLevel: "High",
        whatToObserve: "Count the number of words they use consistently. Note if they communicate in other ways — pointing, gesturing, sounds.",
        ageBands: ["12m", "18m", "24m"],
        tags: ["speech", "words", "talk", "communicate", "language"]
    },
    {
        name: "Does not point to show interest",
        description: "Child does not point their finger to show you things they find interesting, like a dog or an airplane.",
        ageRelevance: "12–18 months",
        concernLevel: "High",
        whatToObserve: "Distinguish between pointing to request something (I want that) vs pointing to share interest (look at that). The second type is more significant.",
        ageBands: ["12m", "18m", "24m"],
        tags: ["point", "pointing", "interest", "show"]
    },
    {
        name: "Rigid routines and resistance to change",
        description: "Child becomes extremely distressed when routines change — same route, same food, same order of activities.",
        ageRelevance: "24 months onwards",
        concernLevel: "Medium",
        whatToObserve: "Note the intensity of distress and how long it takes to settle. Minor preferences are normal — extreme distress is worth noting.",
        ageBands: ["24m", "36m", "48m+"],
        tags: ["routine", "rigid", "change", "distress", "same"]
    },
    {
        name: "Unusual sensory reactions",
        description: "Child is extremely sensitive or unusually unresponsive to sounds, textures, lights, or pain.",
        ageRelevance: "Any age",
        concernLevel: "Medium",
        whatToObserve: "Note whether the reaction is to a specific sensory input consistently. Over-sensitivity and under-sensitivity are both worth noting.",
        ageBands: ["12m", "18m", "24m", "36m", "48m+"],
        tags: ["sensory", "sound", "texture", "light", "sensitive", "pain"]
    },
    {
        name: "Limited pretend play",
        description: "Child does not engage in imaginative or pretend play — like feeding a doll or pretending a block is a car.",
        ageRelevance: "24–36 months",
        concernLevel: "Medium",
        whatToObserve: "Note whether they engage with toys functionally (stacking blocks) but not imaginatively (blocks as a car).",
        ageBands: ["24m", "36m", "48m+"],
        tags: ["pretend", "play", "imaginative", "doll", "imitate"]
    },
    {
        name: "Repetitive phrases or echolalia",
        description: "Child repeats words, phrases, or lines from TV shows out of context instead of using original language.",
        ageRelevance: "24 months onwards",
        concernLevel: "Medium",
        whatToObserve: "Note whether the repetition is immediate (repeating what you just said) or delayed (repeating TV lines hours later).",
        ageBands: ["24m", "36m", "48m+"],
        tags: ["repeat", "echo", "phrases", "echolalia", "tv", "words"]
    },
    {
        name: "Little to no babbling by 12 months",
        description: "Child makes few or no babbling sounds (like 'ba-ba' or 'da-da') and rarely vocalizes to get attention.",
        ageRelevance: "12 months",
        concernLevel: "High",
        whatToObserve: "Listen for consonant-vowel sounds during play or feeding. Note whether the child vocalizes to get your attention or only cries.",
        ageBands: ["12m"],
        tags: ["babble", "sounds", "coo", "vocalize", "speech"]
    },
    {
        name: "Does not smile back at caregiver",
        description: "Child rarely returns a warm, joyful smile when a parent or caregiver smiles at them.",
        ageRelevance: "12–18 months",
        concernLevel: "High",
        whatToObserve: "Try smiling and talking warmly at close range several times across the day. Note whether the child smiles back or shows no response.",
        ageBands: ["12m", "18m"],
        tags: ["smile", "social", "reciprocity", "warmth"]
    },
    {
        name: "Does not follow a pointed finger or gaze",
        description: "When a caregiver points at or looks toward something, the child does not turn to look at what is being shown.",
        ageRelevance: "12–18 months",
        concernLevel: "High",
        whatToObserve: "Point clearly at an object across the room and say 'look!'. Note if the child follows your finger and gaze, or ignores it entirely.",
        ageBands: ["12m", "18m"],
        tags: ["gaze", "follow", "look", "joint attention", "point"]
    },
    {
        name: "Prefers to play alone",
        description: "Child consistently withdraws from or shows little interest in playing with other children, even in group settings.",
        ageRelevance: "24 months onwards",
        concernLevel: "Medium",
        whatToObserve: "Observe at a playground or family gathering. Note whether the child watches other children with interest, ignores them, or actively avoids them.",
        ageBands: ["24m", "36m", "48m+"],
        tags: ["play", "alone", "peers", "social", "withdraw"]
    },
    {
        name: "Does not show or bring objects to share enjoyment",
        description: "Child does not bring toys or objects to a caregiver just to share excitement, only to request help or a repeat action.",
        ageRelevance: "12–18 months",
        concernLevel: "High",
        whatToObserve: "Note whether the child ever brings something over 'just to show you' versus only when they need something opened or fixed.",
        ageBands: ["12m", "18m"],
        tags: ["show", "share", "bring", "joint attention", "enjoyment"]
    },
    {
        name: "Loss of previously acquired skills",
        description: "Child stops using words, gestures, or social skills they had clearly demonstrated before, rather than simply developing slowly.",
        ageRelevance: "15–24 months",
        concernLevel: "High",
        whatToObserve: "Keep a simple written record of words and gestures the child uses. A confirmed loss of skills is more significant than a plateau, and should be raised with a pediatrician promptly.",
        ageBands: ["18m", "24m"],
        tags: ["regression", "loss", "skills", "words", "gestures"]
    },
    {
        name: "Does not imitate simple actions or gestures",
        description: "Child does not copy simple actions like clapping, waving bye-bye, or blowing a kiss after repeated demonstration.",
        ageRelevance: "12–18 months",
        concernLevel: "High",
        whatToObserve: "Demonstrate a simple gesture directly in front of the child several times. Note whether they attempt to copy it, even imperfectly.",
        ageBands: ["12m", "18m"],
        tags: ["imitate", "clap", "wave", "copy", "gesture"]
    },
    {
        name: "Avoids or resists physical affection",
        description: "Child stiffens, pulls away, or shows distress during hugs, cuddling, or being held, more than typical toddler independence.",
        ageRelevance: "Any age",
        concernLevel: "Medium",
        whatToObserve: "Distinguish between a child who is simply active and prefers not to be held still, versus one who shows clear discomfort or distress with affectionate touch specifically.",
        ageBands: ["12m", "18m", "24m", "36m", "48m+"],
        tags: ["hug", "cuddle", "touch", "affection", "physical"]
    },
    {
        name: "Unusual tone or rhythm of speech",
        description: "Child's speech sounds flat, robotic, sing-song, or oddly formal compared to typical toddler speech patterns.",
        ageRelevance: "24 months onwards",
        concernLevel: "Medium",
        whatToObserve: "Listen for whether the child's tone changes naturally with emotion and context, or stays flat/monotone or unusually musical regardless of what is being said.",
        ageBands: ["24m", "36m", "48m+"],
        tags: ["voice", "tone", "speech", "prosody", "monotone"]
    },
    {
        name: "Toe walking",
        description: "Child frequently walks on their toes rather than flat-footed, beyond the age where this is typical.",
        ageRelevance: "18 months onwards",
        concernLevel: "Low",
        whatToObserve: "Note how often it happens and whether the child can walk flat-footed when reminded. Occasional toe walking is common; persistent, near-constant toe walking is worth mentioning to a pediatrician.",
        ageBands: ["18m", "24m", "36m", "48m+"],
        tags: ["toe", "walk", "gait", "motor"]
    },
    {
        name: "Intense or narrowly fixated interests",
        description: "Child becomes unusually absorbed in a specific topic, object type, letters, numbers, or logos, far beyond typical toddler enthusiasm.",
        ageRelevance: "24 months onwards",
        concernLevel: "Medium",
        whatToObserve: "Note the intensity and exclusivity of the interest. It is a stronger signal when the child resists engaging with anything else, rather than simply having a favorite topic.",
        ageBands: ["24m", "36m", "48m+"],
        tags: ["obsession", "interest", "fixated", "letters", "numbers", "logos"]
    },
    {
        name: "Unusual attachment to a specific object",
        description: "Child insists on carrying a particular object everywhere and becomes highly distressed if it is misplaced or taken away, beyond typical comfort-object attachment.",
        ageRelevance: "18 months onwards",
        concernLevel: "Low",
        whatToObserve: "Note the intensity of distress when separated from the object and whether the attachment is to the object's function (comfort) or something unusual about it (spinning parts, texture).",
        ageBands: ["18m", "24m", "36m", "48m+"],
        tags: ["object", "attachment", "carry", "distress"]
    },
    {
        name: "Lines up toys instead of playing with them",
        description: "Child arranges toys or objects in careful rows or patterns repeatedly, rather than using them for pretend or functional play.",
        ageRelevance: "18–36 months",
        concernLevel: "Medium",
        whatToObserve: "Note whether the child becomes upset if the line is disturbed, and whether this replaces other forms of play rather than being one activity among many.",
        ageBands: ["18m", "24m", "36m"],
        tags: ["lines up", "toys", "order", "arrange", "play"]
    },
    {
        name: "Insistence on sameness in appearance or environment",
        description: "Child becomes distressed by small changes such as a different clothing texture, furniture arrangement, or appearance of a familiar object.",
        ageRelevance: "24 months onwards",
        concernLevel: "Medium",
        whatToObserve: "Note the scale of the change relative to the reaction. Extreme distress over minor, unrelated changes is more significant than typical toddler pickiness.",
        ageBands: ["24m", "36m", "48m+"],
        tags: ["sameness", "clothes", "texture", "insistence", "change"]
    },
    {
        name: "Does not notice when others are hurt or upset",
        description: "Child shows little to no reaction when a caregiver or another child is visibly hurt, crying, or upset nearby.",
        ageRelevance: "24 months onwards",
        concernLevel: "Medium",
        whatToObserve: "Note whether the child looks toward the person, shows concern, or continues their activity as if nothing happened. Occasional lack of reaction is normal; consistent lack of reaction across situations is more significant.",
        ageBands: ["24m", "36m", "48m+"],
        tags: ["empathy", "hurt", "upset", "notice", "comfort"]
    },
    {
        name: "Difficulty with back and forth conversation",
        description: "Child struggles to maintain a simple back-and-forth exchange, even with short sentences, and tends to talk at others rather than with them.",
        ageRelevance: "36 months onwards",
        concernLevel: "Medium",
        whatToObserve: "Note whether the child responds to what was just said, or changes topic abruptly and repeatedly regardless of the other person's response.",
        ageBands: ["36m", "48m+"],
        tags: ["conversation", "turn-taking", "dialogue", "respond"]
    },
    {
        name: "Repeatedly watches or replays the same video or scene",
        description: "Child insists on watching the exact same short video clip or scene on a loop and becomes distressed if it is changed.",
        ageRelevance: "24 months onwards",
        concernLevel: "Low",
        whatToObserve: "Note whether the repetition is a mild preference or an inflexible need, and whether the child can be redirected to something new without significant distress.",
        ageBands: ["24m", "36m", "48m+"],
        tags: ["video", "replay", "repeat", "screen"]
    },
    {
        name: "Difficulty engaging in cooperative or group play",
        description: "Child struggles to take turns, follow shared rules, or participate in group games with peers, even simple ones.",
        ageRelevance: "36 months onwards",
        concernLevel: "Medium",
        whatToObserve: "Observe the child in a small group setting. Note whether they can follow a simple shared game (like rolling a ball back and forth) or consistently play alongside but not with others.",
        ageBands: ["36m", "48m+"],
        tags: ["cooperative", "group", "peers", "games", "play"]
    }
];

mongoose.connect(process.env.MONGO_URI)
    .then(async () => {
        console.log('Connected to MongoDB');
        await Behavior.deleteMany({});
        await Behavior.insertMany(behaviors);
        console.log('Behaviors seeded successfully!');
        process.exit();
    })
    .catch(err => {
        console.log(err);
        process.exit(1);
    });