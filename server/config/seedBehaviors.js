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