# Changelog

## [1.0.0] - 2026-01-08

### Qo'shildi
- ✅ JWT autentifikatsiya tizimi
- ✅ Foydalanuvchi ro'yxatdan o'tish va login
- ✅ IELTS test yaratish va boshqarish
- ✅ AI yordamida Writing baholash (Google Gemini)
- ✅ Test natijalari va statistika
- ✅ Role-based access control (USER/ADMIN)
- ✅ Health check endpoints
- ✅ Prisma ORM + SQLite database
- ✅ Input validation
- ✅ CORS sozlamalari
- ✅ Password hashing (bcrypt)
- ✅ Docker support
- ✅ PM2 ecosystem konfiguratsiyasi
- ✅ Deployment qo'llanmasi
- ✅ Security qo'llanmasi
- ✅ API test script

### Tuzatildi
- ✅ Auth controller'da @Body() decorator qo'shildi
- ✅ JWT token payload'da `sub` field ishlatiladi
- ✅ Password response'da qaytarilmaydi
- ✅ AI service JSON parsing yaxshilandi
- ✅ CORS sozlamalari to'g'rilandi
- ✅ Environment variables to'ldirildi

### Xavfsizlik
- ✅ JWT secret environment variable'dan olinadi
- ✅ Parollar bcrypt bilan shifrlangan
- ✅ Input validation barcha endpointlarda
- ✅ CORS faqat ruxsat etilgan domenlar uchun
- ✅ Sensitive ma'lumotlar response'da yo'q

### Dokumentatsiya
- ✅ README.md yangilandi
- ✅ DEPLOYMENT.md yaratildi
- ✅ SECURITY.md yaratildi
- ✅ API test script qo'shildi
- ✅ Docker konfiguratsiyasi

## Kelajakdagi Rejalar

### v1.1.0
- [ ] Rate limiting
- [ ] Helmet.js integration
- [ ] Email notifications
- [ ] Password reset functionality
- [ ] User profile update

### v1.2.0
- [ ] Redis caching
- [ ] WebSocket support
- [ ] Advanced analytics
- [ ] Speaking test evaluation
- [ ] Reading test auto-grading

### v2.0.0
- [ ] OAuth2 integration (Google, GitHub)
- [ ] Payment integration
- [ ] Premium features
- [ ] Mobile app API
- [ ] Multi-language support
