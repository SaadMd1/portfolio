# ✅ Checklist de Déploiement - Portfolio

## 📋 Avant de Commencer

- [x] Code sur GitHub ✅ (https://github.com/SaadMd1/portfolio)
- [ ] Compte Vercel créé (https://vercel.com)
- [ ] Compte Cloudflare créé (https://cloudflare.com)
- [ ] Accès Hostinger
- [ ] Nom de domaine prêt

---

## 🚀 ÉTAPE 1 : Vercel (10 min)

### Déploiement
- [ ] Connecté à Vercel avec GitHub
- [ ] Projet importé depuis GitHub
- [ ] Variables d'environnement ajoutées :
  - [ ] `ADMIN_PASSWORD`
  - [ ] `NEXT_PUBLIC_SITE_URL`
  - [ ] `NEXT_PUBLIC_SITE_NAME`
  - [ ] `CONTACT_TO_EMAIL`
- [ ] Déploiement réussi
- [ ] URL temporaire fonctionne (`*.vercel.app`)

---

## ☁️ ÉTAPE 2 : Cloudflare (15 min)

### Configuration DNS
- [ ] Site ajouté sur Cloudflare
- [ ] Plan Free sélectionné
- [ ] Nameservers Cloudflare notés :
  ```
  1. ___________________.ns.cloudflare.com
  2. ___________________.ns.cloudflare.com
  ```

### Enregistrements DNS
- [ ] Enregistrement A ajouté :
  - Type : `A`
  - Name : `@`
  - Content : `76.76.21.21`
  - Proxy : ☁️ ON
  
- [ ] Enregistrement CNAME ajouté :
  - Type : `CNAME`
  - Name : `www`
  - Target : `cname.vercel-dns.com`
  - Proxy : ☁️ ON

### SSL/TLS
- [ ] Mode SSL : `Full (strict)`
- [ ] Always Use HTTPS : ✅ ON
- [ ] Automatic HTTPS Rewrites : ✅ ON

---

## 🏠 ÉTAPE 3 : Hostinger (10 min)

### Nameservers
- [ ] Connecté à Hostinger
- [ ] Domaine sélectionné
- [ ] Nameservers changés vers Cloudflare
- [ ] Confirmation de sauvegarde

---

## 🔗 ÉTAPE 4 : Vercel - Domaine (5 min)

### Ajout du Domaine
- [ ] Domaine principal ajouté : `votredomaine.com`
- [ ] Domaine www ajouté : `www.votredomaine.com`
- [ ] Configuration DNS validée ✅
- [ ] Domaine principal défini

---

## ⏳ ÉTAPE 5 : Attente (1-24h)

### Propagation DNS
- [ ] Attente en cours...
- [ ] Vérification DNS :
  ```powershell
  nslookup -type=NS votredomaine.com
  nslookup votredomaine.com
  ```

---

## ✅ ÉTAPE 6 : Tests Finaux

### URLs à Tester
- [ ] `http://votredomaine.com` → Redirige vers HTTPS
- [ ] `https://votredomaine.com` → ✅ Fonctionne
- [ ] `https://www.votredomaine.com` → Redirige vers domaine principal
- [ ] `https://votredomaine.com/work` → ✅ Fonctionne
- [ ] `https://votredomaine.com/blog` → ✅ Fonctionne
- [ ] `https://votredomaine.com/admin/login` → ✅ Panel admin

### Sécurité
- [ ] 🔒 Cadenas SSL visible dans le navigateur
- [ ] Certificat valide (Cloudflare)
- [ ] Pas d'avertissement de sécurité

### Panel Admin
- [ ] Login fonctionne avec mot de passe
- [ ] Dashboard accessible
- [ ] Peut créer un projet test
- [ ] Peut uploader une image test

---

## 🎉 Site en Ligne !

### Informations Importantes

**URLs :**
- Site : `https://votredomaine.com`
- Admin : `https://votredomaine.com/admin/login`
- Vercel Dashboard : `https://vercel.com`
- Cloudflare Dashboard : `https://dash.cloudflare.com`

**Mot de passe Admin :**
```
📝 Notez-le ici : _____________________
```

**Déploiement Automatique :**
```bash
# Pour mettre à jour le site
git add .
git commit -m "Mes changements"
git push origin main
# Vercel déploie automatiquement !
```

---

## 📊 Coûts Mensuels

| Service | Coût |
|---------|------|
| Hostinger (domaine) | ~0.83€/mois (~10€/an) |
| Cloudflare | 🆓 Gratuit |
| Vercel | 🆓 Gratuit |
| **TOTAL** | **~0.83€/mois** |

---

## 🆘 En Cas de Problème

### Support
- Hostinger : https://www.hostinger.com/contact
- Cloudflare : https://community.cloudflare.com
- Vercel : https://vercel.com/support

### Documentation
- Guide complet : `GUIDE_DEPLOIEMENT_COMPLET.md`
- Admin : `ADMIN_README_FR.md`

---

## 🎯 Prochaines Étapes

- [ ] Ajouter vos vrais projets
- [ ] Écrire des articles de blog
- [ ] Ajouter des témoignages
- [ ] Personnaliser le profil
- [ ] Partager sur les réseaux sociaux
- [ ] Ajouter à votre CV/LinkedIn

---

**Date de mise en ligne :** _______________

**Félicitations ! Votre portfolio est en ligne !** 🚀🎉

