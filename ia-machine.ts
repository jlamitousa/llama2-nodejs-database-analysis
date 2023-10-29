import type { Generate } from '@llama-node/llama-cpp';
import { LLM } from 'llama-node';
import { LLamaCpp, type LoadConfig } from "llama-node/dist/llm/llama-cpp.js";
import { readFileSync } from 'fs';

export default class IAMachine {

    llama:LLM;
    modelConfig: LoadConfig;
    modelLoaded:boolean;
    baseParams: Generate;

    constructor(modelPath:string) {

        this.llama = new LLM(LLamaCpp);
        
        this.modelConfig = {
            modelPath: modelPath,
            enableLogging: true,
            nCtx: 2048,
            seed: 0,
            f16Kv: false,
            logitsAll: false,
            vocabOnly: false,
            useMlock: false,
            embedding: false,
            useMmap: true,
            nGpuLayers: 40
        };

        this.modelLoaded = false;

        this.baseParams = {
            nThreads: 4,
            nTokPredict: 2048,
            topK: 40,
            topP: 0.1,
            temp: 0.2,
            repeatPenalty: 1,
            prompt: "",
        };

    }

    async loadModel() {
        await this.llama.load(this.modelConfig);
        this.modelLoaded = true;
    }

    async askSomethingOnSomeData(dataPath:string, questionOnData:string): Promise<any> {

        let data:string = "";
        let template:string = "";
        let finalParams:any = null;

        if(!this.modelLoaded) {
            throw new Error("Model not loaded. Please call 'loadModel' before.");
        }

        data = await readFileSync(dataPath, 'utf8');

        template = `Here after a file content: \n\n${data}\n\n${questionOnData}`;
        
        finalParams = {
            ...this.baseParams,
            prompt: `A chat between a user and an assistant.\nUSER: ${template}\nASSISTANT:`
        };
    
        console.log("Creation completion with params: ", finalParams);
    
        await this.llama.createCompletion(finalParams, (response) => {
            process.stdout.write(response.token);
        });

    }

}