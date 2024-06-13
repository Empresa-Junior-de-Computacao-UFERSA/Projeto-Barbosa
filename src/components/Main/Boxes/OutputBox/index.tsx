import React from "react";
import Popover from "../../../ui/Popover";
import { ring } from "ldrs";

type Palavra = {
    Palavra: string;
    PalavraCorrigida: string;
    explicacao: string;
    indice: number;
};

interface OutputBoxProps { chatGPTResponse: string | null; palavras: Palavra[] | null; isLoading: boolean; };
const OutPutBox: React.FC<OutputBoxProps> = ({ chatGPTResponse, palavras, isLoading }) => {

    ring.register();

    function mappeamentoPalavras(palavras: Palavra[] | null, chatGPTResponse: string | null) {
        if (palavras !== null && chatGPTResponse !== null) {
            const words = chatGPTResponse.split(" ");
            const mappedWords = words.map((word, index) => {
                const palavra = palavras.find((palavra) => palavra.indice === index);
                if (palavra) {
                    palavra.PalavraCorrigida = word;
                }
            });
        }
    };

    mappeamentoPalavras(palavras, chatGPTResponse);


    function printPalavras(palavras: Palavra[] | null) {
        if (palavras !== null) {
            palavras.forEach((palavra) => {
                console.log(palavra.Palavra);
                console.log(palavra.PalavraCorrigida);
                console.log(palavra.explicacao);
                console.log(palavra.indice);
            });
        }
    };
    //printPalavras(palavras);

    return (
        <div className="w-[75%] lg:w-1/2 h-[100%] border-2 border-gray-700 mx-8 bg-gray-200">
            <div className="w-full h-[15%] md:h-[10%] lg:h-[10%] border-b-2 border-gray-700 flex justify-center items-center font-bold text-xl bg-white">
                Correção Sugerida:
            </div>
            <div className="w-full placeholder-dinamico h-[85%] lg:h-[90%] text-xl px-1">
                {!isLoading ? (
                    palavras !== null ? (
                        <div>
                            {
                                //TODO: fix this mess
                                palavras.map((palavra) => (
                                    palavra.Palavra !== palavra.PalavraCorrigida && palavra.PalavraCorrigida !== ""
                                        ?
                                        <span key={palavra.indice}>
                                            <Popover preferredPosition='bottom-center'>
                                                <Popover.Trigger>
                                                    <span className="cursor-pointer" style={{ textDecoration: "underline", textDecorationColor: "red" }}>
                                                        {palavra.PalavraCorrigida}
                                                    </span>
                                                </Popover.Trigger>
                                                <Popover.Content>
                                                    <p className="text-sm p-2">{palavra.explicacao}</p>
                                                </Popover.Content>
                                            </Popover>
                                            <span>{" "}</span>
                                        </span>
                                        :
                                        <span key={palavra.indice}>
                                            {palavra.PalavraCorrigida}
                                            <span>{" "}</span>
                                        </span>
                                ))
                            }
                        </div>
                    ) : (
                        <span></span>
                    )
                ) : (
                    <div className="w-full h-full flex items-center justify-center pb-10">
                        <l-ring size="40" stroke="5" bg-opacity="0" speed="1.6" color="#00c6f0"></l-ring>
                    </div>
                )}
            </div>
        </div>
    );
};

export default OutPutBox;