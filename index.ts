import path from 'path';
import IAMachine from './ia-machine.js'

/**
 * The LLAMA2 Pre-trained model from https://huggingface.co/eachadea/ggml-vicuna-7b-1.1/tree/main
 */
const modelPath:string = path.resolve(process.cwd(), "./saved_dependencies/ggml-vic7b-q5_1.bin");

/**
 * An extraction from your database related to data you want to know something about.
 */
const dataPath:string = path.resolve(process.cwd(), "./saved_dependencies/hypothetic-db-query-extraction.csv");

/**
 * The question to answer 
 */
const questionOnData:string = "Can you tell me how much french women are present in this CSV formatted file (and for each how you did deduce that) ?";



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