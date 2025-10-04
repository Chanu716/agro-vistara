import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Mic, MicOff, Volume2, VolumeX } from "lucide-react";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";
import { Card, CardContent } from "@/components/ui/card";

interface VoiceAssistantProps {
  onVoiceCommand?: (command: string) => void;
}

const VoiceAssistant = ({ onVoiceCommand }: VoiceAssistantProps) => {
  const { t, i18n } = useTranslation();
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(false);
  const [recognition, setRecognition] = useState<any>(null);
  const [transcript, setTranscript] = useState("");

  useEffect(() => {
    // Check if Web Speech API is supported
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const speechSynthesis = window.speechSynthesis;

    if (SpeechRecognition && speechSynthesis) {
      setSpeechSupported(true);
      
      // Initialize speech recognition
      const recognitionInstance = new SpeechRecognition();
      recognitionInstance.continuous = false;
      recognitionInstance.interimResults = false;
      
      // Set language based on current i18n language
      if (i18n.language === 'te') {
        recognitionInstance.lang = 'te-IN'; // Telugu
      } else {
        recognitionInstance.lang = 'en-IN'; // English (India)
      }

      recognitionInstance.onstart = () => {
        setIsListening(true);
        setTranscript("");
      };

      recognitionInstance.onresult = (event: any) => {
        const current = event.resultIndex;
        const transcriptText = event.results[current][0].transcript;
        setTranscript(transcriptText);
        
        // Process voice command
        processVoiceCommand(transcriptText);
        
        if (onVoiceCommand) {
          onVoiceCommand(transcriptText);
        }
      };

      recognitionInstance.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
        
        if (event.error === 'no-speech') {
          toast.error(t('voice.noSpeechDetected'));
        } else if (event.error === 'not-allowed') {
          toast.error(t('voice.microphonePermissionDenied'));
        } else {
          toast.error(t('voice.errorOccurred'));
        }
      };

      recognitionInstance.onend = () => {
        setIsListening(false);
      };

      setRecognition(recognitionInstance);
    } else {
      setSpeechSupported(false);
      console.warn('Web Speech API not supported in this browser');
    }

    return () => {
      if (recognition) {
        recognition.abort();
      }
    };
  }, [i18n.language]);

  const processVoiceCommand = (command: string) => {
    const lowerCommand = command.toLowerCase();
    
    // Command patterns in English and Telugu
    const commands = {
      dashboard: ['dashboard', 'డాష్‌బోర్డ్', 'home', 'హోమ్'],
      farms: ['farms', 'పొలాలు', 'my farms', 'నా పొలాలు'],
      advisory: ['advisory', 'సలహా', 'recommendations', 'సిఫార్సులు'],
      calendar: ['calendar', 'క్యాలెండర్', 'seasonal calendar', 'కాలానుగుణ క్యాలెండర్'],
      stories: ['stories', 'కథలు', 'success stories', 'విజయ కథలు'],
      guides: ['guides', 'మార్గదర్శకాలు', 'farming guides', 'వ్యవసాయ మార్గదర్శకాలు'],
      expenses: ['expenses', 'ఖర్చులు', 'costs', 'వ్యయం'],
      storage: ['storage', 'నిల్వ', 'godown', 'గోడౌన్'],
    };

    let matchedRoute = null;
    for (const [route, patterns] of Object.entries(commands)) {
      if (patterns.some(pattern => lowerCommand.includes(pattern))) {
        matchedRoute = route;
        break;
      }
    }

    if (matchedRoute) {
      speak(t(`voice.navigatingTo${matchedRoute.charAt(0).toUpperCase() + matchedRoute.slice(1)}`));
      setTimeout(() => {
        window.location.href = `/${matchedRoute}`;
      }, 1000);
    } else {
      speak(t('voice.commandNotRecognized'));
    }
  };

  const startListening = () => {
    if (!speechSupported) {
      toast.error(t('voice.notSupported'));
      return;
    }

    if (recognition && !isListening) {
      try {
        recognition.start();
        toast.info(t('voice.listening'));
      } catch (error) {
        console.error('Error starting recognition:', error);
        toast.error(t('voice.errorStarting'));
      }
    }
  };

  const stopListening = () => {
    if (recognition && isListening) {
      recognition.stop();
      setIsListening(false);
    }
  };

  const speak = (text: string) => {
    if (!speechSupported) return;

    // Cancel any ongoing speech
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    
    // Set language based on current i18n language
    if (i18n.language === 'te') {
      utterance.lang = 'te-IN';
    } else {
      utterance.lang = 'en-IN';
    }

    utterance.rate = 0.9; // Slightly slower for clarity
    utterance.pitch = 1;
    utterance.volume = 1;

    utterance.onstart = () => {
      setIsSpeaking(true);
    };

    utterance.onend = () => {
      setIsSpeaking(false);
    };

    utterance.onerror = (event) => {
      console.error('Speech synthesis error:', event);
      setIsSpeaking(false);
    };

    window.speechSynthesis.speak(utterance);
  };

  const stopSpeaking = () => {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
  };

  const readPageContent = () => {
    // Get main heading
    const heading = document.querySelector('h1')?.textContent || '';
    // Get first paragraph
    const firstPara = document.querySelector('p')?.textContent || '';
    
    const content = `${heading}. ${firstPara}`;
    speak(content);
  };

  if (!speechSupported) {
    return (
      <Card className="bg-yellow-50 dark:bg-yellow-950/20 border-yellow-200 dark:border-yellow-800">
        <CardContent className="py-3">
          <p className="text-sm text-yellow-800 dark:text-yellow-200">
            {t('voice.notSupportedMessage')}
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="flex items-center gap-2">
      {/* Voice Input Button */}
      <Button
        variant={isListening ? "default" : "outline"}
        size="icon"
        onClick={isListening ? stopListening : startListening}
        title={isListening ? t('voice.stopListening') : t('voice.startListening')}
        className={isListening ? "animate-pulse bg-red-500 hover:bg-red-600" : ""}
      >
        {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
      </Button>

      {/* Text-to-Speech Button */}
      <Button
        variant={isSpeaking ? "default" : "outline"}
        size="icon"
        onClick={isSpeaking ? stopSpeaking : readPageContent}
        title={isSpeaking ? t('voice.stopSpeaking') : t('voice.readPage')}
        className={isSpeaking ? "animate-pulse" : ""}
      >
        {isSpeaking ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
      </Button>

      {/* Transcript Display */}
      {transcript && (
        <div className="ml-2 px-3 py-1 bg-primary/10 rounded-md text-sm max-w-xs truncate">
          "{transcript}"
        </div>
      )}
    </div>
  );
};

export default VoiceAssistant;
