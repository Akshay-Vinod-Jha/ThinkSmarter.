import React from "react";
import ToolsBox from "./ToolsBox";
import Reveal from "../UI/Reveal";
function AllParent(props) {
  const arrayOfTools = [
    {
      name: "visualize AI",
      imageUrl: "../../images/texttoimage.png",
      slogan:
        "This tool is designed to <span className='text-[#fc0001]'>visualize an image</span> based on provided text.",
      slogan2:
        "This tool is designed for students working on projects where obtaining diverse images may be challenging. It facilitates the generation of images based on specified descriptions provided by the students",
      advantages: [
        "Complimentary service.",
        "Creates images based on prompts.",
        "Operates efficiently, minimizing time consumption.",
        "Provides accurate outputs.",
      ],
    },

    {
      name: "Vision verbalizer",
      imageUrl: "../../images/Image-to-text-converter.webp",
      slogan:
        "This tool is intended to <span className='text-[#fc0001]'>generate visual representations of text</span> that corresponds to a provided image.",
      slogan2:
        "This tool, tailored for students, addresses the occasional need for detailed descriptions of specific images. Our tool facilitates the generation of image descriptions based on provided input.",
      advantages: [
        "Generates textual content based on supplied images.",
        "Complimentary service.",
        "Offers a straightforward means to comprehend the meaning of images.",
        "Additionally, enables text extraction from the provided image.",
      ],
    },
    {
      name: "AI Transcribe Tube",
      imageUrl: "../../images/YouTube-Auto-Translate-not-working-iphone.png",
      slogan:
        "This tool is designed to <span className='text-[#fc0001]'>transcribe YouTube videos<span> into textual content.",
      slogan2:
        "This tool is purpose-built for academic use, allowing students to efficiently grasp the content of a video without the need to watch or listen to the entire duration. By simply providing the video link, the tool generates text, enabling students to read and comprehend the information swiftly",
      advantages: [
        "Translates YouTube videos into text format.",
        "Efficiently handles lengthy topics in a timely manner.",
        "Available to everyone as a complimentary service.",
        "Eliminates the necessity to watch and listen to the video",
      ],
    },
    {
      name: "AI Brief Buddy",
      imageUrl: "../../images/aibriefbuddy.png",
      slogan:
        "This tool is designed to <span className='text-[#fc0001]'>condense lengthy text</span> into a more comprehensible form.",
      slogan2:
        "This tool serves educational objectives, facilitating efficient comprehension of lengthy topics for students. In a short time span, the tool generates concise summaries of provided extensive text, aiding swift understanding.",
      advantages: [
        "Condenses extensive topics into a comprehensible format.",
        "Universally accessible without any associated costs.",
        "Demonstrates time efficiency, particularly in addressing complex subjects.",
        "Offers the simplest and most straightforward approach to understanding lengthy topics.",
      ],
    },
    {
      name: "Inquiry Response",
      imageUrl: "../../images/1453716.png",
      slogan:
        "This tool is engineered to provide <span className='text-[#fc0001]'>rapid responses to questions</span> based on the provided context.",
      slogan2:
        "This tool is designed for academic purposes, enabling students to comprehend complex topics without the necessity of reading the entire length. By presenting questions aligned with the context, the tool provides precise answers to aid in understanding the topic efficiently.",
      advantages: [
        "Users can pose questions within the provided context.",
        "Delivers accurate responses to user queries.",
        "A complimentary service.",
        "Presents the most accessible method for comprehending lengthy topics.",
      ],
    },
    {
      name: "Spell checker",
      imageUrl: "../../images/spellchecker.png",
      slogan:
        "This tool can <span className='text-[#fc0001]'>check spellings</span>, identify grammatical errors, and correct them.",
      slogan2:
        "This tool is tailored to enhance students' English proficiency. By submitting sentences, students can utilize the tool to identify and correct spelling and grammatical errors, fostering an improved understanding of language conventions.",
      advantages: [
        "Provide a complimentary tool",
        "Highlight spelling errors.",
        "Identify grammatical mistakes.",
        "Specify error locations from start to end.",
        "Suggest correct spellings and grammatically sound alternatives.",
      ],
    },
    {
      name: "CodeCraft",
      imageUrl: "../../images/texttocode.png",
      slogan:
        "This tool is designed to <span className='text-[#fc0001]'>generate code</span> in the selected programming language based on the provided text",
      slogan2:
        "This tool assists students in the field of computer science by facilitating the generation of code in any programming language. Users only need to accurately specify the desired output through provided text",
      advantages: [
        "Beneficial for programming students.",
        "Complimentary service.",
        "Supports the selection of multiple programming languages.",
        "Generates accurate code based on the provided prompt.",
      ],
    },
    {
      name: "ChatBot",
      imageUrl: "../../images/chatbot.png",
      slogan:
        "An automated conversational agent designed to simulate <span className='text-[#fc0001]'>human-like interaction</span> through text or voice interfaces.",
      slogan2:
        "Chatbots can be invaluable tools for students, providing instant access to information, assistance, and guidance. Whether it's answering questions about coursework, providing study tips, or offering support for mental health and well-being, chatbots offer a convenient and accessible resource for students to enhance their learning experience. With their ability to quickly respond to inquiries and adapt to individual needs, chatbots can help students navigate academic challenges more effectively and efficiently.",
      advantages: [
        "Deliver responses based on the entered prompt.",
        "Ensure time efficiency in the generation process.",
        "Preserve a comprehensive history for repeated utilization.",
        "Provide a feature to easily copy the generated result.",
      ],
    },
    {
      name: "IntelliDict",
      imageUrl: "../../images/dictionary.png",
      slogan:
        "A toolto identify <span className='text-[#fc0001]'>antonyms, synonyms, part-of-speech, pronunciation,</span> other relevant information.",
      slogan2:
        "An advanced linguistic analysis tool adept at retrieving antonyms, synonyms, part-of-speech information, and other related linguistic data for a given word. This tool also provides phonetic transcriptions and comprehensive meanings accompanied by real-life examples to aid in understanding the word's usage in context. With its multifaceted capabilities, this tool serves as an invaluable resource for writers, linguists, educators, and language enthusiasts alike, facilitating nuanced exploration and comprehension of lexical elements across various contexts and languages.",
      advantages: [
        "Enhances Vocabulary: It expands users' lexicon by providing synonyms and antonyms, enabling clearer and more diverse expression.",
        "Improves Writing Precision: With access to part of speech information, users can refine their writing style and ensure accurate usage of words in various contexts.",
        "Supports Language Learning: The tool aids language learners in understanding nuances through phonetics and contextual examples, facilitating better comprehension and retention.",
        "Saves Time: Users can swiftly access comprehensive information about words, reducing the time spent on manual research and enhancing productivity.",
        "Promotes Effective Communication: By offering meanings and examples, the tool assists in crafting articulate and contextually appropriate messages, fostering better communication skills.",
      ],
    },
    {
      name: "TranslateXpert ",
      imageUrl: "../../images/languages.png",
      slogan:
        "A tool for <span className='text-[#fc0001]'>translating text into multiple languages with automatic language detection</span> capability for the input text.",
      slogan2:
        "The text translation tool offers a seamless solution for translating text into multiple languages, boasting an intuitive auto-detection feature to identify the language of the input text. Users can simply input their text, and the tool automatically recognizes the language, ensuring accurate and efficient translation across various linguistic contexts. Whether it's for personal or professional purposes, this tool streamlines communication by enabling users to effortlessly convert text into their desired languages, promoting global connectivity and understanding.",
      advantages: [
        "Seamless Multilingual Communication: Facilitates effortless translation of text across various languages, promoting global communication and collaboration.",
        "Auto-Detection Feature: Automatically identifies the language of the input text, eliminating the need for manual selection and enhancing user convenience.",
        "Enhanced Accessibility: Enables individuals to access content in their preferred language, making information more accessible and inclusive.",
        "Improved Efficiency: Streamlines the translation process, saving time and effort by swiftly converting text into multiple languages.",
        "Cultural Understanding: Fosters cultural exchange by allowing users to comprehend and communicate in different languages, fostering empathy and global awareness.",
        "Versatility: Serves a diverse range of users including travelers, businesses, educators, and individuals seeking to connect with others globally.",
        "Language Learning Aid: Assists language learners in understanding nuances and expressions across multiple languages, facilitating linguistic growth and proficiency.",
        "Cost-Effective Solution: Offers an economical alternative to hiring human translators for basic translation needs, reducing expenses for businesses and individuals.",
      ],
    },
    {
      name: "VoiceSync",
      imageUrl: "../../images/TextToSpeech.png",
      slogan:
        "A tool facilitating <span className='text-[#fc0001]'>text-to-speech and speech-to-text</span> conversion,with start,stop and reset Feature",
      slogan2:
        "The multifunctional tool offers users the capability to seamlessly convert both text to speech and speech to text, featuring convenient start and stop functionalities along with a reset option for enhanced user control and flexibility. With its intuitive interface, individuals can effortlessly toggle between modes, initiating conversions at their discretion and pausing or halting the process as needed. This comprehensive tool streamlines communication processes by enabling users to effortlessly transcribe spoken words into written text and vice versa, facilitating efficient and accessible interaction across various contexts.",
      advantages: [
        "Enhanced Accessibility: Enables individuals with visual impairments to access textual content through speech and vice versa.",
        "Efficient Communication: Facilitates seamless communication by converting speech to text and vice versa, catering to diverse communication preferences.",
        "Improved Productivity: The start and stop feature allows users to control the conversion process, enhancing efficiency by enabling pause and resume functionalities.",
        "Versatile Usage: Provides flexibility for various applications, including dictation, transcription, language learning, and accessibility tools.",
        "Enhanced Accuracy: Advances in speech recognition technology ensure accurate conversion of spoken words to text and text to speech, minimizing errors and improving user experience.",
        "Convenient Integration: The reset feature allows users to start afresh, ensuring a clean slate for new conversions, thereby enhancing user convenience and workflow.",
      ],
    },
    {
      name: "AIExtracta ",
      imageUrl: "../../images/textextraction.png",
      slogan:
        "A tool <span className='text-[#fc0001]'>capable of extracting text from images and PDF documents</span>.",
      slogan2:
        "The sophisticated tool excels in extracting text from both images and PDF documents, providing users with a seamless solution for converting visual content into editable text. Leveraging advanced optical character recognition (OCR) technology, it accurately scans images and PDFs, identifying and extracting textual information with precision. This capability streamlines the process of digitizing printed materials, enhancing accessibility and usability for various purposes such as data entry, document analysis, and information retrieval. With its intuitive interface and efficient processing capabilities, the tool empowers users to effortlessly convert visual data into editable text, thereby optimizing productivity and facilitating seamless integration with digital workflows.",
      advantages: [
        "Enhanced Accessibility: Enables extraction of text from images and PDFs, making content more accessible to individuals with visual impairments or those requiring text-based formats.",
        "Improved Searchability: Facilitates easy retrieval of information by converting non-searchable image or PDF content into searchable text, enhancing productivity and efficiency.",
        "Preservation of Content: Helps in preserving important textual content from images and PDFs, ensuring that valuable information is not lost or inaccessible.",
        "Streamlined Data Entry: Simplifies data entry processes by automatically extracting text from images and PDFs, reducing manual effort and minimizing errors.",
        "Integration Possibilities: Offers opportunities for integration with other applications or systems, allowing for seamless incorporation of text extraction capabilities into existing workflows.",
        "Enhanced Collaboration: Facilitates collaboration by enabling the sharing of extracted text alongside original images or PDFs, promoting clearer communication and understanding.",
      ],
    },
  ];
  const arrayOfSteps = [
    [
      "Input the prompt to generate the desired output image.",
      "click on generate image button.",
      "Await the completion of the output generation process.",
      "View the output image in the designated output box.",
      "Additionally, copy the generated image for integration into your project.",
    ],
    [
      "Provide the image input functionality with the option to either drag and drop, copy and paste, or browse from the local disk for additional feature incorporation.",
      "Await the completion of the output generation process.",
      "Observe the generated text displayed in the output box.",
      "Additionally, utilize the option to copy the generated text for further use in your project.",
    ],
    [
      "Input the YouTube video URL into the designated input area.",
      "Initiate the output generation process by clicking the corresponding 'Generate' button.",
      "Exercise patience while awaiting the completion of the output generation.",
      "Observe the output displayed in the designated area; if the output is extensive, utilize the scrolling function for thorough review.",
      "Employ the copy button located below the output area to efficiently duplicate the generated output for further use.",
    ],
    [
      "Input the context into the designated input area.",
      "Initiate the generation of summarized text by clicking the corresponding button.",
      "Patiently await the completion of the output generation process.",
      "Review the generated summarized text displayed in the designated output area.",
      "Utilize the copy button to efficiently copy the summarized text for further use.",
    ],
    [
      "Input the context into the designated input area.",
      "Pose a question pertaining to the provided context in the designated question box.",
      "Initiate the answer retrieval process by clicking the 'Answer' button.",
      "Exercise patience while awaiting the generation of the answer.",
      "Observe the provided answer displayed in the answer box; if the response is extensive, utilize the scrolling feature for comprehensive reading.",
    ],
    [
      "Input a sentence or context into the designated input area.",
      "Initiate the spelling and grammar verification process by clicking the 'Check' button.",
      "Identify errors through the display of a squiggly line beneath the affected sentences.",
      "Upon clicking the erroneous sentence, the starting and ending points are indicated below.",
      "In the replacement box, the accurate spelling or sentence is presented upon selecting a specific error.",
      "Utilize the provided copy button to efficiently replicate the correct answer.",
    ],
    [
      "Input a prompt relevant to the desired output.",
      "Choose the programming language from the provided selection box.",
      "Initiate the output generation process by clicking the 'Generate' button.",
      "Exercise patience while awaiting the completion of the output generation.",
      "Observe the generated output displayed in the designated output area.",
      "Utilize the button located below the output area to efficiently copy the generated code for further use.",
    ],
    [
      "Input the prompt to generate the desired output.",
      "Initiate the output generation process by clicking the arrow icon.",
      "Exercise patience while awaiting the completion of the output generation.",
      "Observe the generated output displayed on the screen.",
      "Utilize the copy button to efficiently duplicate the output for further use.",
    ],
    [
      "Input a word.",
      "Click the button to retrieve grammatical information.",
      "Await the output.",
      "The grammatical details include nouns, pronouns, adjectives, antonyms, and synonyms, along with corresponding examples displayed in the designated output area.",
      "Each output area features a 'Next' button if multiple definitions are available.",
      "Additionally, provide a 'Copy' button to easily duplicate the information.",
    ],
    [
      "Enter your sentence to be translated.",
      "Click the 'Auto Detect Language' button to automatically identify the language of the entered sentence.",
      "Select the target language from the dropdown menu for translation.",
      "Click on the 'Translate' button.",
      "Wait for the translation to occur.",
      "Use the 'Copy' button if needed to duplicate the translated text.",
    ],
    [
      "For text-to-speech, input the prompt.",
      "Click the 'Speak' button.",
      "For speech-to-text:",
      "Hold the button to start listening.",
      "If not held, it will cease listening.",
      "Automatically converts spoken words to text.",
      "Option to copy the text with the 'Copy' button.",
    ],
    [
      "Select the image for text extraction.",
      "Click on the extraction button.",
      "Await the arrival of the response.",
      "Copy the extracted text.",
      "Specify the PDF for text extraction.",
      "Initiate the extraction process by clicking the button.",
      "Wait for the response to arrive.",
      "Copy the extracted text for further use.",
    ],
  ];
  return (
    <div className="w-[100%] rounded-xl md:grid-rows-6 grid-rows-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 place-content-center place-items-center gap-2 md:gap-3 lg:gap-10 p-1 md:p-2 lg:p-10 my-10">
      {arrayOfTools.map((value, index) => {
        return (
          <Reveal>
            <ToolsBox
              key={`value.name${index}`}
              toolName={value.name}
              slogan={value.slogan}
              imageUrl={value.imageUrl}
              style={{}}
              onClick={() => {
                props.updateState();
                props.updateClicked({
                  ...arrayOfTools[index],
                  slogan: arrayOfTools[index].slogan2,
                  steps: arrayOfSteps[index],
                });
              }}
            />
          </Reveal>
        );
      })}
    </div>
  );
}

export default AllParent;
