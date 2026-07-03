import React, { useState } from 'react';
import { STORES, VACANCIES } from '../data';
import { motion, AnimatePresence } from 'motion/react';

interface DrawerPagesProps {
  key?: string;
  view: 'about' | 'stores' | 'careers' | 'contacts';
  translations: any;
}

export default function DrawerPages({ view, translations }: DrawerPagesProps) {
  // --- STORES LOCATOR STATE ---
  const [storeQuery, setStoreQuery] = useState('');
  const filteredStores = STORES.filter(s => 
    s.name.toLowerCase().includes(storeQuery.toLowerCase()) || 
    s.address.toLowerCase().includes(storeQuery.toLowerCase())
  );

  // --- CAREERS STATE ---
  const [expandedVacancy, setExpandedVacancy] = useState<string | null>(null);
  const [appliedVacancyId, setAppliedVacancyId] = useState<string | null>(null);
  const [applicantName, setApplicantName] = useState('');
  const [applicantPhone, setApplicantPhone] = useState('+998 ');

  const handleApplyVacancy = (e: React.FormEvent, vacancyId: string) => {
    e.preventDefault();
    if (!applicantName.trim() || applicantPhone.length < 13) return;
    setAppliedVacancyId(vacancyId);
    setTimeout(() => {
      setAppliedVacancyId(null);
      setApplicantName('');
      setApplicantPhone('+998 ');
      setExpandedVacancy(null);
      alert('Arizangiz muvaffaqiyatli qabul qilindi! HR bo\'limimiz tez orada siz bilan bog\'lanadi.');
    }, 1500);
  };

  // --- CONTACTS STATE ---
  const [contactName, setContactName] = useState('');
  const [contactPhone, setContactPhone] = useState('+998 ');
  const [contactMessage, setContactMessage] = useState('');
  const [contactSuccess, setContactSuccess] = useState(false);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName.trim() || contactPhone.length < 13 || !contactMessage.trim()) return;
    setContactSuccess(true);
    setTimeout(() => {
      setContactSuccess(false);
      setContactName('');
      setContactPhone('+998 ');
      setContactMessage('');
    }, 3000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.3 }}
      className="max-w-3xl mx-auto space-y-8 pb-12"
    >
      {/* ----------------- ABOUT US VIEW ----------------- */}
      {view === 'about' && (
        <div className="space-y-6">
          <div className="space-y-2">
            <h2 className="font-headline-lg text-headline-lg font-bold text-on-background">
              {translations.aboutUsTitle}
            </h2>
            <div className="h-1 w-20 bg-primary rounded-full" />
          </div>

          <div className="bg-surface-white rounded-3xl p-6 md:p-8 border border-surface-container-low shadow-[0_4px_25px_rgba(0,0,0,0.01)] space-y-6">
            <div className="aspect-[2/1] rounded-2xl overflow-hidden bg-surface-container-low">
              <img 
                src="https://images.unsplash.com/photo-1517433456452-f9633a875f6f?auto=format&fit=crop&w=1200&q=80" 
                alt="Confectionery details" 
                className="w-full h-full object-cover" 
              />
            </div>

            <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed font-medium">
              {translations.aboutUsText1}
            </p>

            <p className="font-body-md text-body-md text-text-muted leading-relaxed">
              {translations.aboutUsText2}
            </p>

            {/* Values / Milestones bento style cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
              <div className="bg-primary-container/20 border border-primary/10 rounded-2xl p-4 text-center space-y-1">
                <span className="material-symbols-outlined text-primary text-3xl">restaurant_menu</span>
                <h4 className="font-semibold text-xs text-on-primary-fixed-variant uppercase tracking-wider">Tabiiy mahsulotlar</h4>
                <p className="text-[11px] text-text-muted">Hech qanday sun'iy konservantlar va aromatizatorlarsiz, faqat tabiiy meva, sariyog' va sutdan tayyorlanadi.</p>
              </div>

              <div className="bg-primary-container/20 border border-primary/10 rounded-2xl p-4 text-center space-y-1">
                <span className="material-symbols-outlined text-primary text-3xl">volunteer_activism</span>
                <h4 className="font-semibold text-xs text-on-primary-fixed-variant uppercase tracking-wider">Sevimli retseptlar</h4>
                <p className="text-[11px] text-text-muted">Bolaligimizdan barchamizga tanish va sevimli bo'lgan ta'mlarni o'ziga xos tarzda zamonaviylashtiramiz.</p>
              </div>

              <div className="bg-primary-container/20 border border-primary/10 rounded-2xl p-4 text-center space-y-1">
                <span className="material-symbols-outlined text-primary text-3xl">celebration</span>
                <h4 className="font-semibold text-xs text-on-primary-fixed-variant uppercase tracking-wider">Bayramona kayfiyat</h4>
                <p className="text-[11px] text-text-muted">Bizning har bir tortimiz va pishirig'imiz uyingizga va bayramlaringizga haqiqiy shirin kayfiyat ulashadi.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ----------------- STORES LOCATOR VIEW ----------------- */}
      {view === 'stores' && (
        <div className="space-y-6">
          <div className="space-y-2">
            <h2 className="font-headline-lg text-headline-lg font-bold text-on-background">
              {translations.locationTitle}
            </h2>
            <p className="text-text-muted font-body-md text-sm">{translations.locationSub}</p>
          </div>

          {/* Search inside stores */}
          <div className="relative">
            <input
              type="text"
              placeholder="Filiallarni nomi yoki manzili bo'yicha qidirish..."
              value={storeQuery}
              onChange={(e) => setStoreQuery(e.target.value)}
              className="w-full px-4 py-3 pl-11 bg-surface-white border border-surface-variant rounded-2xl font-body-md text-body-md focus:outline-none focus:border-primary transition-all shadow-sm"
            />
            <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted text-xl">
              search
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredStores.length > 0 ? (
              filteredStores.map((store) => (
                <div
                  key={store.id}
                  className="bg-surface-white rounded-2xl p-5 border border-surface-container-low shadow-[0_2px_15px_rgba(0,0,0,0.01)] flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                      <h3 className="font-headline-md text-headline-md font-semibold text-on-background text-base">
                        {store.name}
                      </h3>
                    </div>
                    <p className="text-xs text-text-muted flex items-start gap-1.5 leading-relaxed">
                      <span className="material-symbols-outlined text-[16px] text-primary flex-shrink-0">location_on</span>
                      {store.address}
                    </p>
                    <p className="text-xs text-text-muted flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-[16px] text-primary flex-shrink-0">schedule</span>
                      {store.hours}
                    </p>
                    <p className="text-xs text-text-muted flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-[16px] text-primary flex-shrink-0">call</span>
                      {store.phone}
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(store.address);
                      alert('Manzil muvaffaqiyatli nusxalandi!');
                    }}
                    className="w-full py-2 bg-surface-container hover:bg-surface-container-high transition-colors font-semibold text-xs rounded-xl flex items-center justify-center gap-1.5 cursor-pointer text-on-surface-variant"
                  >
                    <span className="material-symbols-outlined text-sm">content_copy</span>
                    Manzilni nusxalash
                  </button>
                </div>
              ))
            ) : (
              <div className="col-span-2 text-center py-12 bg-surface-white rounded-2xl border border-dashed border-surface-variant/40">
                <span className="material-symbols-outlined text-4xl text-text-muted/60 mb-2">store_off</span>
                <p className="text-text-muted text-xs font-semibold">Hech qanday filial topilmadi</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ----------------- CAREERS VIEW ----------------- */}
      {view === 'careers' && (
        <div className="space-y-6">
          <div className="space-y-2">
            <h2 className="font-headline-lg text-headline-lg font-bold text-on-background">
              {translations.vacancyTitle}
            </h2>
            <p className="text-text-muted font-body-md text-sm">{translations.vacancySub}</p>
          </div>

          <div className="space-y-4">
            {VACANCIES.map((vacancy) => {
              const isExpanded = expandedVacancy === vacancy.id;
              const isApplied = appliedVacancyId === vacancy.id;
              return (
                <div
                  key={vacancy.id}
                  className="bg-surface-white rounded-2xl border border-surface-container shadow-[0_2px_12px_rgba(0,0,0,0.01)] overflow-hidden transition-all duration-300"
                >
                  {/* Vacancy Header Row */}
                  <div
                    onClick={() => setExpandedVacancy(isExpanded ? null : vacancy.id)}
                    className="p-5 flex justify-between items-center cursor-pointer hover:bg-surface-container-low transition-colors"
                  >
                    <div className="space-y-1">
                      <h3 className="font-headline-md text-headline-md font-semibold text-on-background text-base">
                        {vacancy.title}
                      </h3>
                      <div className="flex flex-wrap gap-2 text-[10px] font-bold uppercase tracking-wider text-text-muted">
                        <span className="bg-surface-container px-2 py-0.5 rounded-full">{vacancy.department}</span>
                        <span className="bg-primary-container/30 text-on-primary-fixed-variant px-2 py-0.5 rounded-full">{vacancy.type}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-bold text-primary">{vacancy.salary}</span>
                      <span className={`material-symbols-outlined text-primary transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}>
                        keyboard_arrow_down
                      </span>
                    </div>
                  </div>

                  {/* Expanded Vacancy form & description */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="border-t border-surface-variant/40 bg-surface-container-low/30"
                      >
                        <div className="p-5 space-y-4 text-xs md:text-sm text-on-surface-variant">
                          <div className="space-y-1">
                            <h4 className="font-semibold text-on-background">Talablar va Tavsif:</h4>
                            <p className="text-text-muted leading-relaxed">{vacancy.description}</p>
                          </div>
                          <div className="grid grid-cols-2 gap-4 text-xs py-2 bg-surface-white border border-surface-container rounded-xl p-3">
                            <p><strong>Ish tajribasi:</strong> {vacancy.experience}</p>
                            <p><strong>Maosh:</strong> {vacancy.salary}</p>
                          </div>

                          {/* Submit form */}
                          <div className="pt-2">
                            <h4 className="font-semibold text-on-background mb-2">Ushbu vakansiyaga topshirish:</h4>
                            <form onSubmit={(e) => handleApplyVacancy(e, vacancy.id)} className="space-y-3 max-w-md">
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                <input
                                  type="text"
                                  required
                                  placeholder="Ismingiz va familiyangiz"
                                  value={applicantName}
                                  onChange={(e) => setApplicantName(e.target.value)}
                                  className="px-3 py-2 bg-surface-white border border-surface-variant/50 rounded-xl focus:outline-none focus:border-primary text-xs w-full"
                                />
                                <input
                                  type="text"
                                  required
                                  value={applicantPhone}
                                  onChange={(e) => setApplicantPhone(e.target.value)}
                                  className="px-3 py-2 bg-surface-white border border-surface-variant/50 rounded-xl focus:outline-none focus:border-primary text-xs w-full"
                                />
                              </div>
                              <button
                                type="submit"
                                disabled={isApplied}
                                className="px-5 py-2.5 bg-primary text-on-primary font-bold rounded-xl text-xs hover:opacity-90 cursor-pointer flex items-center justify-center gap-1.5"
                              >
                                {isApplied ? (
                                  <>
                                    <span className="material-symbols-outlined text-xs animate-spin">refresh</span>
                                    Ariza yuborilmoqda...
                                  </>
                                ) : (
                                  <>
                                    <span className="material-symbols-outlined text-xs">send</span>
                                    Arizani topshirish
                                  </>
                                )}
                              </button>
                            </form>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ----------------- CONTACTS VIEW ----------------- */}
      {view === 'contacts' && (
        <div className="space-y-6">
          <div className="space-y-2">
            <h2 className="font-headline-lg text-headline-lg font-bold text-on-background">
              {translations.contactTitle}
            </h2>
            <p className="text-text-muted font-body-md text-sm">{translations.contactSub}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {/* Left side details */}
            <div className="md:col-span-5 space-y-4">
              <div className="bg-surface-white rounded-2xl p-5 border border-surface-container space-y-4 text-xs md:text-sm">
                <h4 className="font-bold text-on-background text-base border-b border-surface-variant/30 pb-2">Ma'lumotlar</h4>
                <div className="space-y-3 text-text-muted">
                  <p className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary text-lg">call</span>
                    <strong>Yagona Call-markaz:</strong>
                  </p>
                  <p className="pl-7 font-semibold text-on-background">+998 (78) 113-40-40</p>

                  <p className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary text-lg">mail</span>
                    <strong>Elektron pochta:</strong>
                  </p>
                  <p className="pl-7 text-primary hover:underline cursor-pointer">info@safiabakery.uz</p>

                  <p className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary text-lg">public</span>
                    <strong>Biz ijtimoiy tarmoqlarda:</strong>
                  </p>
                  <div className="flex gap-3 pl-7 pt-1">
                    <a href="#" className="w-8 h-8 rounded-full bg-surface-container hover:bg-primary hover:text-on-primary text-primary transition-all flex items-center justify-center font-bold">T</a>
                    <a href="#" className="w-8 h-8 rounded-full bg-surface-container hover:bg-primary hover:text-on-primary text-primary transition-all flex items-center justify-center font-bold">I</a>
                    <a href="#" className="w-8 h-8 rounded-full bg-surface-container hover:bg-primary hover:text-on-primary text-primary transition-all flex items-center justify-center font-bold">F</a>
                  </div>
                </div>
              </div>
            </div>

            {/* Right side form */}
            <div className="md:col-span-7">
              <div className="bg-surface-white rounded-3xl p-6 border border-surface-container shadow-[0_2px_15px_rgba(0,0,0,0.01)] relative overflow-hidden">
                <AnimatePresence mode="wait">
                  {!contactSuccess ? (
                    <motion.form
                      key="contact-form"
                      onSubmit={handleContactSubmit}
                      className="space-y-4"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-text-muted uppercase tracking-wider">{translations.fullname}</label>
                        <input
                          type="text"
                          required
                          placeholder="Ismingizni kiriting"
                          value={contactName}
                          onChange={(e) => setContactName(e.target.value)}
                          className="w-full px-4 py-2.5 bg-surface-container-low border border-surface-variant/40 rounded-xl font-body-md text-sm focus:outline-none focus:border-primary transition-all"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-text-muted uppercase tracking-wider">{translations.phone}</label>
                        <input
                          type="text"
                          required
                          value={contactPhone}
                          onChange={(e) => {
                            if (e.target.value.startsWith('+998 ')) setContactPhone(e.target.value);
                          }}
                          className="w-full px-4 py-2.5 bg-surface-container-low border border-surface-variant/40 rounded-xl font-body-md text-sm focus:outline-none focus:border-primary transition-all"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-text-muted uppercase tracking-wider">{translations.message}</label>
                        <textarea
                          required
                          rows={4}
                          placeholder="Fikr, taklif yoki shikoyatingiz..."
                          value={contactMessage}
                          onChange={(e) => setContactMessage(e.target.value)}
                          className="w-full px-4 py-2.5 bg-surface-container-low border border-surface-variant/40 rounded-xl font-body-md text-sm focus:outline-none focus:border-primary transition-all resize-none"
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full py-3 bg-primary text-on-primary font-bold text-xs rounded-xl hover:opacity-90 transition-opacity cursor-pointer shadow-sm active:scale-95 flex items-center justify-center gap-1.5"
                      >
                        <span className="material-symbols-outlined text-xs">send</span>
                        <span>{translations.send}</span>
                      </button>
                    </motion.form>
                  ) : (
                    <motion.div
                      key="contact-success"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      className="text-center py-10 space-y-4"
                    >
                      <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                        <span className="material-symbols-outlined text-3xl font-bold">done_all</span>
                      </div>
                      <h4 className="font-bold text-on-background text-lg">{translations.feedbackSuccess}</h4>
                      <p className="text-xs text-text-muted">Ajdodingiz yoki fikringiz juda qadrli. Tez orada javob yo\'llaymiz!</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
}
