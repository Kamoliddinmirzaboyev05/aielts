# EN●LA - IELTS Preparation Platform Backend

NestJS asosida qurilgan IELTS tayyorgarlik platformasi uchun REST API backend. SQLite database va AI baholash tizimi bilan.

## Xususiyatlar

- **Autentifikatsiya**: JWT asosida autentifikatsiya va bcrypt parol shifrlash
- **Foydalanuvchi boshqaruvi**: Ro'yxatdan o'tish va profil boshqaruvi
- **IELTS Testlar**: Test yaratish va natijalarni kuzatish
- **AI Baholash**: Google Gemini AI yordamida Writing baholash
- **Statistika**: Foydalanuvchi progressini tahlil qilish
- **Database**: SQLite + Prisma ORM

## O'rnatish

### Talablar

- Node.js 18+
- npm yoki yarn

### Bosqichlar

```bash
# Dependencies o'rnatish
npm install

# .env faylini yaratish
cp .env.example .env

# .env faylida kerakli o'zgaruvchilarni to'ldiring
# JWT_SECRET, GEMINI_API_KEY, va boshqalar

# Prisma client generatsiya qilish
npm run prisma:generate

# Database migratsiya
npx prisma migrate deploy

# Database seed (ixtiyoriy)
npm run prisma:seed
```

### Ishga Tushirish

```bash
# Development rejimida
npm run dev

# Build qilish
npm run build

# Production rejimida
npm run start:prod
```

## API Endpointlar

### Health Check
- `GET /` - API status
- `GET /health` - Health check

### Autentifikatsiya
- `POST /auth/register` - Ro'yxatdan o'tish
- `POST /auth/login` - Tizimga kirish

### Foydalanuvchilar
- `GET /users/profile` - Profil ma'lumotlari (JWT kerak)

### IELTS
- `GET /ielts/stats` - Statistika (JWT kerak)
- `GET /ielts/scores` - Test natijalari (JWT kerak)
- `POST /ielts/submit-score` - Natija yuborish (JWT kerak)
- `POST /ielts/evaluate-writing` - Writing baholash (JWT kerak)

### Testlar
- `GET /tests` - Barcha testlar
- `GET /tests/:id` - Bitta test
- `POST /tests` - Test yaratish (ADMIN kerak)
- `PATCH /tests/:id` - Test yangilash (ADMIN kerak)
- `DELETE /tests/:id` - Test o'chirish (ADMIN kerak)

## Loyiha Strukturasi

```
backend/
├── src/
│   ├── auth/              # Autentifikatsiya moduli
│   ├── users/             # Foydalanuvchilar moduli
│   ├── ielts/             # IELTS moduli
│   ├── tests/             # Testlar moduli
│   ├── ai/                # AI baholash moduli
│   ├── prisma/            # Prisma servis
│   ├── health/            # Health check
│   ├── app.module.ts      # Asosiy modul
│   └── main.ts            # Kirish nuqtasi
├── prisma/
│   ├── schema.prisma      # Database schema
│   └── seed.js            # Seed data
├── .env.example           # Environment o'zgaruvchilar namunasi
├── ecosystem.config.js    # PM2 konfiguratsiyasi
├── DEPLOYMENT.md          # Deploy qo'llanmasi
└── package.json
```

## Texnologiyalar

- **Framework**: NestJS 10
- **Database**: SQLite + Prisma ORM
- **Autentifikatsiya**: JWT + Passport
- **Xavfsizlik**: bcrypt parol shifrlash
- **Validatsiya**: class-validator
- **AI**: Google Gemini API

## Database Schema

### Users
- `id` (UUID)
- `email` (unique)
- `password` (hashed)
- `fullName`
- `role` (USER/ADMIN)

### Tests
- `id` (UUID)
- `title`
- `type` (READING/LISTENING/WRITING/SPEAKING)
- `content` (JSON)
- `audioUrl`

### Attempts
- `id` (UUID)
- `userId` (FK)
- `testId` (FK)
- `score`
- `answers` (JSON)

### Feedback
- `id` (UUID)
- `attemptId` (FK)
- `overallBand`
- `taskResponse`
- `coherence`
- `lexical`
- `grammar`
- `modelAnswer`

## Xavfsizlik

- JWT tokenlar 7 kun amal qiladi
- Parollar bcrypt bilan shifrlangan (10 salt rounds)
- CORS sozlangan
- Input validatsiya barcha endpointlarda
- Parollar response'da qaytarilmaydi

## Serverga Joylashtirish

Batafsil qo'llanma uchun [DEPLOYMENT.md](./DEPLOYMENT.md) faylini ko'ring.

Qisqacha:

```bash
# Build
npm run build

# PM2 bilan ishga tushirish
pm2 start ecosystem.config.js

# Yoki oddiy
npm run start:prod
```

## Environment O'zgaruvchilar

```bash
DATABASE_URL="file:./database.sqlite"
JWT_SECRET=your-secret-key
PORT=3001
NODE_ENV=production
FRONTEND_URL=https://your-frontend.com
GEMINI_API_KEY=your-api-key
```

## Kelajakdagi Yaxshilanishlar

- [ ] Rate limiting
- [ ] Redis caching
- [ ] Email notifications
- [ ] WebSocket real-time updates
- [ ] Advanced analytics
- [ ] Payment integration
- [ ] OAuth2 (Google, GitHub)

## Muammolarni Hal Qilish

### Port band bo'lsa:
```bash
lsof -i :3001
kill -9 <PID>
```

### Database xatoliklari:
```bash
rm database.sqlite
npx prisma migrate deploy
```

## Litsenziya

MIT

## Muallif

EN●LA Team
