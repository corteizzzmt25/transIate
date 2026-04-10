import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform, Alert, NativeModules } from 'react-native';
import { initialize, showFloatingBubble, hideFloatingBubble, requestPermission, checkPermission } from 'react-native-floating-bubble';

export default function App() {
    const [hasPermission, setHasPermission] = useState(false);

    useEffect(() => {
        // Sadece Android, uygulamaların üzerinde süzülmeye (SYSTEM_ALERT_WINDOW) OS seviyesinde izin verir.
        if (Platform.OS === 'android') {
            checkPermission()
                .then(value => setHasPermission(value))
                .catch(console.error);
        } else {
            // iOS (iPhone) kullanıcısını kısıtlama hakkında bilgilendir
            Alert.alert(
                "iOS Kısıtlaması (Bilgi)",
                "Apple'ın güvenlik politikaları gereği iOS'te donanımsal olarak 'Diğer uygulamaların üzerinde göster' izni yoktur. Yüzen buton iPhone'da sadece bu uygulamanın içinde ya da bir Safari eklentisi olarak çalışabilir."
            );
        }
    }, []);

    const handleRequestPermission = () => {
        if (Platform.OS === 'android') {
            requestPermission()
                .then(value => setHasPermission(value))
                .catch(err => {
                    console.error(err);
                    Alert.alert("Hata", "İzin alınamadı.");
                });
        }
    };

    const onShowBubble = () => {
        if (Platform.OS === 'android') {
            if (hasPermission) {
                initialize().then(() => {
                    showFloatingBubble().then(() => {
                        Alert.alert("Başarılı", "Çeviri Butonu artık ekranda yüzüyor! Ana ekrana dönebilirsiniz.");
                    });
                });
            } else {
                Alert.alert("Eksik İzin", "Lütfen önce Uygulamaların Üzerinde Göster iznini verin.");
                handleRequestPermission();
            }
        } else {
            Alert.alert(
                "Desteklenmiyor",
                "iOS işletim sisteminde Sistem geneli yüzen buton desteklenmez. Ekranın kendi içindeki çevirmen çalışacaktır."
            );
            // Burada iOS için uygulamanın kendi içindeki sayfa içi animasyonu tetiklenebilir
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Yapay Zeka Çevirmen</Text>
            <Text style={styles.subtitle}>
                {Platform.OS === 'ios'
                    ? 'iPhone için uygulama içi aktiftir.'
                    : 'Her ekranda çalışan yüzen çeviri butonunu başlatın.'}
            </Text>

            {Platform.OS === 'android' && !hasPermission && (
                <TouchableOpacity style={styles.btn} onPress={handleRequestPermission}>
                    <Text style={styles.btnText}>Yetki Ayarlarına Git (Android)</Text>
                </TouchableOpacity>
            )}

            <TouchableOpacity style={[styles.btn, styles.successBtn]} onPress={onShowBubble}>
                <Text style={styles.btnText}>Yüzen Butonu Başlat</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0f172a',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 24,
    },
    title: {
        fontSize: 26,
        color: '#ffffff',
        fontWeight: 'bold',
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 16,
        color: '#94a3b8',
        textAlign: 'center',
        marginBottom: 40,
        paddingHorizontal: 20,
    },
    btn: {
        backgroundColor: '#3b82f6',
        paddingVertical: 16,
        paddingHorizontal: 24,
        borderRadius: 14,
        marginBottom: 16,
        width: '100%',
        alignItems: 'center',
    },
    successBtn: {
        backgroundColor: '#10b981',
    },
    btnText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: '700',
    }
});
