# Quick Start Guide 🚀

## Local Development

```bash
# 1. Dependencies o'rnatish
npm install

# 2. Environment sozlash
cp .env.example .env
# .env faylini tahrirlang

# 3. Database sozlash
npm run prisma:generate
npx prisma migrate deploy

# 4. Development server
npm run dev
```

Server `http://localhost:3001` da ishga tushadi.

## Production Deployment

### Variant 1: PM2 (Tavsiya etiladi)

```bash
# 1. Build
npm run build

# 2. PM2 bilan ishga tushirish
pm2 start ecosystem.config.js

# 3. Auto-restart sozlash
pm2 startup
pm2 save
```

### Variant 2: Docker

```bash
# 1. Docker image build
docker build -t ielts-backend .

# 2. Container ishga tushirish
docker run -d \
  -p 3001:3001 \
  --env-file .env \
  --name ielts-backend \
  ielts-backend

# Yoki docker-compose bilan
docker-compose up -d
```

### Variant 3: Oddiy Node.js

```bash
# 1. Build
npm run build

# 2. Ishga tushirish
npm run start:prod
```

## API Test

```bash
# Health check
curl http://localhost:3001/health

# Yoki test script
chmod +x test-api.sh
./test-api.sh
```

## Environment Variables

Minimal kerakli o'zgaruvchilar:

```bash
DATABASE_URL="file:./database.sqlite"
JWT_SECRET=your-secret-key-min-32-chars
GEMINI_API_KEY=your-gemini-api-key
PORT=3001
NODE_ENV=production
FRONTEND_URL=https://your-frontend.com
```

## Troubleshooting

### Port band bo'lsa
```bash
lsof -i :3001
kill -9 <PID>
```

### Build xatolari
```bash
rm -rf node_modules dist
npm install
npm run build
```

### Database xatolari
```bash
rm database.sqlite
npx prisma migrate deploy
```

## Foydali Commandlar

```bash
# Logs ko'rish (PM2)
pm2 logs ielts-backend

# Status tekshirish
pm2 status

# Qayta ishga tushirish
pm2 restart ielts-backend

# To'xtatish
pm2 stop ielts-backend
```

## Qo'shimcha Ma'lumot

- Batafsil deployment: [DEPLOYMENT.md](./DEPLOYMENT.md)
- Xavfsizlik: [SECURITY.md](./SECURITY.md)
- Production checklist: [PRODUCTION_CHECKLIST.md](./PRODUCTION_CHECKLIST.md)
- API documentation: [README.md](./README.md)

## Yordam

Muammo yuzaga kelsa:
1. Loglarni tekshiring: `pm2 logs` yoki `docker logs ielts-backend`
2. Health check: `curl http://localhost:3001/health`
3. Environment variables to'g'riligini tekshiring
4. Database mavjudligini tekshiring

---

**Muvaffaqiyatli deployment!** 🎉
