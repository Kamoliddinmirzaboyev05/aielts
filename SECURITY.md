# Xavfsizlik Qo'llanmasi

## Muhim Xavfsizlik Sozlamalari

### 1. Environment Variables

**MUHIM**: `.env` faylini hech qachon git'ga qo'shmang!

```bash
# Kuchli JWT secret yarating (kamida 32 belgi)
JWT_SECRET=$(openssl rand -base64 32)

# Yoki
JWT_SECRET=$(node -e "console.log(require('crypto').randomBytes(32).toString('hex'))")
```

### 2. CORS Sozlamalari

`src/main.ts` faylida CORS sozlamalarini to'g'ri qiling:

```typescript
app.enableCors({
  origin: [process.env.FRONTEND_URL], // Faqat o'z frontend domeningiz
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
})
```

### 3. Rate Limiting (Tavsiya etiladi)

```bash
npm install @nestjs/throttler
```

`app.module.ts` ga qo'shing:

```typescript
import { ThrottlerModule } from '@nestjs/throttler';

@Module({
  imports: [
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 10,
    }),
    // ...
  ],
})
```

### 4. Helmet.js (Tavsiya etiladi)

```bash
npm install helmet
```

`main.ts` ga qo'shing:

```typescript
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(helmet());
  // ...
}
```

### 5. Database Xavfsizligi

- SQLite faylini faqat backend process o'qiy olishi kerak
- Muntazam backup oling
- Sensitive ma'lumotlarni shifrlang

```bash
# Database file permissions
chmod 600 database.sqlite
```

### 6. API Key Xavfsizligi

- GEMINI_API_KEY ni hech qachon frontend'ga yubormang
- API key'ni environment variable sifatida saqlang
- Production'da API key'ni rotate qiling

### 7. Password Xavfsizligi

- Minimum 6 belgi (tavsiya: 8+)
- bcrypt salt rounds: 10 (hozirgi sozlama)
- Parollar hech qachon response'da qaytarilmaydi

### 8. JWT Token Xavfsizligi

- Token expiration: 7 kun
- Token'ni localStorage'da saqlang (XSS himoyasi bilan)
- Yoki httpOnly cookie'da saqlang (CSRF himoyasi bilan)

### 9. Input Validation

Barcha input'lar class-validator bilan tekshiriladi:

```typescript
@IsEmail()
@IsString()
@MinLength(6)
```

### 10. Error Handling

Production'da batafsil xato ma'lumotlarini ko'rsatmang:

```typescript
if (process.env.NODE_ENV === 'production') {
  // Generic error message
  throw new HttpException('Internal server error', 500);
}
```

## Xavfsizlik Checklisti

- [ ] `.env` faylini `.gitignore` ga qo'shilgan
- [ ] JWT_SECRET kuchli va unique
- [ ] CORS to'g'ri sozlangan
- [ ] Rate limiting qo'shilgan
- [ ] Helmet.js o'rnatilgan
- [ ] Database backup sozlangan
- [ ] SSL/TLS sertifikat o'rnatilgan (production)
- [ ] Firewall sozlangan
- [ ] Faqat kerakli portlar ochiq
- [ ] Loglar monitoring qilinadi
- [ ] Dependency'lar yangilangan

## Xavfsizlik Auditlari

```bash
# Dependency vulnerabilities tekshirish
npm audit

# Tuzatish
npm audit fix

# Yoki
npm audit fix --force
```

## Incident Response

Agar xavfsizlik muammosi topilsa:

1. Darhol serverni to'xtating
2. Muammoni tahlil qiling
3. Patch qo'llang
4. Barcha tokenlarni bekor qiling
5. Foydalanuvchilarni xabardor qiling
6. Loglarni tekshiring
7. Backup'dan tiklang (agar kerak bo'lsa)

## Monitoring

```bash
# PM2 monitoring
pm2 monit

# Loglarni kuzatish
tail -f logs/combined.log

# Failed login attempts
grep "Invalid credentials" logs/combined.log
```

## Qo'shimcha Resurslar

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [NestJS Security](https://docs.nestjs.com/security/authentication)
- [Node.js Security Best Practices](https://nodejs.org/en/docs/guides/security/)
