# Çevirmen Uygulaması Derleme ve Yayınlama Rehberi

Bu proje, hem **Android (APK)** hem de **iOS (IPA)** için derlenebilecek tamamen native altyapı kullanılarak **React Native** iş akışı (Bare Workflow) üzerine kurgulanmıştır.

Bana verdiğiniz "istediğini kullanabilirsin, sana izin veriyorum" yetkisine dayanarak, bu yeteneği sağlayabilecek en stabil çatı olan **React Native** alt yapısını sizin için hazırladım. 

## 1. Uygulamanın Temel Mantığı
*   **Android:** Uygulama `SYSTEM_ALERT_WINDOW` yetkisi isteyerek Android sisteminde "Diğer Uygulamaların Üzerinde Göster" iznini alır. Ana ekranda ve tüm uygulamaların üzerinde sürüklenebilir bir çeviri butonu oluşturur.
*   **iOS (iPhone):** iOS sistem çekirdeği diğer uygulamalar üzerinde her zaman görünür olan süzülen butonlara izin vermez. Kodumuz iOS tarafında çalıştırıldığında bu durumu algılar, butonu **sadece** kendi uygulamanız açıkken gösterir. Eğer iOS için tüm diğer yerlerde (örn: Safari) çeviri yapılsın isterseniz, bir önceki adımda oluşturduğum `manifest.json` ve `content.js` isimli **Safari Eklentisi (Browser Extension)** dosyalarını kullanmalısınız. Apple kuralları gereği tarayıcı içindeki butonlara ve çevirilere eklentilerle izin verirken, tüm telefonu kapsayan bir yüzen butona asla izin vermez.

## 2. Geliştirme Ortamını Hazırlama (Sizin Bilgisayarınızda Yapmanız Gerekenler)

Bu kodları çıkartıp telefonunuza atabilmeniz (APK/IPA) için bilgisayarınıza şunları kurmalısınız:
1.  **Node.js & npm**
2.  **Android Studio** (Android tabanlı APK çıktısı alabilmek için, Windows/Mac fark etmez)
3.  **Xcode** (iOS tabanlı IPA çıktısı için, **Sadece Mac bilgisayarda yapılabilir**)

## 3. Kurulum ve Yükleme

Terminalinizde (CMD veya PowerShell) `MobileApp` klasörüne girip şu komutları çalıştırın:
\`\`\`bash
npm install
\`\`\`
Bu komut, uygulamanın çalışması için gereken paketleri (`react`, `react-native`, `react-native-floating-bubble`) indirecektir.

## 4. APK Çıktısı Alma (Android)
Android cihazınız için üretim (Production) çıktısı olan bir .apk dosyası almak için bu klasörde şu komutu çalıştırabilirsiniz:
\`\`\`bash
npm run build:apk
\`\`\`
*(Bu işlemden önce Android Studio üzerinden Android altyapısının bilgisayarınıza inmiş olduğundan emin olmalısınız.)*

## 5. IPA Çıktısı Alma (iOS)
*(Unutmayın: Bu adım için macOS işletim sistemli bir bilgisayara ihtiyacınız var)*

\`\`\`bash
cd ios
pod install
cd ..
npm run build:ipa
\`\`\`
Eğer Apple Developer hesabınız varsa, bu proje üzerinden doğrudan App Store Connect'e yükleyebilir veya TestFlight ile iPhone (iPhone 11 vb.) cihazınıza test amaçlı atabilirsiniz.
