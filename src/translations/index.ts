// Define translation types
export type TranslationKey = 
  | 'home'
  | 'listings'
  | 'contact'
  | 'vipAccess'
  | 'bitcoin'
  | 'policy'
  | 'aboutUs'
  | 'propertyDetails'
  | 'features'
  | 'location'
  | 'similarProperties'
  | 'details'
  | 'sizeRange'
  | 'bedrooms'
  | 'bathrooms'
  | 'handover'
  | 'paymentPlan'
  | 'downPayment'
  | 'duringConstruction'
  | 'residences'
  | 'luxuryWellness'
  | 'retailDining'
  | 'readMore'
  | 'showLess'
  | 'login'
  | 'account'
  | 'createAccount'
  | 'favorites'
  | 'messages'
  | 'pageManager'
  | 'logout'
  | 'tryAnotherCategory'
  | 'noPlacesFound'
  | 'nearby'
  | 'cafes'
  | 'restaurants'
  | 'supermarkets'
  | 'schools'
  | 'transit'
  | 'parks'
  | 'cafeDescription'
  | 'restaurantDescription'
  | 'supermarketDescription'
  | 'schoolDescription'
  | 'transitDescription'
  | 'defaultPlaceDescription'
  // Listings page
  | 'availableProperties'
  | 'anyLocation'
  | 'anyType'
  | 'minBeds'
  | 'maxBeds'
  | 'minPrice'
  | 'maxPrice'
  | 'noMin'
  | 'noMax'
  | 'noPropertiesMatch'
  | 'clearFilters'
  | 'propertyType'
  | 'translating'
  | 'sqft'
  | 'brochure'
  | 'close'
  | 'brochureImages'
  | 'noBrochureImages'
  // Home page
  | 'dubaiRealEstate'
  | 'buy'
  | 'with'
  | 'apartments'
  | 'condos'
  | 'houses'
  | 'homes'
  | 'exploreProperties'
  | 'learnHow'
  | 'luxuryDubaiLiving'
  | 'cryptoPayments'
  | 'purchaseYourDream'
  | 'dubaiMarina'
  | 'primeLocations'
  | 'exclusiveProperties'
  | 'downtownViews'
  | 'featuredDubaiProperties'
  | 'viewAllProperties'
  | 'dubaiProperties'
  | 'cryptoTransactions'
  | 'secureEscrow'
  | 'averageSalePricePerSqft'
  | 'averageSalePrice'
  | 'averageAnnualRent'
  // Footer
  | 'findingYouPerfect'
  | 'quickLinks'
  | 'legal'
  | 'privacyPolicy'
  | 'termsOfService'
  | 'cookiePolicy'
  | 'newsletter'
  | 'subscribeNewsletter'
  | 'yourEmail'
  | 'subscribe'
  | 'allRightsReserved';

// Define translations for each language
export const translations: Record<string, Record<TranslationKey, string>> = {
  en: {
    home: 'Home',
    listings: 'Listings',
    contact: 'Contact',
    vipAccess: 'VIP Access',
    bitcoin: 'Bitcoin',
    policy: 'Policy',
    aboutUs: 'About Us',
    propertyDetails: 'Property Details',
    features: 'Features & Amenities',
    location: 'Location',
    similarProperties: 'Similar Properties',
    details: 'Details',
    sizeRange: 'Size Range',
    bedrooms: 'Bedrooms',
    bathrooms: 'Bathrooms',
    handover: 'Handover',
    paymentPlan: 'Payment Plan',
    downPayment: 'Down Payment',
    duringConstruction: 'During Construction',
    residences: 'Residences',
    luxuryWellness: 'Luxury & Wellness',
    retailDining: 'Retail & Dining',
    readMore: 'Read More',
    showLess: 'Show Less',
    login: 'Login',
    account: 'Account',
    createAccount: 'Create Account',
    favorites: 'Favorites',
    messages: 'Messages',
    pageManager: 'Page Manager',
    logout: 'Logout',
    tryAnotherCategory: 'Try another category',
    noPlacesFound: 'No {0} found nearby.',
    nearby: 'Nearby {0}',
    cafes: 'Cafes',
    restaurants: 'Restaurants',
    supermarkets: 'Supermarkets',
    schools: 'Schools',
    transit: 'Transit',
    parks: 'Parks',
    cafeDescription: 'Enjoy a relaxing cup of coffee or tea at these nearby cafes within easy reach of the property.',
    restaurantDescription: 'Discover nearby dining options for everything from quick meals to fine dining experiences.',
    supermarketDescription: 'Conveniently shop for groceries and essentials at these nearby supermarkets.',
    schoolDescription: 'Educational institutions including schools, colleges and universities in the vicinity.',
    transitDescription: 'Easily access public transportation options from these nearby transit stations.',
    defaultPlaceDescription: 'Points of interest located near the property.',
    // Listings page
    availableProperties: 'Available Properties',
    anyLocation: 'Any Location',
    anyType: 'Any Type',
    minBeds: 'Min Beds',
    maxBeds: 'Max Beds',
    minPrice: 'Min Price',
    maxPrice: 'Max Price',
    noMin: 'No Min',
    noMax: 'No Max',
    noPropertiesMatch: 'No properties match your search criteria',
    clearFilters: 'Clear Filters',
    propertyType: 'Property Type',
    sqft: 'sqft',
    brochure: 'Brochure',
    close: 'Close',
    brochureImages: 'Brochure Images',
    noBrochureImages: 'No brochure images available',
    // Home page
    dubaiRealEstate: 'Dubai Real Estate',
    buy: 'Buy',
    with: 'with',
    apartments: 'Apartments',
    condos: 'Condos',
    houses: 'Houses',
    homes: 'Homes',
    exploreProperties: 'Explore Properties',
    learnHow: 'Learn How',
    luxuryDubaiLiving: 'Luxury Dubai Living',
    cryptoPayments: 'Crypto Payments',
    purchaseYourDream: 'Purchase your dream property using Bitcoin or USDT',
    dubaiMarina: 'Dubai Marina',
    primeLocations: 'Prime Locations',
    exclusiveProperties: 'Exclusive properties in Dubai\'s most sought-after neighborhoods',
    downtownViews: 'Downtown Views',
    featuredDubaiProperties: 'Featured Dubai Properties',
    viewAllProperties: 'View All Properties',
    dubaiProperties: 'Dubai Properties',
    cryptoTransactions: 'Crypto Transactions',
    secureEscrow: 'Secure Escrow',
    averageSalePricePerSqft: 'Average Sale Price Per Sqft',
    averageSalePrice: 'Average Sale Price',
    averageAnnualRent: 'Average Annual Rent',
    // Footer
    findingYouPerfect: 'Finding you the perfect place to call home.',
    quickLinks: 'Quick Links',
    legal: 'Legal',
    privacyPolicy: 'Privacy Policy',
    termsOfService: 'Terms of Service',
    cookiePolicy: 'Cookie Policy',
    newsletter: 'Newsletter',
    subscribeNewsletter: 'Subscribe to our newsletter for the latest updates.',
    yourEmail: 'Your email',
    subscribe: 'Subscribe',
    allRightsReserved: '© 2025 MAIREALESTATE. All rights reserved.',
    translating: 'Translating'
  },
 ar: {
    home: 'الرئيسية',
    listings: 'العقارات',
    contact: 'اتصل بنا',
    vipAccess: 'وصول VIP',
    bitcoin: 'بيتكوين',
    policy: 'السياسة',
    aboutUs: 'معلومات عنا',
    propertyDetails: 'تفاصيل العقار',
    features: 'الميزات والمرافق',
    location: 'الموقع',
    similarProperties: 'عقارات مماثلة',
    details: 'التفاصيل',
    sizeRange: 'نطاق المساحة',
    bedrooms: 'غرف النوم',
    bathrooms: 'الحمامات',
    handover: 'موعد التسليم',
    paymentPlan: 'خطة الدفع',
    downPayment: 'الدفعة الأولى',
    duringConstruction: 'أثناء البناء',
    residences: 'المساكن',
    luxuryWellness: 'الفخامة والعافية',
    retailDining: 'التجزئة والمطاعم',
    readMore: 'قراءة المزيد',
    showLess: 'عرض أقل',
    login: 'تسجيل الدخول',
    account: 'الحساب',
    createAccount: 'إنشاء حساب',
    favorites: 'المفضلة',
    messages: 'الرسائل',
    pageManager: 'مدير الصفحة',
    logout: 'تسجيل الخروج',
    tryAnotherCategory: 'جرب فئة أخرى',
    noPlacesFound: 'لم يتم العثور على {0} في الجوار.',
    nearby: '{0} القريبة',
    cafes: 'المقاهي',
    restaurants: 'المطاعم',
    supermarkets: 'السوبر ماركت',
    schools: 'المدارس',
    transit: 'وسائل النقل',
    parks: 'الحدائق',
    cafeDescription: 'استمتع بفنجان من القهوة أو الشاي في هذه المقاهي القريبة التي يسهل الوصول إليها من العقار.',
    restaurantDescription: 'اكتشف خيارات تناول الطعام القريبة لكل شيء من الوجبات السريعة إلى تجارب تناول الطعام الفاخرة.',
    supermarketDescription: 'تسوق بسهولة للبقالة والضروريات في هذه المتاجر الكبرى القريبة.',
    schoolDescription: 'المؤسسات التعليمية بما في ذلك المدارس والكليات والجامعات في المنطقة المجاورة.',
    transitDescription: 'سهولة الوصول إلى وسائل النقل العام من محطات النقل القريبة.',
    defaultPlaceDescription: 'نقاط الاهتمام الواقعة بالقرب من العقار.',
    // Listings page
    availableProperties: 'العقارات المتاحة',
    anyLocation: 'أي موقع',
    anyType: 'أي نوع',
    minBeds: 'الحد الأدنى للغرف',
    maxBeds: 'الحد الأقصى للغرف',
    minPrice: 'الحد الأدنى للسعر',
    maxPrice: 'الحد الأقصى للسعر',
    noMin: 'لا حد أدنى',
    noMax: 'لا حد أقصى',
    noPropertiesMatch: 'لا توجد عقارات تطابق معايير البحث الخاصة بك',
    clearFilters: 'مسح الفلاتر',
    propertyType: 'نوع العقار',
    sqft: 'قدم مربع',
    brochure: 'كتيب',
    close: 'إغلاق',
    brochureImages: 'صور الكتيب',
    noBrochureImages: 'لا توجد صور كتيب متاحة',
    // Home page
    dubaiRealEstate: 'عقارات دبي',
    buy: 'اشتري',
    with: 'باستخدام',
    apartments: 'شقق',
    condos: 'كوندوس',
    houses: 'منازل',
    homes: 'بيوت',
    exploreProperties: 'استكشف العقارات',
    learnHow: 'تعلم كيف',
    luxuryDubaiLiving: 'الحياة الفاخرة في دبي',
    cryptoPayments: 'مدفوعات العملات المشفرة',
    purchaseYourDream: 'اشتر عقارك المثالي باستخدام بيتكوين أو USDT',
    dubaiMarina: 'مرسى دبي',
    primeLocations: 'مواقع متميزة',
    exclusiveProperties: 'عقارات حصرية في أكثر أحياء دبي المرغوبة',
    downtownViews: 'إطلالات وسط المدينة',
    featuredDubaiProperties: 'عقارات دبي المميزة',
    viewAllProperties: 'عرض جميع العقارات',
    dubaiProperties: 'عقارات دبي',
    cryptoTransactions: 'معاملات العملات المشفرة',
    secureEscrow: 'ضمان آمن',
    averageSalePricePerSqft: 'متوسط سعر البيع للقدم المربع',
    averageSalePrice: 'متوسط سعر البيع',
    averageAnnualRent: 'متوسط الإيجار السنوي',
    // Footer
    findingYouPerfect: 'نجد لك المكان المثالي لتسميه منزلك.',
    quickLinks: 'روابط سريعة',
    legal: 'قانوني',
    privacyPolicy: 'سياسة الخصوصية',
    termsOfService: 'شروط الخدمة',
    cookiePolicy: 'سياسة ملفات تعريف الارتباط',
    newsletter: 'النشرة الإخبارية',
    subscribeNewsletter: 'اشترك في نشرتنا الإخبارية للحصول على آخر التحديثات.',
    yourEmail: 'بريدك الإلكتروني',
    subscribe: 'اشترك',
    allRightsReserved: '© 2025 MAIREALESTATE. جميع الحقوق محفوظة.',
    translating: 'جاري الترجمة'
  },
  ro: {
    home: 'Acasă',
    listings: 'Proprietăți',
    contact: 'Contact',
    vipAccess: 'Acces VIP',
    bitcoin: 'Bitcoin',
    policy: 'Politică',
    aboutUs: 'Despre Noi',
    propertyDetails: 'Detalii Proprietate',
    features: 'Caracteristici și Facilități',
    location: 'Locație',
    similarProperties: 'Proprietăți Similare',
    details: 'Detalii',
    sizeRange: 'Interval Dimensiune',
    bedrooms: 'Dormitoare',
    bathrooms: 'Băi',
    handover: 'Predare',
    paymentPlan: 'Plan de Plată',
    downPayment: 'Avans',
    duringConstruction: 'În Timpul Construcției',
    residences: 'Reședințe',
    luxuryWellness: 'Lux și Wellness',
    retailDining: 'Retail și Dining',
    readMore: 'Citește Mai Mult',
    showLess: 'Arată Mai Puțin',
    login: 'Autentificare',
    account: 'Cont',
    createAccount: 'Creare Cont',
    favorites: 'Favorite',
    messages: 'Mesaje',
    pageManager: 'Manager Pagini',
    logout: 'Deconectare',
    tryAnotherCategory: 'Încercați altă categorie',
    noPlacesFound: 'Nu s-au găsit {0} în apropiere.',
    nearby: '{0} din apropiere',
    cafes: 'Cafenele',
    restaurants: 'Restaurante',
    supermarkets: 'Supermarketuri',
    schools: 'Școli',
    transit: 'Transport',
    parks: 'Parcuri',
    cafeDescription: 'Bucurați-vă de o ceașcă relaxantă de cafea sau ceai la aceste cafenele din apropiere, ușor accesibile din proprietate.',
    restaurantDescription: 'Descoperiți opțiuni de luat masa în apropiere, de la mese rapide până la experiențe culinare rafinate.',
    supermarketDescription: 'Cumpărați convenabil alimente și produse esențiale din aceste supermarketuri din apropiere.',
    schoolDescription: 'Instituții educaționale, inclusiv școli, colegii și universități din vecinătate.',
    transitDescription: 'Accesați cu ușurință opțiunile de transport public din aceste stații de tranzit din apropiere.',
    defaultPlaceDescription: 'Puncte de interes situate în apropierea proprietății.',
    // Listings page
    availableProperties: 'Proprietăți Disponibile',
    anyLocation: 'Orice Locație',
    anyType: 'Orice Tip',
    minBeds: 'Min Dormitoare',
    maxBeds: 'Max Dormitoare',
    minPrice: 'Preț Minim',
    maxPrice: 'Preț Maxim',
    noMin: 'Fără Minim',
    noMax: 'Fără Maxim',
    noPropertiesMatch: 'Nicio proprietate nu corespunde criteriilor de căutare',
    clearFilters: 'Șterge Filtrele',
    propertyType: 'Tip Proprietate',
    sqft: 'mp',
    brochure: 'Broșură',
    close: 'Închide',
    brochureImages: 'Imagini Broșură',
    noBrochureImages: 'Nu există imagini de broșură disponibile',
    // Home page
    dubaiRealEstate: 'Imobiliare Dubai',
    buy: 'Cumpără',
    with: 'cu',
    apartments: 'Apartamente',
    condos: 'Condominium',
    houses: 'Case',
    homes: 'Locuințe',
    exploreProperties: 'Explorează Proprietățile',
    learnHow: 'Află Cum',
    luxuryDubaiLiving: 'Locuințe de Lux în Dubai',
    cryptoPayments: 'Plăți Crypto',
    purchaseYourDream: 'Cumpără proprietatea visurilor tale folosind Bitcoin sau USDT',
    dubaiMarina: 'Dubai Marina',
    primeLocations: 'Locații Premium',
    exclusiveProperties: 'Proprietăți exclusive în cele mai căutate cartiere din Dubai',
    downtownViews: 'Priveliști Downtown',
    featuredDubaiProperties: 'Proprietăți Dubai Recomandate',
    viewAllProperties: 'Vezi Toate Proprietățile',
    dubaiProperties: 'Proprietăți Dubai',
    cryptoTransactions: 'Tranzacții Crypto',
    secureEscrow: 'Escrow Securizat',
    averageSalePricePerSqft: 'Preț Mediu de Vânzare pe Mp',
    averageSalePrice: 'Preț Mediu de Vânzare',
    averageAnnualRent: 'Chirie Anuală Medie',
    // Footer
    findingYouPerfect: 'Îți găsim locul perfect pe care să-l numești acasă.',
    quickLinks: 'Linkuri Rapide',
    legal: 'Legal',
    privacyPolicy: 'Politica de Confidențialitate',
    termsOfService: 'Termeni și Condiții',
    cookiePolicy: 'Politica de Cookie-uri',
    newsletter: 'Newsletter',
    subscribeNewsletter: 'Abonează-te la newsletter pentru cele mai recente actualizări.',
    yourEmail: 'Email-ul tău',
    subscribe: 'Abonează-te',
    allRightsReserved: '© 2025 MAIRealEstate. Toate drepturile rezervate.',
    translating: 'Se traduce'
  }
};

// Function to get translations
export function getTranslation(key: TranslationKey, language: string): string {
  // Default to English if the language is not supported
  const lang = translations[language] ? language : 'en';
  return translations[lang][key];
}
