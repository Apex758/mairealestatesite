import { useGlobal } from '../contexts/GlobalContext';
import { TranslationKey, getTranslation } from '../translations';

export function useTranslate() {
  const { language } = useGlobal();
  
  const t = (key: TranslationKey): string => {
    return getTranslation(key, language);
  };
  
  return { t };
}
