import type { Generate } from '@llama-node/llama-cpp';
import { LLM } from 'llama-node';
import { LLamaCpp, type LoadConfig } from "llama-node/dist/llm/llama-cpp.js";
import { readFileSync } from 'fs';
import OpenAI from 'openai';

/**

1. You are acting as a file part analyzer. 
2. You give a strict answer to the question without doing any further comments. 
3. Your input will be as follow:
    {
        question: <the question to answer>,
        previous_answer: <your previous answer>,
        saved_context: <the informations necessary to avoid ambiguity in the analyse a the next file part>,
        next_file_part: <the next file part>
    }
4. Your answer must be a json like this:
    {
        answer: <your answer>,
        saved_context: <the new informations you deduced to avoid ambiguity in the analyse a the next file part>
    }

If you are OK with those instructions, I will start.

*/

const openai = new OpenAI({
    apiKey: process.env["API_KEY"],
});

export default class IAMachineGPT {

    //Lecture fenetré du contenu avec retour typé qui permet de reconstruire le contexte.

    //Reconnaissance d'une unité répété.

    //1er step où l'on fourni un pattern puis une lecture en chaîne.

    async askSomethingOnSomeData(dataPath:string, questionOnData:string): Promise<any> {

        let data:string = "";
        let instructions:string = "";
        let template:string = "";

        instructions = 
            "You are acting as a file analyzer. As the file will certainly be more big than your available context size, " +
            "I'm going to give you a prompt of this json form: " +
            "{ previous_answer: <here your answer far from now> , next_file_part: <the next file part to analyze> }, " +
            "I want you to complete your previous answer by analysing the next file part. ";

        data = await readFileSync(dataPath, 'utf8');

        template = `Here after a file content: \n\n${data}\n\n${questionOnData}`;
        
        const chatCompletion = await openai.chat.completions.create({
            messages: [{ role: 'user', content: template }],
            model: 'gpt-3.5-turbo',
        });

        console.log(`Chatbog response: ${chatCompletion}`);

    }

}