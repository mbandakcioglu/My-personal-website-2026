# Kişisel Web Sitesi Üretim Promptu (Statik, Görsel Odaklı)

Sen uzman bir frontend geliştirici ve UI/UX tasarımcısısın.

Görevin, kıdemli bir frontend developer ve takım lideri için modern, görsel olarak güçlü, keyifli ve tamamen statik bir kişisel web sitesi üretmektir.

## İçerik Kaynağı

- Verilen PDF özgeçmişi tek ve doğru kaynak olarak kullan.
- Tüm bölümleri ayrıştır ve yapılandır: profil, özet, deneyim, yetkinlikler, eğitim, sertifikalar ve ek bilgiler.
- Bilgi uydurma. Yalnızca PDF’te yer alan verileri kullan.

## Görseller & Medya

- `/images` klasöründeki tüm görselleri aktif şekilde kullan:
  - Hero alanında profil veya arka plan görseli
  - Bölüm ayraçlarında, kartlarda ve arka planlarda dekoratif görseller
- Arayüz görsel olarak zengin, modern ve “portfolio vibe” taşımalıdır.

## Tasarım Yaklaşımı

- Tasarımı https://21st.dev/community/components sitesindeki komponentlerden **esinlenerek** üret:
  - Hero layout’ları
  - Card grid yapıları
  - Timeline / stepper tarzı deneyim alanları
  - Badge / tag tabanlı skill alanları
  - CTA ve contact bölümleri
- React bileşenlerini doğrudan kullanma, ancak **aynı görsel düzeni ve etkileşim hissini** vanilla HTML/CSS/JS ile yeniden üret.

## Teknik Yığın

- Sadece statik teknolojiler kullan: HTML, CSS (veya Tailwind) ve JavaScript.
- Framework, SPA, build tool veya server-side rendering KULLANMA.
- Site klasik bir web hosting ortamında doğrudan çalışabilir olmalıdır.
- Erişilebilirlik (WCAG), semantik HTML ve responsive davranış zorunludur.

## Sayfa Yapısı

1. Hero alanı:
   - İsim, unvan, kısa özet
   - Güçlü bir görsel veya arka plan
   - CTA butonları (İletişim, CV indir)
2. Hakkımda / Özet (ikonlu veya kartlı düzen)
3. Deneyim:
   - Timeline veya kart tabanlı görsel yapı
   - Şirket, rol, tarih ve açıklamalar net ayrılmış olmalı
4. Yetkinlikler:
   - Kategorize edilmiş badge/tag yapıları
   - Görsel hiyerarşi ve spacing güçlü olmalı
5. Eğitim & Sertifikalar:
   - Kart veya liste bazlı, ikonlu düzen
6. Ek Bilgiler / İlgi Alanları:
   - Daha hafif, kişisel bir bölüm olarak tasarlanmalı
7. İletişim:
   - E-posta, varsa sosyal bağlantılar
   - Net CTA ve görsel olarak öne çıkan bir kapanış alanı

## Ton & Marka Dili

- Profesyonel, güven veren ve modern.
- Kişisel ama samimi olmayan bir dil.
- Kıdemli frontend developer / team lead portföyüne uygun olmalı.

## Çıktı Gereksinimleri

- Temiz, üretime hazır statik kod üret.
- Dosya yapısı: index.html, css/, js/, images/ gibi klasik web hosting uyumlu olmalı.
- Görsel hiyerarşi, spacing ve tipografi öncelikli olmalı.
- Modüler ve yeniden kullanılabilir bileşen mantığı (framework kullanmadan) uygulanmalı.
- Kritik bölümleri yorum satırlarıyla açıkla.
- Harici linkler yoksa yer tutucu (placeholder) bağlantılar ekle.
