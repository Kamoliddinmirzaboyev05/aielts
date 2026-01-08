# Production Checklist ✅

Serverga joylashtirish oldidan ushbu ro'yxatni tekshiring:

## 1. Environment Variables

- [ ] `.env` fayli yaratilgan
- [ ] `JWT_SECRET` kuchli va unique (kamida 32 belgi)
- [ ] `GEMINI_API_KEY` to'g'ri
- [ ] `PORT` sozlangan
- [ ] `NODE_ENV=production` o'rnatilgan
- [ ] `FRONTEND_URL` to'g'ri domen
- [ ] `DATABASE_URL` to'g'ri

## 2. Database

- [ ] Prisma client generatsiya qilingan (`npm run prisma:generate`)
- [ ] Migratsiyalar qo'llanilgan (`npx prisma migrate deploy`)
- [ ] Seed data yuklangan (agar kerak bo'lsa)
- [ ] Database backup strategiyasi sozlangan
- [ ] Database file permissions to'g'ri (chmod 600)

## 3. Build va Test

- [ ] `npm install` muvaffaqiyatli
- [ ] `npm run build` xatosiz
- [ ] Barcha testlar o'tdi
- [ ] API endpoints test qilindi
- [ ] Health check ishlayapti

## 4. Xavfsizlik

- [ ] `.env` fayli `.gitignore` da
- [ ] Parollar hech qachon log'lanmaydi
- [ ] CORS faqat kerakli domenlar uchun
- [ ] Rate limiting sozlangan (tavsiya)
- [ ] Helmet.js o'rnatilgan (tavsiya)
- [ ] SSL/TLS sertifikat o'rnatilgan
- [ ] Firewall sozlangan
- [ ] Faqat kerakli portlar ochiq (80, 443, SSH)

## 5. Server Sozlamalari

- [ ] Node.js 18+ o'rnatilgan
- [ ] PM2 o'rnatilgan (`npm install -g pm2`)
- [ ] Nginx o'rnatilgan va sozlangan (agar kerak bo'lsa)
- [ ] Logs papkasi yaratilgan
- [ ] Disk space yetarli

## 6. Monitoring va Logging

- [ ] PM2 monitoring sozlangan
- [ ] Log rotation sozlangan
- [ ] Error tracking sozlangan
- [ ] Uptime monitoring (agar kerak bo'lsa)
- [ ] Backup monitoring

## 7. Performance

- [ ] Clustering yoqilgan (PM2 ecosystem.config.js)
- [ ] Gzip compression yoqilgan
- [ ] Static files caching sozlangan
- [ ] Database indexes qo'shilgan

## 8. Backup

- [ ] Database backup script yaratilgan
- [ ] Cron job sozlangan (kunlik backup)
- [ ] Backup storage aniqlangan
- [ ] Restore procedure test qilindi

## 9. Documentation

- [ ] README.md yangilangan
- [ ] API documentation yaratilgan
- [ ] Deployment qo'llanmasi mavjud
- [ ] Team bilan ulashilgan

## 10. Post-Deployment

- [ ] Health check endpoint test qilindi
- [ ] Barcha API endpoints ishlayapti
- [ ] Frontend bilan integratsiya test qilindi
- [ ] Error handling to'g'ri ishlayapti
- [ ] Logs monitoring qilinmoqda
- [ ] PM2 auto-restart sozlangan (`pm2 startup`)

## Quick Commands

```bash
# Build
npm run build

# Start with PM2
pm2 start ecosystem.config.js

# Check status
pm2 status

# View logs
pm2 logs ielts-backend

# Restart
pm2 restart ielts-backend

# Save PM2 config
pm2 save

# Setup auto-restart on server reboot
pm2 startup
```

## Emergency Contacts

- **Backend Developer**: [Your Contact]
- **DevOps**: [DevOps Contact]
- **Server Provider**: [Provider Support]

## Rollback Plan

Agar muammo yuzaga kelsa:

```bash
# 1. Stop current version
pm2 stop ielts-backend

# 2. Restore previous version
git checkout <previous-commit>
npm install
npm run build

# 3. Restore database backup
cp database.backup.sqlite database.sqlite

# 4. Restart
pm2 restart ielts-backend
```

## Success Criteria

- [ ] API response time < 200ms
- [ ] Uptime > 99.9%
- [ ] Zero critical errors
- [ ] All endpoints responding
- [ ] Database queries optimized
- [ ] Memory usage stable
- [ ] CPU usage < 70%

---

**Oxirgi tekshiruv sanasi**: _____________

**Tekshirgan**: _____________

**Tasdiqlagan**: _____________
