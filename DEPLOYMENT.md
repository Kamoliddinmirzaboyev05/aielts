# Serverga Joylashtirish Bo'yicha Qo'llanma

## 1. Tayyorgarlik

### Kerakli dasturlar:
- Node.js 18+ 
- npm yoki yarn
- PM2 (production uchun)

## 2. Serverga Yuklash

```bash
# Loyihani serverga yuklang (git orqali)
git clone <repository-url>
cd ielts-backend

# Yoki zip fayl orqali yuklang va ochib oling
```

## 3. O'rnatish

```bash
# Dependencies o'rnatish
npm install

# Prisma client generatsiya qilish
npm run prisma:generate

# Database migratsiya
npx prisma migrate deploy
```

## 4. Environment Variables

`.env` faylini yarating va quyidagilarni to'ldiring:

```bash
# Database
DATABASE_URL="file:./database.sqlite"

# JWT Secret (MUHIM: Kuchli parol qo'ying!)
JWT_SECRET=your-very-strong-secret-key-here-min-32-chars

# Server
PORT=3001
NODE_ENV=production

# Frontend URL
FRONTEND_URL=https://your-frontend-domain.com

# Gemini AI
GEMINI_API_KEY=your-gemini-api-key
```

## 5. Build

```bash
npm run build
```

## 6. Ishga Tushirish

### Development rejimida:
```bash
npm run dev
```

### Production rejimida (oddiy):
```bash
npm run start:prod
```

### Production rejimida (PM2 bilan - tavsiya etiladi):
```bash
# PM2 o'rnatish (global)
npm install -g pm2

# Ilovani ishga tushirish
pm2 start ecosystem.config.js

# Statusni ko'rish
pm2 status

# Loglarni ko'rish
pm2 logs ielts-backend

# Qayta ishga tushirish
pm2 restart ielts-backend

# To'xtatish
pm2 stop ielts-backend

# Server qayta ishga tushganda avtomatik ishga tushishi uchun
pm2 startup
pm2 save
```

## 7. Nginx Konfiguratsiyasi (agar kerak bo'lsa)

```nginx
server {
    listen 80;
    server_name api.yourdomain.com;

    location / {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
}
```

## 8. SSL Sertifikat (Let's Encrypt)

```bash
# Certbot o'rnatish
sudo apt install certbot python3-certbot-nginx

# SSL sertifikat olish
sudo certbot --nginx -d api.yourdomain.com
```

## 9. Database Backup

```bash
# SQLite backup
cp database.sqlite database.backup.sqlite

# Yoki cron job orqali avtomatik backup
# crontab -e
# 0 2 * * * cp /path/to/database.sqlite /path/to/backups/database-$(date +\%Y\%m\%d).sqlite
```

## 10. Monitoring

```bash
# PM2 monitoring
pm2 monit

# Loglarni kuzatish
pm2 logs ielts-backend --lines 100
```

## 11. Yangilanishlar

```bash
# Yangi kodlarni olish
git pull origin main

# Dependencies yangilash
npm install

# Prisma yangilash
npm run prisma:generate
npx prisma migrate deploy

# Qayta build qilish
npm run build

# PM2 orqali qayta ishga tushirish
pm2 restart ielts-backend
```

## 12. Xavfsizlik

- ✅ `.env` faylini hech qachon git'ga qo'shmang
- ✅ JWT_SECRET ni kuchli qiling (kamida 32 belgi)
- ✅ CORS ni to'g'ri sozlang
- ✅ Rate limiting qo'shing (agar kerak bo'lsa)
- ✅ Helmet.js ishlatish tavsiya etiladi
- ✅ Database backuplarini muntazam oling

## 13. Troubleshooting

### Port band bo'lsa:
```bash
# Portni ishlatayotgan processni topish
lsof -i :3001
# Yoki
netstat -tulpn | grep 3001

# Process'ni to'xtatish
kill -9 <PID>
```

### Database xatoliklari:
```bash
# Database'ni qayta yaratish
rm database.sqlite
npx prisma migrate deploy
npm run prisma:seed
```

### PM2 xatoliklari:
```bash
# PM2 ni tozalash
pm2 delete all
pm2 kill

# Qayta ishga tushirish
pm2 start ecosystem.config.js
```

## 14. Test Qilish

```bash
# Health check
curl http://localhost:3001

# Register test
curl -X POST http://localhost:3001/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"test123","fullName":"Test User"}'

# Login test
curl -X POST http://localhost:3001/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"test123"}'
```

## Qo'shimcha Resurslar

- [NestJS Documentation](https://docs.nestjs.com)
- [Prisma Documentation](https://www.prisma.io/docs)
- [PM2 Documentation](https://pm2.keymetrics.io/docs)
- [Nginx Documentation](https://nginx.org/en/docs)
