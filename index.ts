import path from 'path';
import IAMachine from './ia-machine.js'

/**
 * The LLAMA2 Pre-trained model from https://huggingface.co/eachadea/ggml-vicuna-7b-1.1/tree/main
 */
const modelPath:string = path.resolve(process.cwd(), "./others_dependencies/stable-vicuna-13B.ggmlv3.q5_1.bin");

/**
 * An extraction from your database related to data you want to know something about.
 */
const dataPath:string = path.resolve(process.cwd(), "./others_dependencies/tomcat8-stdout.2023-04-24.log");

/**
 * The question to answer 
 */
//const questionOnData:string = "How many women are listed in this CSV file and how many of them are french ? Explain me precisely which lines you used for your deduction.";
const questionOnData:string = "How many web service call are present. Tell me what strategy you did use to found it.";

/**
 * Pattern 1: a web service call input start with the balise "<ns2:InsertActorRequest>" 
 * Pattern 2: a web service call output start with the balise "<ns3:InsertActorResponse>"
 * 
 * Rule1.Quand tu détecte un début de balise, tu met la valeur start=true
 * Rule2. Quand tu détecte une fin de balise, tu met la valeur end=true
 * Rule3. si tu est dans un start=true, tant que tu n'a pas détecté une end=true, tu continue.
 * 
 * Différence avec une boucle for ?! 
 * 
 */

const main = async () => {

    try {

        const iaMachine = new IAMachine(modelPath);

        await iaMachine.loadModel();

        await iaMachine.askSomethingOnSomeData(dataPath, questionOnData)

        console.log("Program End");

    } catch(error) {
        console.log("An error occurs: ", error);
    }

};



main();