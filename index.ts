import path from 'path';
import IAMachine from './ia-machine.js'

/**
 * The LLAMA2 Pre-trained model from https://huggingface.co/eachadea/ggml-vicuna-7b-1.1/tree/main
 */
const modelPath:string = path.resolve(process.cwd(), "./others_dependencies/stable-vicuna-13B.ggmlv3.q5_1.bin");

/**
 * An extraction from your database related to data you want to know something about.
 */
const dataPath:string = path.resolve(process.cwd(), "./saved_dependencies/hypothetic-db-query-extraction.csv");

/**
 * The question to answer 
 */
//const questionOnData:string = "How many women are listed in this CSV file and how many of them are french ? Explain me precisely which lines you used for your deduction.";
const questionOnData:string = "How many women are listed in this CSV file ? List me the result as CSV with only firstname, lastname and the colunmn you used for the deduction. After that, I want the same for men.";



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